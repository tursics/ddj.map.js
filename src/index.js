/*jslint browser: true*/
/*global */

// -----------------------------------------------------------------------------

import tools from './ddj.tools';

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
