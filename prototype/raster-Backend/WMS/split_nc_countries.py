# Split into countries using GeoJson
## Select approximate region to shorten clip time, how the hell do we get approximated lon,lat, API for this?
print(nc)
nc_lim = ds.sel(longitude=slice(71,72), latitude=slice(33,35), time=slice(f'start', 'end'))

print(shp)
shp_rm = regionmask.Regions(np.array(shp.geometry))
mask = poly.mask(nc_lim.isel(time = 0), lat_name='latitude', lon_name='longitude')

nc_country = nc_lim.where(mask == 0)

# This results in a netcdf which was is from aproximated lon, lat, but none everywhere but the country.

nc_country.indval.mean(dim='time').plot()

# Many tutorials


# This will be something

# Requesting spatial data for download will also be something. Will however just be an API again.
# Where the requests are really easy, but the API itself might also be something. But IDK, not really I think

