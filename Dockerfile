FROM --platform=linux/amd64 node:16-bullseye as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM --platform=linux/amd64 nginxinc/nginx-unprivileged:1.25.4
COPY --from=build /app/dist /usr/share/nginx/html
RUN chown -hR nginx:nginx /var/cache/nginx
CMD ["nginx", "-g", "daemon off;"]
