# syntax=docker/dockerfile:1.4
FROM node:22-alpine AS builder
WORKDIR /work
COPY . .
RUN yarn install
RUN yarn lint-nofix

# Sentry auth token is optional: when provided (as a build secret), build and
# upload sourcemaps; otherwise just build the app and skip the Sentry upload.
RUN --mount=type=secret,id=sentry_auth_token,required=false \
    if [ -s /run/secrets/sentry_auth_token ]; then \
        export SENTRY_AUTH_TOKEN="$(cat /run/secrets/sentry_auth_token)" && \
        yarn build; \
    else \
        echo "No sentry_auth_token secret provided — building without Sentry sourcemap upload" && \
        node scripts/build.js; \
    fi

FROM nginx:alpine

COPY --from=builder /work/build /build
