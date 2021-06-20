/*jslint browser: true*/
/*global L,console*/

// -----------------------------------------------------------------------------

import * as data from './ddj.data';
import * as map from './ddj.map';
import * as tools from './ddj.tools';

// -----------------------------------------------------------------------------

const store = {
	layerGroup: null
}

export default store;

// -----------------------------------------------------------------------------

const settings = {
	latitudeColumn: 'lat',
	longitudeColumn: 'lng',
	onAdd: function () {
		return true;
	},
	onAddHTML: function () {
		return false;
	},
	onMouseOver: null,
	onMouseOut: null,
	onClick: null
};

// -----------------------------------------------------------------------------

export function canInit() {
	if ((typeof L === 'undefined') || (L === null) || (L.AwesomeMarkers === undefined)) {
		return false;
	}
	return true;
}

// -----------------------------------------------------------------------------

export function init(initialSettings) {
	if (null !== store.layerGroup) {
		return;
	}
	if (!canInit()) {
		console.error('Error: Please include leaflet.js and Leaflet.awesome-markers.js in your html file.');
		return;
	}

	var key;

	if ((initialSettings !== null) && (typeof (initialSettings) === 'object')) {
		for (key in initialSettings) {
			if (initialSettings.hasOwnProperty(key) && settings.hasOwnProperty(key)) {
				settings[key] = initialSettings[key];
			}
		}
	}

	update();
}

// -----------------------------------------------------------------------------

export function fixGeometryData(val) {
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
}

// -----------------------------------------------------------------------------

export function update() {
	var key, valObj, val, valCount, obj, addObj, addHTMLObj, uniqueSetId = [], uniqueId = data.getUniqueIdentifier();

	if (store.layerGroup) {
		map.get().removeLayer(store.layerGroup);
		store.layerGroup = null;
	}

	store.layerGroup = L.featureGroup([]);
	store.layerGroup.addTo(map.get());
	store.layerGroup.addEventListener('mouseover', function (evt) {
		if (settings.onMouseOver) {
			settings.onMouseOver([evt.latlng.lat, evt.latlng.lng], data.get(evt.layer.options.data));
		}
	});
	store.layerGroup.addEventListener('mouseout', function (evt) {
		if (settings.onMouseOut) {
			settings.onMouseOut([evt.latlng.lat, evt.latlng.lng], data.get(evt.layer.options.data));
		}
	});
	store.layerGroup.addEventListener('click', function (evt) {
		if (settings.onClick) {
			settings.onClick([evt.latlng.lat, evt.latlng.lng], data.get(evt.layer.options.data));
		}
	});

	if (data.getRow()) {
		for (key = 0; key < data.getRow().length; ++key) {
			val = data.getRow(key);
			val = fixGeometryData(val);
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

			if ((settings.latitudeColumn !== '') && (typeof val[settings.latitudeColumn] !== 'undefined') && (val[settings.latitudeColumn] !== '') &&
				(settings.longitudeColumn !== '') && (typeof val[settings.longitudeColumn] !== 'undefined') && (val[settings.longitudeColumn] !== '')) {
				var lat = val[settings.latitudeColumn];
				var lng = val[settings.longitudeColumn];

				if (typeof lat === 'string') {
					lat = lat.replace(',', '.');
				}
				if (typeof lng === 'string') {
					lng = lng.replace(',', '.');
				}

				obj = {
					index: key,
					count: valCount,
					lat: parseFloat(lat),
					lng: parseFloat(lng),
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
					addObj = settings.onAdd(obj, val);
				} catch (x) {
					console.log(x);
					addObj = false;
				}
				try {
					addHTMLObj = settings.onAddHTML(obj, val);
				} catch (y) {
					console.log(y);
					addHTMLObj = false;
				}

				if (addObj !== false) {
					store.layerGroup.addLayer(L.marker([obj.lat, obj.lng], {
						data: obj.index,
						icon: L.AwesomeMarkers.icon({
							prefix: 'fa',
							extraClasses: obj.iconPrefix,
							icon: obj.iconFace,
							markerColor: obj.color
						}),
						opacity: obj.opacity,
						clickable: obj.clickable
					}));

					uniqueSetId.push(val[uniqueId]);
				}
				if (addHTMLObj !== false) {
					store.layerGroup.addLayer(L.marker([obj.lat, obj.lng], {
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

// -----------------------------------------------------------------------------

export function autostart(options) {
	var pinColor = tools.getMetaContent('ddj:pinColor') || '',
		pinColorColumn = tools.getMetaContent('ddj:pinColorColumn') || '',
		pinIcon = tools.getMetaContent('ddj:pinIcon') || '',
		pinIconColumn = tools.getMetaContent('ddj:pinIconColumn') || '',
		pinIconPrefix = tools.getMetaContent('ddj:pinIconPrefix') || '',
		pinIconPrefixColumn = tools.getMetaContent('ddj:pinIconPrefixColumn') || '';

	settings.latitudeColumn = tools.getMetaContent('ddj:latitudeColumn') || 'lat';
	settings.longitudeColumn = tools.getMetaContent('ddj:longitudeColumn') || 'lng';

	if (canInit()) {
		init({
			onAdd: function (marker, value) {
				if (options.onAdd) {
					return options.onAdd(marker, value);
				}

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
	}
}

// -----------------------------------------------------------------------------
