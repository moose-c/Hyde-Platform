# NetCDF Website application
## Relation of part to the whole
Website hosting a map, and with functionality to show NetCDF layers.
Makes heavy use of ncWMS, a java application capable of serving NetCDF layers.
For instruction on ncWMS, [this documentation](https://reading-escience-centre.gitbooks.io/ncwms-user-guide/content/02-installation.html) should be read.
*n.b.*: Home directory can be accessed to cd $HOME or cd

## Setup Locally
Install dependencies:
    - pip install typer
Obtain netCDF:
    - Download from YODA platform, place in 'data' folder within this location
    - python3 utils_ncwms.py populate
To setup ncWMS: 
    - From terminal, from location of .jar file: `java -jar ncWMS2-standalone.jar`
    - Now accessible at http://localhost:8080
To setup test Test Website:
    - From terminal, from test-website run: `npm run dev`
    - Access url displayed in terminal

## Setup Globally
Setup ncWMS:
docker run -p 80:8080 -p 443:8443 -v /home/moos/.ncWMS2:/usr/local/tomcat/.ncWMS2 guygriffiths/ncwms


### Test

## Tear down

## Understanding
There are 4 components that need to be learned in order to understand what is being done here:
1) A basic understanding of Docker, images and containers
2) Node applications
3) Basic web development
4) Openlayers map website
Here, a quick overview of these components follows and an explanation how this was learned, in order for the reader to be able to understand and replicate this if desirable.


# Serve locally (Testing Frontend)

TIME: For gridded data with a discrete time axis this takes a single value. For in-situ data which is spread over a range, it is more useful to provide a time range in the form starttime/endtime. This should ideally be used in conjunction with the TARGETTIME parameter (see below)

cftime.DatetimeNoLeap(2021, 5, 1, 0, 0, 0, 0, has_year_zero=True),
cftime.DatetimeNoLeap(2022, 5, 1, 0, 0, 0, 0, has_year_zero=True),
cftime.DatetimeNoLeap(2023, 5, 1, 0, 0, 0, 0, has_year_zero=True)

http://localhost:8080/wms?REQUEST=GetMap&VERSION=1.3.0&STYLES=colored_sized_arrows/psu-inferno&CRS=CRS:84&WIDTH=1000&HEIGHT=900&FORMAT=image/png&TRANSPARENT=true&TIME=2021-05-01&LAYERS=1/irrigated_rice&BBOX=-179.99999489666106,-90.00000252664061,179.99985756755953,89.9999262326953

http://localhost:8080/wms?REQUEST=GetMap&VERSION=1.3.0&STYLES=&CRS=CRS:84&WIDTH=1000&HEIGHT=900&FORMAT=image/png&TRANSPARENT=true&TIME=-10000-05-01&LAYERS=1/irrigated_rice&BBOX=-179.99999489666106,-90.00000252664061,179.99985756755953,89.9999262326953

http://localhost:8080/wms?REQUEST=GetMetadata&ITEM=minmax&VERSION=1.3.0&STYLES=&CRS=CRS:84&WIDTH=1000&HEIGHT=900&FORMAT=image/png&TRANSPARENT=true&TIME=2021-05-01&LAYERS=1/irrigated_rice&BBOX=-179.99999489666106,-90.00000252664061,179.99985756755953,89.9999262326953

http://localhost:8080/wms?REQUEST=GetMetadata&VERSION=1.3.0&CRS=CRS:84&LAYERS=1/irrigated_rice&ITEM=minmax&BBOX=-179.99999489666106,-90.00000252664061,179.99985756755953,89.9999262326953

Above works! Great.

# Defining specific style
styles can be manualy defined within $HOME/.ncWMS/.styles
Examples are here: https://github.com/Reading-eScience-Centre/edal-java/blob/master/graphics/src/main/resources/styles/default-scalar.xml
