/**
 * Name
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  adapter: 'mysql',
  tableName: 'users',
  migrate: 'safe',
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
  	id: {
        type:"integer",
        unique: true
    },
    name: 'STRING',
    icon: 'STRING',
    signup: 'timestamp',
    email: 'string',
    type: 'STRING',
    native_id: "STRING",
    password: {type:"STRING", defaultsTo:""}
  },

};
