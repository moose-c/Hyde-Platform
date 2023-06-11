# Very ineficient!! starting file is 52 mb, resulting folder is 10 gb.
#!/usr/bin/bash

# set -x

path=/home/moos/Documents/Hyde-Platform/data
name=irrigated_rice
location="${path}/${name}.nc"
band=1
for idate in $(cdo showdate $location) 
do
    if [ $band -ge 1 ]; then
        echo $idate
        IFS=- read blank yr rest <<< "$idate"
        # name difference to distinguish in BCE & CE
        if [ -z "$blank" ];  then
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
