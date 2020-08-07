/* tursics.ddj.marker.js */
/* version 0.3 */

/*jslint browser: true*/
/*global L,console*/

// -----------------------------------------------------------------------------

var ddj = ddj || {};

// -----------------------------------------------------------------------------

(function () {

	'use strict';

	// -------------------------------------------------------------------------

	ddj.marker = {

		// ---------------------------------------------------------------------

		settings: {
			onAdd: function () {
				return true;
			},
			onAddHTML: function () {
				return false;
			},
			onMouseOver: null,
			onMouseOut: null,
			onClick: null
		},

		// ---------------------------------------------------------------------

		store: {
			layerGroup: null
		},

		// ---------------------------------------------------------------------

		autostart: function(options) {
			var pinColor = ddj.getMetaContent('ddj:pinColor') || '',
				pinColorColumn = ddj.getMetaContent('ddj:pinColorColumn') || '',
				pinIcon = ddj.getMetaContent('ddj:pinIcon') || '',
				pinIconColumn = ddj.getMetaContent('ddj:pinIconColumn') || '',
				pinIconPrefix = ddj.getMetaContent('ddj:pinIconPrefix') || '',
				pinIconPrefixColumn = ddj.getMetaContent('ddj:pinIconPrefixColumn') || '';

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
					if (options.onClick) {
						options.onClick(latlng, data);
					}
				}
			});
		},

		// ---------------------------------------------------------------------

		init: function (settings) {
			if (null !== ddj.marker.store.layerGroup) {
				return;
			}
			if ((typeof L === 'undefined') || (L === null)) {
				console.error('Error: Please include leaflet.js in your html file.');
				return;
			}

			var key;

			if ((settings !== null) && (typeof (settings) === 'object')) {
				for (key in settings) {
					if (settings.hasOwnProperty(key) && ddj.marker.settings.hasOwnProperty(key)) {
						ddj.marker.settings[key] = settings[key];
					}
				}
			}

			ddj.marker.update();
		},

		// ---------------------------------------------------------------------

		fixGeometryData: function (val) {
			if (val.geometry && val.properties) {
				var lat, lng, latMin, latMax, lngMin, lngMax, a, area, p, point;

				if (val.geometry.type === 'Polygon') {
					latMin = val.geometry.coordinates[0][0][1];
					latMax = val.geometry.coordinates[0][0][1];
					lngMin = val.geometry.coordinates[0][0][0];
					lngMax = val.geometry.coordinates[0][0][0];

					for (a = 0; a < val.geometry.coordinates.length; ++a) {
						area = val.geometry.coordinates[a];

						for (p = 0; p < area.length; ++p) {
							point = area[p];

							if (point[1] < latMin) {
								latMin = point[1];
							}
							if (point[1] > latMax) {
								latMax = point[1];
							}
							if (point[0] < lngMin) {
								lngMin = point[0];
							}
							if (point[0] > lngMax) {
								lngMax = point[0];
							}
						}
					}
					lat = (latMin + latMax) / 2;
					lng = (lngMin + lngMax) / 2;
				} else if (val.geometry.type === 'Point') {
					lat = val.geometry.coordinates[1];
					lng = val.geometry.coordinates[0];
				} else {
					console.log(val.geometry.type + ' not yet implemented');
				}

				val = val.properties;
				val.lat = val.lat || lat;
				val.lng = val.lng || lng;
			}

			return val;
		},

		// ---------------------------------------------------------------------

		update: function () {
			var key, valObj, val, valCount, obj, addObj, addHTMLObj, uniqueSetId = [], uniqueId = ddj.getUniqueIdentifier();

			if (ddj.marker.store.layerGroup) {
				ddj.getMap().removeLayer(ddj.marker.store.layerGroup);
				ddj.marker.store.layerGroup = null;
			}

			ddj.marker.store.layerGroup = L.featureGroup([]);
			ddj.marker.store.layerGroup.addTo(ddj.getMap());
			ddj.marker.store.layerGroup.addEventListener('mouseover', function (evt) {
				if (ddj.marker.settings.onMouseOver) {
					ddj.marker.settings.onMouseOver([evt.latlng.lat, evt.latlng.lng], ddj.getData(evt.layer.options.data));
				}
			});
			ddj.marker.store.layerGroup.addEventListener('mouseout', function (evt) {
				if (ddj.marker.settings.onMouseOut) {
					ddj.marker.settings.onMouseOut([evt.latlng.lat, evt.latlng.lng], ddj.getData(evt.layer.options.data));
				}
			});
			ddj.marker.store.layerGroup.addEventListener('click', function (evt) {
				if (ddj.marker.settings.onClick) {
					ddj.marker.settings.onClick([evt.latlng.lat, evt.latlng.lng], ddj.getData(evt.layer.options.data));
				}
			});

      if (ddj.getRowData()) {
  			for (key = 0; key < ddj.getRowData().length; ++key) {
  				val = ddj.getRowData(key);
  				val = ddj.marker.fixGeometryData(val);
  				valObj = val;
  				valCount = 1;
  
  				if (Array.isArray(valObj)) {
  					val = valObj[0];
  					valCount = valObj.length;
  				}
  
  				if ((uniqueId !== null) && (uniqueSetId.indexOf(val[uniqueId]) > -1)) {
  					// add marker only once
  					continue;
  				}
  
  				if ((typeof val.lat !== 'undefined') && (val.lat !== '') && (typeof val.lng !== 'undefined') && (val.lng !== '')) {
  					obj = {
  						index: key,
  						count: valCount,
  						lat: parseFloat(val.lat),
  						lng: parseFloat(val.lng),
  						color: 'blue',
  						opacity: 1,
  						clickable: 1,
  						iconPrefix: 'fa',
  						iconFace: 'fa-dot-circle-o',
  						htmlClass: '',
  						htmlIconSize: null,
  						htmlElement: ''
  					};
  					try {
  						addObj = ddj.marker.settings.onAdd(obj, val);
  					} catch (x) {
  						console.log(x);
  						addObj = false;
  					}
  					try {
  						addHTMLObj = ddj.marker.settings.onAddHTML(obj, val);
  					} catch (y) {
  						console.log(y);
  						addHTMLObj = false;
  					}
  
  					if (addObj !== false) {
  						ddj.marker.store.layerGroup.addLayer(L.marker([obj.lat, obj.lng], {
  							data: obj.index,
  							icon: L.AwesomeMarkers.icon({
  								prefix: obj.iconPrefix,
  								icon: obj.iconFace,
  								markerColor: obj.color
  							}),
  							opacity: obj.opacity,
  							clickable: obj.clickable
  						}));
  
  						uniqueSetId.push(val[uniqueId]);
  					}
  					if (addHTMLObj !== false) {
  						ddj.marker.store.layerGroup.addLayer(L.marker([obj.lat, obj.lng], {
  							data: obj.index,
  							icon: L.divIcon({
  								className: obj.htmlClass,
  								iconSize: obj.htmlIconSize,
  								html: obj.htmlElement
  							}),
  							opacity: obj.opacity,
  							clickable: obj.clickable
  						}));
  
  						uniqueSetId.push(val[uniqueId]);
  					}
  				}
				}
			}
		}

		// ---------------------------------------------------------------------

	};

	// -------------------------------------------------------------------------

}());

// -----------------------------------------------------------------------------
