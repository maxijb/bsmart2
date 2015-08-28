/**
 * NameController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var Q = require('q');
var extend = require('util')._extend;

var controller = module.exports = {

	question: function(req, res) {
		var request = req.W.request = {
			id: req.param('id'),
			show: req.param('show'),
			month: req.param('month'),
			action: req.param('question'),
			seo: req.param('seo')
		};

		Q.nfcall(Name.searchByIdWithLocation, req.W.request.id, req.locale)
		.then(function(location) {
			req.W.location = location[0];
			if (location[0].type != "city") throw new Error("Wrong type");

			return [Q.nfcall(Weather.getWeather, location[0].city_id),
					Q.nfcall(City.getClosestButNotThis, location[0].latitude, location[0].longitude, req.locale, 6, location[0].city_id)];
		})
		.spread(function(data, closeCities, save) {
			var formattedData = weatherHelpers.formatWeatherData(data, req.ctx.unit, req.W.request.month);
			var questions = questionHelpers.possibleQuestions(formattedData);
			var usedData = questionHelpers.getDataUsedForQuestion(request.show, formattedData);
			response(req, res, "search/question", {W: req.W, data: usedData, formattedData: formattedData, mapData: closeCities, questions: questions})
		})
		.fail(function(msg) { 
			controller.error(req, res, msg);
		});


	},


	/**
	* Controller for city
	*/
	city: function(req, res) {
		Q.nfcall(Name.searchByIdWithLocation, req.W.request.id, req.locale)
		.then(function(location) {
			req.W.location = location[0];
			if (location[0].type != "city") throw new Error("Wrong type");

			return [Q.nfcall(Weather.getWeather, location[0].city_id),
					Q.nfcall(City.getClosestButNotThis, location[0].latitude, location[0].longitude, req.locale, 6, location[0].city_id),
					Q.fcall(saveInSearchHistory, location[0], req, res)];
		})
		.spread(function(data, closeCities, save) {
			var formattedData = weatherHelpers.formatWeatherData(data, req.ctx.unit, req.W.request.month);
			var graphData = weatherHelpers.formatGraphData(req.W.request.show, formattedData, req.ctx.unit);
			var climate = weatherHelpers.getClimateType(formattedData); 
			climate.description = textHelpers.generateCityText(res, climate, formattedData, req.W.location);
			var questions = questionHelpers.possibleQuestions(formattedData);
			response(req, res, "search/city", {W: req.W, data: graphData, formattedData: formattedData, mapData: closeCities, questions: questions, climate: climate});
		})
		.fail(function(msg) { 
			controller.error(req, res, msg);
		});
	},
    
  	
	/**
	* Controller for region
	*/
	region: function(req, res) {
		Q.nfcall(Name.searchRegion, req.W.request.id, req.locale)
		.then(function(location) {
			req.W.location = location = location[0];
			if (location.type != "region") throw "Wrong type";
			return [Q.nfcall(City.findByRegion, location.administrative_division_id, req.ctx.lang),
                	Q.nfcall(City.findRegionsWithCityQuantity, location.country_id, req.ctx.lang, 6)];
		})
		.spread(function(data, otherRegions) {
			response(req, res, "search/region", {W: req.W, otherRegions: otherRegions, mapData: weatherHelpers.convertCities(data, req.ctx.unit)});
		})
		.fail(function(msg) {
			controller.error(req, res, msg);
		});
	},


	/**
	* Controller for country
	*/
	country: function(req, res) {
		Q.nfcall(Name.searchCountry, req.W.request.id, req.locale)
		.then(function(location) {
			req.W.location = location = location[0];
			if (location.type != "country") throw "Wrong type";
			return Q.nfcall(City.findRegionsWithCityQuantity, location.country_id, req.ctx.lang)
		})
		.then(function(data) {
			response(req, res, "search/country", {W: req.W, regions: data});
		})
		.fail(function(msg) {
			controller.error(req, res, msg);
		})
	},

	error: function(req, res, msg) {
		res.json('error: ' + msg);
	},

	viewParams: function(req, res) {
		console.log(req.params);
		res.json(res.params);
	},

	cityMonth: function(req, res) {
		res.json({loc: 'citymonth'});
	},

	forecast: function(req, res) {
		res.json({loc: 'forecast'});
	},

	today: function(req, res) {
		res.json({loc: 'today'});
	},


	search: function(req, res) {
		var request = req.W.request = {
			id: req.param('id'),
			show: req.param('show'),
			month: req.param('month'),
			action: req.param('action'),
			seo: req.param('seo')
		};

		if (module.exports[request.action]) {
			controller[request.action](req, res);
		} else {
			controller.error(req, res, "Invalid action");
		}

	},


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to NameController)
   */
  _config: {}

  
};


/**
* Returns response based on format required with the data provdided by the controller
*/

function response(req, res, view, data) {
	if (req.param('format') == "json") {
		res.json(data);
	} else {
		res.view(view, data);
	}
}



/**
* Saves this search in the cookie
*/
function saveInSearchHistory(location, req, res) {
	//check that we have the proper ctx format
    if (!req.ctx.events) {
    	req.ctx.events = { sh : [] };
    } else if (!req.ctx.events.sh) {
    	req.ctx.events.sh = [];
    }
    //add our request wihtout the seo in the context
    var item = extend({}, req.W.request);
    delete(item.seo);
    //if not already in sh, add it
    if (!alreadyInSH(item, req.ctx.events.sh)) {
    	req.ctx.events.sh.unshift(item);
    }
    //save the cookie
    res.cookie(sails.config.constants.cookieName, req.ctx);
    return null;
}

/**
* Checks if SH list contains this item
*/
function alreadyInSH(item, list) {
	item = JSON.stringify(item);
	var len = list.length, 
		i;

	for (i = len -1; i >= 0; i-- ) {
		if (JSON.stringify(list[i]) == item) return true;
	}

	return false;
}
