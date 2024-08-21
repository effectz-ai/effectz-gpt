FROM node:20-alpine

WORKDIR /messenger

COPY package.json .
RUN npm install -f

COPY . .
ENV PORT=8080
EXPOSE 8080
CMD [ "npm", "run", "start" ]