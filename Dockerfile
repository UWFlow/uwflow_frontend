FROM node:alpine AS builder

COPY . .
RUN yarn install
RUN yarn lint-nofix
RUN yarn build

FROM nginx:alpine

COPY --from=builder /build /build
