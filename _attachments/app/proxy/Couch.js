Ext.define('CouchExt.proxy.Couch', {
  extend: 'Ext.data.proxy.Rest',
  alias: 'proxy.couch',

  actionMethods: {
    create : 'PUT',
    read   : 'GET',
    update : 'PUT',
    destroy: 'DELETE'
  },

  url: '/',
  db: 'couchext',

  appendId: true,

  startParam: 'startkey',
  noCache: false,

  reader: {
    type: 'json',
    root: 'rows',
    record: 'value',
    idProperty: '_id',
    totalProperty: 'total_rows'
  },
/*
  create: function(operation, proxy, store) {
    var record = operation.records[0];
    if(record.data._rev === null) {
        var _revField = record.fields.getByKey('_rev');
        _revField.persist = false; // sneaky way to make sure this isn't sent in ajax request
    }

    console.log(operation);

    this.api.create = '/' + this.db + '/';

    return this.doRequest.apply(this, arguments);
  },*/

  update: function(operation, callback, scope) {
      var record = operation.records[0],
        me = this;
      this.api.update = '/' + this.db + '/';

      if(record.data._rev == "") {
        operation.records[0].fields.getByKey("_rev").persist = false;
      } else {
        operation.records[0].fields.getByKey("_rev").persist = true;
      }

      callback = function(operation) {
        var data = Ext.decode(operation.response.responseText);
        if (data.rev) {
          operation.records[0].data._rev = data.rev;
        }
        operation.commitRecords(operation.records);
      };

      return this.doRequest.apply(this, arguments);
  },

  read: function(operation, callback, scope) {
    this.api.read = '/' + this.db + '/' + this.readUrl;

    // encode the key value correctly to play nice with couchdb
    /*console.dir(operation);
    if( operation.request.params.key ) {
      operation.request.params.key = Ext.JSON.encode(operation.request.params.key);
    }*/
    return this.doRequest.apply(this, arguments);
  },

  destroy: function(operation, callback, scope) {
    this.api.destroy = '/' + this.db + '/';

    this.setExtraParam('rev',operation.records[0].data._rev);

    return this.doRequest.apply(this, arguments);
  }

});