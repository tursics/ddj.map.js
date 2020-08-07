/* tursics.ddj.map.js */
/* version 0.3 */

/*jslint browser: true*/
/*global L,document,console*/

// -----------------------------------------------------------------------------

String.prototype.startsWith = String.prototype.startsWith || function (prefix) {
	'use strict';

	return this.indexOf(prefix) === 0;
};

// -----------------------------------------------------------------------------

var ddj = ddj || {};

// -----------------------------------------------------------------------------

(function () {

	'use strict';

	// -------------------------------------------------------------------------

	ddj.map = {

		// ---------------------------------------------------------------------

		settings: {
			mapboxId: 'tursics.l7ad5ee8',
			mapboxToken: 'pk.eyJ1IjoidHVyc2ljcyIsImEiOiI1UWlEY3RNIn0.U9sg8F_23xWXLn4QdfZeqg',
			attribution: '',
			centerLat: 52.518413,
			centerLng: 13.408368,
			zoom: 13,
			onFocusOnce: null,
			onZoomed: null,
			onMoved: null
		},

		// ---------------------------------------------------------------------

		store: {
		},

		// ---------------------------------------------------------------------

		autostart: function() {
			var elementId = 'map',
				element = document.getElementById(elementId),
				mapCenter = ddj.getMetaContent('ddj:mapCenter'),
				attribution = element.getElementsByClassName('attribution');

			if (element && (mapCenter.split(',').length === 2)) {
				ddj.map.init(elementId, {
					mapboxId: ddj.getMetaContent('ddj:mapboxId'),
					mapboxToken: ddj.getMetaContent('ddj:mapboxToken'),
					attribution: attribution.length > 0 ? attribution[0].innerHTML : '',
					centerLat: mapCenter.split(',')[0].trim(),
					centerLng: mapCenter.split(',')[1].trim(),
					zoom: ddj.getMetaContent('ddj:mapZoom'),
				});
			}
		},

		// ---------------------------------------------------------------------

		init: function (elementName, settings) {
			if (null !== ddj.getMap()) {
				return;
			}
			if ((typeof L === 'undefined') || (L === null)) {
				console.error('Error: Please include leaflet.js in your html file.');
				return;
			}

			var key, mapboxTiles, attribution = [];

			if ((settings !== null) && (typeof (settings) === 'object')) {
				for (key in settings) {
					if (settings.hasOwnProperty(key) && ddj.map.settings.hasOwnProperty(key)) {
						ddj.map.settings[key] = settings[key];
					}
				}
			}

			attribution.push('<a href="http://www.openstreetmap.org" target="_blank">OpenStreetMap-Mitwirkende</a>');
			attribution.push('<a href="https://www.mapbox.com" target="_blank">Mapbox</a>');
			if (ddj.map.settings.attribution !== '') {
				attribution.push(ddj.map.settings.attribution);
			}

			mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v4/' + ddj.map.settings.mapboxId + '/{z}/{x}/{y}.png?access_token=' + ddj.map.settings.mapboxToken, {
				attribution: attribution.join(', ')
			});

			ddj.setMapDOMName(elementName);
			ddj.setMap(L.map(elementName, {zoomControl: false, scrollWheelZoom: true})
				.addLayer(mapboxTiles)
				.setView([ddj.map.settings.centerLat, ddj.map.settings.centerLng], ddj.map.settings.zoom));

			ddj.getMap().addControl(L.control.zoom({ position: 'bottomright'}));
			ddj.getMap().once('focus', function () {
				if (ddj.map.settings.onFocusOnce) {
					ddj.map.settings.onFocusOnce();
				}
			});
			ddj.getMap().on('zoomend', function () {
				if (ddj.map.settings.onZoomed) {
					ddj.map.settings.onZoomed();
				}
			});
			ddj.getMap().on('moveend', function () {
				if (ddj.map.settings.onMoved) {
					ddj.map.settings.onMoved();
				}
			});
		}

		// ---------------------------------------------------------------------

	};

	// -------------------------------------------------------------------------

}());

// -----------------------------------------------------------------------------
