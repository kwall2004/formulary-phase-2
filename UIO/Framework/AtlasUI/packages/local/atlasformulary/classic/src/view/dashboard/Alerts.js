Ext.define('Atlas.atlasformulary.view.dashboard.Alerts', {
  extend: 'Ext.dashboard.Part',
  alias: 'part.alerts',
  requires: [
    'Ext.grid.filters.Filters'
  ],
  controller: 'alerts',

  viewTemplate: {
    controller: 'alerts',
    layout: 'fit',
    title: 'Alerts',

    viewModel: {
      stores: {
        nonActionableDashboards: {
          type: 'dashboardalerts',
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
        reference: 'alertsGrid',
        bind: '{nonActionableDashboards}',
        plugins: 'gridfilters',
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
          rowdblclick: 'onRowDoubleClick'
        }
      }
    ]
  }
});
