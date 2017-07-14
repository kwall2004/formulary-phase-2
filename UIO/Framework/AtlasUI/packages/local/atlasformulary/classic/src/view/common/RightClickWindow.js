Ext.define('Atlas.atlasformulary.view.common.RightClickWindow', {
  extend: 'Ext.window.Window',
  itemId: 'rightclickwindow',
  modal: true,
  closeable: true,
  resizable: true,
  width: 480,
  height: 320,
  layout: 'fit',

  bind: {
    title: '{NDC} - {labelName} - Drug Search Detail'
  },

  controller: 'rightclickwindowctrl',

  viewModel: {
    stores: {
      ndcnotes: {
        type: 'ndcnotes',
        autoLoad: false,
        proxy: {
          url: '/ndcnotes',
          reader: {
            rootProperty: ''
          }
        }
      },
      ndcformularies: {
        type: 'ndcformularies',
        autoLoad: false,
        proxy: {
          url: '/formularyndc',
          reader: {
            rootProperty: ''
          }
        }
      },
      customndchistories: {
        type: 'customndchistories',
        autoLoad: false,
        proxy: {
          url: '/customndchistory',
          reader: {
            rootProperty: ''
          }
        }
      }
    },
    data: {
      NDC: null,
      labelName: null,
      activeTab: null
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
          handler: 'onAddNoteClick',
          bind: {
            hidden: '{activeTab !== "notes"}'
          }
        }
      ]
    }
  ],

  items: [
    {
      xtype: 'tabpanel',
      items: [
        {
          title: 'History',
          itemId: 'history',
          scrollable: true,
          items: [
            {
              xtype: 'grid',
              bind: '{customndchistories}',
              columns: {
                defaults: {
                  flex: 1
                },
                items: [
                  {
                    text: 'Changes',
                    dataIndex: 'ChangeSummary'
                  },
                  {
                    xtype: 'datecolumn',
                    text: 'Effective Date',
                    dataIndex: 'ChangeDate',
                    format: 'm-d-Y'
                  },
                  {
                    text: 'Source',
                    dataIndex: 'DataSource'
                  }
                ]
              }
            }
          ],
          listeners: {
            activate: 'onTabActivate'
          }
        },
        {
          title: 'Formulary',
          itemId: 'formulary',
          scrollable: true,
          items: [
            {
              xtype: 'grid',
              bind: '{ndcformularies}',
              columns: {
                defaults: {
                  flex: 1
                },
                items: [
                  {
                    xtype: 'datecolumn',
                    text: 'Effective Date',
                    dataIndex: 'EfctvStartDt',
                    format: 'm-d-Y'
                  },
                  {
                    text: 'Formulary Name',
                    dataIndex: 'FrmlryName'
                  },
                  {
                    text: 'Version',
                    dataIndex: 'FrmlryVer'
                  },
                  {
                    xtype: 'datecolumn',
                    text: 'Approved Date',
                    dataIndex: 'ApprovedDate',
                    format: 'm-d-Y'
                  }
                ]
              }
            }
          ],
          listeners: {
            activate: 'onTabActivate'
          }
        },
        {
          title: 'Notes',
          itemId: 'notes',
          scrollable: true,
          items: [
            {
              xtype: 'grid',
              bind: '{ndcnotes}',
              emptyText: 'No notes to display',
              columns: {
                defaults: {
                  flex: 1
                },
                items: [
                  {
                    xtype: 'datecolumn',
                    text: 'Date',
                    dataIndex: 'LastModfdDate',
                    format: 'm-d-Y'
                  },
                  {
                    text: 'Author',
                    dataIndex: 'LastModfdBy'
                  },
                  {
                    text: 'Preview',
                    flex: 3,
                    dataIndex: 'NDCNotes',
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
          ],
          listeners: {
            activate: 'onTabActivate'
          }
        }
      ]
    }
  ]
});
