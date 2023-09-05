import { plotMap, changeOverlay } from './modules/plot_map';
import { yearnum_lst, yearval_lst, years } from './modules/create_data'

var map = plotMap()
var current_layer = 0
var year = 0

const radioButtons = document.querySelectorAll("input[type='radio']");
radioButtons.forEach(function(radioButton) {
    radioButton.addEventListener("change", function() {
      if (this.checked) {
        const selectedValue = this.value;
        current_layer = changeOverlay(map, current_layer, selectedValue, year);
        
      }
    });
  });

const yearRange = document.getElementById("year-range")
const yearDisplay = document.getElementById("year-display")
yearRange.addEventListener("input", function() {
  yearDisplay.innerText = years[yearval_lst[this.value]]
})
yearRange.addEventListener("change", function() {
  year = yearnum_lst[this.value]
  radioButtons.forEach((button) => {
    if (button.checked) {
      const selectedValue = button.value
      current_layer = changeOverlay(map, current_layer, selectedValue, year)
    }
  })
})
