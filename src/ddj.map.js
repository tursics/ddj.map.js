/*jslint browser: true*/
/*global L,document,console*/

// -----------------------------------------------------------------------------

import * as tools from './ddj.tools';

// -----------------------------------------------------------------------------

const store = {
	map: null,
	mapDOMelementID: '',
}

export default store;

// -----------------------------------------------------------------------------

const settings = {
	mapboxId: 'tursics.l7ad5ee8',
	mapboxToken: 'pk.eyJ1IjoidHVyc2ljcyIsImEiOiI1UWlEY3RNIn0.U9sg8F_23xWXLn4QdfZeqg',
	attribution: '',
	centerLat: 52.518413,
	centerLng: 13.408368,
	zoom: 13,
	onFocusOnce: null,
	onZoomed: null,
	onMoved: null
};

// -----------------------------------------------------------------------------

String.prototype.startsWith = String.prototype.startsWith || function (prefix) {
	'use strict';

	return this.indexOf(prefix) === 0;
};

// -----------------------------------------------------------------------------

export function get() {
	return store.map;
}

// -----------------------------------------------------------------------------

export function set(map) {
	store.map = map;
}

// -----------------------------------------------------------------------------

export function getDOMName() {
	return store.mapDOMelementID;
}

// -----------------------------------------------------------------------------

export function setDOMName(name) {
	store.mapDOMelementID = name;
}

// -----------------------------------------------------------------------------

export function init(elementName, initialSettings) {
	if (null !== get()) {
		return;
	}
	if ((typeof L === 'undefined') || (L === null)) {
		console.error('Error: Please include leaflet.js in your html file.');
		return;
	}

	var key, mapboxTiles, attribution = [];

	if ((initialSettings !== null) && (typeof (initialSettings) === 'object')) {
		for (key in initialSettings) {
			if (initialSettings.hasOwnProperty(key) && settings.hasOwnProperty(key)) {
				settings[key] = initialSettings[key];
			}
		}
	}

	attribution.push('<a href="http://www.openstreetmap.org" target="_blank">OpenStreetMap-Mitwirkende</a>');
	attribution.push('<a href="https://www.mapbox.com" target="_blank">Mapbox</a>');
	if (settings.attribution !== '') {
		attribution.push(settings.attribution);
	}

	mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v4/' + settings.mapboxId + '/{z}/{x}/{y}.png?access_token=' + settings.mapboxToken, {
		attribution: attribution.join(', ')
	});

	setDOMName(elementName);
	set(L.map(elementName, {zoomControl: false, scrollWheelZoom: true})
		.addLayer(mapboxTiles)
		.setView([settings.centerLat, settings.centerLng], settings.zoom));

	get().addControl(L.control.zoom({ position: 'bottomright'}));
	get().once('focus', function () {
		if (settings.onFocusOnce) {
			settings.onFocusOnce();
		}
	});
	get().on('zoomend', function () {
		if (settings.onZoomed) {
			settings.onZoomed();
		}
	});
	get().on('moveend', function () {
		if (settings.onMoved) {
			settings.onMoved();
		}
	});
}

// -----------------------------------------------------------------------------

export function autostart() {
	var elementId = 'map',
		element = document.getElementById(elementId),
		mapCenter = tools.getMetaContent('ddj:mapCenter'),
		attribution = element.getElementsByClassName('attribution') || [];

	if (element && (mapCenter.split(',').length === 2)) {
		init(elementId, {
			mapboxId: tools.getMetaContent('ddj:mapboxId'),
			mapboxToken: tools.getMetaContent('ddj:mapboxToken'),
			attribution: attribution.length > 0 ? attribution[0].innerHTML : '',
			centerLat: mapCenter.split(',')[0].trim(),
			centerLng: mapCenter.split(',')[1].trim(),
			zoom: tools.getMetaContent('ddj:mapZoom'),
		});
	}
}

// -----------------------------------------------------------------------------
