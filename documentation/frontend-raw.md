# Frontend development
having finished our postgresql database, at least for the timeseries, we start to think you this can you accesses from the webpage. How I will do this is as follows:
Use open layers to investigate what information can be gained, how can countries be made clickable such that the user is provided with options and an isocode is provided such that one can search within the database.

Graph timeseries:
https://www.chartjs.org/docs/latest/getting-started/usage.html
Module bundlers, parcel for this (build tool).
Maar ook dit faalt haha.

## Openlayers

## Timeseries prototype
This is a small project, showing a page with the numbers 0 until 100, when you click a number a form pops up, asking to specify which indicator and timeperiod, then returs a graph of that isocode, indicator and timeperiod.
Has to interact with the database, this can be achieved through php easily.

## Calling PHP on server from js
### Fetch API
https://www.javascripttutorial.net/javascript-fetch-api/
HTTP requests to servers from web browsers
fetch() requires only url of resource that you want to fetch
returns a Promise, use .then(response =>) methods to handle

### JS modules
`export function name() {

}
export cost variable = ""`
or at the end of module:
`export { name, variable }`
To import:
`import { name, variable } from "./modules/module.js"`

## Understanding the Event Loop, Callbacks, Promises, and Asynch/Await in js
https://www.digitalocean.com/community/tutorials/understanding-the-event-loop-callbacks-promises-and-async-await-in-javascript
Exteral netwrok request to retrieve API data -> using asynchroous programming techniques. Javascript synchronous language, one opperation after another. If not asynch, not able to do anything until operation (API retrieval) is complete (*blocking*). Asynch operate in parallel with other operations.
asynchronous after synchronous top-lvl functions. Uses *Event loop* to handle concurrent/parallel events. Stack and Queue. Add to stack, execute and remove, add asynch within execute to queue. Whenever call stack empty, check queue for any waiting  messages, from oldest. Finding -> add to stack and execute.

REST API, simply an API build with REST priciples.
Build one at endpoint: https://www.google.com/search?channel=fs&client=ubuntu-sn&q=rest+api
