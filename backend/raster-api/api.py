from flask import Flask, send_from_directory, make_response
import zipfile
import os

api = Flask(__name__)

ascDir = "/data/asc"
pngDir = "/data/png"

### Function to publish .asc data. ###
# .route(...) specifies the URL through which the API can be accessed
@api.route("/api/raster/asc/<indicator>/<year>")
def get_asc(indicator, year):
  parsedYear = parseYear(year, 'asc')
  indicatorType = 'pop' if indicator in ['popc', 'popd', 'urbc', 'rurc', 'uopp'] else 'lu'
  zipName = f'{parsedYear}_{indicatorType}.zip' 
  pathName = os.path.join(ascDir, zipName)
  fileName = f'{indicator}_{parsedYear}.asc' if indicatorType == 'pop' else f'{indicator}{parsedYear}.asc'

  # First, extract relevant file from zipfile
  with zipfile.ZipFile(pathName) as z:
    with open(fileName, 'wb') as f:
      f.write(z.read(fileName))
      
  # Then return desired file
  # This yields the created .asc file and then deletes it.
  file = open(fileName, 'r')
  def stream_and_remove_file():
    yield from file
    file.close()
    os.remove(fileName)
    
  return api.response_class(
        stream_and_remove_file(),
        headers={'Content-Disposition': 'attachment', 'filename': fileName, 'Access-Control-Allow-Origin' : '*'}
    )
  
@api.route("/api/raster/png/<indicator>/<year>")
def get_png(indicator, year):
  # Parse Data
  parsedYear = parseYear(year, 'png')
  parsedIndicator = parseIndicator(indicator)
  fileName = f'{parsedIndicator}_{parsedYear}.png'
  
  # Create Response
  response = make_response(send_from_directory(pngDir, fileName, mimetype='image/png', as_attachment=True))
  response.headers['Access-Control-Allow-Origin'] = '*'
  return response
  
def parseYear(year, type):
  """Helper function to parse years
  
  Obtain in the following format: ce_1500, bce_10000"""
  
  if type == 'asc':
    yearEra, yearNb = year.split('_')
    parsedEra = 'AD' if yearEra == 'ce' else 'BE'
    return yearNb + parsedEra
  
  elif type == 'png':
    # split information
    yearEra, yearNb = year.split('_')

    # Parse Year
    yearAbs = int(yearNb)
    yearVal = yearAbs if yearEra == 'ce' else -yearAbs
    first = '0' + str(20000 + yearVal)
    second = '0'*(5-len(str(yearNb))) + str(yearAbs)
    
    # Parse Era
    parsedEra = 'AD' if yearEra == 'ce' else 'BC'
    
    return(f'{first}_{second}{parsedEra}')

def parseIndicator(indicator):
  altIndNames = {'popc':'popcount', 'popd':'popdens', 'urbc':'urbpopcount' ,'rurc':'rurpopcount', 'uopp':'urbanarea'} 
  if indicator in altIndNames.keys():
    parsedIndicator = altIndNames[indicator]
  else:
    parsedIndicator = indicator
  return parsedIndicator

if __name__ == '__main__':
  api.run()