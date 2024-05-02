FROM node:lts-alpine
ARG LICENSE_KEY
WORKDIR /what-they-said
COPY . .
RUN apk add --no-cache tzdata
RUN npm install -g pnpm && pnpm install && cd ./node_modules/geoip-lite && pnpm run-script updatedb license_key=$LICENSE_KEY && pnpm run build
EXPOSE 3000
ENV TZ=Asia/Bangkok
ENV NODE_ENV=production
CMD ["node", "./.output/server/index.mjs"]
