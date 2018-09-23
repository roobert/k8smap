# k8smap

See Makefile for all deployment options

## Usage

### Requirements

Requires [google-cloud-sdk](https://cloud.google.com/sdk/docs/downloads-versioned-archives) with the `kubectl` component for config generation.

```
# ensure login
gcloud auth login
```

Ensure some cluster contexts exist:
```
# GCP Console -> Kubernetes Engine -> <cluster> -> Connect
gcloud container clusters get-credentials cluster0 --zone europe-west1-b --project test0
```

Permit default service account access to cluster admin (or do something more secure than this):
```
kubectl create clusterrolebinding default-admin --clusterrole cluster-admin --serviceaccount=default:default

# or 
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: default-admin
subjects:
  - kind: ServiceAccount
    name: default
    namespace: default
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
```

### Development

```
make node-depends

make node

make node-install-linux
# -or-
make node-install-osx

make node-run &

# open connection to nginx rather than app directly
open http://localhost:8888
```



### Docker

```
make docker
make docker-run

# debug..
make-docker-shell
```

## Quickstart

```
make node-linux
# -or-
make node-osx
```
