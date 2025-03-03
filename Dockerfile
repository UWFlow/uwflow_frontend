# syntax=docker/dockerfile:1.4
FROM node:16-alpine AS builder
WORKDIR /work
COPY . .
RUN yarn install
RUN yarn lint-nofix

# Use secrets during build time only
RUN --mount=type=secret,id=sentry_auth_token \
    export SENTRY_AUTH_TOKEN="$(cat /run/secrets/sentry_auth_token)" && \
    yarn build

FROM nginx:alpine

COPY --from=builder /work/build /build
