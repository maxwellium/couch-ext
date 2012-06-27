Ext.define('CouchExt.model.User', {
  extend: 'Ext.data.Model',

  requires: ['Ext.data.UuidGenerator'],
  idgen: 'uuid',
  idProperty: '_id',

  fields: [
    { name: '_id', optional: false, defaultValue: null, type: 'string' },
    { name: '_rev', optional: true, defaultValue: "", type: 'string' },
    { name: 'type', optional: true, defaultValue: "user", type: 'string' },
    { name: 'name', optional: true, defaultValue: null, type: 'string' },
    { name: 'password', optional: true, defaultValue: null, type: 'string' }
  ]

});