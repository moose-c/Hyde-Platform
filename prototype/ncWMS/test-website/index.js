import { plotMap, changeOverlay } from './modules/plot_map';

var map = plotMap()
var current_layer = 0

const radioButtons = document.querySelectorAll("input[type='radio']");
radioButtons.forEach(function(radioButton) {
    radioButton.addEventListener("change", function() {
      if (this.checked) {
        const selectedValue = this.value;
        current_layer = changeOverlay(map, current_layer, selectedValue);
        
      }
    });
  });