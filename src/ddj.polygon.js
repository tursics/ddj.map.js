/*jslint browser: true*/
/*global L,console*/

// -----------------------------------------------------------------------------

import * as data from './ddj.data';
import * as map from './ddj.map';
import * as tools from './ddj.tools';

// -----------------------------------------------------------------------------

const store = {
	versionLeaflet: 0
}

export default store;

// -----------------------------------------------------------------------------

const settings = {
	layers: [],
	onMouseOver: null,
	onMouseOut: null,
	onClick: null
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
	if (data.getRow().length === 0) {
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

	val = data.getRow()[0];
	style = {
		color: '#1f78b4',
		fillColor: '#1f78b4',
		fillOpacity: 0.5,
		weight: 3
	};
	markerStyle = {
		radius: 5,
		fillColor: "#1f78b4",
		fillOpacity: 0.5,
		weight: 1,
		opacity: 1
	};

	if (val.geometry && val.properties && (-1 !== ['MultiLineString','Polygon','MultiPolygon'].indexOf(val.geometry.type))) {
		L.geoJSON(data.getRow(), {
			style: function (data) {
				try {
					if (settings.layers[layer].onStyle) {
						return settings.layers[layer].onStyle(data.properties, style);
					}
				} catch (x) {
					console.log(x);
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
				layer.on({
					click: function (evt) {
						if (settings.onClick) {
							settings.onClick([evt.latlng.lat, evt.latlng.lng], evt.sourceTarget.feature.properties);
						}
					},
					mouseover: function (evt) {
						if (settings.onMouseOver) {
							settings.onMouseOver([evt.latlng.lat, evt.latlng.lng], evt.sourceTarget.feature.properties);
						}
					},
					mouseout: function (evt) {
						if (settings.onMouseOut) {
							settings.onMouseOut([evt.latlng.lat, evt.latlng.lng], evt.sourceTarget.feature.properties);
						}
					}
				});
			},
			filter: function (feature) {
				if (settings.layers[layer].onFilter) {
					return settings.layers[layer].onFilter(feature.properties);
				}
				return true;
			}
		}).addTo(map.get());
	}
}

// -----------------------------------------------------------------------------

export function autostart(options) {

	const dataTypes = tools.getMetaContentArray('ddj:dataType'),
		borderColor = tools.getMetaContent('ddj:borderColor') || '',
		borderColorColumn = tools.getMetaContent('ddj:borderColorColumn') || '',
		borderWeight = tools.getMetaContent('ddj:borderWeight') || '',
		borderWeightColumn = tools.getMetaContent('ddj:borderWeightColumn') || '',
		fillColor = tools.getMetaContent('ddj:fillColor') || '',
		fillColorColumn = tools.getMetaContent('ddj:fillColorColumn') || '',
		fillOpacity = tools.getMetaContent('ddj:fillOpacity') || '',
		fillOpacityColumn = tools.getMetaContent('ddj:fillOpacityColumn') || '';
	const index = 0;
	const dataType = (index < dataTypes.length ? dataTypes[index] : '').toLowerCase();

	if (dataType === 'geojson') {
		if (canInit()) {
			init({
				onStyle: function (data, style) {
					var value = undefined;

					data.borderColor = style.color;
					if (borderColor !== '') {
						data.borderColor = borderColor;
					}
					if ((borderColorColumn !== '') && data[borderColorColumn]) {
						data.borderColor = data[borderColorColumn];
					}

					data.borderWeight = style.weight;
					if (borderWeight !== '') {
						data.borderWeight = borderWeight;
					}
					if ((borderWeightColumn !== '') && data[borderWeightColumn]) {
						data.borderWeight = data[borderWeightColumn];
					}

					data.fillColor = style.fillColor;
					if (fillColor !== '') {
						data.fillColor = fillColor;
					}
					if ((fillColorColumn !== '') && data[fillColorColumn]) {
						data.fillColor = data[fillColorColumn];
					}

					data.fillOpacity = style.fillOpacity;
					if (fillOpacity !== '') {
						data.fillOpacity = fillOpacity;
					}
					if ((fillOpacityColumn !== '') && data[fillOpacityColumn]) {
						data.fillOpacity = data[fillOpacityColumn];
					}

					if (options.onStyle) {
						options.onStyle(data, value);
					}

					style.color = data.borderColor;
					style.weight = data.borderWeight;
					style.fillColor = data.fillColor;
					style.fillOpacity = data.fillOpacity;

					return style;
				},
				onClick: function (latlng, data) {
					if (options.onClick) {
						options.onClick(latlng, data);
					}
				}	
			});
		} else {
			console.error('Error: Please include leaflet.js version 1 or above in your html file.');
		}
	}
}

// -----------------------------------------------------------------------------
