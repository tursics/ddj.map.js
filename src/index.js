/*jslint browser: true*/
/*global */

// -----------------------------------------------------------------------------

import tools from './ddj.tools';

// -----------------------------------------------------------------------------

function init(userData) {
	ddj.store.userData = userData;

	// use geojson file
	if (userData && userData.type && (userData.type === 'FeatureCollection') && userData.features) {
		ddj.store.userData = userData.features;
	}

	String.prototype.startsWith = String.prototype.startsWith || function (prefix) {
		return this.indexOf(prefix) === 0;
	};

	if (typeof Array.isArray === 'undefined') {
		Array.isArray = function (obj) {
			return Object.prototype.toString.call(obj) === '[object Array]';
		};
	}
}

// -----------------------------------------------------------------------------

function getMap() {
	return ddj.store.map;
}

// -----------------------------------------------------------------------------

function setMap(map) {
	ddj.store.map = map;
}

// -----------------------------------------------------------------------------

function getMapDOMName() {
	return ddj.store.mapDOMelementID;
}

// -----------------------------------------------------------------------------

function setMapDOMName(name) {
	ddj.store.mapDOMelementID = name;
}

// -----------------------------------------------------------------------------

function getRowData(key) {
	if (typeof key === 'undefined') {
		return ddj.store.userData;
	}
	if (key === null) {
		return ddj.store.userData;
	}

	return ddj.store.userData[key];
}

// -----------------------------------------------------------------------------

function getData(key) {
	var data = ddj.getRowData(key);

	// use geojson file
	if (data && data.geometry && data.properties) {
		data = data.properties;
	}

	return data;
}

// -----------------------------------------------------------------------------

function getUniqueIdentifier () {
	var id = ddj.store.uniqueIdentifier;

	if ((typeof id === 'undefined') || (id === undefined) || (id === null) || (id === '')) {
		return null;
	}

	return id;
}

// -----------------------------------------------------------------------------

function setUniqueIdentifier(identifier) {
	ddj.store.uniqueIdentifier = identifier;
}

// -----------------------------------------------------------------------------

function getAllObjects(obj) {
	var u, allObjects = [], id = ddj.getUniqueIdentifier();

	if (id === null) {
		return obj;
	}

	for (u = 0; u < ddj.store.userData.length; ++u) {
		if (ddj.store.userData[u][id] === obj[id]) {
			allObjects.push(ddj.store.userData[u]);
		}
	}

	if (allObjects.length === 1) {
		return allObjects[0];
	}

	return allObjects;
}

// -----------------------------------------------------------------------------

const ddj2 = function() {
	return {
		// methods
		init,
		getMap,
		setMap,
		getMapDOMName,
		setMapDOMName,
		getRowData,
		getData,
		getUniqueIdentifier,
		setUniqueIdentifier,
		getAllObjects,

		// modules
		tools,
	};
}

// -----------------------------------------------------------------------------

import * as autostart from './ddj.autostart';
//export autostart;

// -----------------------------------------------------------------------------
