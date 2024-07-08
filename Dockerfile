# Use the official Next.js image as a base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the application port
EXPOSE 15000

# Start the Next.js application
CMD ["npm", "run", "start", "-H", "0.0.0.0", "-p", "15000"]


## docker build -t deltacoweb .

## docker run -p 15000:15000 deltacoweb