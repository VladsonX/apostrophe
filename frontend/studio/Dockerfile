FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Increase memory allocation for Node.js
ENV NODE_OPTIONS="--max-old-space-size=512"

COPY . .
RUN npm run build

FROM nginx:1.21 AS production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
