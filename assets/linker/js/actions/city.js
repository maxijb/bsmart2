/*
* Behavior for index action
*/

W.modules.startup.city_action = (function($) {

	

		init = function() {

			//presets searchbox to this city
			if (W.location) {
				$('#destination').data('data', {id: W.location.name_id, type: 'city'}).val(W.location.name);
			}

		}


	return {
		init: init, 
		condition: (W.request.action == 'city')
	};


})(jQuery);