## Setup Flask application
from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)

# this allows to access endpoint on same machine.
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# ## Connect to database
# import sys
# import psycopg2
# # url = os.environ.get("DATABASE_URL") Alternatives for 
# sys.path.append('../../../../Hyde-Platform')
# from passwords import postgresql_username, postgresql_password
# conn = psycopg2.connect(host="localhost", 
#                             database = "temp",
#                             user=postgresql_username,
#                             password=postgresql_password)
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
  app.run(debug=True)