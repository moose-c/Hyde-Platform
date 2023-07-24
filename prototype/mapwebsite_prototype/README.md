# Standalone Website application
## Relation of part to the whole
Website hosting a map, and with functionality to show timeseries

## Setup 
First setup timeseries-backend, locally or on a server, as described within that repository.
### Execute Dockercompose.yml
run `docker compose up`
go to url displayed after **Network**
### Test

## Tear down
`docker compose down`
If no permission: `sudo aa-remove-unknown`

## Experiment locally
- Install node and npm
- Install dependencies using `npm install`
- launch using `npm run dev`

## Understanding
There are 4 components that need to be learned in order to understand what is being done here:
1) A basic understanding of Docker, images and containers
2) Node applications
3) Basic web development
4) Openlayers map website
Here, a quick overview of these components follows and an explanation how this was learned, in order for the reader to be able to understand and replicate this if desirable.

### Docker
The timeseries-backend application also utilizes docker, and in a more complex way then here. See that repository for an explanation, within these dockerfiles only new elements, not explained there, are highlighted. A '.dockerignore' file works similarly as a '.gitignore' in that it contains files/folders that are invisible to docker.

### Node applications
A basic understanding of node applications can be gathered through [here]()
Basically, a package.json is created which contains all things necessary for the application. In *scripts* tag, scripts are defined which can be run in a terminal from application folder through `npm run [scripts_name]`. The *dependencies* tag contain all dependencies necessary within the node application, when runninng `npm install`, these are the dependencies which are installed. 

#### Vite
Vite is used to serve a webserver. This uses the index.html in our base repository to build the website. 

### Basic webdevelopment 
Webdeveloping a to broad a subject to explain in any matter of detail. It can be learned well through various online resources, a good resource is [MDN]()

### Production
Flask is not suitable for production, therefore use Gunicorn WSGI server. 

### Change to static IP:
https://www.freecodecamp.org/news/setting-a-static-ip-in-ubuntu-linux-ip-address-tutorial/


Openlayers selected:
https://www.educba.com/openlayers-vs-leaflet/

Use Alt+Shift+Drag to rotate the map.

Potential expand button:
Trigram for Heaven

Digram for Greater Yang