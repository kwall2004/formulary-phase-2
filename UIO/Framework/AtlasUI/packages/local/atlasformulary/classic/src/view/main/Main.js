Ext.define('Atlas.atlasformulary.view.Main', {
  extend: 'Ext.panel.Panel',  //All apps need to extend the appBase
  xtype: 'formulary-main',
  viewModel: 'formularyMainModel', //some changes to the base model - just static data for now

  bind: {
    title: 'Formulary {atlasId}'
  },
  items: [
    {
      xtype: 'panel',
      flex: 1,
      bind: {
        html: '<p>This is a formulary module</p><p>Some Info : <br> client: {client} <br> AtlasId: {atlasId} </p>'
      }
    },
    {
      xtype: 'tabpanel',
      reference: 'sectionTabs',
      flex: 1,
      minHeight: 600,
      split: true,
      collapseMode: 'mini',
      items: []
    }
  ]
});