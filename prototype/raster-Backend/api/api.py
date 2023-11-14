## Setup Flask application
from flask import Flask, send_from_directory

api = Flask(__name__)

ascDir = "/data/asc"
pngDir = "/data/png"
years = 'list of potential years'

# Something like this
@api.route("/<type>/<indicator>/<start>/<end>")
def get_file(type, indicator, start, end):
  if start == end:
    file_name = get_file_name(indicator, start, type)
    return send_from_directory(ascDir, file_name, as_attachment=True)
  else:
    file_names = []
    for year in range(start, end):
      if years.includes(year):
        file_names.append(get_file_name(indicator, year, type))
    zipped_file = file_names.zip() #This is what you want, probable not that easy. Manual creation of zipped file
    return send_from_directory(zipped_file)        

# Perhaps something to also request .tiff? Little bit more difficult and time consuming since the .tiff needs to be created (from the) asc file

@api.route("/test")
def test():
  return "succesful setup api"


def get_file_name(indicator, start, type):
  """This such that the correct name of the file is returned"""
  return ''