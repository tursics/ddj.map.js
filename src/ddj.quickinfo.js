/*jslint browser: true*/
/*global $*/

// -----------------------------------------------------------------------------

import * as autostartLib from './ddj.autostart';
import * as tools from './ddj.tools';

// -----------------------------------------------------------------------------

const store = {
	root: null
}

export default store;

// -----------------------------------------------------------------------------

const settings = {
	dictYes: 'ja',
	dictNo: 'nein',
	onShow: null,
	onHide: null
};

// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------

export function init(initialSettings) {
	if (store.root !== null) {
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

	store.root = $('div').find('[data-quickinfo="box"]');

	store.root.find('[data-quickinfo="close"]').on('click', function () {
		setVisible(false);
	});
	store.root.find('[data-quickinfo="group"]').on('click', function () {
		$(this).toggleClass('groupClosed');
	});

	update();
}

// -----------------------------------------------------------------------------

export function update() {
}

// -----------------------------------------------------------------------------

export function setVisible(show) {
	if (show) {
		store.root.css('display', 'block');
		if (settings.onShow) {
			settings.onShow();
		}
	} else {
		store.root.css('display', 'none');
		if (settings.onHide) {
			settings.onHide();
		}
	}
}

// -----------------------------------------------------------------------------

export function show(obj) {
	function setText(key, txt) {
		var item = store.root.find('[data-quickdata="' + key + '"]');

		if (item.length > 0) {
			if (item.parent().hasClass('number')) {
				txt = formatNumber(txt);
			} else if (item.parent().hasClass('boolean')) {
				txt = (txt === 1 ? settings.dictYes : settings.dictNo);
			}

			if (item.tagName.toUpperCase() === 'IMG') {
				item.src = txt;
			} else {
				item.text(txt);
			}
		}

		item = store.root.find('[data-hide-if-zero="' + key + '"]');

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

	infoList = store.root.find('[data-quickinfo="list"]');
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

	setVisible(true);
}

// -----------------------------------------------------------------------------

export function autostart() {
	init({
		onShow: function () {
			tools.showSelection('[data-welcome="box"]', false);
		},
		onHide: function () {
			tools.setSelectionValue('[data-search="textinput"]', '');
			tools.showSelection('[data-welcome="box"]', true);

			autostartLib.default.selectedItem = null;
		}
	});
}

// -----------------------------------------------------------------------------
