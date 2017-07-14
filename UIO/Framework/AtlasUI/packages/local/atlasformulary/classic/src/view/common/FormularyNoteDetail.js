Ext.define('Atlas.atlasformulary.view.common.FormularyNoteDetail', {
  extend: 'Ext.window.Window',
  title: 'View Formulary Note - Detail',
  modal: true,
  closeable: true,
  resizable: true,
  width: 480,
  height: 320,
  layout: 'fit',

  items: [
    {
      xtype: 'form',
      layout: 'column',
      items: [
        {
          xtype: 'displayfield',
          columnWidth: 0.3,
          labelWidth: 40,
          fieldLabel: 'Date',
          bind: '{note.LastModfdTs}',
          renderer: Ext.util.Format.dateRenderer('m/d/Y')
        },
        {
          xtype: 'displayfield',
          columnWidth: 0.3,
          labelWidth: 50,
          fieldLabel: 'Author',
          bind: '{note.LastModfdBy}'
        },
        {
          xtype: 'displayfield',
          columnWidth: 0.3,
          labelWidth: 50,
          fieldLabel: 'Subject',
          bind: '{note.Subject}'
        },
        {
          xtype: 'textarea',
          columnWidth: 1,
          height: '87%',
          width: '100%',
          disabled: true,
          fieldLabel: 'Note',
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
          text: 'OK',
          handler: function () {
            this.up('window').destroy();
          }
        }
      ]
    }
  ]
});
