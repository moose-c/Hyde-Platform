import './style.css';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import {Select} from 'ol/interaction.js'

const map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new OSM(),
            style: function (feature) {
                const color = feature.get('COLOR_BIO') || '#eeeeee';
                style.getFill().setColor(color);
                return style;
            }
        }),
    ],
    view: new View({
        center: [0, 0],
        zoom: 2,
    }),
});

const select = new Select({
    style: function (feature) {
        const color = feature.get('COLOR_BIO') || '#eeeeee';
        selectedStyle.getFill().setColor(color);
        return selectedStyle;
    },
});
map.addInteraction(select);

const selectedFeatures = select.getFeatures();

const infoBox = document.getElementById('info');

selectedFeatures.on(['add', 'remove'], function () {
    const names = selectedFeatures.getArray().map(function (feature) {
        return feature.get('ECO_NAME');
    });
    if (names.length > 0) {
        infoBox.innerHTML = names.join(', ');
    } else {
        infoBox.innerHTML = 'None';
    }
});