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
There are 5 components that need to be learned in order to understand what is being done here:
1) A basic understanding of Docker, images and containers
2) package.json
3) Basic web development
4) Openlayers map website
5) Chart.js for creating charts

Here, a quick overview of these components follow and an explanation how this was learned, in order for the reader to be able to understand and replicate this if desirable.

### Docker
The timeseries-backend application also utilizes docker, and in a more complex way then here. See that repository for an explanation, within these dockerfiles only new elements, not explained in the timeseries-backend application, are highlighted. A '.dockerignore' file works similarly as a '.gitignore' in that it contains files/folders that are ignored to docker.

### Package.json
A package.json contains information about a project, utilized by package managers such as **npm** or yarn.
Under `dependencies`, the names of the packages that are required by the application are saved. These can be download all in one go by running `npm run dev` from the project directory. Under `scripts`, scripts are defined which can be run in a terminal from application folder through `npm run [scripts_name]`. `npm run dev` for example allows for easily running the application in a development environment

#### Vite
Vite is used to serve a webserver. This uses the index.html in our base repository to build the website. 

### Basic webdevelopment 
Webdeveloping to broad a subject to explain in any matter of detail. It can be learned well through various online resources, a good resource is [MDN](https://developer.mozilla.org/en-US/). For this application, index.html is the main file, through here all scripts and styles are called. All other files are within the 'src' folder. Styles are within the 'styles' folder and scripts are within the 'modules' folder. As an entry, index.html calls the index.js file. From within the index.js file, multiple scripts are first called to aid in the creation of the base website. Namely write_html.js fills the indicators and years within the form, create_map.js and allow_selection.js create the map and allow for selection of different countries, respectively. After this, other scripts are called to allow the plotting functionality: first display_ts.js is called, then fetchTimeseries which fetches the data from the database using the API, and finally plotTimeseries handles the display of the timeseries, which uses createChart to create actual chart.js.

### Openlayers
Openlayers is a javascript library which can be used to display maps on a webserver. How this is done in this project can be seen in the 'create_map.js' module. Openlayers provides very useful Tutorials and examples on their [website](https://openlayers.org), and their [API](https://openlayers.org/en/latest/examples/) can be used to gain information on a particular component of an openlayer application. There are also alternative libraries for displaying maps, for example leaflet is popular, the reasons why openlayers was selected can be read through [here](https://www.educba.com/openlayers-vs-leaflet/)

### Chart.js
Chart.js is a plotting library, used to display plots on websites. Their [getting started page](https://www.chartjs.org/docs/latest/getting-started/) provides usefull information on how to actually include their charts on a webpage, and the rest of their [website](https://www.chartjs.org/docs/latest/) also contain useful samples and specifics.