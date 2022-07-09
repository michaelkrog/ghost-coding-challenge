# Base image
FROM node:16

WORKDIR /usr/src/app

COPY server/package*.json ./
RUN npm install

COPY server/* ./

RUN npm run build

COPY dist/client client

# Start the server using the production build
CMD [ "node", "dist/main.js" ]