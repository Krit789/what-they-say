FROM node:lts-alpine
WORKDIR /what-they-said
COPY . .
RUN apk add --no-cache tzdata
RUN npm install -g pnpm && pnpm install && pnpm run build && cd ./node_modules/geoip-lite && pnpm run-script updatedb
EXPOSE 3000
ENV TZ=Asia/Bangkok
ENV NODE_ENV=production
CMD ["node", "./.output/server/index.mjs"]
