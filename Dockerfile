FROM node:22-alpine AS base

# Set the working directory
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --only=production

# Copy the source code
COPY . .

RUN npm run build

# Use a lightweight production image
FROM node:22-alpine AS production

# Set the working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=base /usr/src/app/dist ./dist
COPY --from=base /usr/src/app/package.json ./package.json
COPY --from=base /usr/src/app/node_modules ./node_modules

# Expose the application port
EXPOSE 3000

# Set the default command to run the app
CMD ["node", "dist/app.js"]