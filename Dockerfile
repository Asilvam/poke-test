FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3500

ENV MONGODB_URI=mongodb://mongodb:27017
ENV API_URL=https://pokeapi.co/api/v2/pokemon

CMD ["npm", "run", "start:prod"]
