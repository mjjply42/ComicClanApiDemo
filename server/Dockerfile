FROM node:13
WORKDIR /usr/src/app
ENV USERNAME ComicClan
ENV PASSWORD !clan15!
COPY src/package*.json /usr/src/app/
RUN npm install --prefix src
COPY . .