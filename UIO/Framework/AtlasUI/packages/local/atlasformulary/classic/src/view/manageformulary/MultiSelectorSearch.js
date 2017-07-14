Ext.define('Atlas.atlasformulary.view.manageformulary.MultiSelectorSearch', {
  extend: 'Ext.view.MultiSelectorSearch',

  xtype: 'manageformulary-multiselector-search',

  initComponent: function () {
    var me = this,
      i, item;

    me.callParent();

    for (i = me.items.items.length; i--;) {
      if ((item = me.items.items[i]).xtype === 'grid') {
        item.selModel.checkOnly = true;
        break;
      }
    }
  }
});
