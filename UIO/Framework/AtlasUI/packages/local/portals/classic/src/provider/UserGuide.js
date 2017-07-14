Ext.define('Atlas.portals.view.provider.UserGuide', {
  extend: 'Ext.panel.Panel',
  xtype: 'portalsrxprovideruserguide',
  controller: 'portalsprovideruserguide',
  title: 'User Guide',
  layout: {
    type: 'hbox',
    align: 'stretch'
  },

  items: [
    {
      name: 'testpanel',
      id: 'mypanel',
      xtype: 'panel',
      html: '',
      flex: 1
    }
  ]
});