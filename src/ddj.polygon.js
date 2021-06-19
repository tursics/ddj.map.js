/*jslint browser: true*/
/*global L,console*/

// -----------------------------------------------------------------------------

import * as tools from './ddj.tools';

// -----------------------------------------------------------------------------

const store = {
	versionLeaflet: 0
}

export default store;

// -----------------------------------------------------------------------------

const settings = {
	layers: []
};

const settingsTemplate = {
	onStyle: function (data, style) {
		return style;
	},
	onMarkerStyle: function (data, style) {
		return style;
	},
	onFilter: function (data) {
		return true;
	}
};

// -----------------------------------------------------------------------------

export function canInit() {
	if ((typeof L === 'undefined') || (L === null)) {
		return false;
	}

	store.versionLeaflet = parseInt(L.version.split('.')[0], 10);

	if (0 === store.versionLeaflet) {
		return false;
	}

	return true;
}

// -----------------------------------------------------------------------------

export function init(initialSettings) {
	if (0 !== store.versionLeaflet) {
		return;
	}
	if (!canInit()) {
		console.error('Error: Please include leaflet.js version 1 or above in your html file.');
		return;
	}

	var key;

	if ((initialSettings !== null) && (typeof (initialSettings) === 'object')) {
		for (key in initialSettings) {
			if (initialSettings.hasOwnProperty(key) && settings.hasOwnProperty(key)) {
				settings[key] = initialSettings[key];
			}
		}
	}

	update();
	push(initialSettings);
}

// -----------------------------------------------------------------------------

export function update() {
}

// -----------------------------------------------------------------------------

export function push(layerSettings) {
	if (ddj.getRowData().length === 0) {
		return;
	}

	var key, val, layer = settings.layers.length, style, markerStyle;

	settings.layers.push({});

	for (key in settingsTemplate) {
		if (settingsTemplate.hasOwnProperty(key)) {
			settings.layers[layer][key] = settingsTemplate[key];
		}
	}
	if ((layerSettings !== null) && (typeof (layerSettings) === 'object')) {
		for (key in layerSettings) {
			if (layerSettings.hasOwnProperty(key) && settingsTemplate.hasOwnProperty(key)) {
				settings.layers[layer][key] = layerSettings[key];
			}
		}
	}

	val = ddj.getRowData()[0];
	style = {
		color: '#1f78b4',
		fillColor: '#1f78b4',
		fillOpacity: 0.5,
		weight: 1
	};
	markerStyle = {
		radius: 5,
		fillColor: "#1f78b4",
		fillOpacity: 0.5,
		weight: 1,
		opacity: 1
	};

	if (val.geometry && val.properties && (val.geometry.type === 'Polygon')) {
		L.geoJSON(ddj.getRowData(), {
			style: function (data) {
				if (settings.layers[layer].onStyle) {
					return settings.layers[layer].onStyle(data.properties, style);
				}
				return style;
			},
			pointToLayer: function (data, latlng) {
				var applyStyle = markerStyle;
				if (settings.layers[layer].onMarkerStyle) {
					applyStyle = settings.layers[layer].onMarkerStyle(data, applyStyle);
				}

				return L.circleMarker(latlng, applyStyle);
			},
			onEachFeature: function (feature, layer) {
				layer.bindPopup(feature.properties.type);
/*						layer.on({
					click: function (e) {
						console.log(e);
					}
				});*/
/*						layer.on('mouseover', function (e) {
					console.log(e);
				});*/
				layer.on({
					mouseover: function (e) {
						console.log(e);
					},
					mouseout: function (e) {
						console.log(e);
					}
				});
			},
			filter: function (feature) {
				if (settings.layers[layer].onFilter) {
					return settings.layers[layer].onFilter(feature.properties);
				}
				return true;
			}
		}).bindPopup(function (layer) {
			console.log(layer);
			return layer.feature.properties.description;
		}).addTo(ddj.getMap());
	}
}

// -----------------------------------------------------------------------------

export function autostart(options) {

	const dataTypes = tools.getMetaContentArray('ddj:dataType');
	const index = 0;
	const dataType = (index < dataTypes.length ? dataTypes[index] : '').toLowerCase();

	if (dataType === 'geojson') {
		if (canInit()) {
			init({});
		} else {
			console.error('Error: Please include leaflet.js version 1 or above in your html file.');
		}
	}
}

// -----------------------------------------------------------------------------
