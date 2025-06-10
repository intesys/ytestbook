FROM --platform=linux/amd64 node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM --platform=linux/amd64 nginxinc/nginx-unprivileged:1.27.1

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf.template /etc/nginx/templates/default.conf.template

RUN chown -hR nginx:nginx /var/cache/nginx
CMD ["nginx", "-g", "daemon off;"]
