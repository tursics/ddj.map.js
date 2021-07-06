/*jslint browser: true*/
/*global $,window*/

// -----------------------------------------------------------------------------

const store = {
	userData: [],
	page: null,
	uniqueIdentifier: null,
}

export default store;

// -----------------------------------------------------------------------------

const settings = {
};

// -----------------------------------------------------------------------------

export function count() {
	return store.userData.length;
}

// -----------------------------------------------------------------------------

export function getRow(key) {
	if (store.page === null) {
		return null;
	}
	if (typeof key === 'undefined') {
		return store.userData[store.page];
	}
	if (key === null) {
		return store.userData[store.page];
	}

	return store.userData[store.page][key];
}

// -----------------------------------------------------------------------------

export function get(key) {
	var data = getRow(key);

	// use geojson file
	if (data && data.geometry && data.properties) {
		data = data.properties;
	}

	return data;
}

// -----------------------------------------------------------------------------

export function init(userData) {
	store.page = store.userData.length;
	store.userData[store.page] = userData;

	// use geojson file
	if (userData && userData.type && (userData.type === 'FeatureCollection') && userData.features) {
		store.userData[store.page] = userData.features;
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

export function getUniqueIdentifier () {
	var id = store.uniqueIdentifier;

	if ((typeof id === 'undefined') || (id === undefined) || (id === null) || (id === '')) {
		return null;
	}

	return id;
}

// -----------------------------------------------------------------------------

export function setUniqueIdentifier(identifier) {
	store.uniqueIdentifier = identifier;
}

// -----------------------------------------------------------------------------
