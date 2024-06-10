#!/usr/bin/env bash
set -e  # fail on any error
set -x  # display commands being run

# Deploy the application to Kubernetes:
kubectl apply -f apps/api/k8s/api.yaml
kubectl apply -f apps/web/k8s/web.yaml
