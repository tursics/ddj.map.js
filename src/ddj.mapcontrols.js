/*jslint browser: true*/
/*global L,$*/

// -----------------------------------------------------------------------------

import * as map from './ddj.map';
import * as tools from './ddj.tools';

// -----------------------------------------------------------------------------

const store = {
}

export default store;

// -----------------------------------------------------------------------------

const settings = {
};

// -----------------------------------------------------------------------------

var ControlInfo = L.Control.extend({
	options: {
		position: 'bottomright',
	},

	onAdd: function () {
		var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom'),
			icon;

		if ($('#popupShare').length === 1) {
			icon = $('#popupShare').data('icon') || 'fa fa-share-alt';
			container.innerHTML = '<a style="font-size:1.2em" href="#popupShare" title="Teilen" data-rel="popup" data-position-to="window" data-transition="pop"><i class="' + icon + '" aria-hidden="true"></i></a>';
		}
		if ($('#popupInfo').length === 1) {
			icon = $('#popupInfo').data('icon') || 'fa fa-info';
			container.innerHTML += '<a style="font-size:1.2em" href="#popupInfo" title="Info" data-rel="popup" data-position-to="window" data-transition="pop"><i class="' + icon + '" aria-hidden="true"></i></a>';
		}
		if ($('#popupAuthor').length === 1) {
			icon = $('#popupAuthor').data('icon') || 'fa fa-envelope';
			container.innerHTML += '<a style="font-size:1.2em" href="#popupAuthor" title="Autor" data-rel="popup" data-position-to="window" data-transition="pop"><i class="' + icon + '" aria-hidden="true"></i></a>';
		}
		if ($('[data-tutorial="dialog"]').length === 1) {
			icon = $('[data-tutorial="dialog"]').data('icon') || 'fa fa-graduation-cap';
			container.innerHTML += '<a style="font-size:1.2em" href="#popupTutorial" title="Anleitung" data-rel="popup" data-position-to="window" data-transition="pop"><i class="' + icon + '" aria-hidden="true"></i></a>';
		}

		return container;
	}
});

// -----------------------------------------------------------------------------

function updateEmbedURI() {
	var size = $('#selectEmbedSize').val().split('x'),
		x = size[0],
		y = size[1],
		dataShareURI = tools.getMetaContent('ddj:shareURI') || '',
		html = '<iframe src="' + dataShareURI + '" width="' + x + '" height="' + y + '" frameborder="0" style="border:0" allowfullscreen></iframe>';

	$('#inputEmbedURI').val(html);
	if (-1 === $('#embedMap iframe')[0].outerHTML.indexOf('width="' + x + '"')) {
		$('#embedMap iframe')[0].outerHTML = html.replace('.html"', '.html?foo=' + (new Date().getTime()) + '"');
		$('#embedMap input').focus().select();
	}
}

// -----------------------------------------------------------------------------

export function init(initialSettings) {
	if (null === map.get()) {
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

	map.get().addControl(new ControlInfo());

	$("#popupShare").on('popupafteropen', function () {
		$('#shareLink input').focus().select();
	});
	$('#tabShareLink').on('click', function () {
		$('#popupShare').popup('reposition', 'positionTo: window');
		$('#shareLink input').focus().select();
	});
	$('#tabEmbedMap').on('click', function () {
		updateEmbedURI();
		$('#popupShare').popup('reposition', 'positionTo: window');
		$('#embedMap input').focus().select();
	});

	$('#selectEmbedSize').val('400x300').selectmenu('refresh');
	$('#selectEmbedSize').on('change', function () {
		updateEmbedURI();
		$('#popupShare').popup('reposition', 'positionTo: window');
	});
}

// -----------------------------------------------------------------------------

export function autostart() {
	init();
}

// -----------------------------------------------------------------------------
