PATH  := ./node_modules/.bin:$(PATH)
SHELL := env PATH=$(PATH) /bin/bash

.DEFAULT_GOAL := node-run

# common build targets

make configure:
	./bin/generate-common-config > conf/config.common.mjs

# node build targets

node-depends:
	npm install \
	  && sudo npm install -g @vue/cli-service-global

node-configure:
	./bin/generate-nginx-config conf/template/nginx.conf.header.node > conf/nginx.conf.node

node-install:
	sudo cp conf/nginx.conf.node /etc/nginx/sites.enable/k8smap \
		&& sudo service nginx reload

node-run:
	@cd src \
		&& vue serve

# docker build targets

docker-configure:
	./bin/generate-vue-config > conf/config.vue.mjs \
	./bin/generate-nginx-config template/nginx.conf.header.docker > conf/nginx.conf.docker

docker-build:
	docker build -f docker/Dockerfile -t k8smap .

docker-run:
	docker run -i -t --mount type=volume,src=conf/nginx.conf.docker,dst=/etc/nginx/conf.d/k8smap.conf --rm -p=8888:80 --name=k8smap k8smap

docker-shell:
	docker exec -it k8smap /bin/sh
