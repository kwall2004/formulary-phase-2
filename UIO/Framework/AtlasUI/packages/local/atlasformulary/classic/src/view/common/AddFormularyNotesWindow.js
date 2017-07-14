Ext.define('Atlas.atlasformulary.view.common.AddFormularyNotesWindow', {
  extend: 'Ext.window.Window',
  title: 'Add Formulary Note',
  modal: true,
  closeable: true,
  resizable: true,
  width: 480,
  height: 320,
  layout: 'fit',

  controller: 'addformularynoteswindow',

  viewModel: {
    data: {
      note: null
    }
  },

  items: [
    {
      xtype: 'form',
      layout: 'column',
      items: [
        {
          xtype: 'textfield',
          fieldLabel: 'Subject',
          columnWidth: 0.9,
          labelWidth: 50,
          bind: '{note.Subject}'
        },
        {
          xtype: 'textarea',
          fieldLabel: 'Note',
          columnWidth: 0.9,
          labelWidth: 50,
          height: '87%',
          width: '100%',
          bind: '{note.Notes}'

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
          handler: 'onSaveFormularyNote'
        }
      ]
    }
  ]
});
