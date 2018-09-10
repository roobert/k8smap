PATH  := ./node_modules/.bin:$(PATH)
SHELL := env PATH=$(PATH) /bin/bash

.DEFAULT_GOAL := serve

# node build targets

node-depends:
	npm install \
	  && sudo npm install -g @vue/cli-service-global

node-configure:
	@cd conf \
		&& ./bin/generate-vue-config > tmp/config.common.mjs \
		&& ./bin/generate-nginx-config template/nginx.conf.header.node > tmp/nginx.conf.node \

node-install:
	@cd conf \
		&& sudo cp nginx.conf.node /etc/nginx/sites.enable/k8smap \
		&& sudo service nginx reload

node-run:
	@cd src \
		&& vue serve

# docker build targets

docker-configure:
	@cd conf \
		&& ./bin/generate-vue-config > tmp/config.vue.mjs \
		&& ./bin/generate-nginx-config template/nginx.conf.header.docker > tmp/nginx.conf.docker

# FIXME: update tags

docker-dev-build:
	docker build -f docker/Dockerfile.insecure -t k8smap .

docker-k8s-build:
	docker build -f docker/Dockerfile.no-secrets -t k8smap .

docker-dev-run:
	docker run -i -t --rm -p=8888:80 --name=k8smap k8smap

docker-k8s-run:
	docker run -i -t --rm -p=8888:80 --name=k8smap k8smap

docker-shell:
  docker exec -it k8smap  /bin/sh
