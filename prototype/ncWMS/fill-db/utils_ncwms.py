import requests
from requests.auth import HTTPBasicAuth
import os

password = os.getenv('ncWMS_PASSWORD')
auth = HTTPBasicAuth('ncwms', password)

def populate():
    # get location of .nc files, [working directory]/netCDF
    data_location = '/data/netCDF'
    netcdf_names = os.listdir(data_location) # this correctly returns names of desired files

    id_number = 1
    for file in netcdf_names:
        # Retrieve status

        # there is now a connection! Tears of Joy
        dataset_status = requests.get('http://tomcat-ncwms:8080/ncWMS/admin/datasetStatus', 
                                    params={'dataset': str(id_number)},
                                    headers={'Accept': 'text/plain'},
                                    auth=auth
                                    )
    
        # Check if there is already a dataset with the current id, after the id check what it says
        if dataset_status.text.split(str(id_number))[1] != " not found on this server\n":
            requests.post('http://tomcat-ncwms:8080/ncWMS/admin/removeDataset',
                        data={'id':str(id_number)},
                        auth=auth
                        )
        
        # Create title from filename, rainfed_rice.nc -> Rainfed Rice
        title = ' '.join([element.capitalize() for element in file.split('.')[0].split('_')])

        print('is there a file at the location?', os.path.isfile(os.path.join(data_location, file)))
        # post dataset to ncWMS server. WORKS!
        response = requests.post('http://tomcat-ncwms:8080/ncWMS/admin/addDataset', 
                                data={'id': str(id_number), 
                                    'location': os.path.join(data_location, file),
                                    'title': title
                                    },
                                auth=auth
                                )
        print(response.text)
        id_number+=1

def clean():
    for i in range(100):
        requests.post('http://tomcat-ncwms:8080/ncWMS/admin/removeDataset',
                        data={'id':str(i)},
                        auth=auth
                        )

if __name__ == '__main__':
    populate()
    while True:
        pass