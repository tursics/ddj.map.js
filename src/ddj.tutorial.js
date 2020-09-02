/*jslint browser: true*/
/*global $,window*/

// -----------------------------------------------------------------------------

const store = {
}

export default store;

// -----------------------------------------------------------------------------

const settings = {
};

// -----------------------------------------------------------------------------

function updatePagesAndButtons() {
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

export function init() {
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
				'<a href="#" class="ui-btn ui-corner-all ui-btn-a" onclick="ddj.tutorial.onBack()"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>' +
				'<a href="#" class="ui-btn ui-corner-all ui-btn-a" onclick="ddj.tutorial.onNext()"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>' +
			'</div>' +
		'</div>'
	);

	var controlgroups = tutorial.find('[data-role="controlgroup"]');
	controlgroups.controlgroup({direction: "horizontal"});

	$('[data-tutorial="dialog"]').popup({
		afterclose: function() {
			gotoFirstPage();
		}
	});

	gotoFirstPage();
}

// -----------------------------------------------------------------------------

export function update() {
}

// -----------------------------------------------------------------------------

export function gotoFirstPage() {
	var pageElement = $('[data-tutorial-currentpage]')[0];

	pageElement.textContent = 1;

	updatePagesAndButtons();
}

// -----------------------------------------------------------------------------

export function onBack() {
	var pageElement = $('[data-tutorial-currentpage]')[0],
		page = parseInt(pageElement.textContent, 10);

	if (page > 1) {
		pageElement.textContent = page - 1;
	}

	updatePagesAndButtons();
}

// -----------------------------------------------------------------------------

export function onNext() {
	var pageElement = $('[data-tutorial-currentpage]')[0],
		pages = $('[data-tutorial="dialog"]').find('[data-tutorial="page"]'),
		page = parseInt(pageElement.textContent, 10);

	if (page < pages.length) {
		pageElement.textContent = page + 1;

		updatePagesAndButtons();
	} else {
		$('[data-tutorial="dialog"]').popup('close');
	}
}

// -----------------------------------------------------------------------------

export function autostart() {
	init();

	window.setTimeout(function() {
		$('[data-tutorial="dialog"]').popup('open');
	}, 0);
}

// -----------------------------------------------------------------------------
