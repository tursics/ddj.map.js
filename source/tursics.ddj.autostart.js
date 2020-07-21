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
		ddj.autostart.store.selectedItem = data;

		ddj.quickinfo.show(ddj.autostart.store.selectedItem);
	}

	// -------------------------------------------------------------------------

	function showSelection(selector, show) {
		var query, s;

		selector = selector || '';
		query = document.querySelectorAll(selector);

		for (s = 0; s < query.length; ++s) {
			query[s].style.display = show ? 'block' : 'none';
		}
	}

	// -------------------------------------------------------------------------

	function setSelectionValue(selector, value) {
		var query, s;

		selector = selector || '';
		query = document.querySelectorAll(selector);

		for (s = 0; s < query.length; ++s) {
			query[s].value = value;
		}
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
			pinIconPrefix = ddj.getMetaContent('ddj:pinIconPrefix') || '',
			pinColorColumn = ddj.getMetaContent('ddj:pinColorColumn') || '',
			pinIconColumn = ddj.getMetaContent('ddj:pinIconColumn') || '',
			pinIconPrefixColumn = ddj.getMetaContent('ddj:pinIconPrefixColumn') || '';

		ddj.autostart.store.selectedItem = null;

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
						if (pinColor !== '') {
							marker.color = pinColor;
						}
						if ((pinColorColumn !== '') && value[pinColorColumn]) {
							marker.color = value[pinColorColumn];
						}

						if (pinIcon !== '') {
							marker.iconPrefix = pinIconPrefix;
							marker.iconFace = pinIcon;
						}
						if ((pinIconColumn !== '') && value[pinIconColumn]) {
							marker.iconPrefix = value[pinIconPrefixColumn];
							marker.iconFace = value[pinIconColumn];
						}

						return true;
					},
					onClick: function (latlng, data) {
						updateMapSelectItem(data);
					}
				});

				ddj.quickinfo.init({
					onShow: function () {
						showSelection('[data-welcomeinfo="box"]', false);
					},
					onHide: function () {
						setSelectionValue('[data-search="textinput"]', '');
						showSelection('[data-welcomeinfo="box"]', true);

						ddj.autostart.store.selectedItem = null;
					}
				});

				showSelection('.visibleWithoutData', false);
				showSelection('.visibleWithData', true);
			}).fail(function() {
				showSelection('.visibleWithoutErrors', false);
				showSelection('.visibleWithErrors', true);
			}).always(function() {
				setSelectionValue('[data-search="textinput"]', '');
			});
		}
	}

	// -------------------------------------------------------------------------

	ddj.autostart = {

		// ---------------------------------------------------------------------
		store: {
			selectedItem: null,
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
