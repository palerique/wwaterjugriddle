#!/usr/bin/env bash
set -x  # display commands being run
# Function to wait for a pod to be running
function wait_for_pod() {
  set +e  # allow commands to fail without causing the entire script to fail
  namespace=$1
  label=$2
  while true; do
   if ! pod_statuses=$(kubectl get pods -n "${namespace}" -l "${label}" -o jsonpath='{.items[*].status.phase}'); then
     echo "Failed to get pods status, retrying..."
     sleep 1
     continue
   fi
   IFS=' ' read -a status_array <<< "$pod_statuses"
   not_ready_count=0
   for status in "${status_array[@]}"
   do
     if [ "$status" != "Running" ] && [ "$status" != "Succeeded" ]; then
       ((not_ready_count++))
     fi
   done
   if [ "$not_ready_count" -eq 0 ]; then
     echo "All pods with label ${label} in namespace ${namespace} are ready"
     break
   else
     echo "Waiting for pods with label ${label} in namespace ${namespace} to be ready, status is: ${pod_statuses}"
     kubectl get pods -n "${namespace}" -l "${label}"
     sleep 1
   fi
  done
  set -e  # re-enable exiting when a command fails
}
./bashes/build-docker-images.sh
./bashes/prepare-k8s.sh
./bashes/deploy-k8s.sh
# Wait for pods to be running before port forwarding
wait_for_pod istio-system "app.kubernetes.io/name=prometheus"
wait_for_pod istio-system "app.kubernetes.io/name=grafana"
wait_for_pod istio-system "app.kubernetes.io/name=kiali"
wait_for_pod default "app=web"
wait_for_pod default "app=api"
./bashes/forward-ports.sh
