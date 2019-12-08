FROM node:alpine AS builder

COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=builder /build /build
