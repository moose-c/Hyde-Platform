import requests
from requests.auth import HTTPDigestAuth
import os

password = os.environ["ncWMS_PASSWORD"]
auth = HTTPDigestAuth('admin', password)

# Typer CLI application, run with python3 [filename.py] [function name] -> python3 utils_ncwms.py clean
import typer

app = typer.Typer()

@app.command()
def populate():
    # get location of .nc files, [working directory]/netCDF
    data_location = os.path.join(os.getcwd(), 'netCDF')
    netcdf_names = os.listdir(data_location)

    id_number = 1
    for file in netcdf_names:
        # Retrieve status
        dataset_status = requests.get('http://localhost:8080/ncWMS2/admin/datasetStatus', 
                                    params={'dataset': str(id_number)},
                                    headers={'Accept': 'text/plain'},
                                    auth=auth
                                    )

        # Check if there is already a dataset with the current id, after the id check what it says
        if dataset_status.text.split(str(id_number))[1] != " not found on this server\n":
            requests.post('http://localhost:8080/ncWMS2/admin/removeDataset',
                        data={'id':str(id_number)},
                        auth=auth
                        )
        
        # Create title from filename, rainfed_rice.nc -> Rainfed Rice
        title = ' '.join([element.capitalize() for element in file.split('.')[0].split('_')])

        # post dataset to ncWMS server
        requests.post('http://localhost:8080/ncWMS2/admin/addDataset', 
                                data={'id': str(id_number), 
                                    'location': os.path.join(data_location, file),
                                    'title': title
                                    },
                                auth=auth
                                )
        id_number+=1

@app.command()
def clean():
    for i in range(100):
        requests.post('http://localhost:8080/ncWMS2/admin/removeDataset',
                        data={'id':str(i)},
                        auth=auth
                        )
    

if __name__ == '__main__':
    app()