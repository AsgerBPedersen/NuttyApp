FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

run npm install

copy . .

EXPOSE 3000

CMD ["npm", "run", "dev"]