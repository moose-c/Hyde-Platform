## Setup Flask application
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS

import os
password = os.environ['POSTGRES_PASSWORD']

app = Flask(__name__)
CORS(app) # mitage CORS error

# Connect to database

import psycopg2
# this is allowed since they are within the same docker network.
conn = psycopg2.connect(host="timeseries-database",
                        database = "timeseries",
                        user="postgres",
                        password=password)
cur = conn.cursor()

# obtain names of the columns, which are the years
cur.execute("SELECT * FROM uopp WHERE false")
column_names = [desc[0] for desc in cur.description]

# query and return timeseries of interest
@app.route('/api/txt')
def timeseries():
    indicator = request.args.get('indicator')
    isocode = request.args.get('isocode')
    start = request.args.get('start')
    end = request.args.get('end')
    print(start)
    # select columns = years in the correct format, including the endpoint. 
    # start end year within the url are the same format as the year columns within the database, this makes the following possible
    columns = ", ".join(column_names[column_names.index(start):column_names.index(end)+1])
    
    # select desired columns
    cur.execute(f'SELECT {columns} FROM {indicator} WHERE iso_code={isocode}')
    ts = cur.fetchall()
    return ts

# test to see whether the api is setup correctly
@app.route('/api/test')
def test():
  return "Setup is correct!"

# Serving this api is handles by Gunicorn.
""" if __name__ == '__main__':
  app.run()
 """