MUST HAVE
- [] raster-api & ncWMS documentation (beter) schrijven 

SHOULD HAVE

WANT HAVE
- [] Smaller laptops, overlay timeseries  form with chart
- [] loading icon (callback)


COULD HAVE
- [] Database contains also totals for the whole world, allow these also to be plotted -> wait until potetial regions are chosen
- [] logarthmic y axis


Overdracht:
Changing Backend:
Within the 'docker-compose.yml', change the volume locations (It is clearly stated where a change might be necessary)
Changing the Frontend:
- To change a year, change the value in .env
- To change homepage content:
    - To change the Left (blue) part: change Jubmotron within src/Home.js 
    - To change the Right (Era Text): change the periodText from desired period 