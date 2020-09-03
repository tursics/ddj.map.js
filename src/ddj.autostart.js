/*jslint browser: true*/
/*global L,window,XMLHttpRequest,history*/

// -----------------------------------------------------------------------------

import * as data from './ddj.data';
import * as map from './ddj.map';
import * as mapcontrols from './ddj.mapcontrols';
import * as quickinfo from './ddj.quickinfo';
import * as tools from './ddj.tools';
import * as tutorial from './ddj.tutorial';

// -----------------------------------------------------------------------------

const store = {
	selectedItem: null,
	onDoneCallback: null,
}

export default store;

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
				var jsonData = JSON.parse(this.responseText);
				if (successCallback) {
					successCallback(jsonData);
				}
				if (promiseObject.onDone) {
					promiseObject.onDone(jsonData);
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

function updateMapSelectItem(selectedItem) {
	store.selectedItem = selectedItem;

	quickinfo.show(store.selectedItem);
}

// -----------------------------------------------------------------------------

function selectSuggestion(selection) {
	var key, val, items = ddj.getData(), uniqueId = data.getUniqueIdentifier();

	for (key = 0; key < items.length; ++key) {
		val = items[key];

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
		quickinfo.autostart();

		ddj.marker.autostart({
			onClick: function (latlng, item) {
				updateMapSelectItem(item);
			},
		});

		ddj.search.autostart({
			onClick: function (item) {
				selectSuggestion(item);
			},
		});

		tools.showSelection('.visibleWithoutData', false);
		tools.showSelection('.visibleWithData', true);
	}

	function onFail() {
		tools.showSelection('.visibleWithoutErrors', false);
		tools.showSelection('.visibleWithErrors', true);
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
				var jsonData = jsonObject;

				if (dataIgnoreSecondLine) {
					jsonData.shift();
				}
				if (dataIgnoreLastLine) {
					jsonData.pop();
				}

				data.init(jsonData);

				if (dataUniqueIdentifier !== '') {
					data.setUniqueIdentifier(dataUniqueIdentifier);
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
	map.autostart();
	mapcontrols.autostart();
	tutorial.autostart();

	loadData(0);
}

// -----------------------------------------------------------------------------

if (!tools.default.eventPageShowWasSet) {
	tools.default.eventPageShowWasSet = true;

	window.addEventListener('pageshow', onPageShow);
}

// -----------------------------------------------------------------------------

export function onDone(callback) {
	store.onDoneCallback = callback;
}

// -----------------------------------------------------------------------------
