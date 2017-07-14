Ext.define('Atlas.atlasformulary.view.druglists.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: 'druglistsgrid',

  requires: [ 'Ext.grid.filters.Filters' ],
  plugins: 'gridfilters',

  reference: 'druglistsgrid',
  title: 'Manage Drug Lists',
  flex: 1,
  bind: '{druglistspaged}',

  selModel: {
    type: 'rowmodel',
    singleSelect: false,
    dock: 'bottom',
    emptyMsg: 'No Drug Lists to display.'
  },

  columns: {
    defaults: {
      flex: 3
    },
    items: [
      {
        text: 'Tenant Owner',
        dataIndex: 'TenantOwner'
      },
      {
        text: 'Drug List Name',
        dataIndex: 'DrugListName',
        filter: {
          type: 'string',
          itemDefaults: {
            emptyText: 'Search for...'
          }
        }
      },
      {
        text: 'Effective Date',
        dataIndex: 'EfctvStartDt',
        xtype: 'datecolumn',
        format: 'm/d/Y',
        filter: {
          type: 'date'
        }
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
        dataIndex: 'DrugListStatus',
        filter: {
          type: 'list',
          options: [ 'Active', 'Inactive' ]
        }
      },
      {
        xtype: 'actioncolumn',
        flex: 1,
        text: 'Associated Formularies',
        menuText: 'Associated Formularies',
        items: [
          {
            iconCls: 'x-fa fa-folder-open',
            tooltip: 'View formularies associated with this drug list',
            handler: 'onLoadAssocFormularies'
          }
        ]
      }
    ]
  },

  listeners: {
    rowdblclick: 'onViewDrugListClick'
  },

  dockedItems: [
    {
      xtype: 'druglists-topbar',
      dock: 'top'
    },
    {
      xtype: 'pagingtoolbar',
      itemId: 'pagingBar',
      dock: 'bottom',
      displayInfo: true,
      emptyMsg: 'No Drug Lists to display.',
      bind: '{druglistspaged}'
    }
  ]
});
