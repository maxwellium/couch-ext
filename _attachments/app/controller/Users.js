Ext.define('CouchExt.controller.Users', {
  extend: 'Ext.app.Controller',

  stores: [
    'Users'
  ],
  models: [
    'User'
  ],

  views: [
    'user.List'
  ],

  init: function() {
    this.control({
      'userlist': {
        render: this.onEditorRender,
        userEdit: this.onUserEdit,
        userDelete: this.onUserDelete
      },
      'userlist button': {
        click: this.addUser
      }
    });
  },

  addUser: function () {
    var newUser,
        userStore = this.getStore('Users');

    newUser = userStore.add({
        name: '',
        password: '',
        type: 'user'
    })[0];

    this.rowEditor.startEdit(newUser, this.usersList.columns[0]);
  },

  onEditorRender: function () {
    this.usersList = Ext.ComponentQuery.query('userlist')[0];
    this.rowEditor = this.usersList.rowEditor;
  },

  onUserEdit: function (evtData) {
    var userStore = this.getStore('Users');
    var record = userStore.getAt(evtData.rowIndex);
    if(record) {
      this.rowEditor.startEdit(record, this.usersList.columns[evtData.colIndex]);
    }
  },

  onUserDelete: function (evtData) {
    var userStore = this.getStore('Users');
    var record = userStore.getAt(evtData.rowIndex);
    if(record) {
      userStore.remove(record);
    }
  }

});