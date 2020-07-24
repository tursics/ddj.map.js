/* tursics.de/story/ - JavaScript file */

/*jslint browser: true*/
/*global $,L,document,ddj*/

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

function updateDirtyData() {
	'use strict';

	userInput.seatsPerClassSizes = userInput.classSizes * userInput.primarySchoolYears;

	if (ddj.getData() === null) {
		return;
	}

	$.each(ddj.getData(), function (key, val) {
		val.diffdraftinessCurrent = val['diffdraftiness' + userInput.year] || 0;
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
	});

	ddj.autostart.onDone(dataUpdated);
});

// -----------------------------------------------------------------------------
