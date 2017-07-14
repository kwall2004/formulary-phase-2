Ext.define('Atlas.atlasformulary.view.common.FormularyNotesWindow', {
  extend: 'Ext.window.Window',
  itemId: 'formulary-notes-window',
  title: 'Formulary Review - View Notes',
  modal: false,
  closeable: true,
  resizable: true,
  width: 480,
  height: 320,
  layout: 'fit',

  controller: 'formularynoteswindowctrl',

  viewModel: {
    stores: {
      formularyreviewnotes: {
        type: 'formularyreviewnotes',
        autoLoad: false,
        proxy: {
          url: '/formularynotes',
          reader: {
            rootProperty: ''
          }
        }
      }
    },
    data: {
      formularySK: null
    }
  },

  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'bottom',
      items: [
        '->',
        {
          xtype: 'button',
          text: 'Close',
          handler: 'onCloseClick'
        },
        {
          xtype: 'button',
          text: 'Add Note',
          iconCls: 'x-fa fa-pencil-square-o',
          handler: 'onAddNoteClick'
        }
      ]
    }
  ],

  items: [
    {
      xtype: 'tabpanel',
      items: [
        {
          title: 'Notes',
          scrollable: true,
          items: [
            {
              xtype: 'grid',
              bind: '{formularyreviewnotes}',
              itemId: 'formularyreviewnotesgrid',
              emptyText: 'No notes to display',
              columns: {
                defaults: {
                  flex: 1
                },
                items: [
                  {
                    xtype: 'datecolumn',
                    text: 'Date',
                    dataIndex: 'LastModfdTs',
                    format: 'm-d-Y'
                  },
                  {
                    text: 'Author',
                    dataIndex: 'LastModfdBy'
                  },
                  {
                    text: 'Subject',
                    dataIndex: 'Subject'
                  },
                  {
                    text: 'Preview',
                    flex: 3,
                    dataIndex: 'Notes',
                    renderer: function (value) {
                      return '<span style="white-space: normal;">' + value + '</span>';
                    }
                  }
                ]
              },
              listeners: {
                rowdblclick: 'onNoteDblClicked'
              }

            }
          ]
        }
      ]
    }
  ]
});
