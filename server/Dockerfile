# Use official Node 20 image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source files
COPY . .

# Generate Prisma binaries for alphine
RUN npx prisma generate

# Build the TypeScript backend
RUN npm run build

# Run the server
CMD ["npm", "run", "serve"]