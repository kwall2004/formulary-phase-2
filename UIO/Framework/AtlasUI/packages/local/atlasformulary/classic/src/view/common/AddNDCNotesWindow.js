Ext.define('Atlas.atlasformulary.view.common.AddNDCNotesWindow', {
  extend: 'Ext.window.Window',
  title: 'Add NDC Note',
  modal: true,
  closeable: true,
  resizable: true,
  width: 480,
  height: 320,
  layout: 'fit',

  controller: 'addndcnoteswindow',

  viewModel: {
    data: {
      note: null
    }
  },

  items: [
    {
      xtype: 'form',
      layout: 'fit',
      items: [
        {
          xtype: 'textarea',
          fieldLabel: 'Note',
          bind: '{note.NDCNotes}'
        }
      ]
    }
  ],

  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'bottom',
      items: [
        '->',
        {
          xtype: 'button',
          text: 'Cancel',
          handler: 'onCloseClick'
        },
        {
          xtype: 'button',
          text: 'Save',
          handler: 'onSaveNDCNote'
        }
      ]
    }
  ]
});
