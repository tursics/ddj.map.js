/* tursics.ddj.autostart.js */
/* version 0.3 */

/*jslint browser: true*/
/*global window,document,XMLHttpRequest*/

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

	function onPageShow() {
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

	ddj.autostart = {

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
