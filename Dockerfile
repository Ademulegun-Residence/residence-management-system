FROM node:16-alpine as base

WORKDIR /app
COPY package.json /
EXPOSE 8880

FROM base as production
ENV NODE_ENV=production
RUN yarn install --frozen-lockfile
COPY . /
CMD ["yarn", "start"]

FROM base as dev
ENV NODE_ENV=development
RUN yarn install
COPY . /
CMD ["yarn", "dev"]