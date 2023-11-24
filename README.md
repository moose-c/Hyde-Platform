# Hyde Platform
This repository contains the code that was used to create the Hyde Platform, a platform which displays the data from the HYDE model (History Database of the Global Environment).  
This markdown explains the structure of the final product and how to run this application. For documentation on the development process, read [Development-process.md](Development-Process.md). For a more extensive explanation of each component, read the documenation within that component.

## Structure
This project is split into two components:
1) In the **frontend** folder, everything relating to the website can be found
2) In the **backend** folder, APIs can be found that are used to serve data to the website, more specifically we have
    - **raster-backend**: Creates an API to serve the netcdf files and download png's and ascii Grid files (rasters) from the HYDE project.
    - **timeseries-backend**: Creates an API to serve and download the txt files (timeseries per country) from the HYDE project.
    
## Stack
For each of the components, different languages are used. 

### Overarching
- **Visual Studio Code** was used as a code editor
- **Docker** was used to compartmentalize different parts of the application, and to allow for easy setup on different locations. 

### Backend
-  **ncWMS** is an existing java application that was used for serving netCDF files
- **postgres** is a database system where the information for the timeseries is stored
- **python** was used to fill postgres and ncWMS
- **Flask** is a python library and was used to serve the data from postgres and additional rasker data
- **Gunicorn** by the API, as WSGI HTTP server for managing requests

### Frontend
- **HTML, CSS & JS**, basic web development skils are required 
- **React**, a javascript library aiding in web development
- **Openlayers**, a javascript library utilized for interactive maps on a webpage
- **Chart.js**, javascript library for displaying figures