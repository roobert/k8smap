FROM node:9.11.1-alpine as k8smap-build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:1.13.12-alpine as k8smap-production-stage
COPY --from=k8smap-build-stage /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/sites-enabled/k8smap.conf

# template nginx config out..

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
