import {Stroke, Style, Fill} from 'ol/style'

import countries from "i18n-iso-countries"   /* Package mapping countries to ISO codes */
import language from "i18n-iso-countries/langs/en.json"   /* Retrieve English language to allow display in English */
countries.registerLocale(language);   /* Display contries in the correct language */

import {map} from "./create_map";

export const selected = []
export const isoCodes = []

export function allowSelection(){
    const highlightStyle = new Style({
     fill: new Fill({
            color: '#EEEEE',
        }),
        stroke: new Stroke({
            color: '#3399CC',
            width: 2,
        }),
    });

    const amtSelected = document.getElementById('amt-selected')
    const countryLst = document.getElementById('country-list')
    
    // When clicking on the map, for each picture at click location
    map.on('singleclick', function (e) {
        map.forEachFeatureAtPixel(e.pixel, function (f) {
            const countryName = document.createTextNode(f.values_.ADMIN)   /* Create textnode from country name */
            var isoCode = parseInt(countries.alpha3ToNumeric(f.values_.ISO_A3), 10).toString()   /* Retrieve isoCode, without leading 0's */
            if (['728', '729'].includes(isoCode)) {isoCode = '736'}   /* Fix the Sudan case manually */
            if (!selected.includes(f)) {   
                selected.push(f);
                f.setStyle(highlightStyle);   /* Style as a highlighted item */
                isoCodes.push(isoCode)   /* Append isocode to the array, see i18n-iso-countries examples */

                const newCountry = document.createElement('li')
                newCountry.appendChild(countryName)
                countryLst.appendChild(newCountry)

            } else {
                selected.splice(selected.indexOf(f), 1);   /* Remove f from selected */
                f.setStyle(undefined);   /* Remove highlighted style */
                
                // Remove correct isocode
                isoCodes.splice(isoCodes.indexOf(isoCode), 1)

                const listItems = countryLst.getElementsByTagName('li');

                /* Iterate over list items and remove the one that is deselected */
                for (let i = 0; i < listItems.length; i++) {
                    if (listItems[i].textContent === countryName.textContent) {
                        countryLst.removeChild(listItems[i]);
                        break;
                    }
                }   
                
            }
        });
        /* Display ammount of countries that are selected */
        amtSelected.innerText = selected.length + ' countries selected'
    })
}