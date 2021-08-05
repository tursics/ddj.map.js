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
	mapboxToken: '',
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

export function canInit() {
	if ((typeof L === 'undefined') || (L === null)) {
		return false;
	}
	return true;
}

// -----------------------------------------------------------------------------

export function init(elementName, initialSettings) {
	if (null !== get()) {
		return;
	}
	if (!canInit()) {
		console.error('Error: Please include leaflet.js in your html file.');
		return;
	}

	var key, tileLayer, attribution = [], attributionOSM;

	if ((initialSettings !== null) && (typeof (initialSettings) === 'object')) {
		for (key in initialSettings) {
			if (initialSettings.hasOwnProperty(key) && settings.hasOwnProperty(key)) {
				settings[key] = initialSettings[key];
			}
		}
	}

	if (document.documentElement.lang === 'de') {
		attributionOSM = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>-Mitwirkende';
	} else {
		attributionOSM = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors';
	}

	if (settings.mapboxToken !== '') {
		attribution.push(attributionOSM);
		attribution.push('<a href="https://www.mapbox.com" target="_blank">Mapbox</a>');
		if (settings.attribution !== '') {
			attribution.push(settings.attribution);
		}

		tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
			attribution: attribution.join(', '),
			tileSize: 512,
			zoomOffset: -1,
			id: 'mapbox/streets-v11',
			accessToken: settings.mapboxToken,
		});
	} else {
		attribution.push(attributionOSM);
		if (settings.attribution !== '') {
			attribution.push(settings.attribution);
		}

		tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: attribution.join(', '),
			maxZoom: 19,
		});
	}

	setDOMName(elementName);
	set(L.map(elementName, {zoomControl: false, scrollWheelZoom: true})
		.addLayer(tileLayer)
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
	var maps = [], maps_ = document.querySelectorAll('[data-map]') || [],
		attributions = document.querySelectorAll('[data-map="attribution"]') || [],
		mapCenters = tools.getMetaContentArray('ddj:mapCenter'),
		mapboxTokens = tools.getMetaContentArray('ddj:mapboxToken'),
		mapZooms = tools.getMetaContentArray('ddj:mapZoom');

	for (var m = 0; m < maps_.length; ++m) {
		var map = maps_[m];
		if ('' === map.getAttribute('data-map')) {
			maps.push(map);
		}
	}
	console.log(maps);
	console.log(attributions);
	console.log(mapCenters);
	console.log(mapboxTokens);
	console.log(mapZooms);

	for (var id = 0; id < maps.length; ++id) {
		if (maps[id] && (mapCenters.length > id) && (mapCenters[id].split(',').length === 2)) {
			maps[id].id = 'mapid' + id;
			init(maps[id].id, {
				mapboxToken: mapboxTokens.length > id ? mapboxTokens[id] : '',
				attribution: attributions.length > id ? attributions[id].innerHTML : '',
				centerLat: mapCenters[id].split(',')[0].trim(),
				centerLng: mapCenters[id].split(',')[1].trim(),
				zoom: mapZooms.length > id ? mapZooms[id] : '',
			});
		}
	}
}

// -----------------------------------------------------------------------------
