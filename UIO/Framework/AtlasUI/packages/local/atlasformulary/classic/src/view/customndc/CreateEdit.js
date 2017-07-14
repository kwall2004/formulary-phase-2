Ext.define('Atlas.atlasformulary.view.customndc.CreateEdit', {
  extend: 'Ext.window.Window',
  xtype: 'customndc-createedit',
  controller: 'formularycreateeditcontroller',
  reference: 'customndcedit',
  title: 'Edit Custom NDC',
  layout: 'fit',
  ghost: false,
  modal: true,
  width: 400,
  height: 300,
  closable: true,
  viewModel: {
    data: {
      customNDC2: null
    }
  },

  items: [
    {
      xtype: 'form',
      modelValidation: true,
      reference: 'editcustomndcform',
      items: {
        defaults: {
          xtype: 'textfield',
          layout: 'center',
          flex: 1
        },

        items: [
          {
            fieldLabel: 'NDC',
            name: 'customNDC',
            bind: '{customNDC2.NDC}',
            disabled: true

          },
          {
            fieldLabel: '*Label name',
            name: 'labelName',
            bind: '{customNDC2.LabelName}',
            enableKeyEvents: true,
            listeners: {
              keyup: 'onChange'
            }
          },
          {
            fieldLabel: '*Unit Price',
            name: 'unitPrice',
            bind: '{customNDC2.UnitPrice}',
            enableKeyEvents: true,
            listeners: {
              keyup: 'onChange'
            }
          },
          {
            fieldLabel: '*Price Date',
            xtype: 'datefield',
            name: 'priceDate',
            bind: '{customNDC2.DateToMarket}',
            altFormats: 'c',
            format: 'm-d-Y',
            enableKeyEvents: true,
            listeners: {
              blur: 'onChange',
              keyup: 'onChange'
            }
          }
        ]
      }
    }
  ],

  buttons: [
    {
      text: 'Cancel',
      handler: 'onCancelClick'
    },
    {
      text: 'Save',
      handler: 'onSaveCustomNDCClick',
      reference: 'customndceditsave',
      disabled: true
    }
  ],
  initComponent: function () {
    var me = this;
    me.getViewModel().data.customNDC2 = me.row;
    me.callParent();
  }
});
