# Backend of the HYDE portal. 
## Components
The backend is split into three components:
1) **timeseries-api** gives timeseries for specific countries, which are then used to display maps relating to countries. Specifically, this returns an array of numbers corresponding related to different years. Data can be extracted like this: `curl http://localhost:8000/uopp/4/bce_1000/ce_700`
2) **raster-api** allows users to download spatial data. Specifically, through this api png and ASCII GRID files can be requested. The URL's for requesting this locally are http://localhost:5000/png/pasture/ce_0 or http://localhost:5000/asc/popc/bce_10000
3) **ncWMS** allows users to display rasters in the browser. Relies on the java servlet [ncWMS](https://github.com/Reading-eScience-Centre/ncwms) to transform netCDF files from the HYDE Model into a WMS compliant format which allows them to be displayed in the browser. The servlet can be accessed at `http://localhost:8080/ncWMS`.
## HYDE Data
Specification about the data that is produced by the HYDE model can be viewed in [HYDE README](./README-HYDE-MODEL-v3.3.txt) 

# Testing backend
1) timeseries-api: `curl http://127.0.0.1:8000/uopp/4/bce_1000/ce_700`
2) raster-api: `curl http://localhost:8100/png/pasture/ce_0`
3) ncWMS: `http://localhost:8080/ncWMS`