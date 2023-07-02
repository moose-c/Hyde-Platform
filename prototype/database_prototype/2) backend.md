In this document a structured explanation will be given of how the Backend components of the HYDE-Platform were created. 

There are two types of data that need to be stored efficiently and where retrieval is doable, the timeseries for each country and gritted data. 

# Understanding Databases
postgress was [learned](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04)& [here](https://docs.qgis.org/3.28/en/docs/training_manual/). How to do [queries](https://www.digitalocean.com/community/tutorials/introduction-to-queries-postgresql) can be found in the previous link. How the entire learning process went, see the raw file. 
Databased are mapped using *Entity-relationship Diagram* (ER-diagram) showing the relations between different tables.
Constraints: 
- Primary key: that which makes a record unique (usually id and a sequence)
- Foreign key: used to refer to unique record on another table (using that table's prim key) ER linkage usually between Foreign keys linking to primary keys

## Indicator data per country
As mentioned above, the database will be constructued from (at least) two seperate components: .txt files and the .netcdf files. Since the .txt files are certainly not spatial, we now have the tools to at least understand how this would fit into a database. 
The .txt file is structured as follows:
One for each indicator (conv_rangeland, crop_land, population, etc.), per country (isocode) a timeseries
This leads to the following database:
- indicator with columns: (iso_code, all years)
I will use a python script, since it does not really matter which language you [use](https://stackoverflow.com/questions/2168045/which-language-to-use-for-scripting-postgresql)

### Python script
[this](https://www.postgresqltutorial.com/postgresql-python/) was adapted for our purposes, and implemented in txt_psql.py. See the raw file for the process and the annoted code (which can be found in the tools folder) for explanations.
**In all txt the final line is "Total", I gave this isocode 1000**

### Docker environment

## Rasters
The other data that need to be used are stored in the form of large zip files or as netcdf data (containing spatial timeseries).
Viewing these files can be done with [panoply](https://www.giss.nasa.gov/tools/panoply/)
or played with with [python](https://opensourceoptions.com/blog/intro-to-netcdf-with-python-netcdf4/), As can also be seen in the *tools* folder, netcdf_investigation file

### Tiff files
Initially, I thought making individual tiff files would be a good idea, since then for each indicator, one year would be stored as a raster for the entire year.
For this reason, I learned bash scripting (Which I figured would be a usefull skill regardless). I learned most from [this tutorial](https://www.freecodecamp.org/news/bash-scripting-tutorial-linux-shell-script-and-command-line-for-beginners/) and my script for creating the tiff files where adapted from [here](https://medium.com/@royalosyin/export-a-netcdf-data-as-a-time-series-of-geotiff-images-f8effe78d1b3). My efforts can be seen in the tools\netcdf_tiff.sh
However, it turned out that when starting with a netcdf file of 64 mb, the resulting folder of tiff files was about 7gb! Therefor this tactic was abandoned.

### Combining into 1 large netCDF
Being more conscious about size, I thought combining all the different netcdf files into 1 large netcdf files would be smart, since then you would not need duplicates of the time, lat and lon elements. Whilst this might be possible (see tools/netcdf_investigation.py), here the final netcdf was way larger than the sum of the two initial netcdf files. I am unclear as to why this is the case, but during my intelectual travels I found that it is probably also possible to just upload each netcdf file seperatly to the particular server communicator, without tremendous costs in time or speed. If eventually it is discovered that sepperate files yields enormous drawbacks there is already something written to aid in combining the files, but for now this is abandoned.

### How further?

I don't think it is necessary to try to get the NetCDF files within a database or something. Just use them as is.
Now, I will try to see how I can make my data communicate with a website in an effective way. So, this can be seen as (the first iteration of) the end of part 1!
