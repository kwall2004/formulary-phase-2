Ext.define('Atlas.atlasformulary.view.customndc.Read', {
  extend: 'Ext.window.Window',
  xtype: 'customndc-read',

  controller: 'formularyaddcontroller',
  viewModel: {
    data: {
      drugListSK: null,
      customNDC: null,
      customNDC2: null
    }
  },

  title: 'Custom NDC - View Custom NDC',

  layout: 'fit',
  ghost: false,
  modal: true,
  width: 400,
  height: 300,
  closable: true,

  items: [
    {
      xtype: 'form',
      modelValidation: true,
      reference: 'readcustomndcform',
      items: {
        defaults: {
          xtype: 'displayfield',
          flex: 1
        },

        items: [
          {
            fieldLabel: 'NDC',
            name: 'customNDC',
            bind: '{customNDC2.NDC}'
          },
          {
            fieldLabel: '*Label name',
            name: 'labelName',
            bind: '{customNDC2.LabelName}'
          },
          {
            fieldLabel: '*Unit Price',
            name: 'unitPrice',
            bind: '{customNDC2.UnitPrice}'
          },
          {
            fieldLabel: '*Price Date',
            name: 'priceDate',
            bind: '{customNDC2.DateToMarket}',
            renderer: Ext.util.Format.dateRenderer('m/d/Y')
          }
        ]
      }
    }
  ],

  buttons: [
    {
      text: 'Ok',
      handler: 'onCancelClick'
    }
  ],
  initComponent: function () {
    var me = this;
    me.getViewModel().data.customNDC2 = me.row;
    me.callParent();
  }
});

