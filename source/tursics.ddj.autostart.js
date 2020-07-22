/* tursics.ddj.autostart.js */
/* version 0.3 */

/*jslint browser: true*/
/*global L,window,XMLHttpRequest*/

// -----------------------------------------------------------------------------

var ddj = ddj || {};

// -----------------------------------------------------------------------------

(function () {

	'use strict';

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

	function updateMapSelectItem(data) {
		ddj.autostart.store.selectedItem = data;

		ddj.quickinfo.show(ddj.autostart.store.selectedItem);
	}

	// -------------------------------------------------------------------------

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

	// -------------------------------------------------------------------------

	function onPageShow() {
		var dataUri = ddj.getMetaContent('ddj:data'),
			dataIgnoreSecondLine = (ddj.getMetaContent('ddj:dataIgnoreSecondLine') || '') === 'true',
			dataIgnoreLastLine = (ddj.getMetaContent('ddj:dataIgnoreLastLine') || '') === 'true',
			dataUniqueIdentifier = ddj.getMetaContent('ddj:dataUniqueIdentifier') || '';

		ddj.autostart.store.selectedItem = null;
		ddj.setSelectionValue('[data-search="textinput"]', '');

		ddj.map.autostart();

		if (dataUri) {
			dataUri = dataUri + '?nocache=' + (new Date().getTime());

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
			}).fail(function() {
				ddj.showSelection('.visibleWithoutErrors', false);
				ddj.showSelection('.visibleWithErrors', true);
			}).always(function() {
				if (ddj.autostart.store.onDoneCallback) {
					ddj.autostart.store.onDoneCallback();
				}
			});
		} else {
			if (ddj.autostart.store.onDoneCallback) {
				ddj.autostart.store.onDoneCallback();
			}
		}
	}

	// -------------------------------------------------------------------------

	ddj.autostart = {

		// ---------------------------------------------------------------------

		store: {
			selectedItem: null,
			onDoneCallback: null,
		},

		// ---------------------------------------------------------------------

		onDone: function (callback) {
			ddj.autostart.store.onDoneCallback = callback;
		},

		// ---------------------------------------------------------------------

	};

	// -------------------------------------------------------------------------

	if (!ddj.store.eventPageShowWasSet) {
		ddj.store.eventPageShowWasSet = true;

		window.addEventListener('pageshow', onPageShow);
	}

	// -------------------------------------------------------------------------

}());

// -----------------------------------------------------------------------------
