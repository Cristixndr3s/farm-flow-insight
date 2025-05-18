# Utilizar la imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto 4173 (Vite preview usa este puerto)
EXPOSE 4173

# Comando para iniciar la aplicación
CMD ["npm", "start"]
