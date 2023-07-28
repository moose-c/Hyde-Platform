# alpine contains smaller version of the specified images, done locally to save space and setup time
FROM node:alpine

WORKDIR /app/website

# copy files from current directory to working directory
COPY . .

# install dependencies
RUN npm install

# launch development server
# expose host such that accesible from outside docker environment
CMD [ "npm", "run", "dev", "--", "--host" ]