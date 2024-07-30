# Use the official Cypress Docker image
FROM cypress/base:latest

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Run Cypress tests
CMD ["npx", "cypress", "run", "--spec", "cypress/e2e/**/*.js"]
