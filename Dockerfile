ARG NODE_VERSION=18.17.0

FROM node:${NODE_VERSION} as build

WORKDIR /app

COPY package*.json /app/

COPY tsconfig.json /app/tsconfig.json

COPY src/ /app/src/

RUN npm i

RUN npm run build-prod

FROM node:${NODE_VERSION}-alpine as production

WORKDIR /app

COPY --from=build /app/package*.json /app/

RUN npm ci --unsafe-perm --omit=dev --no-optional && npm prune --production

COPY --from=build /app/dist/ /app/dist/

CMD ["npm", "run", "prod"]