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

## Openlayers

Openlayers seems promising for front-end: 

How to just get a map of the world, with areas that [one can zoom into](https://openlayers.org/doc/tutorials/concepts.html)
Promising OpenLayers example, allowing to [click on certain areas](https://openlayers.org/en/latest/examples/box-selection.html)

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

##postGIS leren
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

The project is now devided into chapters:
1) orientation & data investigation & server setup
2) Database
3) Backend
4) Geoserver
5) Frontend
6) Addons
The notes will be structured accordingly. For each, there will be a raw md file such as this one, more or less a diary, and there will be a summary containing relevent, stepwise information.

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
- Perhaps also just select indicator and year and show layer over the whole globe

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


## Learn Postgresql & PostGIS
### Initial leaning process: how does a database work, how is it structured and how can one manually insert values.
https://docs.qgis.org/3.28/en/docs/training_manual/
module 15: database concepts)
values organized by model of vertical columns (organized by name) & horizontal rows, nb of column specified, nb of collumns can be everything. 
- table = relation
- Field = particular cell. 
- Record is 1 row. 
- datatypes: (String, Integer, Real, Data, Boolean, null)

Id, country, city, streetname, number, postcode, possible extension.
Avoid data duplication (a lot in HYDE)

id, first_name, last_name, city, streetname, number
indexes allow you to quickly just to relevant information (**for our case country**)
map database usinng *Entity-relationship Diagram* (ER-diagram) 
streets relation: id, name
people relatioin: id, name, house_no, street_id

ER is then: People > streets (one to many)

Cities: id, city
Steets: id, (city_id,) street
Last_names: id, lastname
people: id, firstname, lastname_id, nb, street_id, phone

(City >) streets > people
City > people
last_names > people 
 
Constraints: 
- Primary key: that which makes a record unique (usually id and a sequence)
- Foreign key: used to refer to unique record on another table (using that table's prim key) ER linkage usually between Foreign keys linking to primary keys

transaction, create rollback position on where to return to if something fails

15.2 & [postgresql](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04):

- switch to postgress account: `sudo -i -u postgres`, enter prompt w/ `psql`, quit w/ `\q`, or directly w/ `sudo -u postgres psql`. switch back with `exit` 
- Created superuser with: `sudo -u postgres createuser -d -E -P -r -s moos`. Now i'm a superuser. 
- `psql -l` (lists current databases)
- `createdb [db] -O (owner) moos`.
- `dropdb [db]`
- `psql [db]` connect to psql database `\q` quit, help w `\?` or `\help`

table syntax: 
`CREATE TABLE table_name (
    column_name1 col_type (field_length) column_constraints,
    column_name2 col_type (field_length),
    column_name3 col_type (field_length)
);`
example
`create table streets (id serial not null primary key, name varchar(50));`
serial & varchar data types, serial integer sequence, varchar character field
delete: `drop table [tb]`

\d to display all things
\dt to display just tables
\d [table] to show schema 
SELECT * FROM testdb

connect tables:
- add foreign key after table has been created: `alter table people 
	add constraint people_streets_fk foreign key (street_id) references streets(id)`
- or whenn creating the table: create table people (..., street_id int references streets(id) not null, ...)

Search fast on particular columns (countries!):
`create index people_name_idx on people(name);`

15.3)
`INSERT INTO [tb] (columns) VALUES ('... ', '...'), ('...', '...');`
`DELETE FROM testdb WHERE [column] = '...';`

`ALTER TABLE testdb ADD last_maint date;`
`ALTER TABLE testdb DROP last_maint;`

`UPDATE testdb SET [columnn] = '...' WHERE [column] = '...';`
continued:
https://www.digitalocean.com/community/tutorials/introduction-to-queries-postgresql

### Creating Postgresql Database from our TXT file
As mentioned above, the database will be constructued from (at least) two seperate components: .txt files and the .netcdf files. Since the .txt files are certainly not spatial, we now probably have the tools to at least understand how this would fit into a dataset. 
The .txt file is structured as follows:
One for each indicator (conv_rangeland, )crop_land, population, etc.), per country (isocode) a timeseries
This leads to the following database:
- countries (id=isocode serial primary key not null, country varchar not null)
- pop (id (*linked to counries?*), all years ..)
I will use a python script, since it does not really matter which language you [use](https://stackoverflow.com/questions/2168045/which-language-to-use-for-scripting-postgresql)
### Python scripting for TXT into Postgresql
https://www.postgresqltutorial.com/postgresql-python/
create test psql user:
sudo -u postgres createuser -d -E -P -r -s test
password 12345678

install package`pip install psycopg2`
creating testingdb
connecting with:
`conn = psycopg2.connect(
    host="localhost",
    database="suppliers",
    user="test",
    password="12345678")`
or .ini file for automatic connection, not necessary for our purposes now.
create tables through python:
def create_tables():
	commands = (
	"""
	CREATE TABLE tb (jkhw)
	""",
	"""
	CREATE TABEL othertbl (jkhw)
	""")
	curr = conn.cursor()
	for command in commands:
		cur.execute(command)
	cur.close()
	cur.commit()

Develop script for reading .txt file, creating psql table and writing txt to psql, see txt_psql.py !
### Interacting with operating system to view files in folders 
import os
folder_path = ''
files = os.listdir(folder_path)
os.path.join(folder_path, file)
DROP SCHEMA public CASCADE
CREATE SCHEMA public
**In all txt the final line is "Total", I gave this isocode 1000**



15.4) How to create queries:
https://docs.qgis.org/3.28/en/docs/training_manual/database_concepts/queries.html
Create db:
`CREATE DATABASE [naam];
\c [naam]`

`SELECT [column1, column2, ...] FROM [table] WHERE [column] =,!=, <, <=, BETWEEN, IN, EXISTS, LIKE, IS NULL, IS NOT NULL;`

`SELECT column as c FROM table;`

`SELECT COUNT,AVG,SUM,MIN,MAX(column) FROM table `

https://postgis.net/workshops/postgis-intro/

1/2 uur trein
9.30 - 14.30 = 5 uur
16-17 = 1 uur
7.30-
