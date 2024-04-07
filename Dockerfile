FROM node:20 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 80
# COPY .env.prod .env
CMD ["npm", "run", "start:prod"]
