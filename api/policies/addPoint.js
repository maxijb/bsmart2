/**
 * parseContext
 *
 * @module      :: Policy
 * @description :: Parses url and checks if shoudl force some language
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

var extend = require('util')._extend;


module.exports = function(req, res, next) {

    var id = parseInt(req.param('id'), 10); 
   	if (id && !isNaN(id)) {
   		City.addPoints(id, next);
   	} else {
   		next();
   	}
};