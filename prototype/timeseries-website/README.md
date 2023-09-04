# Standalone Website application
## Description
Website hosting a map with functionality to show the timeseries. 

## Setup 
First setup timeseries-backend, locally or externally, as described within that repository.
Then run `docker compose up`
go to url displayed after **Local**

### Tear down
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
Here, a quick overview of these components follow and an explanation how this was learned, in order for the reader to be able to understand and replicate this if desirable.

### Docker
The timeseries-backend application also utilizes docker, and in a more complex way then here. See that repository for an explanation, within these dockerfiles only new elements, not explained there, are highlighted. A '.dockerignore' file works similarly as a '.gitignore' in that it contains files/folders that are invisible to docker.

### Node applications
A basic understanding of node applications can be gathered through [here]()
Basically, a package.json is created which contains all things necessary for the application. In *scripts* tag, scripts are defined which can be run in a terminal from application folder through `npm run [scripts_name]`. The *dependencies* tag contain all dependencies necessary within the node application, when runninng `npm install`, these are the dependencies which are installed. 

#### Vite
Vite is used to serve a webserver. This uses the index.html in our base repository to build the website. 

### Basic webdevelopment 
Webdeveloping a to broad a subject to explain in any matter of detail. It can be learned well through various online resources, a good resource is [MDN](https://developer.mozilla.org/en-US/). For this application, index.html is the main file, through here all scripts and styles are called. All other files are within the 'src' folder. Styles are within the 'styles' folder and scripts are within the 'modules' folder. As an entry, index.html calls the index.js file. From within this file, multiple scripts are first called to aid in the creation of the base website namely write_html.js fils the indicators and years within the form, create_map.js and allow_selection.js. After this, other scripts are called to allow the plotting functionality, first display_ts.js is called, then fetch_th.js which fetches the data from the database using the API, and finally plot_ts.js handles the display of the timeseries.

### Openlayers
Openlayers is a javascript library which can be used to display maps on a webserver. How this is done in this project can be seen in the 'create_map.js' module. 

Openlayers selected:
https://www.educba.com/openlayers-vs-leaflet/

Use Alt+Shift+Drag to rotate the map.

Potential expand button:
<button class="nav-toggle" aria-expanded="false">
  <span aria-hidden="true">☰</span> Menu
</button>


For Esri basemap: https://developers.arcgis.com/openlayers/maps/display-a-map/