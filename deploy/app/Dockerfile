ARG NODE_VERSION

# Base system image with specific version of node and npm
FROM node:${NODE_VERSION} AS node-npm
ARG NPM_VERSION
RUN npm config set audit=false fund=false loglevel=error omit=dev update-notifier=false
RUN npm i -g npm@${NPM_VERSION}

# Built application image
FROM node-npm AS app-build
ARG DATABASE_URL
WORKDIR /usr/src/app
COPY package.json package-lock.json .npmrc ./
RUN npm ci --prefer-offline --include=dev --ignore-scripts --loglevel verbose
COPY .swcrc postcss.config.mjs tailwind.config.js vite.config.mjs tsconfig.json ./
COPY src/ ./src
COPY swagger/ ./swagger
COPY assets/ ./assets
COPY prisma/ ./prisma
RUN npm run build
RUN mkdir .sqlite && npm run prisma:migrate:deploy
RUN npm prune --omit=dev --ignore-scripts

# Application image with dist
FROM node:${NODE_VERSION}-slim AS app
RUN apt-get update -qq && apt-get install -y --no-install-recommends libssl-dev dumb-init
WORKDIR /usr/src/app
COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node --from=app-build /usr/src/app/node_modules/ ./node_modules
COPY --chown=node:node --from=app-build /usr/src/app/lib/ ./lib
COPY --chown=node:node --from=app-build /usr/src/app/dist/client/ ./dist/client
COPY --chown=node:node --from=app-build /usr/src/app/dist/apidoc/ ./dist/apidoc
COPY --chown=node:node --from=app-build /usr/src/app/.sqlite/ ./.sqlite
COPY --chown=node:node swagger/ ./swagger
COPY --chown=node:node prisma/ ./prisma
ENV NODE_ENV production
EXPOSE 3000
CMD ["dumb-init", "node", "lib/backend/main/index.js"]
