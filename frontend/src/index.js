/* This code is using React and ReactDOMClient to render a React component called `App` to the DOM. 
This is created with the setup of the react app by `npx create-react-app website`*/
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';

// Needed for google analytics
import ReactGA from 'react-ga';
ReactGA.initialize('G-6GRT1DF10Q');

const container = document.getElementById('root');

// Create a root - https://github.com/reactwg/react-18/discussions/5
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root
root.render(
  <App />
);