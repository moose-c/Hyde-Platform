In this document a structured explanation will be given of how the Backend components of the HYDE-Platform were created. 
There are two types of data that need to be stored efficiently and where retrieval is doable, the timeseries for each country and gritted data. 
# Understanding Databases
[learn postgresql here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04)& [here](https://docs.qgis.org/3.28/en/docs/training_manual/). How to do [queries](https://www.digitalocean.com/community/tutorials/introduction-to-queries-postgresql)
For learning process see raw file. 
map database using *Entity-relationship Diagram* (ER-diagram)
Constraints: 
- Primary key: that which makes a record unique (usually id and a sequence)
- Foreign key: used to refer to unique record on another table (using that table's prim key) ER linkage usually between Foreign keys linking to primary keys

## Indicator data per country
As mentioned above, the database will be constructued from (at least) two seperate components: .txt files and the .netcdf files. Since the .txt files are certainly not spatial, we now have the tools to at least understand how this would fit into a database. 
The .txt file is structured as follows:
One for each indicator (conv_rangeland, crop_land, population, etc.), per country (isocode) a timeseries
This leads to the following database:
- countries (id=isocode serial primary key not null, country varchar not null)
- indicator, (id (*linked to counries?*), all years)
I will use a python script, since it does not really matter which language you [use](https://stackoverflow.com/questions/2168045/which-language-to-use-for-scripting-postgresql)
### Python script
[this](https://www.postgresqltutorial.com/postgresql-python/) was adapted for our purposes. See the raw file for the process and the annoted code for explanations.
**In all txt the final line is "Total", I gave this isocode 1000**

## Rasters
netcdf -> tijdreeksen en ruimtelijk
inkijken met [panoply](https://www.giss.nasa.gov/tools/panoply/)
and played with like this:https://opensourceoptions.com/blog/intro-to-netcdf-with-python-netcdf4/
`import netCDF4 as nc
fn = "path/to/file.nc"
ds = nc.Dataset(fn)
print(ds), see variables
then time = ds['time']`
can be played with as np array, time[:], time[0] etc.
netcdf basically just zipped multidimensional arrays
**Todo, how does this fit in a database**
https://newtraell.cs.uchicago.edu/files/ms_paper/sthaler.pdf
Postgresql, use this and optionally postGIS, not fundamentally different just allowed for 'raster' type.
