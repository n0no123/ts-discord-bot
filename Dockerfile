FROM node:latest

WORKDIR /usr

COPY package.json .

COPY package-lock.json .

COPY tsconfig.json .

COPY .env .

COPY src ./src

RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]
