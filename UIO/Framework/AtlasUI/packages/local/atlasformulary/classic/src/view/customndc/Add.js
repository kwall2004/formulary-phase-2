Ext.define('Atlas.atlasformulary.view.customndc.Add', {
  extend: 'Ext.window.Window',
  xtype: 'customndc-add',

  controller: 'formularyaddcontroller',
  viewModel: {
    data: {
      drugListSK: null,
      customNDC: null
    }
  },

  title: 'Add Custom NDC',

  width: 400,
  height: 300,

  items: [
    {
      xtype: 'form',
      reference: 'addcustomndcform',
      items: {
        defaults: {
          xtype: 'textfield',
          layout: 'center',
          flex: 1
        },

        items: [
          {
            xtype: 'numberfield',
            fieldLabel: 'NDC',
            name: 'customNDC',
            allowBlank: false,
            maxLength: 11,
            enforceMaxLength: true,
            keyNavEnabled: false,
            mouseWheelEnabled: false,
            hideTrigger: true,
            bind: '{customNDC.NDC}'
          },
          {
            fieldLabel: 'Label Name',
            name: 'labelName',
            allowBlank: false,
            bind: '{customNDC.LabelName}'
          },
          {
            fieldLabel: 'Unit Price',
            name: 'unitPrice',
            allowBlank: false,
            bind: '{customNDC.UnitPrice}'
          },
          {
            fieldLabel: 'Price Date',
            xtype: 'datefield',
            name: 'priceDate',
            allowBlank: false,
            bind: '{customNDC.DateToMarket}'
          }
        ]
      }
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
          reference: 'cancelbutton',
          text: 'Cancel',
          handler: 'onCancelClick'
        },
        {
          xtype: 'button',
          text: 'Add',
          reference: 'addbutton',
          formBind: true,
          handler: 'onAddClick'
        }
      ]
    }
  ],

  initComponent: function () {
    this.getViewModel().set('customNDC', Ext.create('Atlas.atlasformulary.model.CustomNdc', {}));

    this.callParent();
  }
});
