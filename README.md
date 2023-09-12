# Hyde Platform
This repository contains the code that was used to create the Hyde Platform, a platform which displays the data from the HYDE model (History Database of the Global Environment).  
This markdown explains the structure of the final product and how to run this application. For documentation on the development process, read [Development-process.md](Development-Process.md). For a more extensive explanation of each component, read the documenation within that component.

## Structure
In the **prototype** folder, different components of the project can be found. The following are currently implemented:
1) **ncWMS**: Contain all elements neccessary for publishing the netcdf files from the HYDE project
2) **timeseries-backend**: Contain construction and filling of postgres database with information related to the timeseries, and an API capable of sharing this data. 
3) **timeseries-website**: Contains a website displaying a map and capable of displaying timeseries using the API from timeseries-backend. 

## Setup locally
**Note that this is not yet complete**


### Linux
First, set desired password from command line as **environmental variable** using:
`sudo apt install gedit`
`sudo gedit /etc/environment` 
and add to the bottom of the resulting file the following line:
`POSTGRES_PASSWORD='[postgres password]'`
and finally reboot the system to make the password available.

### Windows
Set environmental variable 
`POSTGRES_PASSWORD='[postgres password]'`
`ESRI_KEY="[esri key]"`


### WSL
`sudo apt install gedit`
`sudo gedit /etc/profile.d/env_variables.sh`
and add to the bottom of the resulting file the following line:
`export POSTGRES_PASSWORD="[postgres password]"`
and finally reboot the system to make the password available:
from windows powershell: `wsl -- shutdown`

hydeprod.geo.uu.nl
caste001

scp -r ./timeseries-backend/ caste001@hydeprod.geo.uu.nl:/data/caste001/Hyde-Project-Backend