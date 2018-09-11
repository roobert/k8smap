#!/usr/bin/env bash
set -euo pipefail

kubectl apply -f secret.yaml
kubectl apply -f deployment.yaml
