FROM node:20

# Set working directory inside container
WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "src/index.js"]
