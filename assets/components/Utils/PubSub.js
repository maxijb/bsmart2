var EventEmitter = require('events').EventEmitter
  , pubsub = new EventEmitter();

console.log("corre");

module.exports  = pubsub;