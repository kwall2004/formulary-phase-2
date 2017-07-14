Ext.define('Atlas.atlasformulary.view.newdrugstomarket.GenerateReportPopUp', {
  extend: 'Ext.window.Window',
  xtype: 'newdrugstomarket-generatereportpopup',
  title: 'Generate Formulary Report',
  width: 400,
  height: 200,
  modal: true,
  beforeclose: function () {
    Ext.getBody().unmask();
  },
  viewModel: 'generatereportpopup',
  controller: 'generatereportpopup',

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
        },
        {
          xtype: 'button',
          text: 'Generate',
          itemId: 'btnGenerate',
          handler: 'onGenerate'
        }
      ]
    }
  ],

  items: [
    {
      xtype: 'container',
      padding: 20,

      items: [
        {
          xtype: 'label',
          html: '<p align="center" style="margin: 0 0 20px 0">Pick Market Entry Date Range</p>'
        },
        {
          xtype: 'datefield',
          anchor: '100%',
          fieldLabel: 'Start Date',
          format: 'm/d/Y',
          allowBlank: false,
          maxValue: new Date(), // limited to the current date or prior
          bind: {
            value: '{genRptStartDate}'
          }
        },
        {
          xtype: 'datefield',
          anchor: '100%',
          fieldLabel: 'End Date',
          format: 'm/d/Y',
          allowBlank: false,
          value: new Date(),  // defaults to today
          bind: {
            value: '{genRptEndDate}'
          }
        }
      ]
    }
  ],
  initComponent: function () {
    var me = this;

    if (me.tgtDataSource) {
      me.getViewModel().data.dataSource = me.tgtDataSource;
      me.title = 'New Drugs To Market - Generate Report FOR \'' + me.tgtDataSource + '\'.';
    }

    me.callParent();
  }
});
