Ext.define('Atlas.atlasformulary.view.manageformulary.ManageFormulary', {
  extend: 'Ext.panel.Panel',
  xtype: 'formulary-manageformulary',
  viewModel: 'manageformulary',
  controller: 'manageformularycontroller',

  requires: [ 'Atlas.atlasformulary.view.manageformulary.*' ],

  title: 'Manage Formulary',
  layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
  },

  scrollable: true,

  items: [
    {
      xtype: 'manageformulary-grid',
      itemId: 'manageformulary-grid'
    }
  ]
});
