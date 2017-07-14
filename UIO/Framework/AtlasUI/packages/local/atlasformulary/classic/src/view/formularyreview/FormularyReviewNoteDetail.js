Ext.define('Atlas.atlasformulary.view.formularyreview.FormularyReviewNoteDetail', {
  extend: 'Ext.window.Window',
  title: 'Formulary Review - View Notes - Detail',
  width: 480,
  minHeight: 320,
  modal: true,
  layout: 'fit',

  items: [
    {
      xtype: 'form',
      layout: 'column',
      items: [
        {
          xtype: 'displayfield',
          columnWidth: 0.29,
          fieldLabel: 'Date',
          bind: '{frnote.LastModfdDate}',
          renderer: Ext.util.Format.dateRenderer('m/d/Y')
        },
        {
          xtype: 'displayfield',
          columnWidth: 0.29,
          fieldLabel: 'Author',
          bind: '{frnote.LastModfdBy}'
        },
        {
          xtype: 'displayfield',
          columnWidth: 0.29,
          fieldLabel: 'Subject',
          bind: '{frnote.Subject}'
        },
        {
          xtype: 'textarea',
          columnWidth: 1,
          height: '87%',
          width: '100%',
          disabled: true,
          fieldLabel: 'Note',
          bind: '{frnote.AprvlNotes}'
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
