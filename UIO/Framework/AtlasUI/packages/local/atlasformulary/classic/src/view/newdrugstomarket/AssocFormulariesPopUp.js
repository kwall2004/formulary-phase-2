Ext.define('Atlas.atlasformulary.view.newdrugstomarket.AssocFormulariesPopUp', {
  extend: 'Ext.window.Window',
  xtype: 'newdrugstomarket-assocformulariespopup',
  width: 650,
  region: 'center',
  modal: true,
  scrollable: true,
  beforeclose: function () {
    Ext.getBody().unmask();
  },
  viewModel: 'assocformulariespopup',
  controller: 'assocformulariespopup',
  layout: {
    type: 'fit',
    padding: '5 10 10 5'
  },
  dockedItems: [
    {
      // We may want to pull this out.
      xtype: 'toolbar',
      dock: 'bottom',
      ui: 'footer',
      layout: {
        pack: 'center',
        type: 'hbox'
      },
      items: [
        {
          xtype: 'button',
          text: 'Cancel',
          itemId: 'btnCancel',
          listeners: {
            click: function (button) {
              button.up('window').destroy();
            }
          }
        }
      ]
    }
  ],

  items: [
    {
      xtype: 'grid',

      bind: '{associatedformularies}',

      viewConfig: {
        deferEmptyText: false,
        emptyText: 'No formularies found'
      },

      columns: [
        {
          text: 'Name',
          dataIndex: 'FrmlryName',
          flex: 3
        },
        {
          text: 'Version',
          dataIndex: 'FrmlryVer',
          flex: 1
        },
        {
          xtype: 'datecolumn',
          text: 'Effective Date',
          dataIndex: 'EfctvStartDt',
          format: 'm-d-Y',
          flex: 1
        },
        {
          xtype: 'datecolumn',
          text: 'Approved Date',
          dataIndex: 'EffectiveDate',
          format: 'm-d-Y',
          flex: 1
        }
      ]
    }
  ],

  initComponent: function () {
    var me = this;
    if (me.itemConfig.NDCPassed) {
      me.getViewModel().data.NDCPassed = me.itemConfig.NDCPassed;
    }

    me.callParent();
  }
});