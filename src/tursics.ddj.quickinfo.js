/* tursics.ddj.quickinfo.js */
/* version 0.3 */

/*jslint browser: true*/
/*global $*/

// -----------------------------------------------------------------------------

var ddj = ddj || {};

// -----------------------------------------------------------------------------

(function () {

	'use strict';

	// -------------------------------------------------------------------------

	function formatNumber(txt) {
		txt = String(parseInt(txt, 10));
		var sign = '',
			pos = 0;
		if (txt[0] === '-') {
			sign = '-';
			txt = txt.slice(1);
		}

		pos = txt.length;
		while (pos > 3) {
			pos -= 3;
			txt = txt.slice(0, pos) + '.' + txt.slice(pos);
		}

		return sign + txt;
	}

	// -------------------------------------------------------------------------

	ddj.quickinfo = {

		// ---------------------------------------------------------------------

		settings: {
			dictYes: 'ja',
			dictNo: 'nein',
			onShow: null,
			onHide: null
		},

		// ---------------------------------------------------------------------

		store: {
			root: null
		},

		// ---------------------------------------------------------------------

		autostart: function() {
			ddj.quickinfo.init({
				onShow: function () {
					ddj.showSelection('[data-welcome="box"]', false);
				},
				onHide: function () {
					ddj.setSelectionValue('[data-search="textinput"]', '');
					ddj.showSelection('[data-welcome="box"]', true);

					ddj.autostart.store.selectedItem = null;
				}
			});
		},

		// ---------------------------------------------------------------------

		init: function (settings) {
			if (ddj.quickinfo.store.root !== null) {
				return;
			}

			var key;

			if ((settings !== null) && (typeof (settings) === 'object')) {
				for (key in settings) {
					if (settings.hasOwnProperty(key) && ddj.quickinfo.settings.hasOwnProperty(key)) {
						ddj.quickinfo.settings[key] = settings[key];
					}
				}
			}

			ddj.quickinfo.store.root = $('div').find('[data-quickinfo="box"]');

			ddj.quickinfo.store.root.find('[data-quickinfo="close"]').on('click', function () {
				ddj.quickinfo.setVisible(false);
			});
			ddj.quickinfo.store.root.find('[data-quickinfo="group"]').on('click', function () {
				$(this).toggleClass('groupClosed');
			});

			ddj.quickinfo.update();
		},

		// ---------------------------------------------------------------------

		update: function () {
		},

		// ---------------------------------------------------------------------

		setVisible: function (show) {
			if (show) {
				ddj.quickinfo.store.root.css('display', 'block');
				if (ddj.quickinfo.settings.onShow) {
					ddj.quickinfo.settings.onShow();
				}
			} else {
				ddj.quickinfo.store.root.css('display', 'none');
				if (ddj.quickinfo.settings.onHide) {
					ddj.quickinfo.settings.onHide();
				}
			}
		},

		// ---------------------------------------------------------------------

		show: function (obj) {
			function setText(key, txt) {
				var item = ddj.quickinfo.store.root.find('[data-quickdata="' + key + '"]');

				if (item.length > 0) {
					if (item.parent().hasClass('number')) {
						txt = formatNumber(txt);
					} else if (item.parent().hasClass('boolean')) {
						txt = (txt === 1 ? ddj.quickinfo.settings.dictYes : ddj.quickinfo.settings.dictNo);
					}

					item.text(txt);
				}

				item = ddj.quickinfo.store.root.find('[data-hide-if-zero="' + key + '"]');

				if (item.length > 0) {
					var show = 'block';
					if ((txt === '0') || (txt === 0) || (txt === null)) {
						show = 'none';
					}

					item.css('display', show);
				}
			}

			var d, data, dataArray = obj, key, i, infoList, infoItems = [], infoSnippets = [];

			if (!Array.isArray(dataArray)) {
				dataArray = [obj];
			}

			infoList = ddj.quickinfo.store.root.find('[data-quickinfo="list"]');
			if (infoList.length === 1) {
				infoItems = infoList.find('[data-quickinfo="item"]');

				while (infoItems.length > 1) {
					$(infoItems[0]).remove();
					infoItems = infoList.find('[data-quickinfo="item"]');
				}
			}

			for (d = 0; d < dataArray.length; ++d) {
				data = dataArray[d];

				for (key in data) {
					if (data.hasOwnProperty(key)) {
						setText(key, data[key]);
					}
				}

				if (infoItems.length > 0) {
					infoSnippets.push($(infoItems[0]).clone());
				}
			}

			if (infoItems.length > 0) {
				$(infoItems[0]).remove();
				for (i = 0; i < infoSnippets.length; ++i) {
					infoSnippets[i].appendTo(infoList);
				}
			}

			ddj.quickinfo.setVisible(true);
		}

		// ---------------------------------------------------------------------

	};

	// -------------------------------------------------------------------------

}());

// -----------------------------------------------------------------------------
