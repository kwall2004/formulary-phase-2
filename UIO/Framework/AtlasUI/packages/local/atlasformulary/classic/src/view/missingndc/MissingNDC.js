Ext.define('Atlas.atlasformulary.view.missingndc.MissingNDC', {
  extend: 'Ext.grid.Panel',
  reference: 'missingndcgrid',

  controller: 'missingndc',
  emptyText: 'No results found...',

  title: 'Add Missing NDC',

  trackMouseOver: false,

  plugins: 'gridfilters',

  viewModel: {
    data: {
      searchText: '',
      dataSource: ''
    },
    stores: {
      missingNDCs: {
        type: 'missingndc',
        autoLoad: false,
        listeners: {
          load: 'onMissingNDCsPaged'
        }
      },

      missingFdbNDCs: {
        type: 'missingfdbndc',
        autoLoad: false,
        listeners: {
          load: 'onMissingNDCsPaged'
        }
      },

      missingNDCsPaged: {
        pageSize: 25,
        remoteSort: true,
        remoteFilter: true,
        proxy: {
          type: 'memory',
          enablePaging: true
        }
      },

      drugrefdb: {
        type: 'drugrefdb',
        autoLoad: true,
        listeners: {
          load: 'onSourceComboLoad'
        }
      },

      resultsPerPage: {
        fields: ['resultsPerPage'],
        data: [
          [25], [50], [100], [250], [500]
        ]
      }
    }
  },

  bind: {
    store: '{missingNDCsPaged}'
  },

  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'top',
      defaults: {
        xtype: 'button',
        margin: '12 6'
      },
      items: [
        {
          text: 'Add',
          listeners: {
            click: 'onNDCAddClick'
          }
        },
        {
          text: 'Edit',
          bind: {
            disabled: '{!missingndcgrid.selection}'
          },
          listeners: {
            click: 'onNDCEditClick'
          }
        },
        {
          text: 'Delete',
          bind: {
            disabled: '{!missingndcgrid.selection}'
          },
          listeners: {
            click: 'onNDCDeleteClick'
          }
        },
        '->',
        {
          xtype: 'combobox',
          name: 'dataSource',
          fieldLabel: 'Data Source',
          displayField: 'DrugRefDbName',
          valueField: 'DrugRefDbSK',
          queryMode: 'local',
          bind: {
            store: '{drugrefdb}'
          },
          listeners: {
            select: 'onSourceButtonToggled'
          },
          forceSelection: true,
          reference: 'datasourcecombo'
        },
        '->',
        {
          text: 'Export Missing NDC',
          handler: 'onExportMissingNDCClick'

        }
      ]
    },
    {
      xtype: 'toolbar',
      dock: 'top',
      items: [
        {
          xtype: 'textfield',
          reference: 'search',
          width: 300,
          emptyText: 'Filter...',
          enableKeyEvents: true,
          bind: {
            value: '{searchText}'
          },
          listeners: {
            keyup: 'onSearchChanged'
          }
        },
        '->',
        {
          xtype: 'combobox',
          bind: {
            store: '{resultsPerPage}'
          },
          editable: false,
          selectOnFocus: false,
          triggerAction: 'all',
          displayField: 'resultsPerPage',
          valueField: 'resultsPerPage',
          fieldLabel: 'Results per page',
          forceSelection: true,

          listeners: {
            select: 'onPageSizeSelect',
            afterrender: 'onPageSizeSelectRendered'
          }
        },
        {
          xtype: 'button',
          text: 'Clear Filters',
          handler: 'onClearFiltersClicked'
        }
      ]
    },
    {
      xtype: 'pagingtoolbar',
      itemId: 'pagingBar',
      dock: 'bottom',
      displayInfo: true,
      emptyMsg: 'No items to display.',
      bind: '{missingNDCsPaged}'
    }
  ],

  columns: [
    {
      text: 'Medispan NDC',
      dataIndex: 'NDC',
      hideable: false,
      flex: 1,
      filter: {
        type: 'string',
        itemDefaults: {
          emptyText: 'Search for...'
        }
      },
      reference: 'medispanndccolumn'
    },
    {
      text: 'FDB NDC',
      dataIndex: 'NDC',
      hideable: false,
      flex: 1,
      filter: {
        type: 'string',
        itemDefaults: {
          emptyText: 'Search for...'
        }
      },
      reference: 'fdbndccolumn'
    },
    {
      text: 'Drug Name',
      dataIndex: 'LabelName',
      hideable: false,
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
      dataIndex: 'DateToMarket',
      text: 'Add Date',
      flex: 1,
      format: 'm/d/Y',
      filter: true
    },
    {
      text: 'FDB GCN',
      flex: 1,
      filter: {
        type: 'string',
        itemDefaults: {
          emptyText: 'Search for...'
        }
      },
      dataIndex: 'GCN_SEQNO',
      reference: 'fdbgcncolumn'
    },
    {
      text: 'Medispan GPI',
      flex: 1,
      filter: {
        type: 'string',
        itemDefaults: {
          emptyText: 'Search for...'
        }
      },
      dataIndex: 'GPI',
      reference: 'medispangpicolumn'
    }
  ]
});
