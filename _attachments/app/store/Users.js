Ext.define('CouchExt.store.Users', {
  extend: 'Ext.data.Store',

  requires: ['CouchExt.proxy.Couch'],

  model: 'CouchExt.model.User',


  autoLoad: true,
  autoSync: true,

  proxy: {
    type: 'couch',
    readUrl: "_design/app/_view/users"
  }
});