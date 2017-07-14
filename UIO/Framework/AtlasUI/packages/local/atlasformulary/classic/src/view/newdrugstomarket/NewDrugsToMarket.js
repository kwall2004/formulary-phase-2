Ext.define('Atlas.atlasformulary.view.newdrugstomarket.NewDrugsToMarket', {
  extend: 'Ext.panel.Panel',
  xtype: 'formulary-newdrugstomarket',

  requires: [
    'Ext.grid.filters.Filters'
  ],

  title: 'New Drugs To Market',
  layout: 'border',

  controller: 'newdrugstomarket',

  viewModel: {
    data: {
      dataSource: 'fdb',
      hierarchyTreeSingleSelect: true
    },
    stores: {
      fdb: {
        type: 'fdbnewdrugstomarket',
        listeners: {
          beforeload: 'onBeforeLoad',
          load: 'onLoad'
        }
      },
      medispan: {
        type: 'medispannewdrugstomarket',
        listeners: {
          beforeload: 'onBeforeLoad',
          load: 'onLoad'
        }
      },
      paged: {
        pageSize: 25,
        remoteSort: true,
        remoteFilter: true, // required for correct filtering using paging memory
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

  initComponent: function () {
    var vm = this.getViewModel();

    var fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 3);
    vm.set('fromDate', fromDate);

    vm.set('thruDate', new Date());

    this.callParent();
  },

  configure: function () {
    var vm = this.getViewModel();

    this.down('newdrugssearchcombo').configure();
    this.down('hierarchytreepanel').configure();

    if (!vm.get('dataSource') || vm.get('dataSource') === 'fdb') {
      vm.getStore('fdb').getProxy().setExtraParams({
        fromdate: vm.get('fromDate'),
        thrudate: vm.get('thruDate')
      });
      vm.getStore('fdb').load();
    } else if (vm.get('dataSource') === 'medispan') {
      vm.getStore('medispan').getProxy().setExtraParams({
        fromdate: vm.get('fromDate'),
        thrudate: vm.get('thruDate')
      });
      vm.getStore('medispan').load();
    } else {
      Ext.raise({
        msg: 'Invalid source.',
        source: vm.get('dataSource')
      });
    }
  },

  dockedItems: [
    {
      xtype: 'toolbar',
      itemId: 'ndtmTbar',
      region: 'north',
      width: 300,
      flex: 0.25,
      items: [
        {
          xtype: 'newdrugssearchcombo',
          reference: 'smartsearchcombo',
          width: 300,
          listeners: {
            select: 'onSmartSearchSelect'
          }
        },
        {
          xtype: 'button',
          text: 'Clear Filters',
          handler: 'onClearFiltersClick'
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
          text: 'Generate Report',
          itemId: 'btnGenFormReport',
          handler: 'showGenerateReport'
        }
      ]
    }
  ],

  items: [
    {
      xtype: 'hierarchytreepanel',
      reference: 'hierarchytreepanel',
      region: 'west',
      flex: 1,
      split: true,
      collapsible: true,
      listeners: {
        toggle: 'onTreeToggle',
        select: 'onTreeSelect'
      }
    },
    {
      xtype: 'grid',
      reference: 'druggrid',
      region: 'center',
      flex: 2.9,
      title: 'New Drugs',
      plugins: 'gridfilters',

      viewConfig: {
        stripeRows: true
      },

      bind: {
        store: '{paged}'
      },

      dockedItems: [
        {
          xtype: 'pagingtoolbar',
          dock: 'bottom',
          displayInfo: true,
          split: true
        }
      ],

      columns: [
        {
          text: 'Label Name',
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
          text: 'NDC',
          dataIndex: 'NDC',
          flex: 1,
          filter: {
            type: 'string',
            itemDefaults: {
              emptyText: 'Search for...'
            }
          }
        },
        {
          text: 'Brand Name',
          dataIndex: 'BrandName',
          flex: 1,
          filter: {
            type: 'string',
            itemDefaults: {
              emptyText: 'Search for...'
            }
          }
        },
        {
          text: 'Generic Name',
          dataIndex: 'GenericName',
          flex: 1,
          filter: {
            type: 'string',
            itemDefaults: {
              emptyText: 'Search for...'
            }
          }
        },
        {
          text: 'Med ID',
          dataIndex: 'MedId',
          flex: 1,
          filter: {
            type: 'string',
            itemDefaults: {
              emptyText: 'Search for...'
            }
          }
        },
        {
          text: 'Strength',
          dataIndex: 'DrugStrength',
          flex: 1,
          filter: {
            type: 'string',
            itemDefaults: {
              emptyText: 'Search for...'
            }
          }
        },
        {
          text: 'Market Entry Date',
          dataIndex: 'DateToMarket',
          xtype: 'datecolumn',
          format: 'm/d/Y',
          flex: 1,
          filter: true
        },
        {
          xtype: 'actioncolumn',
          text: 'Formularies',
          menuText: 'Formularies',
          flex: 1,
          align: 'center',
          items: [
            {
              xtype: 'button',
              iconCls: 'x-fa fa-folder-open',
              handler: function (grid, rowIndex) {
                var gridPanel = grid.up('panel');
                var topPanel = gridPanel.up('panel');
                var ndtmCtlr = topPanel.controller;
                ndtmCtlr.onFormulariesClick(grid, rowIndex);
              }
            }
          ]
        }
      ]
    }
  ]
});
