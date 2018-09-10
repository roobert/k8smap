FROM node:9.11.1-alpine as k8smap-build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY package*.json ./

RUN echo 'export default { "contexts": [ {} ] }' > ./conf/config.mjs \
  && npm run build

FROM nginx:1.13.12-alpine as k8smap-production-stage
COPY --from=k8smap-build-stage /app/dist /usr/share/nginx/html

# conf.d is used as mount point but overwrite this file anyway
# since it can cause confusion / conflict with k8smap config
RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
