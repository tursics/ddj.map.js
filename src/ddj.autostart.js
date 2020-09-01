/*jslint browser: true*/
/*global L,window,XMLHttpRequest,history*/

// -----------------------------------------------------------------------------

import * as tools from './ddj.tools';

// -----------------------------------------------------------------------------

const store = {
	selectedItem: null,
	onDoneCallback: null,
}

export default {
	store
}

// -----------------------------------------------------------------------------

function getJSON(uri, successCallback) {
	var promiseObject = {
		onDone: null,
		onFail: null,
		onAlways: null,

		done: function(callback) {
			this.onDone = callback;
			return this;
		},
		fail: function(callback) {
			this.onFail = callback;
			return this;
		},
		always: function(callback) {
			this.onAlways = callback;
			return this;
		},
	};

	var request = new XMLHttpRequest();
	request.open('GET', uri, true);

	request.onreadystatechange = function() {
		if (this.readyState === 4) {
			if (this.status >= 200 && this.status < 400) {
				var data = JSON.parse(this.responseText);
				if (successCallback) {
					successCallback(data);
				}
				if (promiseObject.onDone) {
					promiseObject.onDone(data);
				}
				if (promiseObject.onAlways) {
					promiseObject.onAlways();
				}
			} else {
				if (promiseObject.onFail) {
					promiseObject.onFail(/*jqxhr*/null, /*textStatus*/'', /*error*/null);
				}
				if (promiseObject.onAlways) {
					promiseObject.onAlways();
				}
			}
		}
	};

	request.send();
	request = null;

	return promiseObject;
}

// -----------------------------------------------------------------------------

function cleanURI() {
	if (window.location.hash) {
		history.replaceState(null, null, ' ');
	}
}

// -----------------------------------------------------------------------------

function updateMapSelectItem(data) {
	store.selectedItem = data;

	ddj.quickinfo.show(store.selectedItem);
}

// -----------------------------------------------------------------------------

function selectSuggestion(selection) {
	var key, val, data = ddj.getData(), uniqueId = ddj.getUniqueIdentifier();

	for (key = 0; key < data.length; ++key) {
		val = data[key];

		if (val && (val[uniqueId] === selection)) {
			if (val.lat && val.lng) {
				ddj.getMap().panTo(new L.LatLng(val.lat, val.lng));
			}
			updateMapSelectItem(ddj.getAllObjects(val));

			return;
		}
	}
}

// -----------------------------------------------------------------------------

function onPageShow() {
	var dataUris = tools.getMetaContentArray('ddj:data'),
		dataIgnoreSecondLines = tools.getMetaContentArray('ddj:dataIgnoreSecondLine'),
		dataIgnoreLastLines = tools.getMetaContentArray('ddj:dataIgnoreLastLine'),
		dataUniqueIdentifier = tools.getMetaContent('ddj:dataUniqueIdentifier') || '';

	function onDone() {
		ddj.quickinfo.autostart();

		ddj.marker.autostart({
			onClick: function (latlng, data) {
				updateMapSelectItem(data);
			},
		});

		ddj.search.autostart({
			onClick: function (data) {
				selectSuggestion(data);
			},
		});

		ddj.showSelection('.visibleWithoutData', false);
		ddj.showSelection('.visibleWithData', true);
	}

	function onFail() {
		ddj.showSelection('.visibleWithoutErrors', false);
		ddj.showSelection('.visibleWithErrors', true);
	}

	function onAlways() {
		if (store.onDoneCallback) {
			store.onDoneCallback();
		}
	}

	function loadData(index) {
		if (index < dataUris.length) {
			var dataUri = dataUris[index] + '?nocache=' + (new Date().getTime()),
				dataIgnoreSecondLine = (index < dataIgnoreSecondLines.length ? dataIgnoreSecondLines[index] : '') === 'true',
				dataIgnoreLastLine = (index < dataIgnoreLastLines.length ? dataIgnoreLastLines[index] : '') === 'true';

			getJSON(dataUri, function (jsonObject) {
				var data = jsonObject;

				if (dataIgnoreSecondLine) {
					data.shift();
				}
				if (dataIgnoreLastLine) {
					data.pop();
				}

				ddj.init(data);

				if (dataUniqueIdentifier !== '') {
					ddj.setUniqueIdentifier(dataUniqueIdentifier);
				}
			}).done(function() {
				loadData(index + 1);
			}).fail(function() {
				onFail();
				onAlways();
			});
		} else {
			if (index > 0) {
				onDone();
			}
			onAlways();
		}						
	}

	cleanURI();

	store.selectedItem = null;
	tools.setSelectionValue('[data-search="textinput"]', '');

	ddj.map.autostart();
	ddj.mapcontrols.autostart();
	ddj.tutorial.autostart();

	loadData(0);
}

// -----------------------------------------------------------------------------

if (!tools.default.store.eventPageShowWasSet) {
	tools.default.store.eventPageShowWasSet = true;

	window.addEventListener('pageshow', onPageShow);
}

// -----------------------------------------------------------------------------

export function onDone(callback) {
	store.onDoneCallback = callback;
}

// -----------------------------------------------------------------------------
