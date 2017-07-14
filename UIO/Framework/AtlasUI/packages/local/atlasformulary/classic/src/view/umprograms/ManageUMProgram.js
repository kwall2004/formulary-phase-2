Ext.define('Atlas.atlasformulary.view.umprograms.ManageUMProgram', {
  extend: 'Ext.panel.Panel',
  xtype: 'umprograms-manageumprogram',
  viewModel: 'manageumprogram',
  controller: 'manageumprogramcontroller',

  requires: [ 'Atlas.atlasformulary.view.umprograms.*' ],

  title: 'Manage UM Programs',
  layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
  },

  scrollable: true,

  items: [
    {
      xtype: 'umprograms-grid',
      itemId: 'umprograms-grid'
    }
  ]
});
