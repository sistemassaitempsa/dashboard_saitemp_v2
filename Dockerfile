# Usar una imagen base de Node.js
FROM node:16-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todos los archivos del proyecto al directorio de trabajo
COPY . .

# Compilar la aplicación para producción
RUN npm run build

# Usar una imagen base ligera de Nginx para servir la aplicación
FROM nginx:alpine

# Copiar los archivos compilados desde el paso anterior a la imagen de Nginx
COPY --from=0 /app/dist /usr/share/nginx/html

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
