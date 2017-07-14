Ext.define('Atlas.atlasformulary.view.dashboard.ActionableEvents', {
  extend: 'Ext.dashboard.Part',
  alias: 'part.actionableevents',
  requires: [
    'Ext.grid.filters.Filters'
  ],

  viewTemplate: {
    layout: 'fit',
    title: 'Actionable Events',
    controller: 'actionableevents',
    viewModel: {
      stores: {
        actionableDashboards: {
          type: 'actionabledashboardalerts',
          autoLoad: true
        }
      }
    },

    collapsed: false,
    closable: true,
    resizable: true,
    height: 300,
    tbar: [
      {
        text: 'Clear Filters',
        tooltip: 'Clear all filters',
        handler: 'onClearFilters'
      }
    ],
    items: [
      {
        xtype: 'grid',
        plugins: 'gridfilters',
        bind: '{actionableDashboards}',
        reference: 'actionableevntsgrid',
        columns: [
          {
            text: 'Type',
            dataIndex: 'AlertTypeDesc',
            flex: 1,
            filter: {
              type: 'string',
              itemDefaults: {
                emptyText: 'Search for...'
              }
            }
          },
          {
            text: 'Description',
            dataIndex: 'AlertDesc',
            flex: 1,
            filter: {
              type: 'string',
              itemDefaults: {
                emptyText: 'Search for...'
              }
            }
          },
          {
            xtype: 'datecolumn',
            text: 'Created Date',
            dataIndex: 'CreatedTS',
            format: 'm/d/Y',
            flex: 1,
            filter: true
          },
          {
            xtype: 'datecolumn',
            text: 'Acknowledged Date',
            dataIndex: 'AcknowledgedDt',
            format: 'm/d/Y',
            flex: 1,
            filter: true
          }
        ],
        listeners: {
          rowdblclick: 'onActionableItemClick'
        }
      }
    ]
  }
});
