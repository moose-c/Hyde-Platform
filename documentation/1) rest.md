In this document a structured explanation will be given of how things not included in the other documents as part of the HYDE-Platform were created.
This document will include:
- Overview of the project
- Orientation, why where the components chosen and how do they relate
- Tranfering to Linux
- Installing necessary components
- An exploration of the HYDE data
- Github Setup and workflow

# Overview
What is actually wanted? This is a very important question to have answered before any serious development can start. So far, the final product has been described as having the following components:
Create a **website** hosted on a **server**, on this website a **world map** is displayed. This worldmap should have the ability to **display data**, in 2 ways: 
After clicking on one or multiple **countries**, something should pop up or be clickable to obtain data on certain **indicators** over a selected **time period**, in the form of **graphs** and with the ability to **extract the data** in multiple forms.
Secondly, information of an indicator of a certain year can be **overlayed** on the globe as a raster, also with the possibility to **extract** this data.

# Workflow
The workflow within this project will be the following:
Since the final product will have need a database and most components still need to be learned, for each component first a small prototype will be developed. For this reason, the repository will have 2 folders: prototype & final. When working locally, I will develop within the 'prototype' folder, when developing on the server, I will develop within the 'final' folder.

# Orientation
Now that we have clear what is wanted, the tools for this job should be gathered.
When developing a GIS website (and with more or less every programming task) it is important to realize that all you want to create has already been created in many forms already. Therefore, initially it is a good idea to look at other examples and pages detailing which compontents have been developed and can be used.
[This website](https://mapscaping.com/navigating-geospatial-open-source-a-guide-to-an-ogc-stack/) and [this website](https://www.gislounge.com/open-source-web-gis-development-roadmap/) have been used initially to identify all the components that are necessary.
These components are:

## Openlayers
For the frontend Openlayers seems promising. This is a javascript library which can be used to easily display mapping data of the entire globe, make certain areas clickable which can the be used to make data visible, and allows for overlay of other layers.

How to just get a map of the world, with areas that [one can zoom into](https://openlayers.org/doc/tutorials/concepts.html)
Promising OpenLayers example, allowing to [click on certain areas](https://openlayers.org/en/latest/examples/box-selection.html)

## Geoserver
Open-source software server written in Java, allows users to chare and edit geospatial data. Takes data from a database and serves to OpenLayers, as stated [here](https://gis.stackexchange.com/questions/52818/how-to-connect-openlayers-to-postgis-data): “Unfortunately you cannot connect a web page directly to a database because of security concerns, normally you need some middleware to join the two together. 
So for your example and if you want to stick with Open Source software you could easily use GeoServer as your geographic server to serve your data from your PostGIS database to your OpenLayers HTML web page.” 
(Alternatively, ncWMS)

## Postgresql & PostGIS
The data from the HYDE model should be stored within a database that makes retrievel and display on the website easy. Since at least the rasters is spatial information a database which can easily incorporate spatial data would be usefull. A well known and widely used database system is the Postgresql database system, this also has the PostGIS extenction specifically made to work with spatial data

# Transfering to Linux
Since the eventual server would also run on a Linus operating system for FAIR reasons, it was agreed that I would also work within a Linux environment. Therefore, I installed the dual operating system on my laptop. This is done with [these steps](https://itsfoss.com/install-ubuntu-1404-dual-boot-mode-windows-8-81-uefi/) and [this](https://www.freecodecamp.org/news/how-to-dual-boot-windows-10-and-ubuntu-linux-dual-booting-tutorial/).

# Installing Necessary components
Some things are necessary on our now blank Linux OS, such as:
- [Git](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-20-04#setting-up-git)
- node, npm
- [Geoserver](https://docs.geoserver.org/latest/en/user/installation/linux.html)
- java
- Visual Studio Code
- [PostgreSQL](https://www.cherryservers.com/blog/how-to-install-and-setup-postgresql-server-on-ubuntu-20-04)(, can be uninstalled as [here](https://bobcares.com/blog/uninstall-psql-ubuntu/))
- Python

# Data investigation

Data can be downloaded through the Yoda portal of the Utrecht University. The Readme.txt gives an overview of the data that is downloaded:
- .asc files are in ESRI ASCII grid format: 
contain header, which gives file structure. These files can be opened in QGIS.
- .txt files contain information of each country over time, as timeseries. 
General files: create nice maps of the earth, distance per grid cell.
Time starts at 10000 BC (start of the rise of humanity).
- until 0 BC 1000yr: 11
- until 1700 100yr: 17
- until 2000 10yr: 30
- until 2017 1yr: 17

To easily display this data it is good to work with QGis, which can be downloaded [here](https://www.qgis.org/en/site/forusers/alldownloads.html). Skip the step where you need to add to /etc/apt/sources.list.d/qgis.sources, and stop at 'repositories', this is sufficient for our needs.

Then 3 scenarios: Baseline Estimate, Lower estimate & Upper estimate,
each scenario contains: /png, /zip, /txt & /anthromes
- png: figures for each category for all years in .png format
- TXT: for an indicator, for each country at all timesteps. Organized by Isocode: every 4 is more or less an existing country, redundancy for spliting countries.
- zip: information sorted by indicator, year and gridcell.

- 1 database just from .txt files, need an iso code, indicator, timeperiod and a region to request information, generate graphs etc.
- 1 database based on spatial information which can be queried based on spatial information, need indicator, timeperiod and perhaps region. This will return maps for particular period, for that country over time
- Select indicator and year and show layer over the whole globe.
