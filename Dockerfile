FROM node:lts-alpine
ARG LICENSE_KEY
WORKDIR /what-they-said
COPY . .
RUN apk add --no-cache tzdata
RUN npm install -g pnpm && pnpm install
WORKDIR /what-they-said/node_modules/geoip-lite
RUN pnpm run-script updatedb license_key=$LICENSE_KEY
WORKDIR /what-they-said
RUN pnpm run build
RUN cp -r /what-they-said/node_modules/geoip-lite/data /what-they-said/.output/server/node_modules/geoip-lite/
EXPOSE 3000
ENV TZ=Asia/Bangkok
ENV NODE_ENV=production
CMD ["node", "./.output/server/index.mjs"]
