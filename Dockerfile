FROM node:lts-alpine
WORKDIR /what-they-said
COPY . .
RUN apk add --no-cache tzdata
RUN npm install && npm run build
EXPOSE 3000
ENV TZ=Asia/Bangkok
ENV NODE_ENV=production
CMD ["node", "./.output/server/index.mjs"]
