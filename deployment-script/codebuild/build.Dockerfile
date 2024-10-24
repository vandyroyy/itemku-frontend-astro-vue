FROM node:18-alpine

WORKDIR /app

COPY public /app/public
COPY .astro /app/.astro
COPY package.json /app
COPY astro.config.mjs /app
COPY src /app/src

ARG port
ENV envPort $port
# ARG S3_UPLOAD_FOLDER
# ENV S3_UPLOAD_FOLDER $S3_UPLOAD_FOLDER
# ARG DD_AGENT_HOST
# ENV DD_AGENT_HOST $DD_AGENT_HOST
# ARG DD_AGENT_PORT
# ENV DD_AGENT_PORT $DD_AGENT_PORT
# ARG DD_SAMPLE_RATE
# ENV DD_SAMPLE_RATE $DD_SAMPLE_RATE
# ARG DD_ENV
# ENV DD_ENV $DD_ENV
# ARG DD_SERVICE
# ENV DD_SERVICE $DD_SERVICE
# ARG IS_LOGGING_ENABLED
# ENV IS_LOGGING_ENABLED $IS_LOGGING_ENABLED
# ARG LOG_INFO_MIN_DURATION_THRESHOLD
# ENV LOG_INFO_MIN_DURATION_THRESHOLD $LOG_INFO_MIN_DURATION_THRESHOLD
# ARG LOGGING_LEVELS
# ENV LOGGING_LEVELS $LOGGING_LEVELS

# RUN yarn global add node-gyp
# RUN --mount=type=cache,target=/root/.yarn-cache YARN_CACHE_FOLDER=/root/.yarn-cache yarn install --frozen-lockfile --production
# RUN find . -name "*.map" -type f -delete

RUN npm install -g astro
RUN npm install
RUN npm run build

# Run application
EXPOSE $port
ENTRYPOINT PORT=${envPort} npm run preview