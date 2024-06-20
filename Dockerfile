FROM --platform=linux/amd64 node:16-bullseye as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM --platform=linux/amd64 nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
RUN chown -hR nginx:nginx /var/cache/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
