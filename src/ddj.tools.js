/*jslint browser: true*/
/*global document */

// -----------------------------------------------------------------------------

const store = {
	map: null,
	mapDOMelementID: '',
	userData: null,
	uniqueIdentifier: null,
	eventPageShowWasSet: false,
};

export default {
	store
}

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
