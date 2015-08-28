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
    
  

	signup : function(req, res) {
		console.log(req.params.all());
		User.find({type: req.param('type'), native_id: req.param('native_id')})
			.then(function(user) {
				if (user && user.length) {

					res.send(user[0]);
				} else {
					User.create(req.params.all())
						.then(function(item) {
							res.send(item);
						});
				}
			});

	},


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to NameController)
   */
  _config: {}

  
};
