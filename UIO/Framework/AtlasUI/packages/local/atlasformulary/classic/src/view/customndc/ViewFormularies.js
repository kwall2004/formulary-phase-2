Ext.define('Atlas.atlasformulary.view.customndc.ViewFormularies', {
  extend: 'Ext.window.Window',
  xtype: 'customndc-viewformularies',

  title: 'Custom NDC - Associated Formularies',
  width: 600,
  height: 300,
  layout: 'fit',

  viewModel: {
    data: {
      ndc: null
    },
    stores: {
      customNDCFormularies: {
        type: 'customndcformularies',
        remoteSort: true,
        remoteFilter: true
      }
    }
  },

  initComponent: function (config) {
    var store = this.getViewModel().getStore('customNDCFormularies');
    store.getProxy().setExtraParam('ndc', this.getViewModel().get('ndc'));
    store.reload();

    this.callParent(config);
  },

  items: [
    {
      xtype: 'grid',
      border: false,

      bind: {
        store: '{customNDCFormularies}'
      },

      columns: [
        {
          text: 'Tenant Owner',
          dataIndex: 'TenantOwner',
          flex: 1
        }
      ],

      plugins: [
        {
          ptype: 'rowwidget',
          widget: {
            xtype: 'grid',
            autoLoad: true,
            flex: 2,

            bind: {
              store: '{record.Formularies}'
            },

            columns: [
              {
                text: 'Formulary Name',
                dataIndex: 'FrmlryName',
                flex: 1

              },
              {
                xtype: 'datecolumn',
                format: 'Y-m-d',
                text: 'Effective Date',
                dataIndex: 'EfctvStartDt',
                flex: 1

              },
              {
                text: 'Tier',
                flex: 1
              }
            ]
          }
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
            this.up().up().destroy();
          }
        }
      ]

    }
  ]
});

