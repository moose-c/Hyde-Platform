# Standalone Database application
## Relation of part to the whole
Part of the backend, returning timeseries per country

## Setup 
### Point to data for the database
Populate ./fill-db/data/txt with the HYDE .txt files, obtained through the YODA platform.

### Running setup bash script
From the command line change to this directory and do:
`docker compose up -d`
**Now the database is populated, and API launched.**

### Test
`curl http://127.0.0.1:8000/test` Should display "Setup is correct!"
`curl http://127.0.0.1:8000/[indicator]/[isocode]/[start]/[stop]` gives data
example: `curl http://127.0.0.1:8000/uopp/4/bce_1000/ce_700`

This means that it works localy, however, it should already also work remotely:
`curl http://[ip]:8000/test`
where ip can be found using: `hostname -I`
currently: `curl http://192.168.68.115:8000/test`

## Tear down
`docker compose down`
If no permission: `sudo aa-remove-unknown`

## Understanding
There are 3 components that need to be learned in order to understand what is being done here:
1) This utilizes *docker* to create containers for each component
2) The first container contains a *postgresql database* for our timeseries
3) The second container runs a python file *populating the postgres database*
4) The third container runs a FLASK Api *making the data accessible*
Here, a quick overview of these components follows and an explanation how this was learned, in order for the reader to be able to understand and replicate this if desirable. Also, the code contains in depth annotations to provide technical understanding

### Docker
Docker is used to create *containers* for each piece of software. This creates a dedicated environment for each component, only containing the necessary dependencies. An excelent, understandable tutorial of this topic can be found [here](https://docker-curriculum.com/).
The `docker compose up` command utilizes the docker-compose.yml to create the docker environment.
The docker-compose.yml file creates 3 different containers from 3 different images in order:
1) A postgres container is created, in which the data for the timeseries will be contained
2) A python container is created, which connects to the postgres container and populates the database
3) A Flask API is created, which can be called to retrieve data from the database
The first container uses an already defined postgres image, the other 2 use image manually defined within the mentioned Dockerfile's. 

### Container 1: Postgres database
The first docker container created contains a postgres database called timeseries. Postgresql (postgres) is a relational database management system (rdbms), the reader can learn more about it using various online tutorials, the writer learned it through [here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04)& [here](https://docs.qgis.org/3.28/en/docs/training_manual/). This database will contain data for each country, each indicator, from 12000 BC until now (2018). All setup is done within the docker-compose.yml, no further manual access needs to happen.

### Container 2: Fill Database
How to connect and execute postgres commands using python can be learned [here](https://pynative.com/python-postgresql-tutorial/)
All code for this section is contained within the fill-db folder.
As can be seen within the Dockerfile, a script called *txt_psql.py* is called.
This script connects to the timeseries database, and fills them with the data from the .txt files in the desired format

### Container 3: Database Flask API
Basics of Flask API development can be learned [here](https://pythonbasics.org/flask-rest-api/)
All code for this section is contained within the api folder.
The script api.py in called within the Dockerfile, this creates the API. 