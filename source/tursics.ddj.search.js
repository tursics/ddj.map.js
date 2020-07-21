/* tursics.ddj.search.js */
/* version 0.3 */

/*jslint browser: true*/
/*global $,window,document */

// -----------------------------------------------------------------------------

var ddj = ddj || {};

// -----------------------------------------------------------------------------

(function () {

	'use strict';

	// -------------------------------------------------------------------------

	ddj.search = {

		// ---------------------------------------------------------------------

		settings: {
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
		},

		// ---------------------------------------------------------------------

		store: {
			objects: []
		},

		// ---------------------------------------------------------------------

		autostart: function() {
			var noSuggestion = ddj.getSelectionHTML('[data-search="noSuggestion"]') || ddj.search.settings.titleNoSuggestion;

			ddj.search.init({
				orientation: 'auto',
				showNoSuggestion: true,
				titleNoSuggestion: noSuggestion,
				onAdd: function (obj, value) {
					var name = value.title,
						color = 'darkred';

					if ('' !== value.BSN) {
						name += ' (' + value.BSN + ')';
					}

					obj.sortValue1 = name;
					obj.sortValue2 = value.BSN;
					obj.data = value.BSN;
					obj.color = color;
					obj.value = name;
					obj.desc = value.regiontitle;

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
						icon = 'fa-dot-circle-o',
						str = '';

					str += '<div class="autocomplete-icon back' + color + '"><i class="fa ' + icon + '" aria-hidden="true"></i></div>';
					str += '<div>' + suggestion.value.replace(new RegExp(currentValue.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), 'gi'), '<strong>' + currentValue + '</strong>') + '</div>';
					str += '<div class="' + color + '">' + suggestion.desc + '</div>';
					return str;
				},
				onClick: function (data) {
					if (Array.isArray(data)) {
						selectSuggestion(data[0].BSN);
					} else {
						selectSuggestion(data.BSN);
					}
				}
			});
		},

		// ---------------------------------------------------------------------

		init: function (settings) {
			if (0 !== ddj.search.store.objects.length) {
				return;
			}

			var key;

			if ((settings !== null) && (typeof (settings) === 'object')) {
				for (key in settings) {
					if (settings.hasOwnProperty(key) && ddj.search.settings.hasOwnProperty(key)) {
						ddj.search.settings[key] = settings[key];
					}
				}
			}

			$('#' + ddj.search.settings.htmlDOMelementID).focus(function () {
				if (ddj.search.settings.onFocus) {
					ddj.search.settings.onFocus();
				}
			});

			ddj.search.update();
		},

		// ---------------------------------------------------------------------

		update: function () {
			var key, val, valObj, valCount, obj, addObj, dataLength = 0,
				uniqueSetId = [],
				uniqueId = ddj.getUniqueIdentifier();

      if (ddj.getData()) {
        dataLength = ddj.getData().length;
      }
			ddj.search.store.objects = [];

			for (key = 0; key < dataLength; ++key) {
				val = valObj = ddj.getData(key);
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
				addObj = ddj.search.settings.onAdd(obj, val);

				if (addObj !== false) {
					ddj.search.store.objects.push(obj);

					uniqueSetId.push(val[uniqueId]);
				}
			}

			ddj.search.store.objects.sort(function (a, b) {
				if (a.sortValue1 === b.sortValue1) {
					return a.sortValue2 > b.sortValue2 ? 1 : -1;
				}

				return a.sortValue1 > b.sortValue1 ? 1 : -1;
			});

			$('#' + ddj.search.settings.htmlDOMelementID).autocomplete({
				lookup: ddj.search.store.objects,
				onSelect: function (suggestion) {
					if (ddj.search.settings.onClick) {
						ddj.search.settings.onClick(ddj.getData(suggestion.index));
					}
				},
				formatResult: function (suggestion, currentValue) {
					if (ddj.search.settings.onFormat) {
						return ddj.search.settings.onFormat(suggestion, currentValue);
					} else {
						var str = '';

						str += '<div class="autocomplete-icon backblue"><i class="fa fa-dot-circle-o" aria-hidden="true"></i></div>';
						str += '<div style="line-height: 32px;">' + suggestion.value.replace(new RegExp(currentValue.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), 'gi'), '<strong>' + currentValue + '</strong>') + '</div>';
						return str;
					}
				},
				orientation: ddj.search.settings.orientation,
				showNoSuggestionNotice: ddj.search.settings.showNoSuggestion,
				noSuggestionNotice: ddj.search.settings.titleNoSuggestion
			});
		}

		// ---------------------------------------------------------------------

	};

	// -------------------------------------------------------------------------

}());

// -----------------------------------------------------------------------------
