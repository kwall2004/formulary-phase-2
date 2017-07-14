Ext.define('Atlas.atlasformulary.view.dashboard.Dashboard', {
  extend: 'Ext.dashboard.Dashboard',
  controller: 'dashboard',
  stateId: 'formularyDashboard',
  stateful: true,

  title: 'Formulary Dashboard',

  maxColumns: 3,

  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'top',

      items: [
        '->',
        {
          xtype: 'combobox',

          fieldLabel: 'Widget Tools',
          displayField: 'friendlyName',
          valueField: 'alias',

          store: {
            fields: [
              'alias',
              'friendlyName'
            ],

            data: [
              {
                alias: 'actionableevents',
                friendlyName: 'Actionable Events'
              },
              {
                alias: 'alerts',
                friendlyName: 'Alerts'
              }
            ]
          },

          listeners: {
            select: 'onPartSelected'
          }
        }
      ]
    }
  ],

  defaultContent: [
    {
      type: 'actionableevents',
      columnIndex: 0
    },
    {
      type: 'alerts',
      columnIndex: 1
    }
  ],

  config: {
    parts: {
      actionableevents: 'actionableevents',
      alerts: 'alerts'
    }
  },

  listeners: {
    removed: 'onItemRemoved'
  }
});
