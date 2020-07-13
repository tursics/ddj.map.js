/* tursics.ddj.js */
/* version 0.4 */

/*jslint browser: true*/
/*global window,document,XMLHttpRequest */

// -----------------------------------------------------------------------------

String.prototype.startsWith = String.prototype.startsWith || function (prefix) {
	'use strict';

	return this.indexOf(prefix) === 0;
};

// -----------------------------------------------------------------------------

if (typeof Array.isArray === 'undefined') {
	Array.isArray = function (obj) {
		'use strict';

		return Object.prototype.toString.call(obj) === '[object Array]';
	};
}

// -----------------------------------------------------------------------------

var ddj = ddj || {};

// -----------------------------------------------------------------------------

(function () {

	'use strict';

	// -------------------------------------------------------------------------

	function mapAction() {
		// nothing to do
	}

	// -------------------------------------------------------------------------

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

	// -------------------------------------------------------------------------

	ddj.store = {
		map: null,
		mapDOMelementID: '',
		userData: null,
		uniqueIdentifier: null,
		eventPageShowWasSet: false
	};

	// -------------------------------------------------------------------------

	ddj.init = function (userData) {
		ddj.store.userData = userData;

		// use geojson file
		if (userData && userData.type && (userData.type === 'FeatureCollection') && userData.features) {
			ddj.store.userData = userData.features;
		}
	};

	// -------------------------------------------------------------------------

	ddj.getMap = function () {
		return ddj.store.map;
	};

	// -------------------------------------------------------------------------

	ddj.setMap = function (map) {
		ddj.store.map = map;
	};

	// -------------------------------------------------------------------------

	ddj.getMapDOMName = function () {
		return ddj.store.mapDOMelementID;
	};

	// -------------------------------------------------------------------------

	ddj.setMapDOMName = function (name) {
		ddj.store.mapDOMelementID = name;
	};

	// -------------------------------------------------------------------------

	ddj.getRowData = function (key) {
		if (typeof key === 'undefined') {
			return ddj.store.userData;
		}
		if (key === null) {
			return ddj.store.userData;
		}

		return ddj.store.userData[key];
	};

	// -------------------------------------------------------------------------

	ddj.getData = function (key) {
		var data = ddj.getRowData(key);

		// use geojson file
		if (data && data.geometry && data.properties) {
			data = data.properties;
		}

		return data;
	};

	// -------------------------------------------------------------------------

	ddj.getUniqueIdentifier = function () {
		var id = ddj.store.uniqueIdentifier;

		if ((typeof id === 'undefined') || (id === undefined) || (id === null) || (id === '')) {
			return null;
		}

		return id;
	};

	// -------------------------------------------------------------------------

	ddj.setUniqueIdentifier = function (identifier) {
		ddj.store.uniqueIdentifier = identifier;
	};

	// -------------------------------------------------------------------------

	ddj.getAllObjects = function (obj) {
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
	};

	// -------------------------------------------------------------------------

	ddj.getMetaContent = function(name) {
		var metaTag = document.querySelector('meta[name="' + name + '"]');

		if (metaTag) {
			return metaTag.content || '';
		}

		return '';
	};

	// -------------------------------------------------------------------------

	ddj.onPageShow = function() {
		var elementId = 'map',
			element = document.getElementById(elementId),
			mapCenter = ddj.getMetaContent('ddj:mapCenter'),
			attribution = element.getElementsByClassName('attribution');

		if (element && (mapCenter.split(',').length === 2)) {
			ddj.map.init(elementId, {
				mapboxId: ddj.getMetaContent('ddj:mapboxId'),
				mapboxToken: ddj.getMetaContent('ddj:mapboxToken'),
				centerLat: mapCenter.split(',')[0].trim(),
				centerLng: mapCenter.split(',')[1].trim(),
				zoom: ddj.getMetaContent('ddj:mapZoom'),
				attribution: attribution.length > 0 ? attribution[0].innerHTML : '',
				onFocusOnce: mapAction
			});
		}

		var dataUri = ddj.getMetaContent('ddj:data');
		if (dataUri) {
			dataUri = dataUri + '?nocache=' + (new Date().getTime());

			// Assign handlers immediately after making the request,
			// and remember the jqxhr object for this request
			var jqxhr = getJSON( dataUri, function() {
			  console.log( "success" );
			})
			  .done(function() {
				console.log( "second success" );
			  })
			  .fail(function() {
				console.log( "error" );
			  })
			  .always(function() {
				console.log( "complete" );
			  });

			// Perform other work here ...

			// Set another completion function for the request above
			jqxhr.always(function() {
			  console.log( "second complete" );
			});
		}
	}

	// -------------------------------------------------------------------------

	if (!ddj.store.eventPageShowWasSet) {
		ddj.store.eventPageShowWasSet = true;

		window.addEventListener('pageshow', ddj.onPageShow);
	}

	// -------------------------------------------------------------------------

}());

// -----------------------------------------------------------------------------
