# NetCDF Website application
## Relation of part to the whole
Website hosting a map, and with functionality to show NetCDF layers.
Makes heavy use of ncWMS, a java application capable of serving NetCDF layers.
For instruction on ncWMS, [this documentation](https://reading-escience-centre.gitbooks.io/ncwms-user-guide/content/02-installation.html) should be read.

## Setup Globally
execute from command line: `docker compose up -d`

### Test

**From machine:**
curl -H "Accept: text/plain" -u ncwms:{password} -X GET http://localhost:8080/ncWMS/admin/datasetStatus?dataset=hmgrid

**Enter tomcat container:** docker compose exec tomcat-ncwms bash
 
**Enter other python container:** docker run -it --network=ncwms_default python bash

Following python container, the following works:
curl -H "Accept: text/plain" -u ncwms:{password} -X GET http://tomcat-ncwms:8080/ncWMS/admin/datasetStatus?dataset=hmgrid

**From browser:** 
Test getmap: 
http://localhost:8080/ncWMS/wms?REQUEST=GetMap&VERSION=1.3.0&STYLES=&CRS=CRS:84&WIDTH=1000&HEIGHT=900&FORMAT=image/png&TRANSPARENT=true&TIME=-10000-05-01&LAYERS=2/irrigated_rice&BBOX=-179.99999489666106,-90.00000252664061,179.99985756755953,89.9999262326953

Test GetMetadata:
http://localhost:8080/ncWMS/wms?REQUEST=GetMetadata&ITEM=minmax&VERSION=1.3.0&STYLES=&CRS=CRS:84&WIDTH=1000&HEIGHT=900&FORMAT=image/png&TRANSPARENT=true&TIME=2021-05-01&LAYERS=2/irrigated_rice&BBOX=-179.99999489666106,-90.00000252664061,179.99985756755953,89.9999262326953

Test display legend:
http://localhost:8080/ncWMS/wms?REQUEST=GetLegendGraphic&VERSION=1.3.0&LAYERS=2/irrigated_rice&COLORBARONLY=FALSE&STYLES=default-scalar/seq-YlOrRd

Testing Feature info (CURRENTLY):
http://localhost:8080/ncWMS/wms?REQUEST=GetFeatureInfo&VERSION=1.3.0&CRS=CRS:84&TIME=0-05-01&QUERY_LAYERS=1/irrigated_not_rice&INFO_FORMAT=text/plain&I=1&J=1&BBOX=-180,-90,179.9,89.9&WIDTH=400&HEIGHT=600&LAYERS=1/irrigated_not_rice

http://localhost:8080/ncWMS2/wms?REQUEST=GetFeatureInfo&VERSION=1.3.0&CRS=CRS:84&TIME=0-05-01&QUERY_LAYERS=1/irrigated_not_rice&INFO_FORMAT=text/plain&I=1&J=1&BBOX=-180,-90,179.9,89.9&WIDTH=400&HEIGHT=600&LAYERS=1/irrigated_not_rice&FEATURE=irrigated_not_rice

http://localhost:8080/ncWMS2/wms?REQUEST=GetFeatureInfo&VERSION=1.3.0&CRS=CRS:84&QUERY_LAYERS=2/irrigated_rice&TIME=0-05-01&LAYERS=2/irrigated_rice&INFO_FORMAT=text/plain&I=1&J=1&BBOX=908.999,141.999,909.001,142.001&WIDTH=400&HEIGHT=600

Above works! Great.

## Tear down
execute from command line: `docker compose down`

## Understanding
There are 4 components that need to be learned in order to understand what is being done here:
1) A basic understanding of Docker, images and containers
2) Tomcat apache webserver
3) ncWMS netCDF server
4) Python requests
Here, a quick overview of these components follows and an explanation how this was learned, in order for the reader to be able to understand and replicate this if desirable.

### Docker
Here two containers are created: 
1) A tomcat apache server which hosts the ncWMS java servlet. 
2) A python script filling the ncWMS with the neccessary ncWMS files.

**Important side note for container one:** Password are encrypted with SHA-1 NOT SHA-512 as it says in ncWMS's documentation.

### Tomcat Apache 
Apache Tomcat is a popular, open-source web server and servlet container.
A webserver is like a traffic officer for the internet. It receives requests from web browsers (like Chrome, Firefox) and directs them to the appropriate resources (like web pages, images, etc.).
Servlets are Java programs that run on the web server. They handle requests and generate responses dynamically. Tomcat provides an environment to run these servlets.
In essence, Apache Tomcat is like a specialized server that excels at running Java-based web applications, and since ncWMS is a java servlet, tomcat is a logical choice for serving ncWMS.

**The tomcat users are specified within tomcat-users.xml. Note that the passwords are encrypted using SHA-1 encryption.**

### ncWMS
ncWMS is a Web Map Service (WMS) for geospatial data that are stored in CF-compliant NetCDF files. It allows for local netCDF files to become accesible through the web in a WMS method. There is an extensive [User guide](https://reading-escience-centre.gitbooks.io/ncwms-user-guide/content/) available, which was heavily user for all development related to netCDF files.

**Configuration for ncWMS is specified within config.xml**

### Python
utils_ncwms.py is used to connect to the ncWMS servlet, and fill this servlet with desired netCDF files. 
2 important notes: 
- Instead of what is mentioned within the ncWMS docs, authenticion is Basic, not Digest
- connect to the following url: `http://tomcat-ncwms:8080/ncWMS`. tomcat-ncwms since these containers are within the same network and then a container can be accessed by simply using its name. And ncWMS instead of ncWMS2 (as is the case when setting up in a different way)

## Defining specific style
styles can be manualy defined within $HOME/.ncWMS/.styles
Examples are here: https://github.com/Reading-eScience-Centre/edal-java/blob/master/graphics/src/main/resources/styles/default-scalar.xml
