# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

cloudbuild.options:
  logsBucket: _Default

# Expose the port your app runs on
EXPOSE 80

# Define the command to start your application
CMD ["node", "dist/index.js"]
