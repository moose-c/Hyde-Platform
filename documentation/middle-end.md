#Geoserver
geoserver: https://docs.geoserver.org/latest/en/user/installation/linux.html
6) env variable: export GEOSERVER_HOME=/usr/share/geoserver
start: 
`cd usr/share/geoserver/bin`
`./startup.sh`
navitgate to: `http://localhost:8080/geoserver`
* [ ] login with username: admin, password: tijdelijk_wachtwoord

netcdf upload:
https://www.goohttps://docs.geoserver.org/latest/en/gle.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwj08KCI-LH_AhWQ2aQKHbXBDO8QFnoECAoQAQ&url=https%3A%2F%2Fgis.stackexchange.com%2Fquestions%2F342942%2Fhow-to-install-netcdf-plugin-to-geoserver&usg=AOvVaw21FreFoAlgEyY9-evxoyR0
within geoserver:
- create workspace.
- stores -> netcdf plugin > select workspace, [SetName],, brose to file
- save, on layers page navigate to publish. All set, only Dimensions interesting, now something random selected. Changing this changes it to the latest being selected. [] nearest close value seems to help

displaying can happen, is now blank. I think it shows the first entry, for which this is true. overlaying with an existing map (which is what eventually will be done) causes it to not matter that ocean and areas where output is 0 are the same.
If changing years is even possible is very unclear.
just adding &TIME=1000& in url works, =1001, =1100 don't work. 2000 works. Currious.

