/* tursics.de/story/ - JavaScript file */

/*jslint browser: true*/
/*global $,document,ddj*/

// -----------------------------------------------------------------------------

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

ddj.autostart.onDone(function() {
	'use strict';

	$('#settingYear').find('.ui-btn').on('click', function(){      
		$('#settingYear').find('.ui-btn').removeClass('ui-btn-active');
		$(this).addClass('ui-btn-active');
		dataUpdated();
	});

	dataUpdated();
});

// -----------------------------------------------------------------------------
