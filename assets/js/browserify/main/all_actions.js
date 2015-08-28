/*
* Behavior for index action
*/

var React = require('react');
components.Login = require('../../../components/Login');

W.modules.startup.all_actions = (function($) {

	

		var init = function() {
			React.render(React.createElement(components.Login, {user: W.user}), document.getElementById('user'));


		}


	return {
		init: init
	};


})(jQuery);



