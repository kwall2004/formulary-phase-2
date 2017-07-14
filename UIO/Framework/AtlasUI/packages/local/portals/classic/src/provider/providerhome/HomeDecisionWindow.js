// k3279 - Kevin Tabasan - 11/16/2016

Ext.define('Atlas.portals.view.provider.providerhome.HomeDecisionWindow', {
  extend: 'Ext.window.Window',
  xtype: 'provider-homedecisionwindow',
  viewModel: 'homedecisionwindow',
  controller: 'homedecisionwindow',
  title: 'Plan of Care Decision',
  modal: true,
  width: 530,
  height: 240,

  items: [{
    xtype: 'radiogroup',
    reference: 'radioGroup',

    items: [{
      boxLabel: 'Approve',
      reference: 'approveradio',
      name: 'decisionType',
      checked: true
    }, {
      boxLabel: 'Reject',
      width: 300,
      name: 'decisionType'
    }]
  }, {
    xtype: 'displayfield',
    fieldLabel: 'Comments'
  }, {
    xtype: 'textareafield',
    reference: 'comments',
    width: 512,
    scrollable: true
  }],

  bbar: ['->', {
    text: 'View POC',
    handler: 'onViewPoCClick'
  }, {
    text: 'OK',
    handler: 'onOKClick'
  }, {
    text: 'Cancel',
    handler: 'onCancelClick'
  }],

  initComponent: function () {
    var me = this;

    if (me.itemConfig.selectedRow) {
      me.getViewModel().data.selectedRow = me.itemConfig.selectedRow;
      me.getViewModel().data.gridReference = me.itemConfig.gridReference;
    }

    me.callParent();
  }
});