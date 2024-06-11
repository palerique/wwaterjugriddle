#!/usr/bin/env bash
set -x  # display commands being run
echo "Uninstalling the environment..."
echo "==========================================="
echo "Before:"
echo "==========================================="
helm list --all-namespaces
kubectl get ns --show-labels
kubectl get pods --all-namespaces
echo "==========================================="
kubectl delete -f apps/api/k8s/api.yaml || true
kubectl delete -f apps/web/k8s/web.yaml || true
kubectl delete -f https://raw.githubusercontent.com/istio/istio/release-1.22/samples/addons/grafana.yaml || true
kubectl delete -f https://raw.githubusercontent.com/istio/istio/release-1.22/samples/addons/prometheus.yaml || true
kubectl delete -f https://raw.githubusercontent.com/istio/istio/release-1.22/samples/addons/kiali.yaml || true
kubectl delete -f https://raw.githubusercontent.com/istio/istio/release-1.22/samples/addons/jaeger.yaml || true
#kubectl delete -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml || true
kubectl delete -f k8s/metrics-server.yaml || true
helm uninstall redis || true
kubectl label namespace default istio-injection- || true
istioctl uninstall --purge -y || true
kubectl delete namespace istio-system || true
kubectl delete secret redis-password || true
echo "==========================================="
# Get process IDs (PIDs) of all "kubectl port-forward" commands
PIDS=$(pgrep -f "kubectl port-forward" || true)
# Loop over each PID and kill it
if [[ -n "$PIDS" ]]; then
for PID in $PIDS
do
  echo "Stopping process $PID..."
  kill -9 "$PID" || true
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
