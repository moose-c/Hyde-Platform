import {Stroke, Style, Fill} from 'ol/style'

import countries from "i18n-iso-countries"
import language from "i18n-iso-countries/langs/en.json"
countries.registerLocale(language);

import {map} from "./create_map";

export const selected = []
export const iso_codes = []

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

    const amtSelected = document.getElementById('amt-selected');
    const countryLst = document.getElementById('country-list')
    const formBox = document.getElementById('timeseries-form-box') 

    map.on('singleclick', function (e) {
        map.forEachFeatureAtPixel(e.pixel, function (f) {
            const selIndex = selected.indexOf(f);
            const countryName = document.createTextNode(f.values_.ADMIN)
            if (selIndex < 0) {
                selected.push(f);
                f.setStyle(highlightStyle);
                iso_codes.push(parseInt(countries.alpha3ToNumeric(f.values_.ISO_A3), 10).toString())

                const newCountry = document.createElement('li')
                newCountry.appendChild(countryName)
                countryLst.appendChild(newCountry)

            } else {
                selected.splice(selIndex, 1);
                f.setStyle(undefined);
                
                iso_codes.pop(countries.alpha3ToNumeric(f.values_.ISO_A3))

                const listItems = countryLst.getElementsByTagName('li');

                for (let i = 0; i < listItems.length; i++) {
                    if (listItems[i].textContent === countryName.textContent) {
                        countryLst.removeChild(listItems[i]);
                        break;
                    }
                }   
                
            }
            console.log(iso_codes)
        });
        amtSelected.innerText = selected.length + ' countries selected'
    })
}