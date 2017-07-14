Ext.define('Atlas.atlasformulary.view.common.DrugListSelection', {
  extend: 'Ext.window.Window',
  xtype: 'druglistselection',
  controller: 'druglistselection',

  height: 400,
  width: 300,
  title: 'Drug Lists',

  closeAction: 'destroy',

  viewModel: {
    data: {
      selectedDrug: null
    }
  },

  items: [
    {
      xtype: 'gridpanel',

      flex: 1,

      bind: {
        store: '{selectedDrug.RelatedDrugLists}'
      },

      columns: [
        {
          type: 'Name',
          dataIndex: 'name',
          flex: 1
        }
      ],

      listeners: {
        celldblclick: 'onListSelected'
      }
    }
  ]

});