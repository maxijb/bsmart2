/*
* Behavior for index action
*/

var React = require('react');
components.HelloMessage = require('../../../components/HelloMessage');

W.modules.startup.index_action = (function($) {

	

		var init = function() {
			console.log('maxi');
			$('#click-on-map-growl').on('click', '.close-button', function() {
				W.helpers.events.addUserEvent('click-on-map-growl');
			});

			React.render(React.createElement(components.HelloMessage, {name: "maxi"}), document.getElementById('reactFromServer'));


		}


	return {
		init: init, 
		condition: (W.request.action == 'index')
	};


})(jQuery);



