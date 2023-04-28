FROM node:latest

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
# COPY .package*.json ./
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY ./client ./client
COPY ./server ./server

# Expose the port that the server is running on
EXPOSE 9000

# Run SQL scripts to pre-populate the database
COPY ./server/db/schema.sql /docker-entrypoint-initdb.d/
COPY ./server/db/data.sql /docker-entrypoint-initdb.d/

# Start the Express app
CMD npm start
