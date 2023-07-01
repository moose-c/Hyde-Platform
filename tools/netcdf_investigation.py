"""Module for investivating Netcdf files

Play a bit with them, display them.
Key player is the xarray (xr), 


"""
import netCDF4 as nc
import os
from osgeo import gdal, ogr
import numpy as np
import pandas as pd
import xarray as xr
import rioxarray as rxr # neseccary to 
import matplotlib.pyplot as plt

# path = "/home/moos/Documents/Temp-Folder/HYDE_Platform/prototype/doesitwork_9998.tif"
# tiff = gdal.Open(path)
# # tiff.show()
# tiffar = np.array(tiff)

fn = "/home/moos/Documents/Hyde-Platform/data"
name = "irrigated_rice.nc"
ds = xr.open_dataset(os.path.join(fn, name))

# make spacial using rioxarray, with coordinate reference system you can do:
ds_crs = ds.rio.write_crs("EPSG:4326", inplace=True)
ds_crs["irrigated_rice"]
timepoint_start = ds_crs["irrigated_rice"]["time"].values[-5]
timepoint_end = ds_crs["irrigated_rice"]["time"].values[-3]

# # great
# map = ds_crs["irrigated_rice"].sel(time=timepoint_start)
# map.plot()
# plt.show()

# # Thought about merging? But seems that resulting file is way bigger than starting files.
# ds_complete = xr.open_mfdataset('/home/moos/Documents/Hyde-Platform/data/*.nc')
# ds_complete.to_netcdf('complete.nc')
# # or perhaps: cdo mergetime *.nc outfile !or! cdo -f nc2 mergetime *.nc outfile