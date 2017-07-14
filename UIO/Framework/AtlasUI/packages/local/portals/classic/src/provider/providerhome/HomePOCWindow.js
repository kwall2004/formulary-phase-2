// k3279 - Kevin Tabasan - 12/29/2016

Ext.define('Atlas.portals.view.provider.providerhome.HomePOCWindow', {
  extend: 'Ext.window.Window',
  xtype: 'provider-homepocwindow',
  viewModel: 'homepocwindow',
  controller: 'homepocwindow',
  title: 'View Documents',
  modal: true,
  height: 190,
  width: 230,

  items: [{
    xtype: 'form',
    cls: 'formPanel',
    reference: 'pocCheckboxForm',

    defaults: {
      xtype: 'checkboxfield'
    },

    items: [{
      boxLabel: 'All',
      name: 'allBox',

      listeners: {
        change: 'onAllChecked'
      }
    }, {
      boxLabel: 'Plan of Care Document',
      name: 'pocDocumentBox'
    }, {
      boxLabel: 'Member Object Profile',
      name: 'memberObjectBox'
    }]
  }],

  bbar: ['->', {
    text: 'View',
    handler: 'onOKClick'
  }, {
    text: 'Cancel',
    handler: 'onCancelClick'
  }, '->'],

  initComponent: function () {
    var me = this;

    if (me.itemConfig.selectedRow) {
      me.getViewModel().data.selectedRow = me.itemConfig.selectedRow;
      me.getViewModel().data.gridReference = me.itemConfig.gridReference;
    }

    me.callParent();
  }
});