/*
* Behavior for searchbox
*/

W.modules.startup.searchbox = (function($) {

	var $searchbox = $('#searchbox'),
		$searchOptions = $searchbox.find('.searchbox-options'),
		$searchOptionsButtons = $searchOptions.find('a'),
		$searchMonths = $searchbox.find('.search-months'),
		$searchMonthsButtons = $searchMonths.find('span.month'),
		$destination = $searchbox.find('#destination'),

		init = function() {
			
			//search options buttons behavior
			$searchOptionsButtons.click(function() {
				var $this = $(this);
				$searchOptionsButtons.removeClass('active');
				$this.addClass('active');

				if ($this.hasClass('month')) {
					$searchMonths.slideDown();
				} else if ($searchMonths.is(':visible')) {
					$searchMonths.slideUp();
				}
			});


			// Search month buttons behavior
			$searchMonthsButtons.click(function() {
				$searchMonthsButtons.removeClass('active');
				$(this).addClass('active');
			});


			//Autcomplete searchbox 
			$destination.simpleAutocomplete({
				source: "/" + W.lang + '/autocomplete/',
				'min-width': 'element',
				'max-width': 'auto'
			});

			$searchbox.find('.search').on('click', function() {
				var data = $destination.data('data'),
					$active = $searchOptions.find('.active'),
					show = $active.data('show'),
					month,
					slug,
					monthslug,
					monthurl,
					destination = $destination.val(),
					parts = destination.split(', ');

					//si esta como string parsearlo y si falla abortamos
					try {
						data = typeof data == 'string' ? JSON.parse(data) : data;
					} catch (e) {
						return;
					}


					//TODO Que le quede la ciudad y no el pais si es EEUU
					if (parts.length > 2) {
						parts = [parts[0], parts[2]];
						destination = parts.join(', ');
					}

					if ($active.hasClass('month')) {
						month = $searchMonthsButtons.filter('.active').data('id');
					} 

					monthslug = show == "month" ? __("Month_Long_" + month) : '';

					slug =  __("seo_link_" + show, destination, monthslug); 
					monthurl = month ? '-'+month : '';	


					url = '/' + data.type + '/' + show + '/' + data.id + monthurl + '/' + W.helpers.slugify(slug);

					window.location = url;
					
			});
		}


	return {init: init};


})(jQuery);