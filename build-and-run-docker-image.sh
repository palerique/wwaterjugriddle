#!/bin/bash
set -e  # fail on any error
set -x  # display commands being run

# Check if docker is installed
if ! command -v docker &> /dev/null
then
    echo "docker is not installed. Please install it first."
    exit
fi

# Build the Docker image
docker build -f apps/api/Dockerfile -t br.com.palerique/water-riddle-api:latest . & \
docker build -f apps/web/Dockerfile -t br.com.palerique/water-riddle-web:latest .


# Istio / Kubernetes configuration:

#!/usr/bin/env bash

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

kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.22/samples/addons/grafana.yaml
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.22/samples/addons/prometheus.yaml
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.22/samples/addons/kiali.yaml
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.22/samples/addons/jaeger.yaml

# Deploy the application to Kubernetes:
kubectl apply -f apps/api/k8s/api.yaml
kubectl apply -f apps/web/k8s/web.yaml

#Forward the ports for the services:
kubectl port-forward --namespace istio-system svc/prometheus 9090:9090 &
kubectl port-forward --namespace istio-system svc/grafana 8180:8180 &
kubectl port-forward --namespace istio-system svc/kiali 8380:20001 &
kubectl port-forward --namespace default svc/web-service 3000:3000 &
kubectl port-forward --namespace default svc/api-service 3002:3002 &
