/*jslint browser: true*/
/*global document, window*/

// -----------------------------------------------------------------------------

const store = {
}

export default store;

// -----------------------------------------------------------------------------

const settings = {
	onInit: function () {
	},
	onLinkClicked: function () {
	},
	onKeyValueLinkClicked: function () {
	}
};

// -----------------------------------------------------------------------------

function getParent(tag, elem) {
	while (elem) {
		if ((elem.nodeName || elem.tagName).toLowerCase() === tag.toLowerCase()) {
			return elem;
		}
		elem = elem.paremtNode;
	}
	return null;
}

// -----------------------------------------------------------------------------

function onLinkClicked(e) {
	var elem = getParent('a', e.target || e.srcElement), key = null, value = null;
	if (elem) {
		key = elem.getAttribute('data-key');
		value = elem.getAttribute('data-value');
	}

	if ((key !== null) && (value !== null) && settings.onKeyValueLinkClicked) {
		return settings.onKeyValueLinkClicked(key, value);
	}

	return true;
}

// -----------------------------------------------------------------------------

function initEvents() {
	document.body.onclick = function (e) {
		e = e || {};

		if (settings.onLinkClicked) {
			if (false === settings.onLinkClicked(e)) {
				e.preventDefault();
			}
		}
	};
}

// -----------------------------------------------------------------------------

export function canInit() {
	return true;
}

// -----------------------------------------------------------------------------

export function init(initialSettings) {
	// default behaviour
	settings.onLinkClicked = onLinkClicked;

	var key;

	if ((initialSettings !== null) && (typeof (initialSettings) === 'object')) {
		for (key in initialSettings) {
			if (initialSettings.hasOwnProperty(key) && settings.hasOwnProperty(key)) {
				settings[key] = initialSettings[key];
			}
		}
	}

	initEvents();

	var queries, params = {}, i, split;
	queries = window.location.search.replace(/^\?/, '').split('&');
	for (i = 0; i < queries.length; ++i) {
		split = queries[i].split('=');
		params[split[0]] = split[1];
	}

	if (settings.onInit) {
		settings.onInit(params);
	}
}

// -----------------------------------------------------------------------------

function composePathname(obj) {
	var key,
		base = window.location.pathname.split('?')[0],
		params = (window.location.href.split('?')[1] || '').split('&'),
		p;

	if ((params.length === 1) && (params[0] === '')) {
		params = [];
	}

	for (key in obj) {
		if (obj.hasOwnProperty(key)) {
			for (p = 0; p < params.length; ++p) {
				if (params[p].split('=')[0] === key) {
					params[p] = key + '=' + obj[key];
					break;
				}
			}
			if (p >= params.length) {
				params.push(key + '=' + obj[key]);
			}
		}
	}

	return base + '?' + params.join('&');
}

// -----------------------------------------------------------------------------

export function replace(obj) {
	var pathname = composePathname(obj);
	window.history.replaceState({}, '', pathname);
}

// -----------------------------------------------------------------------------

export function push(obj) {
	var pathname = composePathname(obj);
	window.history.pushState({}, '', pathname);
}

// -----------------------------------------------------------------------------
