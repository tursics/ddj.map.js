/*jslint browser: true*/
/*global document */

// -----------------------------------------------------------------------------

import * as data from './ddj.data';

// -----------------------------------------------------------------------------

const store = {
};

export default store;

// -----------------------------------------------------------------------------

export function getMetaContent(name) {
	var metaTag = document.querySelector('meta[name="' + name + '"]');

	if (metaTag) {
		return metaTag.content || '';
	}

	return '';
}

// -----------------------------------------------------------------------------

export function getMetaContentArray(name) {
	var metaTag = document.querySelectorAll('meta[name="' + name + '"]'),
		content = [];

	if (metaTag) {
		for (var m = 0; m < metaTag.length; ++m) {
			content.push(metaTag[m].content || '');
		}

	}

	return content;
}

// -----------------------------------------------------------------------------

export function showSelection(selector, show) {
	var query, s;

	selector = selector || '';
	query = document.querySelectorAll(selector);

	for (s = 0; s < query.length; ++s) {
		query[s].style.display = show ? 'block' : 'none';
	}
}

// -----------------------------------------------------------------------------

export function getSelectionValue(selector) {
	if (selector) {
		var query = document.querySelectorAll(selector);

		if (query.length > 0) {
			return query[0].value;
		}
	}

	return '';
}

// -----------------------------------------------------------------------------

export function setSelectionValue(selector, value) {
	var query, s;

	selector = selector || '';
	query = document.querySelectorAll(selector);

	for (s = 0; s < query.length; ++s) {
		query[s].value = value;
	}
}

// -----------------------------------------------------------------------------

export function getSelectionHTML(selector) {
	if (selector) {
		var query = document.querySelectorAll(selector);

		if (query.length > 0) {
			return query[0].innerHTML;
		}
	}

	return '';
}

// -----------------------------------------------------------------------------

export function getAllObjects(obj) {
	var u, allObjects = [], id = data.getUniqueIdentifier();

	if (id === null) {
		return obj;
	}

	for (u = 0; u < data.default.userData.length; ++u) {
		if (data.default.userData[u][id] === obj[id]) {
			allObjects.push(data.default.userData[u]);
		} else {
			for (var f = 0; f < data.default.userData[u].length; ++f) {
				var feat = data.default.userData[u][f];
				if (feat && (feat.type === 'Feature') && feat.properties && (feat.properties[id] === obj[id])) {
					allObjects.push(feat);
				}
			}
		}
	}

	if (allObjects.length === 1) {
		return allObjects[0];
	}

	return allObjects;
}

// -----------------------------------------------------------------------------
