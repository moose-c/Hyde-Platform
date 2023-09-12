import requests
from requests.auth import HTTPDigestAuth
import os

password = 'ncwms'
auth = HTTPDigestAuth('ncwms', password)

def populate():
    # get location of .nc files, [working directory]/netCDF
    data_location = 'netCDF'
    netcdf_names = os.listdir(data_location)

    id_number = 1
    for file in netcdf_names:
        # Retrieve status
        dataset_status = requests.get('http://localhost:8080/ncWMS/admin/datasetStatus', 
                                    params={'dataset': str(id_number)},
                                    headers={'Accept': 'text/plain'},
                                    auth=auth
                                    )
    
        # Check if there is already a dataset with the current id, after the id check what it says
        if dataset_status.text.split(str(id_number))[1] != " not found on this server\n":
            requests.post('http://localhost:8080/ncWMS/admin/removeDataset',
                        data={'id':str(id_number)},
                        auth=auth
                        )
        
        # Create title from filename, rainfed_rice.nc -> Rainfed Rice
        title = ' '.join([element.capitalize() for element in file.split('.')[0].split('_')])

        # post dataset to ncWMS server
        location =  os.path.join(os.getcwd(), os.path.join(data_location, file))
        requests.post('http://localhost:8080/ncWMS/admin/addDataset', 
                                data={'id': str(id_number), 
                                    'location': location,
                                    'title': title
                                    },
                                auth=auth
                                )
        print(os.path.join(data_location, file))
        id_number+=1

def clean():
    for i in range(100):
        requests.post('http://localhost:8080/ncWMS/admin/removeDataset',
                        data={'id':str(i)},
                        auth=auth
                        )

if __name__ == '__main__':
    populate()