/**
 * Name
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */



export default  {
  tableName: 'tags',
  migrate: 'safe',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: 'false',
  connection: 'someMysqlServer',

  attributes: {
    id: {
        type:"integer",
        primaryKey: true,
        autoIncrement: true
    },
    name: 'STRING',
    icon: 'STRING',
    create: 'timestamp',
    user_id: {
        type:"integer",
        required:true
    },
    parent: "integer",
    color: "STRING"
  }



};