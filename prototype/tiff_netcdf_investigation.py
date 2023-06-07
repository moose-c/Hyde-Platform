import netCDF4 as nc
import os
from osgeo import gdal, ogr
import numpy as np

path = "/home/moos/Documents/HYDE_Platform/prototype/doesitwork_9998.tif"
tiff = gdal.Open(path)
# tiff.show()
tiffar = np.array(tiff)

fn = "/home/moos/Documents"
name = "irrigated_rice.nc"
ds = nc.Dataset(os.path.join(fn, name))
print(ds)
time = ds['time']