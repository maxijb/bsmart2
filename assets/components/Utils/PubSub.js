var EventEmitter = require('events').EventEmitter
  , pubsub; 


if (typeof window !== "undefined") {
	pubsub = window.pubsub || new EventEmitter();
	window.pubsub = pubsub;
} else {
	pubsub = new EventEmitter();
}

module.exports  = pubsub;