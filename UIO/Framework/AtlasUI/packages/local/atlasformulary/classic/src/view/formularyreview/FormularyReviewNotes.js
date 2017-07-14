Ext.define('Atlas.atlasformulary.view.formularyreview.FormularyReviewNotes', {
  extend: 'Ext.window.Window',
  xtype: 'formularyreview-notes',
  controller: 'formularyreviewnotes',
  title: 'Formulary Review - View Notes',
  width: 480,
  minHeight: 320,
  modal: true,

  items: [
    {
      xtype: 'grid',
      reference: 'notesGrid',
      emptyText: 'No Notes Available',
      bind: '{reviewnotes}',
      forceFit: true,

      columns: [
        {
          text: 'Date',
          dataIndex: 'AprvlDate',
          xtype: 'datecolumn',
          format: 'Y-m-d'
        },
        {
          text: 'Author',
          dataIndex: 'CreatedBy'
        },
        {
          text: 'Subject',
          dataIndex: 'AprvlTypeName'
        },
        {
          text: 'Notes Preview',
          dataIndex: 'AprvlNotes'
        }
      ],

      listeners: {
        rowdblclick: 'onDoubleClickRow'
      }
    }
  ],

  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'bottom',

      layout: {
        pack: 'end'
      },

      items: [
        {
          xtype: 'button',
          text: 'AddNew',
          handler: 'onOKClick'
        },
        {
          xtype: 'button',
          text: 'OK',
          handler: 'onOKClick'
        }
      ]
    }
  ]
});
