var _ = require('lodash');
var pubsub = require('../Utils/PubSub');



var Store = (function() {
	//main data store for this class
	var storeData = {
		tags: {},
		active: {}
	},
	i,
	tempTags,
	len;


	if (typeof W != "undefined" && W.data && W.data.tags) {
		tempTags = W.data.tags;
		len = tempTags.length;
		for (i = 0; i < len; i++) {
			storeData.tags[tempTags[i].id] = tempTags[i];
		}
	}
	

	//Fecth bookmarks 
	pubsub.on("ACTION:tag-toggle", function(id, callback) {

		if (storeData.tags[id]) {
			storeData.tags[id].active = ! storeData.tags[id].active;

			if (storeData.active[id]) delete storeData.active[id];
			else { storeData.active[id] = true; }
		}
		
		pubsub.emit("EVENT:tags-updated", storeData.tags, storeData.active);


	});

	pubsub.on("ACTION:tag-create", function(name, color, callback) {
		///TODO: user should come from the cookie in server side
	    $.post('/tag/create', {user_id: W.user.id, name: name, color: color}, function(data) {
	    	if (data && data.id) {
	    		storeData.tags[data.id] = data;
	    		pubsub.emit("EVENT:tags-updated", storeData.tags, storeData.active);
	    	}
	        exec(callback);
	    });
	})



	/* ------------------------- Public methods ------------------ */

	function getTags() {
		return storeData.tags;
	}

	function getActiveTags() {
		return storeData.active;
	}

	return {
		getTags: getTags,
		getActiveTags: getActiveTags
	}



	/* -------------- Private Methods ------------------ */
	// Exceute conditional callbacks
	function exec(cb, args) {
		if (typeof cb == "function") {
			cb.apply(null, args);
		}
	}




	
})();




 
module.exports = Store;