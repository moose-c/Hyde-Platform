## Setup Flask application
from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS

import os
password = os.environ['POSTGRES_PASSWORD']

app = Flask(__name__)
api = Api(app)
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
class Timeseries(Resource):
  def get(self, indicator, isocode, start, end):
    try:
      # select columns = years in the correct format, including the endpoint. 
      # start end year within the url are the same format as the year columns within the database, this makes the following possible
      columns = ", ".join(column_names[column_names.index(start):column_names.index(end)+1])
      
      # select desired columns
      cur.execute(f"SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name='{indicator}');")
      tableExists = cur.fetchone()[0]
      
      if tableExists:
        cur.execute(f'SELECT {columns} FROM {indicator} WHERE iso_code={isocode};')
        ts = cur.fetchall()
        return ts
      else:
        return 'indicator doesnt exist'
    except: 
      return 'incorrect parameters'
    

# test class to see whether the api is setup correctly
class Test(Resource):
  def get(self):
    return "Setup is correct!"
  


api.add_resource(Test, '/test')
api.add_resource(Timeseries, '/api/txt/<indicator>/<isocode>/<start>/<end>')

# Serving this database is handles by Gunicorn.