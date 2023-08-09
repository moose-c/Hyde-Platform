"""Module for investivating Netcdf files

Play a bit with them, display them.
Key player is the xarray (xr), 
"""
import os
import xarray as xr
import rioxarray as rxr # necessary to import

fn = "/home/moos/Documents/Hyde-Platform/prototype/ncWMS/data"
name = "irrigated_rice.nc"
ds = xr.open_dataset(os.path.join(fn, name))

# make spatial using rioxarray
ds_crs = ds.rio.write_crs("EPSG:4326", inplace=True)
ds_crs["irrigated_rice"]
timepoint_start = ds_crs["irrigated_rice"]["time"].values[-5]
timepoint_end = ds_crs["irrigated_rice"]["time"].values[-3]