# syntax=docker/dockerfile:1.4

# base image with node and pnpm
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# build stage
FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
# to speed up installs, we use a cache mount for pnpm store
# and we set CI=true to fix `tty` issues in some environments
ENV CI=true
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=@knowledgescout/api  --legacy --prod /prod/api

# production stage
FROM base AS api
# copy only the production files
COPY --from=build /prod/api /prod/api
# set working directory
WORKDIR /prod/api
# tart application
CMD [ "node", "dist/index.mjs" ]
