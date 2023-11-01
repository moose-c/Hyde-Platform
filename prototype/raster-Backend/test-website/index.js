import { plotMap, changeOverlay, alternativeChangeOverlay } from './modules/plot_map';
import { yearnum_lst, yearval_lst, years } from './modules/create_data'
import { printFeatureInfo } from './modules/print_feature_info'

// Is reacted
plotMap()
window.year = 0
window.currentLayers = NaN
window.layerName = NaN

// TODO
window.map.on('singleclick', function (e) {
  printFeatureInfo(e.pixel)
})

const radioButtons = document.querySelectorAll("input[type='radio']");
radioButtons.forEach(function (radioButton) {
  radioButton.addEventListener("change", function () {
    if (this.checked) {
      window.layerName = this.value;
      // changeOverlay relies on ncWMS, and attempts to use this to plot the rasters
      // alternativeChangeOverlay relies on geoserver, and is used to see the merits of geoserver, and the difference in speed between ascii and netcdf
      alternativeChangeOverlay()
    }
  });
});


const yearRange = document.getElementById("year-range")
const yearDisplay = document.getElementById("year-display")
yearRange.addEventListener("input", function () {
  yearDisplay.innerText = years[yearval_lst[this.value]]
})
yearRange.addEventListener("change", function () {
  window.year = yearnum_lst[this.value]
  radioButtons.forEach((button) => {
    if (button.checked) {
      window.layerName = button.value
      // changeOverlay relies on ncWMS, and attempts to use this to plot the rasters
      // alternativeChangeOverlay relies on geoserver, and is used to see the merits of geoserver, and the difference in speed between ascii and netcdf
      alternativeChangeOverlay()
    }
  })
})


var xmlhttp = new XMLHttpRequest();
xmlhttp.open("POST","http://127.0.0.1:4000/geoserver/ows?service=wps");
var xmlDoc;
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    xmlDoc = xmlhttp.responseXML;
    console.log(xmlDoc);
    }
};
xmlhttp.setRequestHeader('Content-Type', 'text/xml');
var xml = `<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
<ows:Identifier>gs:Download</ows:Identifier>
<wps:DataInputs>
 <wps:Input>
  <ows:Identifier>layerName</ows:Identifier>
  <wps:Data>
   <wps:LiteralData>nurc:Img_Sample</wps:LiteralData>
  </wps:Data>
 </wps:Input>
 <wps:Input>
  <ows:Identifier>outputFormat</ows:Identifier>
  <wps:Data>
   <wps:LiteralData>image/tiff</wps:LiteralData>
  </wps:Data>
 </wps:Input>
 <wps:Input>
  <ows:Identifier>targetCRS</ows:Identifier>
  <wps:Data>
   <wps:LiteralData>EPSG:4326</wps:LiteralData>
  </wps:Data>
 </wps:Input>
 <wps:Input>
  <ows:Identifier>targetSizeX</ows:Identifier>
  <wps:Data>
   <wps:LiteralData>80</wps:LiteralData>
  </wps:Data>
 </wps:Input>
 <wps:Input>
  <ows:Identifier>targetSizeY</ows:Identifier>
  <wps:Data>
   <wps:LiteralData>80</wps:LiteralData>
  </wps:Data>
 </wps:Input>
</wps:DataInputs>
<wps:ResponseForm>
 <wps:RawDataOutput mimeType="application/zip">
  <ows:Identifier>result</ows:Identifier>
 </wps:RawDataOutput>
</wps:ResponseForm>
</wps:Execute>";`
xmlhttp.send(xml);
