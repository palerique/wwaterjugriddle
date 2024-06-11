#!/usr/bin/env bash
set -e  # fail on any error
set -x  # display commands being run

#kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
kubectl apply -f k8s/metrics-server.yaml

# Istio / Kubernetes configuration:
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo add jaegertracing https://jaegertracing.github.io/helm-charts
helm repo update

# Install Istio
istioctl install --set profile=demo -y

# Loop until all Istio pods are running or have completed
while : ; do
 [[ $(kubectl get pods -n istio-system 2>&1) =~ "No resources found" ]] && sleep 1 && continue
 readyPods=$(kubectl get pods -n istio-system --no-headers 2>/dev/null | grep -v -E '(Running|Completed)' || true)
 if [[ -z "$readyPods" ]]; then
   break
 fi
 echo "Waiting for Istio pods to be ready..."
 sleep 5
done

kubectl label namespace default istio-injection=enabled

#helm install prometheus bitnami/kube-prometheus --wait
#helm install grafana bitnami/grafana --wait

#helm install jaegertracing jaegertracing/jaeger -n observability --wait
#helm install jaegertracing jaegertracing/jaeger --wait

./bashes/redis-k8s.sh

kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.22/samples/addons/grafana.yaml
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.22/samples/addons/prometheus.yaml
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.22/samples/addons/kiali.yaml
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.22/samples/addons/jaeger.yaml
