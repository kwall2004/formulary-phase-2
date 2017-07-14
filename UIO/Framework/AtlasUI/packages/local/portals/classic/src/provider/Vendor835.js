// k3279 - Kevin Tabasan - 02/23/2017

Ext.define('Atlas.portals.view.provider.Vendor835', {
  extend: 'Ext.window.Window',
  xtype: 'portalsprovidervendor835',
  controller: 'portalsprovidervendor385',
  title: '835',
  width: 850,
  height: 700,

  viewModel: {
    data: {
      html835: 'No Data Available'
    }
  },

  scrollable: true,

  items: [{
    xtype: 'container',
    bind: {
      html: '{html835}'
    }
  }],

  bbar: ['->', {
    text: 'Download',
    handler: 'onDownloadClick'
  }, {
    text: 'Cancel',
    handler: 'onCancelClick'
  }],

  initComponent: function () {
    var me = this;

    me.getViewModel().data.txt835 = me.itemConfig.txt835;
    me.getViewModel().data.html835 = me.itemConfig.html835;
    me.callParent();
  }
});