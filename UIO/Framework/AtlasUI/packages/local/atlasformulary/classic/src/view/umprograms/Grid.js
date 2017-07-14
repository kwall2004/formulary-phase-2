Ext.define('Atlas.atlasformulary.view.umprograms.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: 'umprograms-grid',

  requires: [ 'Ext.grid.filters.Filters' ],
  plugins: 'gridfilters',

  reference: 'umprogramsgrid',

  title: 'Manage UM Programs',
  flex: 1, 
  bind: '{umprogramspaged}',
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
        dataIndex: 'UserGrpName',
        filter: {
          type: 'string',
          itemDefaults: {
            emptyText: 'Search for...'
          }
        }
      },
      {
        text: 'Program ID',
        dataIndex: 'CvrgPrptyPgmSK',
        flex: .5,
        filter: {
          type: 'string',
          itemDefaults: {
            emptyText: 'Search for...'
          }
        }
      },
      {
        text: 'Program Name',
        dataIndex: 'CvrgPrptyPgmName',
        flex: 1.5,
        filter: {
          type: 'string',
          itemDefaults: {
            emptyText: 'Search for...'
          }
        }
      },
      {
        text: 'Program Type',
        dataIndex: 'CvrgPrptyTypeDesc',
        filter: {
          type: 'string',
          itemDefaults: {
            emptyText: 'Search for...'
          }
        }
      },
      {
        text: 'Active Date ',
        dataIndex: 'EfctvStartDt',
        xtype: 'datecolumn',
        format: 'm/d/Y',
        filter: true
      },
      {
        text: 'Status',
        dataIndex: 'Status'
      },
      {
        xtype: 'actioncolumn',
        flex: 1,
        text: 'Associated Formularies',
        menuText: 'Associated Formularies',
        items: [
          {
            iconCls: 'x-fa fa-folder-open',
            tooltip: 'View formularies associated with this program',
            handler: 'onLoadAssocFormularies'
          }
        ]
      }
    ]
  },

  listeners: {
    rowclick: 'onSingleRowClick',
    rowdblclick: 'onViewProgramClick'
  },

  dockedItems: [
    {
      xtype: 'umprograms-topbar',
      dock: 'top'
    },
    {
      xtype: 'pagingtoolbar',
      itemId: 'pagingBar',
      dock: 'bottom',
      displayInfo: true,
      emptyMsg: 'No programs to display.',
      bind: '{umprogramspaged}'
    }
  ]
});
