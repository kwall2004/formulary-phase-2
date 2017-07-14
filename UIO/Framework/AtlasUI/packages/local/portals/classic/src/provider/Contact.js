Ext.define('Atlas.portals.view.provider.Contact', {
  extend: 'Ext.panel.Panel',
  xtype: 'portalsprovidercontact',
  controller: 'portalsprovidercontact',
  title: 'Contact Us',
  scrollable: true,

  defaults: {
    xtype: 'displayfield',
    labelWidth: 150
  },
  items: [{
    xtype: 'panel',
    cls: 'card-panel',
    title: 'Contact',
    name: 'topcontact',
    id: 'mycontact',

    defaults: {
      padding: '5'
    },

    items: [
      {
        xtype: 'container',
        html: ''
      },

      {
        xtype: 'container',
        html: ''
      },

      {
        xtype: 'container',
        html: ''
      },
      {
        xtype: 'container',
        html: ''
      },
      {
        xtype: 'container',
        html: ''
      },
      {
        xtype: 'container',
        html: ''
      },

      {
        xtype: 'container',
        html: ''
      }
    ]
  }]
});