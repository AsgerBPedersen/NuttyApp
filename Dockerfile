FROM node:10

WORKDIR /usr/src/app

# split the project up so i don't install react-native in the docker container, or make another package.json file.
COPY package*.json ./

run npm install

copy . .

EXPOSE 3000

CMD ["npm", "run", "dev"]