#!/usr/bin/env bash
set -e  # fail on any error
set -x  # display commands being run
# Function to wait for a pod to be running
function wait_for_pod() {
   namespace=$1
   label=$2
   while true; do
    pod_statuses=$(kubectl get pods -n "${namespace}" -l "${label}" -o jsonpath='{.items[*].status.phase}')
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
}
./build-docker-images.sh
./prepare-k8s.sh
./deploy-k8s.sh
# Wait for pods to be running before port forwarding
wait_for_pod istio-system "app.kubernetes.io/name=prometheus"
wait_for_pod istio-system "app.kubernetes.io/name=grafana"
wait_for_pod istio-system "app.kubernetes.io/name=kiali"
wait_for_pod default "app=web"
wait_for_pod default "app=api"
./forward-ports.sh
