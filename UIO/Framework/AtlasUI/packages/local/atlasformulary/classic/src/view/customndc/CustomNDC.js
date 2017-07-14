Ext.define('Atlas.atlasformulary.view.customndc.CustomNDC', {
  extend: 'Ext.grid.Panel',
  xtype: 'formulary-customndc',
  reference: 'customNDCGrid',
  itemId: 'customNDCGrid',
  emptyText: 'No results found...',

  controller: 'formularycustomndc',

  title: 'Custom NDC',

  trackMouseOver: false,

  viewModel: {
    data: {
      searchText: '',
      selectedRow: null
    },
    stores: {
      ndc: {
        type: 'customndcs',
        autoLoad: true,
        listeners: {
          load: 'onLoad'
        }
      },
      paged: {
        pageSize: 25,
        remoteSort: true,
        remoteFilter: true,
        proxy: {
          type: 'memory',
          enablePaging: true
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
    store: '{paged}',
    selection: '{selectedRow}'
  },

  dockedItems: [
    {
      xtype: 'toolbar',
      reference: 'addcustomndc',
      dock: 'top',
      defaults: {
        xtype: 'button',
        margin: '12 6'
      },
      items: [
        {
          text: 'View',
          bind: {
            disabled: '{!customNDCGrid.selection}'
          },
          listeners: {
            click: 'onViewClick'
          }
        },
        {
          text: 'Add',
          listeners: {
            click: 'onAddClick'
          }
        },
        {
          text: 'Edit',
          bind: {
            disabled: '{!customNDCGrid.selection}'
          },
          listeners: {
            click: 'onEditClick'
          }
        },
        {
          text: 'Delete',
          bind: {
            disabled: '{!customNDCGrid.selection}'
          },
          handler: 'onDeleteClick'
        },
        '->',
        {
          text: 'View NDC History',
          bind: {
            disabled: '{!customNDCGrid.selection}'
          },
          listeners: {
            click: 'onHistoryClick'
          }
        },
        {
          text: 'View Formularies',
          bind: {
            disabled: '{!customNDCGrid.selection}'
          },
          listeners: {
            click: 'onViewFormulariesClick'
          }
        },
        '->',
        {
          text: 'Export Custom NDCs',
          handler: 'onExportClick'
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
            keyup: 'onSearchKeyUp'
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
            afterrender: 'onPageSizeAfterRender'
          }
        },
        {
          xtype: 'button',
          text: 'Clear Filters',
          handler: 'onClearFiltersClick'
        }
      ]
    },
    {
      xtype: 'pagingtoolbar',
      dock: 'bottom',
      displayInfo: true,
      emptyMsg: 'No Custom NDCs to display.',
      bind: '{paged}'
    }
  ],

  plugins: 'gridfilters',

  columns: {
    defaults: {
      flex: 1
    },
    items: [
      {
        text: 'NDC',
        dataIndex: 'NDC',
        hideable: false,
        filter: {
          type: 'string',
          itemDefaults: {
            emptyText: 'Search for...'
          }
        }
      },
      {
        text: 'Label Name',
        dataIndex: 'LabelName',
        hideable: false,
        filter: {
          type: 'string',
          itemDefaults: {
            emptyText: 'Search for...'
          }
        }
      },
      {
        xtype: 'datecolumn',
        text: 'Price Date',
        dataIndex: 'DateToMarket',
        format: 'm/d/Y',
        hideable: false,
        filter: true
      },
      {
        text: 'Unit Price',
        dataIndex: 'UnitPrice',
        renderer: function (value) {
          var price = Ext.util.Format.number(value, '0,0.00');
          if (value !== null) {
            price = '$' + price;
          }
          return price;
        },
        filter: 'number'
      }
    ]
  },

  listeners: {
    rowdblclick: 'onViewClick'
  }
});
