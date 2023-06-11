import netCDF4 as nc
import os
from osgeo import gdal, ogr
import numpy as np
import pandas as pd
import xarray as xr
import rioxarray as rxr
import matplotlib.pyplot as plt

# path = "/home/moos/Documents/Temp-Folder/HYDE_Platform/prototype/doesitwork_9998.tif"
# tiff = gdal.Open(path)
# # tiff.show()
# tiffar = np.array(tiff)

fn = "/home/moos/Documents/Hyde-Platform/data"
name = "irrigated_rice.nc"
ds = xr.open_dataset(os.path.join(fn, name), decode_times=False)

# make spacial using rioxarray, with coordinae reference system you can do:
# yields non_type, no crs in our netcdf
ds_crs = ds.rio.write_crs("EPSG:4326", inplace=True)
ds_crs["irrigated_rice"]
timepoint_start = ds_crs["irrigated_rice"]["time"].values[-5]
timepoint_end = ds_crs["irrigated_rice"]["time"].values[-3]

# # great
# map = ds_crs["irrigated_rice"].sel(time=timepoint_start)
# map.plot()
# plt.show()

# merging?
ds_complete = xr.open_mfdataset('/home/moos/Documents/Hyde-Platform/data/*.nc')
ds_complete.to_netcdf('complete.nc')
# or perhaps: cdo mergetime *.nc outfile !or! cdo -f nc2 mergetime *.nc outfile