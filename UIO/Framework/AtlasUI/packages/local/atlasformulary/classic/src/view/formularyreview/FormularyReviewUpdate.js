Ext.define('Atlas.atlasformulary.view.formularyreview.FormularyReviewUpdate', {
  extend: 'Ext.window.Window',
  xtype: 'formulary-reviewaddnote',
  controller: 'formularyaddnote',
  viewModel: 'formularyreview',
  minWidth: 500,
  minHeight: 300,

  modal: true,

  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'bottom',

      layout: {
        pack: 'end'
      },

      items: [
        {
          xtype: 'button',
          text: 'Cancel',
          handler: 'onCancelClick'
        },
        {
          xtype: 'button',
          bind: '{action}',
          handler: 'onActionClick'
        }
      ]
    }
  ],

  items: [
    {
      xtype: 'textareafield',
      itemId: 'reviewNotes',
      emptyText: 'Please enter notes for the formulary team here.',
      height: 300,
      width: 480
    }
  ],

  initComponent: function () {
    var me = this;
    if (me.itemConfig.reviewrecord) {
      me.getViewModel().data.reviewrecord = me.itemConfig.reviewrecord;
      me.getViewModel().data.action = me.itemConfig.action;
    }

    me.callParent();
  }
});