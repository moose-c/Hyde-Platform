# Hyde Platform
This repository contains the code that was used to create the Hyde Platform, used to display the data from the HYDE (History Database of the Global Environment)

## Structure
In the **prototype** folder, different components of the project can be found. The following are currently implemented:
1) Apache: contains unfinished trials for an appache application. Should be ignored by the reader
2) **timeseries-backend**: contain construction and filling of postgres database with information related to the timeseries, and an API capable of sharing this data. Contains a readme.md which should be read carefully, since this is an importent part of the project.
3) timeseries-backend: contains a rudementary website for displaying data from the timeseries-backend. Can also be ignored
4) **website**: contains a functioning website, displaying a map and capable of displaying timeseries using the API from timeseries-backend. Also contains a readme.md which should be read carefully.

(In the **documentation** folder information on all steps of the process can be found. The -raw markdown file contain a diary style, more utilitation rough notes on the process, whereas the other files contain a more reader friendly walkthrough of the process. )

## Setup

### Linux
First, set desired password from command line as **environmental variable** using:
`sudo apt install gedit`
`sudo gedit /etc/environment` 
and add to the bottom of the resulting file the following line:
`POSTGRES_PASSWORD='[postgres password]'`
and finally reboot the system to make the password available.

### Windows
Set environmental variable `POSTGRES_PASSWORD='[postgres password]'`