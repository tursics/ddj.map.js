/*jslint browser: true*/
/*global $,window*/

// -----------------------------------------------------------------------------

const store = {
	userData: null,
	uniqueIdentifier: null,
}

export default store;

// -----------------------------------------------------------------------------

const settings = {
};

// -----------------------------------------------------------------------------

export function init(userData) {
	store.userData = userData;

	// use geojson file
	if (userData && userData.type && (userData.type === 'FeatureCollection') && userData.features) {
		store.userData = userData.features;
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
