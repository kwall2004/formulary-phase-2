Ext.define('Atlas.atlasformulary.view.formularyheader.OwnerTree', {
  extend: 'Ext.tree.Panel',
  xtype: 'formularyheader-ownertree',

  title: 'Owner',
  bodyPadding: 5,

  store: {
    type: 'ownertree',
    rootProperty: 'children'
  }
});
