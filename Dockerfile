# Etapa de construcción
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80

# Archivo de configuración de Nginx para servir React
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
