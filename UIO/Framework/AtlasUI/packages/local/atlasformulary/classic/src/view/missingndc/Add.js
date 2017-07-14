Ext.define('Atlas.atlasformulary.view.missingndc.Add', {
  extend: 'Ext.window.Window',
  xtype: 'missingndc-add',

  controller: 'missingndc_add',

  title: 'Add Missing NDC',

  width: 800,
  height: 200,
  resizable: false,

  layout: 'center',

  viewModel: {
    data: {
      missingNDC: null,
      dataSource: ''
    }
  },

  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'top',
      items: [
        {
          xtype: 'displayfield',
          fieldLabel: 'Data Source',
          bind: '{dataSource}'
        }
      ]
    }
  ],

  items: [
    {
      xtype: 'form',
      layout: 'hbox',
      modelValidation: true,

      items: [
        {
          xtype: 'medispanndcsearchcombo',
          reference: 'medispanndcsearchcombo',
          fieldLabel: 'Medispan NDC',
          labelAlign: 'top',
          enableKeyEvents: true,
          allowBlank: false,
          emptyText: 'NDC or label name...',
          bind: {
            value: '{missingNDC.NDC}'
          },

          listeners: {
            select: 'onNDCSelect'
          },
          hidden: true
        },
        {
          xtype: 'fdbndcsearchcombo',
          reference: 'fdbndcsearchcombo',
          fieldLabel: 'FDB NDC',
          labelAlign: 'top',
          allowBlank: false,
          emptyText: 'NDC or label name...',
          bind: {
            value: '{missingNDC.NDC}'
          },

          listeners: {
            select: 'onNDCSelect'
          },
          hidden: true
        },
        {
          xtype: 'textfield',
          readOnly: true,
          fieldLabel: 'Drug Name',
          labelAlign: 'top',
          allowBlank: false,
          bind: '{missingNDC.LabelName}'
        },
        {
          xtype: 'fdbgcnsearchcombo',
          reference: 'fdbgcnsearchcombo',
          fieldLabel: 'FDB GCN',
          labelAlign: 'top',
          enableKeyEvents: true,
          allowBlank: false,
          emptyText: 'GCN or label name...',
          bind: {
            value: '{missingNDC.GCN_SEQNO}'
          },

          listeners: {
            select: 'onGCNSelect'
          },
          hidden: true
        },
        {
          xtype: 'medispangpisearchcombo',
          reference: 'medispangpisearchcombo',
          fieldLabel: 'Medispan GPI',
          labelAlign: 'top',
          enableKeyEvents: true,
          allowBlank: false,
          emptyText: 'GPI or label name...',
          bind: {
            value: '{missingNDC.GPI}'
          },

          listeners: {
            select: 'onGPISelect'
          },
          hidden: true
        }
      ],

      buttons: [
        {
          text: 'Cancel',
          handler: 'onCancel'
        },
        {
          text: 'Save',
          formBind: true,
          disabled: true,
          handler: 'onSave'
        }
      ]
    }
  ],

  initComponent: function () {
    this.callParent();
    this.getViewModel().set('dataSource', this.dataSource);
  }
});
