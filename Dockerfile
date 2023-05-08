# Use an official Node.js runtime as a parent image
FROM node:18.12.1-alpine

# Set the working directory to /shaked-client
WORKDIR /shaked-client

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from the current directory to /shaked-client in the container
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Define the command to start the server
CMD ["npm", "start"]
