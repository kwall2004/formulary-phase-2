Ext.define('Atlas.atlasformulary.view.dashboard.ExamplePart', {
  extend: 'Ext.dashboard.Part',
  alias: 'part.example',

  viewTemplate: {
    layout: 'fit',
    title: 'Example',

    collapsed: false,
    closable: true,
    resizable: true,

    height: 300,

    items: [
      {
        html: '<p>Replace this item with xtype of your component that you would like to be a part of the dashboard and give it a unique name</p>'
      }
    ]
  }
});