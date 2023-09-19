# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy files
COPY . .

# Install app dependencies
RUN npm install

# Build the app
RUN npm run build

# Start the app
CMD [ "npm", "start" ]