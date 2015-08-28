/*
* Behavior for searchbox
*/

W.modules.startup.elements = (function($) {

	

		init = function() {
			
			var $growls = $('.growl');

			$growls.on('click', '.close-button', function() {
				var $growl = $(this).closest('.growl'),
					method = $growl.hasClass('static') ? 'slideUp' : 'fadeOut';

					$growl[method]('slow', function() {
						$growl.remove();
					});
			});

		}


	return {init: init};


})(jQuery);