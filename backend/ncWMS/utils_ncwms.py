import requests
from requests.auth import HTTPBasicAuth
import os

password = os.getenv('ncWMS_PASSWORD') # as is specified within .env
auth = HTTPBasicAuth('ncwms', password) # Within tomcat container no Digest, just Basic Authentication

def populate():
    data_location = '/data/netCDF'
    netcdf_names = os.listdir(data_location) # this correctly returns names of desired files

    id_number = 1
    for file in netcdf_names:
        # Retrieve status
        # there is now a connection! Tears of Joy
        dataset_status = requests.get('tomcat-ncwms:8080/ncWMS/admin/datasetStatus', 
                                    params={'dataset': str(id_number)},
                                    headers={'Accept': 'text/plain'},
                                    auth=auth
                                    )
    
        # Check if there is already a dataset with the current id, after the id check what it says, remove if present
        if dataset_status.text.split(str(id_number))[1] != " not found on this server\n":
            requests.post('tomcat-ncwms:8080/ncWMS/admin/removeDataset',
                        data={'id':str(id_number)},
                        auth=auth
                        )
        
        # Create title from filename, rainfed_rice.nc -> Rainfed Rice
        idFile = file.split('.')[0]
        title = ' '.join([element.capitalize() for element in file.split('.')[0].split('_')])

        # post dataset to ncWMS server. WORKS!
        response = requests.post('tomcat-ncwms:8080/ncWMS/admin/addDataset', 
                                data={'id': idFile, 
                                    'location': os.path.join(data_location, file),
                                    'title': title
                                    },
                                auth=auth
                                )
        id_number+=1

def clean():
    for i in range(100):
        requests.post('tomcat-ncwms:8080/ncWMS/admin/removeDataset',
                        data={'id':str(i)},
                        auth=auth
                        )

if __name__ == '__main__':
    populate()
