# Hyde Platform
This repository contains the code that was used to create the Hyde Platform, a platform which displays the data from the HYDE model (History Database of the Global Environment).  
This markdown explains the structure of the final product and how to run this application. For documentation on the development process, read [Development-process.md](Development-Process.md). For a more extensive explanation of each component, read the documenation within that component.

## Structure
In the **prototype** folder, different components of the project can be found. The following are currently implemented:
1) **raster-backend**: Creates an API to serve and download the netcdf files (rasters) from the HYDE project.
2) **timeseries-backend**: Creates an API to serve and download the txt files (timeseries per country) from the HYDE project.
3) **website**: Contains a website displaying a map and capable of displaying rasters and timeseries using the API from raster-backend and timeseries-backend. 

## Setup locally
1) Setup docker and docker compose 
2) Write .env file as indicated in .env-template file
3) Alter data locations within `docker-compose.yml` in raster-backend & timeseries-backend
4) Execute `docker compose up` from any or all of the components: 
    - website is accessible at http://localhost:3000
    - raster-backend:
        - can be viewed in browser at http://localhost:8080/ncWMS
        - API can be used as displayed in the folder
    - timeseries-backend 
        - API can be used: curl http://localhost:8000/test
        - Also as follows: curl http://localhost:8000/uopp/4/bce_1000/ce_700
