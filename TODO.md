- [] Doe gewoon git repo op de server!!!
hiervoor: docker-compose lokaal moet gewoon perfect zijn.

BUGS!: 
- [] clicking the cross no longer removes selection from country!!
- [] Encountered improvement, email developer button

MUST HAVE
- [] raster-api & ncWMS documentation (beter) schrijven 
- [] not clear you can click on pixels or select countries, make more explicit
    - [] 'drag this bar to change the year'
- [] map now europe cut off. 
- [] Zoom is not easy, there are options available.
- [] TV -> Satellite.
- [] Cropland & Pasture in graph, Population Density in the Map


- [] WHY homepage information?

- [] Change (last) Modal Image
- [] kan er op de Frontpage een verwijzing komen welke versie precies van HYDE er nu in het portal staat? Bijv HYDE 3.3 (en dan link naar de desbetreffende Yoda versie?)
- [] manual year entry next to the slider
- [] Britta wants geotiff export

Modal Changes:
- which ind available?
-  ‘Using this portal you can select countries,
download raw data for a time series, and export maps for specific
years”

SHOULD HAVE
- [] change hyde portal and hyde portal homepage? or something?

WANT HAVE
- [] Smaller laptops, overlay timeseries form with chart

COULD HAVE
- [] Database contains also totals for the whole world, allow these also to be plotted -> wait until potetial regions are chosen
- [] Graph as long as the jumbotron?


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