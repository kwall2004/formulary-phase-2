Ext.define('Atlas.atlasformulary.view.manageformulary.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: 'manageformulary-grid',

  requires: [ 'Ext.grid.filters.Filters' ],
  plugins: 'gridfilters',

  reference: 'manageformularygrid',

  title: 'Manage Formulary',
  flex: 1, // 100% height
  bind: '{formularyheaderspaged}',
  selModel: {
    type: 'rowmodel',
    singleSelect: false
  },

  columns: {
    defaults: {
      flex: 1
    },
    items: [
      {
        text: 'Tenant Owner',
        dataIndex: 'TenantOwner',
        filter: {
          type: 'string',
          itemDefaults: {
            emptyText: 'Search for...'
          }
        }
      },
      {
        text: 'Formulary Name',
        dataIndex: 'FrmlryName',
        filter: {
          type: 'string',
          itemDefaults: {
            emptyText: 'Search for...'
          }
        }
      },
      {
        text: 'Version',
        dataIndex: 'FrmlryVer',
        filter: {
          type: 'string',
          itemDefaults: {
            emptyText: 'Search for...'
          }
        }
      },
      {
        text: 'Effective Date ',
        dataIndex: 'EfctvStartDt',
        xtype: 'datecolumn',
        format: 'm/d/Y',
        filter: true
      },
      {
        text: 'LOB',
        dataIndex: 'LOBName',
        filter: {
          type: 'list',
          store: {
            type: 'lob',
            autoLoad: true
          },
          idField: 'LOBName',
          labelField: 'LOBName'
        }
      },
      {
        text: 'Status',
        dataIndex: 'StatDesc',
        filter: {
          type: 'list',
          store: {
            proxy: {
              type: 'formulary',
              url: '/formularystattype'
            },
            autoLoad: true
          },
          idField: 'StatDesc',
          labelField: 'StatDesc'
        }
      },
      {
        text: 'Calender Year',
        dataIndex: 'CalendarYear',
        filter: {
          type: 'string',
          itemDefaults: {
            emptyText: 'Search for...'
          }
        }
      }
    ]
  },

  listeners: {
    rowclick: 'onSingleRowClick',
    rowdblclick: 'onViewFormularyClick'
  },

  dockedItems: [
    {
      xtype: 'manageformulary-topbar',
      dock: 'top'
    },
    {
      xtype: 'pagingtoolbar',
      itemId: 'pagingBar',
      dock: 'bottom',
      displayInfo: true,
      emptyMsg: 'No formularies to display.',
      bind: '{formularyheaderspaged}'
    }
  ]
});
