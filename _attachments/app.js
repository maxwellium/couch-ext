Ext.Loader.setConfig({enabled:true});
Ext.require(['Ext.data.*', 'Ext.grid.*', 'Ext.container.Viewport']);

Ext.application({
  name: 'CouchExt',

  appFolder: 'app',

  autoCreateViewport: true,

  controllers: [
    'Users'
  ],

  launch: function() {
    Ext.create('Ext.container.Viewport', {
      layout: 'fit',
      items: [
        {
          xtype: 'userlist',
          title: 'CouchExt'
        }
      ]
    });
  }

});