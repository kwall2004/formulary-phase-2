Ext.define('Atlas.atlasformulary.view.common.NDCNoteDetail', {
  extend: 'Ext.window.Window',
  title: 'View NDC Note - Detail',
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
          columnWidth: 0.435,
          fieldLabel: 'Date',
          bind: '{note.LastModfdDate}',
          renderer: Ext.util.Format.dateRenderer('m/d/Y')
        },
        {
          xtype: 'displayfield',
          columnWidth: 0.435,
          fieldLabel: 'Author',
          bind: '{note.LastModfdBy}'
        },
        {
          xtype: 'textarea',
          columnWidth: 1,
          height: '87%',
          width: '100%',
          disabled: true,
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
          text: 'OK',
          handler: function () {
            this.up('window').destroy();
          }
        }
      ]
    }
  ]
});
