/**
 * Name
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  adapter: 'mysql',
  tableName: 'names',
  migrate: 'safe',
  autoPK: false,

  attributes: {
  	name_id: {
        type:"integer",
        required:true,
        unique: true
    },
  	es: 'STRING',
  	en: 'STRING',
  	pt: 'STRING',
  	parent: 'INTEGER',
  	type: 'STRING', 
  	points: 'INTEGER'

  	/* e.g.
  	nickname: 'string'
  	*/
    
  },

  searchAutocomplete: function(search, max, language, callback) {
     var query = Name.query("SELECT a.name_id, a.?? as name, a.type, b.?? as parent, c.?? as grandparent FROM names a LEFT JOIN names b ON a.parent = b.name_id LEFT JOIN names c ON b.parent = c.name_id WHERE a.?? LIKE ? LIMIT ?", [language, language, language, language, '%'+search+'%', max], function(err, results) {
      (err) ? callback([]) : callback(results);
     });
  },

  searchById: function(id, language, callback) {
    var query = Name.query("SELECT a.?? as name, a.type, b.?? as parent, c.?? as grandparent FROM names a LEFT JOIN names b ON a.parent = b.name_id LEFT JOIN names c ON b.parent = c.name_id WHERE a.name_id = ?", [language, language, language, id], function(err, results) {
      (err) ? callback([]) : callback(results[0]);
     });
  },


  /** These 3 next function are used by the search controllers 
  *   so they must respond in a consistent way!
  */
  searchByIdWithLocation: function(id, language, callback) {
    var query = Name.query("SELECT a.name_id, a.?? as name, a.type, b.?? as parent, b.name_id as parent_name_id, b.type as parent_type, c.?? as grandparent, c.name_id as grandparent_name_id, c.type as grandparent_type, d.*, e.flag FROM names a LEFT JOIN names b ON a.parent = b.name_id LEFT JOIN names c ON b.parent = c.name_id LEFT JOIN cities d ON a.name_id = d.name_id LEFT JOIN countries e ON c.name_id = e.name_id WHERE a.name_id = ? LIMIT 1", [language, language, language, id], callback);
  },

  searchRegion: function(id, language, callback) {
    var query = Name.query("SELECT a.name_id, a.?? as name, a.type, b.?? as parent, b.name_id as parent_name_id, b.type as parent_type, d.* FROM names a LEFT JOIN names b ON a.parent = b.name_id LEFT JOIN administrative_divisions d ON a.name_id = d.name_id WHERE a.name_id = ? LIMIT 1", [language, language, id], callback);
      // function(err, results) {
      // (err) ? callback([]) : callback(results[0]);
     // });
  },

  searchCountry: function(id, language, callback) {
    var query = Name.query("SELECT a.name_id, a.?? as name, a.type, b.*, b.flag FROM names a LEFT JOIN countries b USING (name_id) WHERE a.name_id = ? LIMIT 1", [language, id], callback);
    // function(err, results) {
    //   (err) ? callback([]) : callback(results[0]);
    //  });
  }


};
