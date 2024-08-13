FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install -f

# Build the application
COPY . .
RUN npm run build

## Export the Next.js application as static files
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "run", "start"]