## Setup Flask application
from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS

import os
password = os.environ['POSTGRES_PASSWORD']

app = Flask(__name__)
api = Api(app)
CORS(app)

# Connect to database

import psycopg2
# this is allowed since they are within the same docker network.
conn = psycopg2.connect(host="timeseries-database",
                        database = "timeseries",
                        user="postgres",
                        password=password)
cur = conn.cursor()

# obtain names of the timesteps
cur.execute("SELECT * FROM uopp WHERE false")
column_names = [desc[0] for desc in cur.description]

# query and return timeseries of interest
class Timeseries(Resource):
  def get(self, indicator, isocode, start, end):
    # select columns in correct format, inicluding the endpoint
    columns = ", ".join(column_names[column_names.index(start):column_names.index(end)+1])
    cur.execute(f'SELECT {columns} FROM {indicator} WHERE iso_code={isocode}')
    ts = cur.fetchall()
    return ts

# test class to see whether the api is setup correctly
class Test(Resource):
  def get(self):
    return "Setup is correct!"

api.add_resource(Test, '/test')
api.add_resource(Timeseries, '/<indicator>/<isocode>/<start>/<end>')

