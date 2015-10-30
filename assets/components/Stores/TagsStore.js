var _ = require('lodash');
var pubsub = require('../Utils/PubSub');



class Store {

	constructor() {
		
		this.storeData = {
			tags: [],
			active: {}
		};
		let storeData = this.storeData;

		if (typeof W != "undefined" && W.data && W.data.tags) {
			storeData.tags = W.data.tags;
		}

		pubsub.on("ACTION:tag-toggle", (id, callback) => {

			if (storeData.tags[id]) {
				storeData.tags[id].active = ! storeData.tags[id].active;

				if (this.storeData.active[id]) delete storeData.active[id];
				else { storeData.active[id] = true; }
			}
			
			pubsub.emit("EVENT:tags-updated", storeData.tags, storeData.active);


		});

		pubsub.on("ACTION:tag-create", (name, color, callback) => {
			///TODO: user should come from the cookie in server side
		    $.post('/tag/create', {user_id: W.user.id, name, color}, (data) => {
		    	if (data && data.id) {
		    		storeData.tags[data.id] = data;
		    		pubsub.emit("EVENT:tags-updated", storeData.tags, storeData.active);
		    	}
		        exec(callback);
		    });
		})

	}


	getTags() {
		return this.storeData.tags;
	}

	getActiveTags() {
		return this.storeData.active;
	}

	removeTag(id, callback) {
		let index = -1, 
        	tags = this.storeData.tags;

        //find the index
        tags.map((x, ind) => { 
        	if (x.id == id) { index = ind; }
        });

        //remove form id if necessary
        delete this.storeData.active[id];

        //if found remove from state and datatbase
        if (index > -1) {
        	tags.splice(index, 1);
		    //delete from database
		    $.post('/tag/destroy/' + id);
        }
	    
        //return tags
	    exec(callback, [tags]);
	}


}


// Exceute conditional callbacks
function exec(cb, args) {
	if (typeof cb == "function") {
		cb.apply(null, args);
	}
}

 
export default new Store();