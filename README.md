# k8smap

## Configure

Configure API end points:
```
cp conf/config.js.example conf/config.js
vi conf/config.js
```

Generate NGiNX config:
```
make configure
```

## Build

Build container:
```
make build
```

## Deploy

Deploy to Kubernetes:
```
make deploy
```
