# Backend of the HYDE portal. 
## Components
This backend is split in two components, since the frontend requires two very different kinds of data.
1) **timeseries-backend** gives timeseries for specific countries, which are then used to display maps relating to countries. Specifically, this returns an array of numbers corresponding related to different years
2) **raster-backend** gives rasters, which is spatial data. This difference asks for different workflows so a logical disjunction was made.
## HYDE Data
Specification about the data that is produced by the HYDE model can be viewed in [HYDE Readme](./README-HYDE-MODEL-v3.3.txt) 
