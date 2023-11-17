from flask import Flask, send_from_directory
import zipfile
import os

api = Flask(__name__)

ascDir = "./data/asc"
pngDir = "./data/png"
years = 'list of potential years'

""" # Something like this
@api.route("/png/<indicator>/<year>")
def get_png(type, indicator, start, end):
  if start == end:
    parse_year(start, 'asc')
    with zipfile.ZipFile(os.path.join(ascDir, )) as z:
      with open('temp/icon.png', 'wb') as f:
        f.write(z.read('/res/drawable/icon.png'))
    # file_name = extract_relevant_txt(indicator, start, type)
    return send_from_directory(ascDir, file_name, as_attachment=True)
  else:
    file_names = []
    for year in range(start, end):
      if years.includes(year):
        file_names.append(get_file_name(indicator, year, type))
    zipped_file = file_names.zip() #This is what you want, probable not that easy. Manual creation of zipped file
    return send_from_directory(zipped_file)       """  

# Something like this
@api.route("/asc/<indicator>/<year>")
def get_asc(indicator, year):
  parsedYear = parse_year(year, 'asc')
  indicatorType = 'pop' if indicator in ['popc', 'popd', 'urbc', 'rurc', 'uopp'] else 'lu'
  zipName = f'{parsedYear}_{indicatorType}.zip'
  pathName = os.path.join(ascDir, zipName)
  fileName = f'{indicator}_{parsedYear}.asc'
  print(pathName, fileName)
  with zipfile.ZipFile(pathName) as z:
    with open(fileName, 'wb') as f:
      f.write(z.read(fileName))
      
  file = open(fileName, 'r')
  def stream_and_remove_file():
    yield from file
    file.close()
    os.remove(fileName)
    
  # Takes a loooonng time. Do this: https://stackoverflow.com/questions/51453788/flask-large-file-download
  return api.response_class(
        stream_and_remove_file(),
        headers={'Content-Disposition': 'attachment', 'filename': fileName}
    )
  

# Perhaps something to also request .tiff? Little bit more difficult and time consuming since the .tiff needs to be created (from the) asc file

@api.route("/test")
def test():
  return "succesful setup api"


def get_file_name(indicator, start, type):
  """This such that the correct name of the file is returned"""
  return ''

def parse_year(year, type):
  # From following form: ce_1500, bce_10000 to 1500AD, 100000BE
  if type == 'asc':
    yearEra, yearNb = year.split('_')
    parsedEra = 'AD' if yearEra == 'ce' else 'BE'
    return yearNb + parsedEra

if __name__ == '__main__':
  api.run()