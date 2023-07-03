#!/bin/bash

# create dedicated network
docker network create postgres

# build the image
docker build -t mooscastelijn/timeseries-api .

# 'docker run' runs an image
# '--rm' means remove all of the image when it is closed
# '-d' means run detatched, not within this terminal
# '-p' sets port, the standard 5432 from within container is exposed on 1234 on host
# '--net' sets network, here to the one created earlier
docker run --rm \
    -p 5000:5000 \
    --name timeseries-api \
    -e DEBUG=TRUE \
    -e POSTGRESS_PASSWORD="$POSTGRESS_PASSWORD" \
    --net postgres \
    mooscastelijn/timeseries-api