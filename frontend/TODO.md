MUST HAVE
- [] raster-api & ncWMS documentation (beter) schrijven 
- [] update Modal
- [] FF kijkenn naar ncwms requests, verwijdert nu niet de map als je n andere indicator selecteerd.

SHOULD HAVE
- [] change pixel values --> LU: div-Spectral-inv (blue low, red high), POP: x-Rainbow (blue row, red high)

WANT HAVE
- [] Smaller laptops, overlay timeseries  form with chart
- [] loading icon (callback)


COULD HAVE
- [] Database contains also totals for the whole world, allow these also to be plotted -> wait until potetial regions are chosen
- [] logarthmic y axis

Arian:

Graph:
On load timeseries dot not in the correct spot
To 2023! 
2 lijntjes in Grafiek (Demographic & Agriculture )
Liever iets grotere grafiek (En landbouw erin)
duidelijker puntje
Hockeystick (relative)
Idee, misschien bij X-as op frontpage by total population graph -> tickmarks represent the different time periods?
10000, 3000, 1300, 6000 BCE, 600 BCE, 476 CE (why that particular year?), 1459, 1750, etc etc

Timeline:
To 2023! 
Until --> Before 10.000 BCE

Map:
Legend van .nc vaste (grootste) waarden & Titel (Groter?)
Ook, voor jaar = -10000 geeft geen waarden. (of wel stipjes?)


Jumbotron:
HYDE portal more inviting, Main Event!
smallere jumbotron

Text:
linken naar wikipedia

Structure:
Map jump around depending on amt of text lines
Agriculture & Demographic dev kopjes
Round functie anders, nu eerste waarde die groter is.
BC --> BCE
AD --> CE
Gebruiksvriendelijk, stress testen
Nicer op andere zooms (laptop en monitor heel groot verschil)

Tabel:
Uitwerken




Overdracht:
Changing Backend:
[wat veranderen om apis te laten werken]

Changing the Frontend:
- To change a year, change the value in .env
- To change homepage content:
    - To change the Left (blue) part: change Jubmotron within src/Home.js 
    - To change the Right (Era Text): change the periodText from desired period 