/**
 * Name
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  adapter: 'mysql',
  tableName: 'resources',
  migrate: 'safe',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
  	res_id: {
        type:"integer",
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    name: 'STRING',
    uri: 'STRING',
    uri_long: "STRING",
    icon: 'STRING',
    create: 'timestamp',
    tag_id: {
        type:"integer"
    },
    user_id: "integer",
  },

};
