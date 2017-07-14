// k3279 - Kevin Tabasan - 11/30/2016

Ext.define('Atlas.portals.view.provider.InstitutionalClaimsDiagCodesWindow', {
  extend: 'Ext.window.Window',
  xtype: 'institutionalclaims-diagcodes',
    //viewModel: 'institutionalclaims-diagcodes',
  controller: 'institutionalclaims-diagcodes',
  title: 'Enter Diagnosis Codes',
  modal: true,

  viewModel: {},

  dockedItems: [{
    xtype: 'toolbar',
    dock: 'bottom',

    defaults: {
      xtype: 'button'
    },

    items: ['->', {
      text: 'OK',
      handler: 'onOKClick'
    }, {
      text: 'Cancel',
      handler: 'onCancelClick'
    }, {
      text: 'Clear',
      handler: 'onClearClick'
    }, '->']
  }],

  items: [{
    xtype: 'form',
    reference: 'diagCodesForm',

    items: [{
      xtype: 'container',
      layout: 'hbox',

      defaults: {
        xtype: 'textfield',
        width: 75,
        listeners: {
          blur: 'onBlurDiagTextfield'
        }
      },

      items: [{
        allowBlank: false
      }, {}, {}, {}, {}, {}, {}, {}]
    }, {
      xtype: 'container',
      layout: 'hbox',

      defaults: {
        xtype: 'textfield',
        width: 75,
        listeners: {
          blur: 'onBlurDiagTextfield'
        }
      },

      items: [{}, {}, {}, {}, {}, {}, {}, {}]
    }, {
      xtype: 'container',
      layout: 'hbox',

      defaults: {
        xtype: 'textfield',
        width: 75,
        listeners: {
          blur: 'onBlurDiagTextfield'
        }
      },

      items: [{}, {}, {}, {}, {}, {}, {}, {}]
    }, {
      xtype: 'textfield',
      width: 75,
      listeners: {
        blur: 'onBlurDiagTextfield'
      }
    }]
  }],

  initComponent: function () {
    var me = this;

    me.getViewModel().data.diagCodesTextarea = me.itemConfig.diagCodesTextarea;

    me.callParent();
  }
});