FROM node:14.16.0-alpine3.13

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 

ENV PORT=9000
EXPOSE 9000:9000

# CMD ["npm", "start"]
CMD ["npm", "run", "dev"]