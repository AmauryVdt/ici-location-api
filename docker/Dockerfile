# Use the official Node.js image as a parent image
FROM node:21.1.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build your app
RUN npm run build

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 3008

# Run the specified command within the container.
CMD [ "node", "dist/index.js" ]


# # Utiliser une image PostGIS spécifique pour la plateforme arm64
# FROM --platform=linux/arm64 postgis/postgis:16-3.4

# # Copier les scripts SQL dans le conteneur
# COPY ./initdb-postgis.sh /docker-entrypoint-initdb.d/