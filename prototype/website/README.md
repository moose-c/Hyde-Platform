# Front-end
## Description
The Front-end or the website. Displaying a map, and allowing selection of countries, request of timeseries and overlay of rasters (currently only for the whole world, potential addition to add per country).   

## Setup 
To test, run `npm start` from main directory (where package.json lives).
Navigate to `http://localhost:3000` in a webbrowser, and play to your hearts content. 
The Request Figures and Overlay depend on timeseries-backend en netCDF-backend, so these need to be running for everything to function, but the look and feel of the website is accessible as is.

## Understanding
This is a complete website containing all the required functionallity for the HYDE portal. Since I learned that react applications are easier to implement and understand when one has learned react, for the final website I decided to learn this. A understanding of vanile html, css and js website might be usefull though, if the reader has no experience with this both the netcdf-Backend and timeseries-website contain examples of similar websites developed in plain js. Everything used here will be explained throughout the code as in previous examples so this should also be understandable without revering to the other websites.
A React application is created with `npx create-react-app website`, this creates all the necessary infrastructure to begin developing

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

Here, a quick overview of the elements of this application follows and an explanation on how this was learned, in order for the reader to be able to understand and replicate this if desirable. Also, the code contains in depth annotations to provide technical understanding
### React
React is a popular JavaScript library used for building user interfaces, particularly for web applications. Two key features of react are the following: 
- Component-Based Architecture:
React is centered around the concept of components, which are reusable and independent building blocks of a user interface. Components can be as simple as a button or as complex as an entire page. This modular approach makes the codebase easier to manage and maintain.

- Declarative:
React allows developers to describe how the UI should look for a given state, and it automatically manages and updates the UI as the application's state changes. Developers specify what the UI should be based on the current state rather than imperatively changing the DOM.

To learn react I would rever the reader to [Learn environment of the React webpage](https://react.dev/learn), where excellent tutorials are located which allows a reader to quickly pick up react. I really found React a usefull addition to my developers toolbelt.

TODO: 
- Make exportable

Test backend:
- curl http://127.0.0.1:8000/uopp/4/bce_1000/ce_700

To Build:
npm run build

Idea: Do we want to design a course (Or somethg along these lines) to teach webdevlopment for mapsites

Pitch: 
science communication!
Sell also yourself a bit!

within web.xml:
<context-param>
  <param-name>GEOSERVER_FILEBROWSER_HIDEFS</param-name>
  <param-value>true</param-value>
</context-param>

If you want to set a net data location, folder should be empty!

How to run a build:
`npm install -g serve`
`serve -s build -l 9000`

scp -r .\build\ caste001@hydeprod.geo.uu.nl:/data/caste001/Hyde-Platform-Frontend