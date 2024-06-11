#!/usr/bin/env bash
set -e  # fail on any error
set -x  # display commands being run

#Forward the ports for the services:
kubectl port-forward --namespace istio-system svc/prometheus 9090:9090 &
kubectl port-forward --namespace istio-system svc/grafana 8180:8180 &
kubectl port-forward --namespace istio-system svc/kiali 8380:20001 &
kubectl port-forward --namespace default svc/web-service 3000:3000 &
kubectl port-forward --namespace default svc/api-service 3002:3002 &
kubectl port-forward --namespace default svc/redis-master 6379:6379 &
