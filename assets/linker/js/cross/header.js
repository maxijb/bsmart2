/*
* Behavior for searchbox
*/

W.modules.startup.header = (function($) {

	var init = function() {
		
		var $settings = $('.settings:first'),
			$unit = $settings.find('.unit'),
			$language = $settings.find('.language'), 
			timeout;


		//change unit in cookie and reload
		$unit.on('click', 'span', function() {
			var $this = $(this),
				obj;
			if (!$this.hasClass('active')) {
				obj = W.helpers.cookies.decodeCookie($.cookie('w_ctx'));
				obj.unit = $this.data("unit");
				$.cookie('w_ctx', W.helpers.cookies.encodeCookie(obj));
				window.location.reload();
			}
		});

		//change language and in url and reload
		$language.on('click', 'li', function() {
			var lang = $(this).find('.lang').data('lang');
			var match = window.location.pathname.match(/^\/[a-z]{2}(\/|$)/);
			if (match) {
				url = window.location.pathname.replace(/^\/[a-z]{2}(\/|$)/, '/'+lang+'/');
			} else {
				url = '/'+lang + window.location.pathname;
			}
			window.location = url;
		});

		$language.on('mouseenter', function() {
			var $this = $(this);
			clearTimeout(timeout);
			$this.addClass('open');
			$(document).one('click', closeLanguagePopup);
		}).on('mouseleave', function() {
			clearTimeout(timeout);
			timeout = setTimeout(closeLanguagePopup, 1000);
		});


		function closeLanguagePopup() {
			$language.removeClass('open');
		}


	}


	return {init: init};



})(jQuery);