Ext.define('CouchExt.view.user.List' ,{
  extend: 'Ext.grid.Panel',
  alias : 'widget.userlist',

  selType: 'rowmodel',
  rowEditor: Ext.create('Ext.grid.plugin.RowEditing', {
    clicksToEdit: 2
  }),

  store: 'Users',

  title : 'All Users',

  initComponent: function() {
    var userList = this;

    this.addEvents(['userEdit', 'userDelete']);

    this.columns = [
      { header: 'Id',  dataIndex: '_id',  flex: 1, hidden: true },
      { header: 'Revision',  dataIndex: '_rev',  flex: 1, hidden: true },
      {
        header: 'Name',
        dataIndex: 'name',
        editor: {
          xtype: 'textfield',
          allowBlank: false
        },
        flex: 1
      },
      {
        header: 'Password',
        dataIndex: 'password',
        editor: {
          xtype: 'textfield',
          allowBlank: false
        },
        flex: 1
      },
      {
        xtype: 'actioncolumn',
        width: 50,
        menuDisabled: true,
        items: [
          {
            icon: 'images/user_edit.png',  // Use a URL in the icon config
            tooltip: 'Edit',
            handler: function(grid, rowIndex, colIndex) {
              userList.fireEvent('userEdit', {
                rowIndex: rowIndex,
                colIndex: colIndex
              });
            }
          },
          {
            icon: 'images/user_delete.png',
            tooltip: 'Delete',
            handler: function(grid, rowIndex, colIndex) {
              userList.fireEvent('userDelete', {
                rowIndex: rowIndex,
                colIndex: colIndex
              });
            }
          }
        ]
      }
    ];

    this.plugins = [ this.rowEditor ];

    this.dockedItems = [{
      xtype: 'toolbar',
      dock: 'bottom',
      items: [ '->', { text: 'Add User' } ]
    }];

    this.callParent(arguments);
  }
});