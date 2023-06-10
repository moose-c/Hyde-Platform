# 23/05/2023: 1st day 

Where to begin… 

## Navigating geospatial open source 

[website](https://mapscaping.com/navigating-geospatial-open-source-a-guide-to-an-ogc-stack/)

**GIS data and Software Standards:**

Open Geospatial Consortium (OGC) standards 

**Relational databases:**

First data stored in nestings of folders, but Shapefiles and other traditional dataformats have their limitations: structurally, spatially and computationally. Alternative: relational databases: PostGreSQL, with spatial extension, PostGIS 

**Web Services**

Geoserver: publish data to web, inputs as PostgreSQL & Oracle, shapefiles, geopackages, databases 


TODO: obtain correct layer for the countries with good borders	 

## Server

Using SSH keys, one can access a server. 
**TODO**: How to transfer files to from server to here and vise versa

## Geoserver

Open-source software server written in Java, allows users to chare and edit geospatial data. Takes POSTgis data and serves to OpenLayers database, as stated here: “Unfortunately you cannot connect a web page directly to a database because of security concerns, normally you need some middleware to join the two together. 

So for your example and if you want to stick with Open Source software you could easily use GeoServer as your geographic server to serve your data from your PostGIS database to your OpenLayers HTML web page.” 

https://gis.stackexchange.com/questions/52818/how-to-connect-openlayers-to-postgis-data 


## Transferring to Linux 

TODO: It was very much suggested to work in a Linux environment, since the eventual server would also run on a Linus operating system for FAIR reasons. To this end, I installed the dual operating system on my laptop. This is done with [these steps](https://itsfoss.com/install-ubuntu-1404-dual-boot-mode-windows-8-81-uefi/)

Datateam.geo@uu.nl (Garrett Speed) (Vincent Brugs) 

TODO next time: 
- Install the Linus operating system according to above link 
- GeoServer seems necessary, to interact with PostGIS database 
- Forgot to look at which of the HYDE outputs is actually useful -> identify and write script to automatically ssh them to the server 
- Create drawings of all interconnecting components and designs for the actual webpage 
- https://www.youtube.com/watch?v=cDsR0wnJ98g This might also be usefull 
- https://www.youtube.com/watch?v=LhKj-_-CCfY&list=PLAxJ4-o7ZoPcvp0ETujkLVCmKIGj-YvlG 


# 25/05/2023

https://www.youtube.com/watch?v=cDsR0wnJ98g: 

Necessary: 
- Nodejs & npm 
- vscode
- git 

Terminal:  
* (Perhaps first initialize git) 
* Npm init 
* Npm install ol (openlayers) 
* For “bundling”: npm install parcel 

Script within package.json allows for direct executable commands within that location?, as npm [command] 

    He wants layerswitcher all the time 

    This guy has a lot more videos and example codes, very nice. 

For database:

https://www.youtube.com/watch?v=LhKj-_-CCfY&list=PLAxJ4-o7ZoPcvp0ETujkLVCmKIGj-YvlG 

Install PostgreSQL, after installation open stackbuilder, install postgis 

Information: username: postgres; password: ... Port: 5432 

Findable in start now: stackbuilder, pgadmin -> Opens, navigate to databases, create database “Tools, query tool” command: CREATE EXTENSION postgis, to preview database: Select * from name of table (under schemas) 

Install Geoserver, now accaccible at: http://localhost:8080/geoserver/  also contains layers for countries, along with clickable elements, investigate 

## PostGIS

Import postGIS database (SQL) into geoserver as follows: 

https://docs.geoserver.org/latest/en/user/gettingstarted/postgis-quickstart/index.html 

TODO: This means that pushing from kees to the server means updating the postGIS database, then also refreshing, updating the database connected to geoserver. (there should be something to do this automatically) 

TODO: investigate above document further 

“PostGIS 3 PDF documentation document”: 

Create postGIS rasters by loading rastwers with raster2pgsql. Loads all “GDAL supported formats” into a postGIS raster table. List of this with:  

## installing Ubuntu along windows

For this I consulted the following tutorials. 

https://itsfoss.com/install-ubuntu-1404-dual-boot-mode-windows-8-81-uefi/ 

https://www.freecodecamp.org/news/how-to-dual-boot-windows-10-and-ubuntu-linux-dual-booting-tutorial/ 

Seting up: 
git (sudo apt install git, git --version) https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-20-04#setting-up-git
node, npm
Java, javacsudo -u postgres psql
vscode
geoserver: https://docs.geoserver.org/latest/en/user/installation/linux.html

## PostGIS leren
https://postgis.net/documentation/getting_started/
https://postgis.net/workshops/postgis-intro/
change user: `set role [user]`
**Spatial databases store and manipulate spatial objects like any other object in the database**


## afronden week1:
- Conceptual framework van de onderdelen maken
- Globale planning maken 
- Ontwerpje maken (something allong the lines of Platform - MapBiomas Brasil)

Backend: 
- database: postGIS, an extension of postpreSQL
- (backendframework: Django or alternatively php)
Server communication:
- GeoServer:
Frontend:
- Openlayers.

# 30 Mei 2023
Learned that structuring such a big project is very important, since otherwise you want to do everything imediatelly which is chaotisch and stressful. 
To realise this I took the following steps:
1) Identify the components that need to be learned and build. For this, [this website](link!) was very usefull. They turned out to be the following:
	1)	postgresql -> postGIS for the database
	2)	Django (python) for backend (still a  mmunication
	3)	geoserver 
	5)	Openlayers for frontend
	6)	(frontend framework)
	7)	Request data from website
2) Make a planning where there is a clear division of tasks (for this see planning.csv (**TODO**)). Discuss with supervisors.
3) Per week make a list of task, if necessary make a priority list or an attack plan, and start working.

## Week 22
[x] **Develop workflow**
[ ] **Investigate existing websites**
[x] **Retrieve (part of) HYDE Data**
[ ] Investigate (part of) HYDE Data
[ ] Learn Postgresql & PostGIS
Where the bold ones should be done this week.

## Develop workflow
The workflow within this project will be the following:
Since the final product will have a huge database and most components still need to be learned, for each component first a small prototype will be developed. For this reason, the repository will have 2 folders: prototype & final. When working locally, I will develop within the 'prototype' folder, when developing on the server, I will develop within the 'final' folder.
We will work with a git repository, and a way needs to be found to link to the data that is used.

**Q**, what github account do you want me to use?

The project is now devided into chapters:s
1) Rest
3) Backend
4) Middle-end
5) Frontend
The notes will be structured accordingly. For each, there will be a raw md file such as this one, more or less a diary, and there will be a summary containing relevent, stepwise information.

Just have the repository on your own account on github, invate Kees & Britta as collaborators. 

## Investigate Existing Websites
https://plataforma.brasil.mapbiomas.org/cobertura?activeBaseMap=9&layersOpacity=100&activeModule=coverage&activeModuleContent=coverage%3Acoverage_main&activeYear=2021&mapPosition=-15.114553%2C-51.416016%2C4&timelineLimitsRange=1985%2C2021&baseParams[territoryType]=1&baseParams[territories]=1%3BBrasil%3B1%3BPa%C3%ADs%3B0%3B0%3B0%3B0&baseParams[activeClassTreeOptionValue]=default&baseParams[activeClassTreeNodeIds]=1%2C7%2C8%2C9%2C10%2C2%2C11%2C12%2C13%2C14%2C15%2C16%2C3%2C17%2C18%2C27%2C37%2C38%2C39%2C40%2C41%2C28%2C42%2C43%2C44%2C19%2C20%2C4%2C21%2C22%2C23%2C24%2C5%2C25%2C26%2C6&baseParams[activeSubmodule]=coverage_main
https://www.acugis.com/acugis-satellite/docs/openlayers-demo-app.html
https://github.com/SirineArfa/Projet-WebMapping-with-Geoserver-Openlayers-and-Postgres

## Retrieve (part of) HYDE data
Readme_HYDE_3_2.txt investigate:
files are mostly in ESRI ASCII grid format: 
contain header, which gives file structure.
These can be opened in QGIS. 
Download can be easily done from YODA

For this QGIS needed:
### Install & setup QGIS:
https://www.qgis.org/en/site/forusers/alldownloads.html
skip the step where you need to add to /etc/apt/sources.list.d/qgis.sources, and stop at 'repositories', this is sufficient for our needs.

for learning:
https://docs.qgis.org/3.28/en/docs/training_manual/
ESRI (some GIS company) 
shapefile (.shp, but requires .shx, .dbf)
- GeoPackage (.gpkg) stores multiple layers, even both vector & raster data
vector (point line or polygon) vs raster data (matrix of cells with each an attribute value, resolution):
- SQLite from Browser: new connection..
module 6: Make GIS answer questions.
module 7: Loading Raster data:
(.tif used here), can be combined temporary or permanently into 1 layer
module 11: QGIS server: Web Map Service (WMS) based on libraries from QGIS desktop

**Good for future:**
Module 15: Database Concepts with PostgreSQL:
Module 16: Spatial database Concepts with PostGIS
etc.

## Investigate HYDE data
general files, mooie kaarten voor de aarde, afstand per grid cell (??)
timesteps:
starts 10000 BC (start rise humanity).
- until 0 BC 1000yr: 11
- until 1700 100yr: 17
- until 2000 10yr: 30
- until 2017 1yr: 17 **in Hyde_readme.txt zegt tot 15**
anthrome classes: 11-70
Dan 3 scenarios: Baseline Estimate, Lower estimate & Upper estimate,
elk scenario bevat: /png (deze niet te groot?), /zip, /txt & /anthromes
- png: figures for each category for all years in .png format
- TXT: for an indicator, for each country at all timesteps. Organized by Isocode: every 4 is more or less an existing country, redundancy for spliting countries.
This should be enough information already. Click op a country, retrieve isocode, select indicators, search in database based on isocode and indicator. No PostGIS? Not even Geoserver probably. 
**jawel want 2e doel ook om ruimtelijk van een bepaalde periode of over een bepaalde periode weer te geven, dit wel spatieel**
so:
- 1 database just from .txt files, need an iso code, indicator, timeperiod and a region to request information, generate graphs etc.
- 1 database based on spatial information where can be queried based on spatial information, need indicator, timeperiod and a region. This will return maps for particular period, for that country over time
- Select indicator and year and show layer over the whole globe

projectie aan koppelen wg84, ooit koppelen aan bestanden
**spatie header weg bij niet werkende bestanden!!**

output generatie?
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


## Github & Server setup
Meeting with Vincent (datateam) thursday 9-10.
Questions:
- Linux server setup & access (SHH keys?)
- Which Github, how to point to the database.



