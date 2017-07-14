Ext.define('Atlas.atlasformulary.view.common.AssocFormulariesWindow', {
  extend: 'Ext.window.Window',
  itemId: 'assocformularieswindow',
  title: 'Associated Formularies',
  modal: true,
  closeable: true,
  resizable: true,
  width: 600,
  height: 400,
  layout: 'fit',

  controller: 'assocformularieswindow',

  viewModel: {
    stores: {
      druglistassocformularies: {
        type: 'druglistassocformularies',
        autoLoad: false,
        proxy: {
          url: '/druglistformulary',
          reader: {
            rootProperty: ''
          }
        }
      }
    }
  },

  items: [
    {
      xtype: 'tabpanel',
      items: [
        {
          title: 'Associated Formularies',
          flex: 1,
          items: [
            {
              xtype: 'grid',
              bind: '{druglistassocformularies}',
              flex: 1,
              columns: {
                defaults: {
                  flex: 1
                },
                items: [
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
                    text: 'Effective Date',
                    dataIndex: 'EfctvStartDt',
                    format: 'Y-m-d'
                  }
                ]
              }
            }
          ]
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
          text: 'Close',
          handler: 'onCloseClicked'
        }
      ]
    }
  ]
});

