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
# -p 2019:5432 \
docker run --rm -d \
    --name timeseries-database \
    --net postgres \
    -e POSTGRES_PASSWORD="$POSTGRES_PASSWORD" \
    -e POSTGRES_DB=timeseries \
    postgres

# create docker image called mooscastelijn/psql-population, from the Dockerfile within this directory (.)
# docker build -t mooscastelijn/psql-population .

# # Create docker environment from python, and run txt_psql.py from there. 
# # Since within the same network as db, connection should be possible
# docker run --rm \
#     -e POSTGRES_PASSWORD="$POSTGRES_PASSWORD" \
#     --net postgres \
#     mooscastelijn/psql-population
