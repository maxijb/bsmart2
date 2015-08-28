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

module.exports = {
    
  

	autocomplete : function(req, res) {
		//default max results
		var max = parseInt(req.params.max, 10);
		if (!max || isNaN(max)) max = 10;
		
		//if not search return empty array
		if (!req.params.search || req.params.search.length < 3) {
			res.json([]);
		}

		console.log(req.ctx);

		Name.searchAutocomplete(req.params.search, max, req.language, function(data) {
			res.json({data: data});
		})


	},


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to NameController)
   */
  _config: {}

  
};
