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
/*		globalData.selectedItem = data;
		ddj.quickinfo.show(globalData.selectedItem);*/
		console.log('todo');
	}

	// -------------------------------------------------------------------------

	function onPageShow() {
		ddj.map.autostart();

		var dataUri = ddj.getMetaContent('ddj:data'),
			dataIgnoreSecondLine = (ddj.getMetaContent('ddj:dataIgnoreSecondLine') || '') === 'true',
			dataIgnoreLastLine = (ddj.getMetaContent('ddj:dataIgnoreLastLine') || '') === 'true',
			dataUniqueIdentifier = ddj.getMetaContent('ddj:dataUniqueIdentifier') || '',
			pinColor = ddj.getMetaContent('ddj:pinColor') || '',
			pinIcon = ddj.getMetaContent('ddj:pinIcon') || '',
			pinIconPrefix = ddj.getMetaContent('ddj:pinIconPrefix') || '';

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
				ddj.marker.init({
					onAdd: function (marker, value) {
						if (value.workloadCurrent < 1) {
							marker.color = 'gray';
						} else if (value.workloadCurrent < 80) {
							marker.color = 'blue';
						} else if (value.workloadCurrent <= 95) {
							marker.color = 'green';
						} else if (value.workloadCurrent <= 110) {
							marker.color = 'orange';
						} else {
							marker.color = 'red';
						}

						if (pinColor !== '') {
							marker.color = pinColor;
						}
						if (pinIcon !== '') {
							marker.iconPrefix = pinIconPrefix;
							marker.iconFace = pinIcon;
						}

						return true;
					},
					onClick: function (latlng, data) {
						updateMapSelectItem(data);
					}
				});
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
