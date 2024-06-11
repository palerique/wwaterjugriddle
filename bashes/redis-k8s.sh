#!/usr/bin/env bash
set -e  # fail on any error
set -x  # display commands being run

# Install Redis
helm install redis bitnami/redis --wait

echo "Waiting for redis to be ready..."

while : ; do
  echo "Checking redis pods..."
  runningPods=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=redis" -o jsonpath="{.items[*].status.conditions[?(@.type=='Ready')].status}")
  if [[ ${runningPods} =~ "False" ]]; then
    echo "Some redis pods are not yet ready, sleeping for 10 seconds..."
    sleep 10
  else
    echo "All redis pods are running and ready."
    break
  fi
done

redisPwd=$(kubectl get secret --namespace default redis -o jsonpath="{.data.redis-password}")
REDIS_PASSWORD="$(echo "$redisPwd" | base64 --decode)"
export REDIS_PASSWORD
echo "base 64 redis password $redisPwd"
echo "plain redis password $REDIS_PASSWORD"

kubectl create secret generic redis-password --from-literal=REDIS_PASSWORD="$REDIS_PASSWORD"

kubectl port-forward --namespace default svc/redis 5432:5432 &
