FROM node:18-slim AS build-stage
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Increase memory allocation for Node.js
ENV NODE_OPTIONS="--max-old-space-size=2048"

FROM nginx:1.21 AS production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
