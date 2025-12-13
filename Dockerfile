FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine

# Instalar Node.js para el backend API
RUN apk add --no-cache nodejs npm

# Copiar archivos estáticos
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar y configurar el backend API
COPY api/ /app/api/
WORKDIR /app/api
RUN npm install

# Script de inicio que ejecuta tanto Nginx como el API
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80 3000

CMD ["/start.sh"]