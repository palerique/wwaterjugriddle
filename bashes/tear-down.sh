#!/usr/bin/env bash
set -e  # fail on any error
set -x  # display commands being run
echo "Uninstalling the environment..."
echo "==========================================="
echo "Before:"
echo "==========================================="
helm list --all-namespaces
kubectl get ns --show-labels
kubectl get pods --all-namespaces
echo "==========================================="
kubectl delete -f apps/api/k8s/api.yaml
kubectl delete -f apps/web/k8s/web.yaml
kubectl delete -f https://raw.githubusercontent.com/istio/istio/release-1.22/samples/addons/grafana.yaml
kubectl delete -f https://raw.githubusercontent.com/istio/istio/release-1.22/samples/addons/prometheus.yaml
kubectl delete -f https://raw.githubusercontent.com/istio/istio/release-1.22/samples/addons/kiali.yaml
kubectl delete -f https://raw.githubusercontent.com/istio/istio/release-1.22/samples/addons/jaeger.yaml
kubectl label namespace default istio-injection-
istioctl uninstall --purge -y
kubectl delete namespace istio-system
echo "==========================================="
# Get process IDs (PIDs) of all "kubectl port-forward" commands
PIDS=$(pgrep -f "kubectl port-forward" || true)
# Loop over each PID and kill it
if [[ -n "$PIDS" ]]; then
for PID in $PIDS
do
  echo "Stopping process $PID..."
  kill -9 "$PID"
done
echo "All 'kubectl port-forward' processes have been stopped."
fi

echo "==========================================="
echo "After:"
echo "==========================================="
helm list --all-namespaces
kubectl get ns --show-labels
kubectl get pods --all-namespaces
echo "==========================================="
