FROM python:3.8-alpine

# set working directory, from where the app will be run
WORKDIR /temp

# copy files from current directory to working directory
COPY ./txt_psql.py .

# Install dependencies
RUN pip install psycopg2==2.9.6

# Run desired file
CMD ["python", "./txt_psql.py"]