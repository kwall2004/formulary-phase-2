Ext.define('Atlas.atlasformulary.view.customndc.History', {
  extend: 'Ext.window.Window',
  xtype: 'customndc-history',

  title: 'Custom NDC - NDC History',

  width: 600,
  height: 400,
  layout: {
    type: 'vbox'
  },

  viewModel: {
    data: {
      ndc: null
    },
    stores: {
      histories: {
        type: 'customndchistories'
      }
    }
  },

  initComponent: function (config) {
    var ndc = this.getViewModel().get('ndc');

    if (ndc) {
      var store = this.getViewModel().getStore('histories');
      store.getProxy().setExtraParam('ndc', ndc);
      store.reload();
    }

    this.callParent(config);
  },

  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'top',
      items: [
        {
          fieldLabel: 'NDC',
          xtype: 'displayfield',
          bind: '{ndc}'

        }
      ]
    },
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
    },
    {
      xtype: 'grid',
      border: false,
      width: 600,
      height: 300,

      bind: '{histories}',

      columns: [
        {
          text: 'Changes',
          dataIndex: 'ChangeSummary',
          flex: 3,
          renderer: function (value) {
            return '<span style="white-space: normal;">' + value + '</span>';
          }
        },
        {
          xtype: 'datecolumn',
          text: 'Date',
          dataIndex: 'ChangeDate',
          flex: 1,
          format: 'Y-m-d'
        }
      ]
    }
  ]
});

