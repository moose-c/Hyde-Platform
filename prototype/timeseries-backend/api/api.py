## Setup Flask application
from flask import Flask
from flask_restful import Resource, Api, reqparse

# from flask_cors import CORS
# # this allows to access endpoint on same machine.
# cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'

import os
password = os.environ['POSTGRESS_PASSWORD']

app = Flask(__name__)
api = Api(app)



## Connect to database

# import psycopg2
# conn = psycopg2.connect(host="localhost", 
#                         port=1234,
#                         database = "timeseries",
#                         user="postgres",
#                         password=password)
# cur = conn.cursor()





STUDENTS = {
  'student1': {'name': 'Mark', 'age': 23, 'spec': 'math'},
  'student2': {'name': 'Jane', 'age': 20, 'spec': 'biology'},
  'student3': {'name': 'Peter', 'age': 21, 'spec': 'history'},
  'student4': {'name': 'Kate', 'age': 22, 'spec': 'science'},
}


class StudentsList(Resource):
  def get(self):
    return STUDENTS
  
  
  def post(self):
    parser = reqparse.RequestParser()
    parser.add_argument("name")
    parser.add_argument("age")
    parser.add_argument("spec")
    args = parser.parse_args()
    student_id = int(max(STUDENTS.keys())) + 1
    student_id = '%i' % student_id
    STUDENTS[student_id] = {
      "name": args["name"],
      "age": args["age"],
      "spec": args["spec"],
    }
    return STUDENTS[student_id], 201

class Student(Resource):
  def get(self, student_id):
    if student_id not in STUDENTS:
      return "Not found", 404
    else:
      return STUDENTS[student_id]
    
  def put(self, student_id):  
    pass

  def delete(self, student_id):
    pass

api.add_resource(StudentsList, '/students/')
api.add_resource(Student, '/students/<student_id>')

if __name__ == "__main__":
    ENVIRONMENT_DEBUG = os.environ.get("DEBUG", False)
    app.run(host='0.0.0.0', port=5000, debug=ENVIRONMENT_DEBUG)
