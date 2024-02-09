# Sélectionnez l'image de base Node.js
FROM node:21.6.1

# Définissez le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers du projet dans le conteneur
COPY . .

# Transpilez TypeScript en JavaScript
RUN npx prisma generate
RUN npm run build

# Exposez le port sur lequel votre app écoute
EXPOSE 3008

# Définissez la commande pour démarrer votre app
# CMD ["sleep", "infinity"]
CMD ["npm", "run", "dev"]