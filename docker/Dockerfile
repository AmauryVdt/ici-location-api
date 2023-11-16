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


# docker run --name db -e POSTGRES_PASSWORD=crampte -e POSTGRES_USER=admin -e POSTGRES_DB=icilocation -p 5432:5432 -v ./postgres_data:/var/lib/postgresql/data -d postgis/postgis:16-3.4

# docker run --name db_shadow -e POSTGRES_PASSWORD=crampte -e POSTGRES_USER=admin -e POSTGRES_DB=icilocationshadow -p 5433:5432 -v ./postgres_data_shadow:/var/lib/postgresql/data -d postgis/postgis:16-3.4