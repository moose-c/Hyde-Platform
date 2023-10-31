# alpine contains smaller version of the specified images, done locally to save space and setup time
FROM node:alpine

WORKDIR /app/website

# copy files from current directory to working directory
COPY . .

# install serve
RUN npm install -g serve

# launch production server
CMD [ "serve", "-s", "build" ]