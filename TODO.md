MUST HAVE
- [] map now europe cut off. Iets met herhalende images?

SHOULD HAVE
- [] display current year indicator values

WANT HAVE
Modal Changes:
- which ind available?
-  ‘Using this portal you can select countries,
download raw data for a time series, and export maps for specific
years”
- [] Britta wants geotiff export
- [] Change (last) Modal Image

COULD HAVE
- [] Database contains also totals for the whole world, allow these also to be plotted -> wait until potetial regions are chosen

Overdracht:
Changing Backend:
Within the 'docker-compose.yml', change the volume locations (It is clearly stated where a change might be necessary)
Changing the Frontend:
- To change a year, change the value in .env
- To change homepage content:
    - To change the Left (blue) part: change Jubmotron within src/Home.js 
    - To change the Right (Era Text): change the periodText from desired period 

# Usability test
- Who? Create assignment based on the portal?
- Possible to create large flag on page enter: Stil in development, if you have remarks please email them to ....