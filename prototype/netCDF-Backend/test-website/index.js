import { plotMap, changeOverlay } from './modules/plot_map';
import { yearnum_lst, yearval_lst, years } from './modules/create_data'
import {printFeatureInfo} from './modules/print_feature_info'

plotMap()
window.year = 0
window.currentLayers = NaN
window.layerName = NaN

window.map.on('singleclick', function (e) {
  printFeatureInfo(e.pixel)
})

const radioButtons = document.querySelectorAll("input[type='radio']");
radioButtons.forEach(function(radioButton) {
    radioButton.addEventListener("change", function() {
      if (this.checked) {
        window.layerName = this.value;
        changeOverlay();
      }
    });
  });

const yearRange = document.getElementById("year-range")
const yearDisplay = document.getElementById("year-display")
yearRange.addEventListener("input", function() {
  yearDisplay.innerText = years[yearval_lst[this.value]]
})
yearRange.addEventListener("change", function() {
  window.year = yearnum_lst[this.value]
  radioButtons.forEach((button) => {
    if (button.checked) {
      window.layerName =  button.value
      changeOverlay()
    }
  })
})
