# Front-end
## Description
The Front-end or the website. Displaying a map, and allowing selection of countries, request of timeseries and overlay of rasters.   

## Setup 
To test, run `npm start` from main directory (where package.json lives).
The website can be accessed at `http://localhost:3000` in a webbrowser.
The Request Figures and Overlay depend on the backend, so these need to be running for everything to function, but the look and feel of the website is accessible as is.

## Stack
1) Docker
2) React
3) Openlayers
4) Chart.js 

Before learning to code in React however, an understanding of vanilla html, css and js will be usefull. Everything used here will be explained throughout the code as in previous examples so this should also be understandable without revering to the other websites.
A React application is created with `npx create-react-app website`, this creates all the necessary infrastructure to begin developing.

The structure of this website is as follows: 
\public contains the icon and an index.html to which the react application is attached. 
\src contain all interesting code. index.js is made by `create-react-app` and contain an atachments of the application which starts in `App.js` to index.html in \public.
`App.js` is where the application starts. Here the two main components, Map and Page are created. 
\styles contain relevent styles, there is 1 file for the Map component and one for the Page component.
\components then contain all other created components:
- Map contains the underlying Map, allowing for selection
- Page the elements which are on top of the webpage. Page consists of 4 further components, defined in \page-components:
    - Selection.js contains a list of the selected countries
    - TimeseriesForm allows the user to enter the necessary parameters and request the Graphs
    - OverlayForm.js allows the user to enter the necessary parameters and request the Overlays
    - Charts.js which contains all necessities to create the charts, and therefore which communicates to the timeseries-backend API

Here, a quick overview of the elements of this application follows and an explanation on how this was learned, in order for the reader to be able to understand and replicate this if desirable. Also, the code contains in depth annotations to provide technical understanding.

### React
React is a popular JavaScript library used for building user interfaces, particularly for web applications. Two key features of react are the following: 
- Component-Based Architecture:
React is centered around the concept of components, which are reusable and independent building blocks of a user interface. Components can be as simple as a button or as complex as an entire page. This modular approach makes the codebase easier to manage and maintain.

- Declarative:
React allows developers to describe how the UI should look for a given state, and it automatically manages and updates the UI as the application's state changes. Developers specify what the UI should be based on the current state rather than imperatively changing the DOM.

To learn react I would rever the reader to [Learn environment of the React webpage](https://react.dev/learn), where excellent tutorials are located which allows a reader to quickly pick up react. I really found React a usefull addition to my developers toolbelt.

### Docker
The timeseries-backend application also utilizes docker, and in a more complex way then here. See that repository for an explanation, within these dockerfiles only new elements, not explained in the timeseries-backend application, are highlighted. A '.dockerignore' file works similarly as a '.gitignore' in that it contains files/folders that are ignored to docker.

### Package.json
A package.json contains information about a project, utilized by package managers such as **npm** or yarn.
Under `dependencies`, the names of the packages that are required by the application are saved. These can be download all in one go by running `npm run dev` from the project directory. Under `scripts`, scripts are defined which can be run in a terminal from application folder through `npm run [scripts_name]`. `npm run dev` for example allows for easily running the application in a development environment

### Basic web development 
Webdeveloping to broad a subject to explain in any matter of detail. It can be learned well through various online resources, a good resource is [MDN](https://developer.mozilla.org/en-US/). For this application, index.html is the main file, through here all scripts and styles are called. All other files are within the 'src' folder. Styles are within the 'styles' folder and scripts are within the 'modules' folder. As an entry, index.html calls the index.js file. From within the index.js file, multiple scripts are first called to aid in the creation of the base website. Namely write_html.js fills the indicators and years within the form, create_map.js and allow_selection.js create the map and allow for selection of different countries, respectively. After this, other scripts are called to allow the plotting functionality: first display_ts.js is called, then fetchTimeseries which fetches the data from the database using the API, and finally plotTimeseries handles the display of the timeseries, which uses createChart to create actual chart.js.

### Openlayers
Openlayers is a javascript library which can be used to display maps on a webserver. How this is done in this project can be seen in the 'create_map.js' module. Openlayers provides very useful Tutorials and examples on their [website](https://openlayers.org), and their [API](https://openlayers.org/en/latest/examples/) can be used to gain information on a particular component of an openlayer application. There are also alternative libraries for displaying maps, for example leaflet is popular, the reasons why openlayers was selected can be read through [here](https://www.educba.com/openlayers-vs-leaflet/)

### Chart.js
Chart.js is a plotting library, used to display plots on websites. Their [getting started page](https://www.chartjs.org/docs/latest/getting-started/) provides usefull information on how to actually include their charts on a webpage, and the rest of their [website](https://www.chartjs.org/docs/latest/) also contain useful samples and specifics.

### To Build:
!!!Set URL TO UU!!!
npm run build

To load to server:
`scp -r .\build caste001@hydeprod.geo.uu.nl:/data/caste001/Hyde-Portal/frontend`
docker-compose down
docker system prune -f
docker rmi hyde-platform-frontend-map-website

How to run a build:
`npm install -g serve`
`serve -s build -l 9000`

### WSL Issues:
(apps & feaures:)
delete distros
delete wsl
(turn features on and off)
WSL
virtual machines
(then reverse)

Changing endYear:

# Server config
Want to move