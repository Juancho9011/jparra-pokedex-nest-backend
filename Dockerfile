FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto usando npm install
RUN npm install

# Copia todos los archivos del proyecto al contenedor
COPY . .

# Expone el puerto 3000 para acceder a la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
