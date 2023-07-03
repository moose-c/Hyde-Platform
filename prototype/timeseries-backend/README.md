# Standalone Database application
## Relation of part to the whole
Part of the backend, returning timeseries per country

## Setup 
### Point to data for the database
change line 56 in txt_psql.py to where the timeseries files are stored
- [] Perhaps this can be automated by accessing the YODA API? could possibly even be request from within python


### Running setup bash script
From the command line change to this directory and do:
`chmod u+x setup.sh`
`.\setup.sh`

**Now the database is populated.**

## Understanding
There are 4 components that need to be learned in order to understand what is being done here:
1) The setup file, `setup.sh` is a *bash script*
2) This utilizes *docker* to create containers for each component
3) The first container contains a *postgresql database* for our timeseries
4) The second container runs a python file *populating the postgres database*
Here, a quick overview of these components follows and an explanation how this was learned, in order for the reader to be able to understand and replicate this if desirable.

### Bash Script
A bash script is a script containing commands that can be executed immediately within the terminal. Just your regular `ls`, `cd`, `mkdir` etc. commands behave precicely as they would as if you were within the command line. Furthermore, the location from where these commands are executed is the location where the script resides. The writer learned the basics of this [here](https://www.freecodecamp.org/news/bash-scripting-tutorial-linux-shell-script-and-command-line-for-beginners/).
With a basic understanding of bash scrips, one can understand `setup.sh`, points of interests are the need to start a bash script with the line `#!/bin/bash`, and that commands are allowing to be split using \.

### Docker
Docker is used to create *containers* for each piece of software. This creates a dedicated environment for each component, only containing the necessary dependencies. An excelent, understandable tutorial of this topic can be found [here](https://docker-curriculum.com/).
Once the reader understands the workings of Docker, the workings of the docker commands within setup.sh should be clear.

### Postgres database.
The first docker container created contains a postgres database called timeseries. Postgresql (postgres) is a relational database management system (rdbms), the reader can learn more about it using various online tutorials, the writer learned it through [here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04)& [here](https://docs.qgis.org/3.28/en/docs/training_manual/). First

should work from totally blank system: JA WERKTT!!!
`docker compose up`
Check if works: 
`docker exec -it timeseries-database bash`
`psql -U postgres`

Volgende stap, integereer API, zou goed te doen moeten zijn, kijk goed naar bestaande docker-compose.yml