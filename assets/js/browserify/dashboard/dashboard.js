/*
* Behavior for index action
*/

var React = require('react'),
	TagsContainer = require('../../../components/TagsContainer'),
	BookmarkCreate = require('../../../components/BookmarkCreate'),
	BookmarksList = require('../../../components/BookmarksList'),
	//stores
	BookmarkStore = require('../../../components/stores/BookmarkStore');

W.modules.startup.dashboard_action = (function($) { 

	

		var init = function() {

			React.render(React.createElement(TagsContainer, {tags: W.data.tags}), document.getElementById('tags-wrapper'));
			React.render(React.createElement(BookmarkCreate, {tags: W.data.tags}), document.getElementById('new-bookmark'));
			React.render(React.createElement(BookmarksList, {tags: W.data.tags}), document.getElementById('bookmarks'));


		}


	return {
		init: init, 
		condition: (W.request.action == 'dashboard')
	};


})(jQuery);



