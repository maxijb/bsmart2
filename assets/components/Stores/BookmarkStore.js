var _ = require('lodash');
var pubsub = require('../Utils/PubSub');



var Store = (function() {

	//main data store for this class
	var storeData = {
		bookmarks: []
	}

	//Create new bookmark
	pubsub.on("ACTION:bookmark-create", function(data, callback) {

		console.log(data);
	    // ///TODO: user should come from the cookie in server side
	    $.post('/resource/create', data, function(response) {
	        //parent create
	        console.log(response);
	        storeData.bookmarks.push(response);
	        
	        //conditional callback
	        exec(callback, Array.prototype.slice.call(arguments));

	        pubsub.emit("EVENT:bookmarks-updated", storeData.bookmarks);

	    }, 'json');
	});



	//Fecth bookmarks 
	pubsub.on("EVENT:tags-updated", function(tags, active, callback) {
		var idsToRequest = Object.keys(active);
		
		$.get("/resource", {tag_id: idsToRequest[0]}, function(response) {
			
			storeData.bookmarks = response;
			
			exec(callback, response);

	        pubsub.emit("EVENT:bookmarks-updated", storeData.bookmarks);

		}, 'json');

	});



	// Exceute conditional callbacks
	function exec(cb, args) {
		if (typeof cb == "function") {
			cb.apply(null, args);
		}
	}

	
})();




 
module.exports = Store;