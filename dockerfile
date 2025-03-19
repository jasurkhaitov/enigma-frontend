# Use Node.js Alpine as base image
FROM node:18-alpine 

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching dependencies)
COPY package.json package-lock.json ./

# Install dependencies using `npm ci` for consistency
RUN npm ci

# Copy the rest of the app files
COPY . .
COPY .env .env

# Build the app for production
RUN npm run build

# Install a lightweight static file server (like serve)
RUN npm install -g serve

# Expose the port for the static file server
EXPOSE 5173

# Serve the built files
CMD ["serve", "-s", "dist", "-l", "5173"]