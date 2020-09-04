/*jslint browser: true*/
/*global $,window,document */

// -----------------------------------------------------------------------------

import * as data from './ddj.data';
import * as tools from './ddj.tools';

// -----------------------------------------------------------------------------

const store = {
	objects: [],
}

export default store;

// -----------------------------------------------------------------------------

const settings = {
	htmlDOMelementID: 'autocomplete',
	onAdd: function () {
		return true;
	},
	onClick: null,
	onFocus: null,
	onFormat: null,
	orientation: 'bottom',
	showNoSuggestion: true,
	titleNoSuggestion: '<i class="fa fa-info-circle" aria-hidden="true"></i> Geben sie bitte einen Suchbegriff ein'
};

// -----------------------------------------------------------------------------

export function init(initialSettings) {
	if (0 !== store.objects.length) {
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

	$('#' + settings.htmlDOMelementID).focus(function () {
		if (settings.onFocus) {
			settings.onFocus();
		}
	});

	update();
}

// -----------------------------------------------------------------------------

export function update() {
	var key, val, valObj, valCount, obj, addObj, dataLength = 0,
		uniqueSetId = [],
		uniqueId = data.getUniqueIdentifier();

	if (data.get()) {
		dataLength = data.get().length;
	}
	store.objects = [];

	for (key = 0; key < dataLength; ++key) {
		val = valObj = data.get(key);
		valCount = 1;

		if (Array.isArray(valObj)) {
			val = valObj[0];
			valCount = valObj.length;
		}

		if ((uniqueId !== null) && (uniqueSetId.indexOf(val[uniqueId]) > -1)) {
			// add to search only once
			continue;
		}

		obj = {
			index: key,
			count: valCount,
			value: '',
			sortValue1: key,
			sortValue2: key
		};
		addObj = settings.onAdd(obj, val);

		if (addObj !== false) {
			store.objects.push(obj);

			uniqueSetId.push(val[uniqueId]);
		}
	}

	store.objects.sort(function (a, b) {
		if (a.sortValue1 === b.sortValue1) {
			return a.sortValue2 > b.sortValue2 ? 1 : -1;
		}

		return a.sortValue1 > b.sortValue1 ? 1 : -1;
	});

	$('#' + settings.htmlDOMelementID).autocomplete({
		lookup: store.objects,
		onSelect: function (suggestion) {
			if (settings.onClick) {
				settings.onClick(data.get(suggestion.index));
			}
		},
		formatResult: function (suggestion, currentValue) {
			if (settings.onFormat) {
				return settings.onFormat(suggestion, currentValue);
			} else {
				var str = '';

				str += '<div class="autocomplete-icon backblue"><i class="fa fa-dot-circle-o" aria-hidden="true"></i></div>';
				str += '<div style="line-height: 32px;">' + suggestion.value.replace(new RegExp(currentValue.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), 'gi'), '<strong>' + currentValue + '</strong>') + '</div>';
				return str;
			}
		},
		orientation: settings.orientation,
		showNoSuggestionNotice: settings.showNoSuggestion,
		noSuggestionNotice: settings.titleNoSuggestion
	});
}

// -----------------------------------------------------------------------------

export function autostart(options) {
	var noSuggestion = tools.getSelectionHTML('[data-search="noSuggestion"]') || settings.titleNoSuggestion,
		pinColor = tools.getMetaContent('ddj:pinColor') || '',
		pinColorColumn = tools.getMetaContent('ddj:pinColorColumn') || '',
		pinIcon = tools.getMetaContent('ddj:pinIcon') || '',
		pinIconColumn = tools.getMetaContent('ddj:pinIconColumn') || '',
		pinIconPrefix = tools.getMetaContent('ddj:pinIconPrefix') || '',
		pinIconPrefixColumn = tools.getMetaContent('ddj:pinIconPrefixColumn') || '',
		searchTitleColumn = tools.getMetaContent('ddj:searchTitleColumn') || '',
		searchDescriptionColumn = tools.getMetaContent('ddj:searchDescriptionColumn') || '',
		uniqueId = data.getUniqueIdentifier();

	init({
		orientation: 'auto',
		showNoSuggestion: true,
		titleNoSuggestion: noSuggestion,
		onAdd: function (obj, value) {
			var name = '',
				description = '',
				color = 'blue',
				iconPrefix = 'fa',
				iconFace = 'fa-dot-circle-o';

			if ((searchTitleColumn !== '') && value[searchTitleColumn]) {
				name = value[searchTitleColumn];
			}
			if ((searchDescriptionColumn !== '') && value[searchDescriptionColumn]) {
				description = value[searchDescriptionColumn];
			}

			if (pinColor !== '') {
				color = pinColor;
			}
			if ((pinColorColumn !== '') && value[pinColorColumn]) {
				color = value[pinColorColumn];
			}

			if (pinIcon !== '') {
				iconPrefix = pinIconPrefix;
				iconFace = pinIcon;
			}
			if ((pinIconColumn !== '') && value[pinIconColumn]) {
				iconPrefix = value[pinIconPrefixColumn];
				iconFace = value[pinIconColumn];
			}

			obj.sortValue1 = name;
			obj.sortValue2 = value[uniqueId];
			obj.data = value[uniqueId];
			obj.color = color;
			obj.value = name;
			obj.desc = description;
			obj.iconPrefix = iconPrefix;
			obj.iconFace = iconFace;

			return true;
		},
		onFocus: function () {
			window.scrollTo(0, 0);
			document.body.scrollTop = 0;
			$('#pageMap').animate({
				scrollTop: parseInt(0, 10)
			}, 500);
		},
		onFormat: function (suggestion, currentValue) {
			var color = suggestion.color,
				iconPrefix = suggestion.iconPrefix,
				iconFace = suggestion.iconFace,
				str = '';

			str += '<div class="autocomplete-icon back' + color + '"><i class="' + iconPrefix + ' ' + iconFace + '" aria-hidden="true"></i></div>';
			str += '<div>' + suggestion.value.replace(new RegExp(currentValue.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), 'gi'), '<strong>' + currentValue + '</strong>') + '</div>';
			str += '<div class="' + color + '">' + suggestion.desc + '</div>';
			return str;
		},
		onClick: function (data) {
			if (options.onClick) {
				if (Array.isArray(data)) {
					options.onClick(data[0][uniqueId]);
				} else {
					options.onClick(data[uniqueId]);
				}
			}
		}
	});
}

// -----------------------------------------------------------------------------
