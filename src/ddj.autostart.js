/*jslint browser: true*/
/*global L,window,XMLHttpRequest,history*/

// -----------------------------------------------------------------------------

import * as data from './ddj.data';
import * as map from './ddj.map';
import * as mapcontrols from './ddj.mapcontrols';
import * as marker from './ddj.marker';
import * as quickinfo from './ddj.quickinfo';
import * as search from './ddj.search';
import * as tools from './ddj.tools';
import * as tutorial from './ddj.tutorial';

// -----------------------------------------------------------------------------

const store = {
	selectedItem: null,
	onDoneCallback: null,
	eventPageShowWasSet: false,
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
//
// WFS stuff for later use
// * Mhhh. https://www.npmjs.com/package/leaflet-geoserver-request needs jquery
// * Loading Berlin school data results in an error L.Geoserver.js:101
//
//```
//	<meta name="ddj:data" content="https://fbinter.stadt-berlin.de/fb/wfs/data/senstadt/s_schulen?service=wfs">
//	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
//	<meta name="ddj:wfs" content="true">
//```
//
//npm i leaflet-geoserver-request
//
//import * as geoserver from 'leaflet-geoserver-request';
//
/*function getWFS(uri, successCallback) {
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

	console.log(uri);
	var wfs = L.Geoserver.wfs(uri, {
		layers: `fis:s_schulen`,
		style: {
			color: "red",
			fillOpacity: 0,
			opacity: 1,
			stockWidth: 0.5,
		},
		onEachFeature: function (f, l) {
			l.bindPopup('<pre>'+JSON.stringify(f.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>');
		},
//		CQL_FILTER: `name_rg=='Sughd'`,
		fitLayer: true,
	});
	wfs.addTo(map.get());

	return promiseObject;
}*/

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
	var key, val, items = data.get(), uniqueId = data.getUniqueIdentifier();

	for (key = 0; key < items.length; ++key) {
		val = items[key];

		if (val && (val[uniqueId] === selection)) {
			if (val.lat && val.lng) {
				map.get().panTo(new L.LatLng(val.lat, val.lng));
			}
			updateMapSelectItem(tools.getAllObjects(val));

			return;
		}
	}
}

// -----------------------------------------------------------------------------

function onPageShow() {
	var dataUris = tools.getMetaContentArray('ddj:data'),
		dataIgnoreSecondLines = tools.getMetaContentArray('ddj:dataIgnoreSecondLine'),
		dataIgnoreLastLines = tools.getMetaContentArray('ddj:dataIgnoreLastLine'),
		dataNoCaches = tools.getMetaContentArray('ddj:dataNoCache'),
		dataUniqueIdentifier = tools.getMetaContent('ddj:dataUniqueIdentifier') || '',
		dataWFSs = tools.getMetaContentArray('ddj:wfs');

	function onDone() {
		quickinfo.autostart();

		marker.autostart({
			onClick: function (latlng, item) {
				updateMapSelectItem(tools.getAllObjects(item));
			},
		});

		search.autostart({
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
			var dataUri = dataUris[index],
				dataIgnoreSecondLine = (index < dataIgnoreSecondLines.length ? dataIgnoreSecondLines[index] : '') === 'true',
				dataIgnoreLastLine = (index < dataIgnoreLastLines.length ? dataIgnoreLastLines[index] : '') === 'true',
				dataNoCache = (index < dataNoCaches.length ? dataNoCaches[index] : '') === 'true',
				dataWFS = (index < dataWFSs.length ? dataWFSs[index] : '') === 'true';

			if (dataNoCache) {
				dataUri += '?nocache=' + (new Date().getTime());
			}

			if (dataWFS) {
//				getWFS(dataUri, function() {});
			} else {
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
			}
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
// https://github.com/Rob--W/cors-anywhere/#documentation

(function() {
	var cors_api_host = 'cors-anywhere.herokuapp.com';
	var cors_api_url = 'https://' + cors_api_host + '/';
	var slice = [].slice;
	var origin = window.location.protocol + '//' + window.location.host;
	var open = XMLHttpRequest.prototype.open;
	XMLHttpRequest.prototype.open = function() {
		var args = slice.call(arguments);
		var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
		if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
			targetOrigin[1] !== cors_api_host) {
			args[1] = cors_api_url + args[1];
		}
		return open.apply(this, args);
	};
})();

// -----------------------------------------------------------------------------

if (!store.eventPageShowWasSet) {
	store.eventPageShowWasSet = true;

	window.addEventListener('pageshow', onPageShow);
}

// -----------------------------------------------------------------------------

export function onDone(callback) {
	store.onDoneCallback = callback;
}

// -----------------------------------------------------------------------------
