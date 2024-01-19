MUST HAVE
- [] Indicator value at popup
- [] multiple countries in 1 graph!!!
- [] Displayed, or All option. Make 1 grey!
- [] Select box does not change global year value!!
- [] map now europe cut off. Iets met herhalende images?
- [] text bij tip is wel prima, maar kan wel weg nadat er eenmail een land is geselecteerd
- [] ‘Grazing land’ in de grafiek op de frontpage laten zien, samen met Cropland.
- [] pixel value box doesn't disappear when selecing new year/indicator
- [] Full name on homepage!  
- [] Initial text more clearly explain what the purposes of the homepage and the portal is.
- [] Britta wants geotiff export
- [] [inh] is unclear
- [] relative to absolute doesn't need go to first graph.
- [] clear graph, X button
- [] years is behind the old graph
- [] Mask for each country (is supposed to be on Yoda)? Mask for pixel sizes? ADD mask in export of maps




SHOULD HAVE
- [] display current year indicator values
- [] 'tick marks to distinguish ttime periods'. 'line of years, and the below all of the eras'
- [] On moving the map, selected a country
- [] Box stays in the same place on draging the map
- [] Why is timeseries a seperate map?

WANT HAVE
Modal Changes:
- which ind available?
-  ‘Using this portal you can select countries,
download raw data for a time series, and export maps for specific
years”
- [] Change (last) Modal Image
- [] 'doesn't look like a slidebar, looks like buttons'.
- [] Box around different values, at high zoom levels can't distinguish pixels
click presentation to do public outreach!
- [] Tried to move dot.
- [] Year is pretty far away from the timeline.

COULD HAVE
- [] Database contains also totals for the whole world, allow these also to be plotted -> wait until potetial regions are chosen
- [] Clip to countries, perhaps use print screen?
-[] How big is a cell?
Value for pasture land? 
cell at equator are larger than at poles. Can this be computed on the fly? ncWMS
- [] more immediate data portal for familiar users -> copernicus data portal

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