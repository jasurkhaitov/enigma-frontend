# Use Node.js Alpine as base image
FROM node:18-alpine 

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching dependencies)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]