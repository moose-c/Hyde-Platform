#!/bin/bash

# create dedicated network
docker network create postgres

# 'docker run' runs an image
# '--rm' means remove all of the image when it is closed
# '-d' means run detatched, not within this terminal
# '-p' sets port, the standard 5432 from within container is exposed on 1234 on host
# '--net' sets network, here to the one created earlier
# '-e' sets environmental variable within container, used by the constructor
# "$[ENVIRONMENTAL VARIABLE]" gives value of environmental variable on host
# 'postgres' from with image a container will be constructed, pulls from the web.
docker run --rm -d \
    -p 1234:5432 \ 
    --name timeseries-container \
    --net postgres \
    -e POSTGRES_PASSWORD="$POSTGRESS_PASSWORD" \
    -e POSTGRES_DB=timeseries \
    postgres
# utilizes env variable POSTGRES_PASSWORD, and creates the 'timeseries' db

docker build -t mooscastelijn/psql-population .
docker run --rm \
    -e POSTGRESS_PASSWORD="$POSTGRESS_PASSWORD" \
    --net postgres \
    mooscastelijn/psql-populatioin

# Populate database (probably the following, test when pulling from db)
python3 txt_psql.py
