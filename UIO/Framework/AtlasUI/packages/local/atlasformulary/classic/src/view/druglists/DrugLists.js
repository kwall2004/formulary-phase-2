Ext.define('Atlas.atlasformulary.view.druglists.DrugLists', {
  extend: 'Ext.panel.Panel',
  xtype: 'druglists',
  viewModel: 'druglists',
  controller: 'druglists',

  title: 'Manage Drug Lists',
  layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
  },

  scrollable: true,

  items: [
    {
      xtype: 'druglistsgrid',
      itemId: 'druglists-grid'
    }
  ]
});
