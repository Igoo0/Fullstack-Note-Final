FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

COPY .env .env

# Copy source code
COPY . .

# Remove hardcoded EXPOSE or use 8080 (Cloud Run's default)
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
