/* tursics.de/story/ - JavaScript file */

/*jslint browser: true*/
/*global $,L,window,document,ddj*/

// -----------------------------------------------------------------------------

var config = {
	dataUrl: 'https://tursics.com/script/school-student-development/spreadsheets.php',
	embedUrl: 'https://tursics.github.io/school-student-development/',
};

var userInput = {
	year: 0,
	primarySchoolYears: 6,
	classSizes:  24,
	seatsPerClassSizes: 144,
};

// -----------------------------------------------------------------------------

function parseGermanFloat(str) {
	'use strict';

	if ((str === '') || (str === null) || (str === undefined) || (typeof str === undefined)) {
		return str;
	}

	var number = (str + '').replace(/,/g, '.');
	return parseFloat(number);
}

// -----------------------------------------------------------------------------

function formatGermanFloat(number, fractional) {
	'use strict';

	if (isNaN(number)) {
		return null;
	}

	var ten = Math.pow(10, fractional);
	var rounded = parseInt(number * ten, 10) / ten;
	var str = rounded + '';

	return str.replace(/\./g, ',');
}

// -----------------------------------------------------------------------------

function updateMapSelectItem(data) {
	'use strict';

//	globalData.selectedItem = data;
//	ddj.quickinfo.show(globalData.selectedItem);
}

// -----------------------------------------------------------------------------

function updateDirtyData() {
	'use strict';

	userInput.seatsPerClassSizes = userInput.classSizes * userInput.primarySchoolYears;

	if (ddj.getData() === null) {
		return;
	}

	$.each(ddj.getData(), function (key, val) {
		val.diffdraftinessCurrent = val['diffdraftiness' + userInput.year] || 0;
		val.draftinessCurrent = val['draftiness' + userInput.year] || 1;
		val.containerCurrent = val['container' + userInput.year] || '';
		val.studentsCurrent = val['students' + userInput.year] || 0;
		val.startingclassesCurrent = val['startingclasses' + userInput.year] || 0;
		val.startingstudentsCurrent = val['startingstudents' + userInput.year] || 0;

		val.seatsCurrent = formatGermanFloat(parseGermanFloat(val.draftinessCurrent) * userInput.seatsPerClassSizes, 0);
		val.workloadCurrent = formatGermanFloat(parseGermanFloat(val.studentsCurrent) / parseGermanFloat(val.seatsCurrent) * 100, 0);
		val.classsizesCurrent = formatGermanFloat(parseGermanFloat(val.studentsCurrent) / parseGermanFloat(val.seatsCurrent) * userInput.classSizes, 1);

		if (val.workloadCurrent < 1) {
			val.pinColor = 'gray';
		} else if (val.workloadCurrent < 80) {
			val.pinColor = 'blue';
		} else if (val.workloadCurrent <= 95) {
			val.pinColor = 'green';
		} else if (val.workloadCurrent <= 110) {
			val.pinColor = 'orange';
		} else {
			val.pinColor = 'red';
		}
	});

	if (ddj.autostart.store.selectedItem !== null) {
		ddj.quickinfo.show(ddj.autostart.store.selectedItem);
	}

	ddj.marker.update();
}

// -----------------------------------------------------------------------------

function dataUpdated() {
	'use strict';

	var dirty = false;

	var classSizes = document.getElementById('settingClassSizes').value;
	dirty |= userInput.classSizes !== classSizes;
	userInput.classSizes = classSizes;

	var year = parseInt($('#settingYear').find('.ui-btn.ui-btn-active').text(), 10);
	dirty |= userInput.year !== year;
	userInput.year = year;

	if (dirty) {
		updateDirtyData();
	}
}

// -----------------------------------------------------------------------------

function initTutorial() {
	'use strict';

	if ($('[data-tutorial="dialog"]').length !== 1) {
		return;
	}

	var tutorial = $('[data-tutorial="dialog"]');
	var pages = tutorial.find('[data-tutorial="page"]');

	tutorial.append(
		'<div data-tutorial="footer">' +
			'<div>' +
				'Seite <span data-tutorial-currentpage>1</span> von ' + pages.length +
			'</div>' +
			'<div data-role="controlgroup" data-type="horizontal">' +
				'<a href="#" class="ui-btn ui-corner-all ui-btn-a" onclick="onTutorialBack()"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>' +
				'<a href="#" class="ui-btn ui-corner-all ui-btn-a" onclick="onTutorialNext()"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>' +
//				'<a href="#" class="ui-btn ui-corner-all ui-btn-a"><i class="fa fa-times" aria-hidden="true"></i></a>' +
			'</div>' +
		'</div>'
	);

	var controlgroups = tutorial.find('[data-role="controlgroup"]');
	controlgroups.controlgroup({direction: "horizontal"});

	$('[data-tutorial="dialog"]').popup({
		afterclose: function( event, ui ) {
			gotoTutorialStart();
		}
	});

	gotoTutorialStart();

	$('[data-tutorial="dialog"]').popup('open');
}

// -----------------------------------------------------------------------------

function gotoTutorialStart() {
	'use strict';

	var pageElement = $('[data-tutorial-currentpage]')[0];

	pageElement.textContent = 1;

	updateTutorialPagesAndButtons();
}

// -----------------------------------------------------------------------------

function onTutorialBack() {
	'use strict';

	var pageElement = $('[data-tutorial-currentpage]')[0],
		page = parseInt(pageElement.textContent, 10);

	if (page > 1) {
		pageElement.textContent = page - 1;
	}

	updateTutorialPagesAndButtons();
}

// -----------------------------------------------------------------------------

function onTutorialNext() {
	'use strict';

	var pageElement = $('[data-tutorial-currentpage]')[0],
		pages = $('[data-tutorial="dialog"]').find('[data-tutorial="page"]'),
		page = parseInt(pageElement.textContent, 10);

	if (page < pages.length) {
		pageElement.textContent = page + 1;

		updateTutorialPagesAndButtons();
	} else {
		$('[data-tutorial="dialog"]').popup('close');
	}
}

// -----------------------------------------------------------------------------

function updateTutorialPagesAndButtons() {
	'use strict';

	var tutorial = $('[data-tutorial="dialog"]'),
		pageElement = $('[data-tutorial-currentpage]')[0],
		page = parseInt(pageElement.textContent, 10),
		pages = tutorial.find('[data-tutorial="page"]'),
		positionTo = $(pages[page - 1]).data('position-to'),
		controlgroupLinks = tutorial.find('[data-role="controlgroup"] a'),
		back = $(controlgroupLinks[0]);

	pages.css('display', 'none');
	$(pages[page - 1]).css('display', 'block');

	tutorial.popup('option', 'positionTo', positionTo || 'origin');

	if (page < 2) {
		back.removeClass('disabled').addClass('disabled');
	} else {
		back.removeClass('disabled');
	}
}

// -----------------------------------------------------------------------------

var ControlInfo = L.Control.extend({
	options: {
		position: 'bottomright'
	},

	onAdd: function () {
		'use strict';

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
//		if ($('[data-tutorial="dialog"]').length === 1) {
		if ($('#popupTutorial').length === 1) {
			icon = $('#popupTutorial').data('icon') || 'fa fa-graduation-cap';
			container.innerHTML += '<a style="font-size:1.2em" href="#popupTutorial" title="Anleitung" data-rel="popup" data-position-to="window" data-transition="pop"><i class="' + icon + '" aria-hidden="true"></i></a>';
		}

		return container;
	}
});

// -----------------------------------------------------------------------------

$(document).on("pageshow", "#pageMap", function () {
	'use strict';

	function updateEmbedURI() {
		var size = $('#selectEmbedSize').val().split('x'),
			x = size[0],
			y = size[1],
			html = '<iframe src="' + config.embedUrl + '" width="' + x + '" height="' + y + '" frameborder="0" style="border:0" allowfullscreen></iframe>';

		$('#inputEmbedURI').val(html);
		if (-1 === $('#embedMap iframe')[0].outerHTML.indexOf('width="' + x + '"')) {
			$('#embedMap iframe')[0].outerHTML = html.replace('.html"', '.html?foo=' + (new Date().getTime()) + '"');
			$('#embedMap input').focus().select();
		}
	}

	var dataUrlStudentDevelopment =  config.dataUrl + '?nocache=' + (new Date().getTime());

	$.getJSON(dataUrlStudentDevelopment, function () {
	}).always(function() {
		ddj.getMap().addControl(new ControlInfo());

		$('#settingYear').find('.ui-btn').on('click', function(){      
			$('#settingYear').find('.ui-btn').removeClass('ui-btn-active');
			$(this).addClass('ui-btn-active');
			dataUpdated();
		});

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

		initTutorial();
	});

	ddj.autostart.onDone(dataUpdated);
});

// -----------------------------------------------------------------------------
