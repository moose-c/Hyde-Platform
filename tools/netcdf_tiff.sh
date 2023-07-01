# File to create individual maps from 1 netcdf file, so 1 map for each indicator and 1 timestep for the entire globe 
# So called bash script, very useefull later.
# Very ineficient!! starting file is 52 mb, resulting folder is 10 gb.
#!/usr/bin/bash

# set -x

path=/home/moos/Documents/Hyde-Platform/data
name=irrigated_rice
location="${path}/${name}.nc"
band=1

for idate in $(cdo showdate $location) 
do
    if [ $band -ge 1 ]; then # greater or equal then 1
        echo $idate # prints in terminal
        # I don't remember why this was necessary, it was complicated. 
        IFS=- read blank yr rest <<< "$idate" # with Internal Field Seperator equal -, perform split on idate
        # name difference to distinguish in BCE & CE
        if [ -z "$blank" ];  then # if empty
            filename="${name}-${yr}-BCE.tif"
            echo "inside"
        else
            filename="${name}-${blank}-CE.tif"
        fi
        echo $yr
        gdal_translate -ot Float64 NETCDF:$location:irrigated_rice -b $band -unscale "${path}/netcdf_tif/${filename}"
        ((band++))
    fi
done
# echo All done
