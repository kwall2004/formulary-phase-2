Ext.define('Atlas.atlasformulary.view.common.FormularyFileImport', {
  extend: 'Ext.window.Window',
  title: 'Import File',
  controller: 'formularyfileimport',
  modal: true,
  closeable: true,
  width: 400,
  height: 96,

  viewModel: {
    data: {
      importType: 1,
      sk: null,
      username: '',
      sessionId: ''
    }
  },

  items: [
    {
      xtype: 'form',
      reference: 'formularyfileimportform',

      jsonSubmit: true,

      items: [
        {
          xtype: 'filefield',
          name: 'FileName',
          emptyText: 'File name',
          fieldLabel: 'File name',
          buttonText: '',
          buttonConfig: {
            iconCls: 'x-fa fa-upload'
          }
        },
        {
          itemId: 'usernameField',
          xtype: 'hiddenfield',
          name: 'username'
        },
        {
          itemId: 'sessionIdField',
          xtype: 'hiddenfield',
          name: 'sessionid'
        }
      ],
      buttons: [
        {
          text: 'Save',
          handler: 'onSaveClick'
        }
      ]
    }
  ]
});
