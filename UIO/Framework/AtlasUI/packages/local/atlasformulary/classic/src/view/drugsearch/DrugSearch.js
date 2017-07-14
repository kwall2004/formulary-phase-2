Ext.define('Atlas.atlasformulary.view.drugsearch.DrugSearch', {
  extend: 'Ext.panel.Panel',
  xtype: 'formulary-drugsearch',
  alias: 'widget.drugsearch',

  requires: [
    'Atlas.atlasformulary.view.common.SmartDrugSearchCombo',
    'Atlas.atlasformulary.view.common.DrugGrid',
    'Atlas.atlasformulary.view.common.DrugSearchClipboard'
  ],

  title: 'Formulary Drug Search ',
  layout: 'border',
  flex: 1, // 100% height

  controller: 'drugsearchcontroller',
  viewModel: 'drugsearch',

  storedColumns: null,
  storedSort: null,

  configure: function (addIncludeCriteria) {
    var vm = this.getViewModel(),
      grid = this.lookup('druggrid'),
      columns = [],
      initialConfig = null;

    this.down('smartdrugsearchcombo').configure();
    this.down('smartdrugsearchfieldcombo').configure();
    this.down('hierarchytreepanel').configure();
    this.down('druggrid').configure();

    vm.getStore('dataSources').load({
      scope: this,
      callback: function (records, operation, success) {
        if (success) {
          var dataSourceRecord = records.find(function (element) {
            return element.get('DrugRefDbName').toLowerCase() === vm.get('dataSource').toLowerCase();
          });
          if (dataSourceRecord) {
            vm.getStore('criteriaColumns').getProxy().setExtraParam('drugrefdbsk', dataSourceRecord.get('DrugRefDbSK'));
            vm.getStore('criteriaColumns').load({
              scope: this,
              callback: function (records, operation, success) {
                var drugListsRecord = null;

                if (success) {
                  drugListsRecord = records.find(function (element) {
                    return element.get('ValQulfrCode') === 'DrugLists';
                  });
                  if (drugListsRecord) {
                    drugListsRecord.set('ValQulfrCode', 'RelatedDrugLists');
                  }

                  grid.getColumns().forEach(function (column) {
                    if (records.find(function (element) {
                      return element.get('ValQulfrCode') === column.dataIndex;
                    })) {
                      if (column.text.substr(0, 1) !== '*') {
                        column.setText('*' + column.text);
                      }
                    } else if (column.text.substr(0, 1) === '*') {
                      column.setText(column.text.substr(1));
                    }
                    initialConfig = column.getInitialConfig();
                    var config = {
                      xtype: initialConfig.xtype,
                      format: initialConfig.format,
                      dataIndex: initialConfig.dataIndex,
                      flex: initialConfig.flex,
                      hidden: initialConfig.hidden,
                      reference: initialConfig.reference,
                      text: column.text,
                      renderer: initialConfig.renderer,
                      filter: initialConfig.filter,
                      sortable: initialConfig.sortable,
                      shrinkWrap: initialConfig.shrinkWrap,
                      cellWrap: initialConfig.cellWrap,
                      variableRowHeight: initialConfig.variableRowHeight,
                      tpl: initialConfig.tpl
                    };
                    Object.keys(config).forEach(function (key) {
                      if (config[key] === undefined) {
                        delete config[key];
                      }
                    });
                    columns.push(config);
                  });
                  grid.reconfigure(null, columns);

                  this.showColumns(addIncludeCriteria);
                }
              }
            });
          }
        }
      }
    });
  },

  showColumns: function (addIncludeCriteria) {
    var references = this.getReferences().druggrid.refs,
      fdbColumns = [
        references.ndccolumn,
        references.medidcolumn,
        references.labelnamecolumn,
        references.fdbgcncolumn,
        references.brandnamecolumn,
        references.hiclcolumn,
        references.etcidcolumn,
        references.etccolumn,
        references.otccolumn,
        references.drugtypecolumn,
        references.strengthcolumn,
        references.routeofadministrationcolumn
      ],
      medispanColumns = [
        references.medidcolumn,
        references.labelnamecolumn,
        references.gpicolumn
      ],
      configColumns = [
        references.labelnamecolumn,
        references.genericnamecolumn,
        references.brandnamecolumn,
        references.otccolumn,
        references.drugtypecolumn
      ],
      vm = this.getViewModel(),
      grid = this.down('#drugGrid'),
      gridStore = grid.getStore(),
      gridColumns = grid.getColumns();

    if (vm.get('formularySK') || vm.get('drugListSK')) {
      this.storedColumns = Ext.util.LocalStorage.get('atlasFormularyDrugSearchConfigColumns');
      if (this.storedColumns.getKeys().length === 0) {
        gridColumns.forEach(function (column) {
          if (configColumns.indexOf(column) >= 0) {
            this.storedColumns.setItem(column.getReference(), 'show');
          }
        }, this);
      }
    } else if (!gridStore.type || gridStore.type === 'fdbdrug') {
      this.storedColumns = Ext.util.LocalStorage.get('atlasFormularyDrugSearchFdbColumns');
      if (this.storedColumns.getKeys().length === 0) {
        gridColumns.forEach(function (column) {
          if (fdbColumns.indexOf(column) >= 0) {
            this.storedColumns.setItem(column.getReference(), 'show');
          }
        }, this);
      }
    } else if (gridStore.type === 'medispandrug') {
      this.storedColumns = Ext.util.LocalStorage.get('atlasFormularyDrugSearchMedispanColumns');
      if (this.storedColumns.getKeys().length === 0) {
        gridColumns.forEach(function (column) {
          if (medispanColumns.indexOf(column) >= 0) {
            this.storedColumns.setItem(column.getReference(), 'show');
          }
        }, this);
      }
    }

    grid.suspendEvent('columnshow', 'columnhide');
    gridColumns.forEach(function (column) {
      if (this.storedColumns && this.storedColumns.getItem(column.getReference()) === 'show') {
        column.setVisible(true);
        addIncludeCriteria(column, true);
      } else {
        column.setVisible(false);
      }
    }, this);
    grid.resumeEvent('columnshow', 'columnhide');
  },

  dockedItems: [
    {
      xtype: 'panel',
      region: 'north',
      reference: 'drugsearch-northregion'
    },
    {
      xtype: 'toolbar',
      region: 'north',
      flex: 1,
      items: [
        {
          xtype: 'smartdrugsearchcombo',
          reference: 'smartsearchcombo',
          width: 300,

          listeners: {
            select: 'onSmartSearchSelect'
          }
        },
        {
          xtype: 'smartdrugsearchfieldcombo',
          reference: 'smartsearchfieldcombo',

          listeners: {
            select: 'onSmartSearchFieldsSelect'
          }
        },
        '->',
        {
          xtype: 'button',
          text: 'Activate',
          handler: 'onDrugListActivateClick',

          bind: {
            hidden: '{drugListActivateHidden}'
          }
        },
        {
          xtype: 'button',
          text: 'Import',
          handler: 'onDrugListImportClick',

          bind: {
            hidden: '{drugListImportHidden}'
          }
        },
        {
          xtype: 'button',
          reference: 'drugsearchexportbt',
          text: 'Export',
          handler: 'onDrugSearchExportClick'
        },
        {
          xtype: 'button',
          text: 'View Current Criteria',
          handler: 'onShowCriteriaClicked'
        },
        {
          xtype: 'button',
          itemId: 'criteriaClearButton',
          text: 'Clear Search Criteria',
          handler: 'onClearFiltersClick'
        },
        {
          xtype: 'combobox',
          editable: false,
          selectOnFocus: false,
          triggerAction: 'all',
          displayField: 'resultsPerPage',
          valueField: 'resultsPerPage',
          fieldLabel: 'Results per page',
          labelAlign: 'right',
          forceSelection: true,

          bind: {
            store: '{resultsPerPage}'
          },

          listeners: {
            select: 'onPageSizeSelect',
            afterrender: 'onPageSizeAfterRender'
          }
        },
        {
          //TODO this style needs to go into the theme stylesheet, but with all the merge issues, I'm not even going there right now.
          xtype: 'container',
          html: '<style>.disabled-row{background-color: gray;}</style>'
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
        selectionChange: 'onTreeSelectionChange'
      }
    },
    {
      xtype: 'druggrid',
      reference: 'druggrid',
      itemId: 'drugGrid',
      region: 'center',
      flex: 2.9,

      viewConfig: {
        stripeRows: true,
        loadMask: false,

        getRowClass: function (record) {
          var result = '';
          if (!this.up().getReferences().ndccolumn.hidden && this.lookupViewModel().get('selectedDrugCategorySK')) {
            if (this.lookupViewModel().get('formularyStatus') !== 'Approved') {
              if (record.data.DrugCatgSK !== this.lookupViewModel().get('selectedDrugCategorySK')) {
                result = 'disabled-row';
              }
            }
          }
          return result;
        }
      },

      listeners: {
        celldblclick: 'onCellDblClick',
        cellclick: 'onCellClick',
        itemcontextmenu: 'onItemContextMenu',
        columnshow: 'onColumnShow',
        columnhide: 'onColumnHide',
        beforeload: 'onBeforeLoad',
        load: 'onLoad',
        beforesort: 'onBeforeSort'
      },

      columns: [
        {
          text: 'Generic Name',
          flex: 1,
          dataIndex: 'GenericName',
          hidden: true,
          reference: 'genericnamecolumn'
        },
        {
          text: 'Brand Name',
          flex: 1,
          dataIndex: 'BrandName',
          hidden: true,
          reference: 'brandnamecolumn'
        },
        {
          text: 'Label Name',
          flex: 1,
          dataIndex: 'LabelName',
          hidden: true,
          reference: 'labelnamecolumn'
        },
        {
          text: 'Drug Type',
          flex: 1,
          dataIndex: 'DrugType',
          hidden: true,
          reference: 'drugtypecolumn'
        },
        {
          text: 'OTC',
          flex: 1,
          dataIndex: 'OTC',
          renderer: function (value) {
            if (value === true) {
              return 'Yes';
            }
            return 'No';
          },
          filter: {
            type: 'boolean',
            yesText: 'Yes',
            noTest: 'No'
          },
          hidden: true,
          reference: 'otccolumn'
        },
        {
          text: 'NDC',
          flex: 1,
          dataIndex: 'NDC',
          hidden: true,
          reference: 'ndccolumn'
        },
        {
          text: 'Obsolete Date',
          flex: 1,
          dataIndex: 'ObsoleteDate',
          xtype: 'datecolumn',
          format: 'm/d/Y',
          hidden: true,
          reference: 'obsoletedatecolumn'
        },
        {
          text: 'FDB GCN',
          flex: 1,
          dataIndex: 'GCN_SEQNO',
          hidden: true,
          reference: 'fdbgcncolumn'
        },
        {
          text: 'MEDID',
          flex: 1,
          dataIndex: 'MedId',
          hidden: true,
          reference: 'medidcolumn'
        },
        {
          text: 'HICL',
          flex: 1,
          dataIndex: 'HICL_SEQNO',
          hidden: true,
          reference: 'hiclcolumn'
        },
        {
          text: 'ETC',
          flex: 1,
          dataIndex: 'ETC_NAME',
          hidden: true,
          reference: 'etccolumn'
        },
        {
          text: 'Strength',
          flex: 1,
          dataIndex: 'DrugStrength',
          hidden: true,
          reference: 'strengthcolumn'
        },
        {
          text: 'Route of Administration',
          flex: 1,
          dataIndex: 'RouteAdministration',
          hidden: true,
          reference: 'routeofadministrationcolumn'
        },
        {
          text: 'GPI',
          flex: 1,
          dataIndex: 'GPI',
          hidden: true,
          reference: 'gpicolumn'
        },
        {
          xtype: 'templatecolumn',
          flex: 1,
          text: 'Drug Lists',
          dataIndex: 'RelatedDrugLists',
          hidden: true,
          sortable: false,
          reference: 'druglistcolumn',
          shrinkWrap: true,
          cellWrap: true,
          variableRowHeight: true,

          tpl: '<tpl for="RelatedDrugLists">{name}<br /></tpl>'
        },
        {
          text: 'DEA',
          flex: 1,
          dataIndex: 'DEA',
          hidden: true,
          reference: 'deacolumn'
        },
        {
          text: 'Date To Market',
          flex: 1,
          dataIndex: 'DateToMarket',
          xtype: 'datecolumn',
          format: 'm/d/Y',
          hidden: true,
          reference: 'datetomarketcolumn'
        },
        {
          text: 'Dosage Form',
          flex: 1,
          dataIndex: 'DosageForm',
          hidden: true,
          reference: 'dosageformcolumn'
        },
        {
          text: 'ETC ID',
          flex: 1,
          dataIndex: 'ETC_ID',
          hidden: true,
          reference: 'etcidcolumn'
        },
        {
          text: 'Federal Rebate Drug',
          flex: 1,
          dataIndex: 'FedRebateDrug',
          hidden: true,
          reference: 'federalrebatedrugcolumn',
          renderer: function (value) {
            if (value === true) {
              return 'Yes';
            }
            return 'No';
          }
        },
        {
          text: 'GTC Description',
          flex: 1,
          dataIndex: 'GTC_DESC',
          hidden: true,
          reference: 'gtcdescriptioncolumn'
        },
        {
          text: 'Maintenance Drug',
          flex: 1,
          dataIndex: 'IsMaintDrug',
          hidden: true,
          reference: 'maintenancedrugcolumn',
          renderer: function (value) {
            if (value === true) {
              return 'Yes';
            }
            return 'No';
          },
          filter: {
            type: 'boolean',
            yesText: 'Yes',
            noTest: 'No'
          }
        },
        {
          text: 'Specialty Drug',
          flex: 1,
          dataIndex: 'IsSpecialtyDrug',
          hidden: true,
          reference: 'specialtydrugcolumn',
          renderer: function (value) {
            if (value === true) {
              return 'Yes';
            }
            return 'No';
          },
          filter: {
            type: 'boolean',
            yesText: 'Yes',
            noTest: 'No'
          }
        },
        {
          text: 'Obsolete',
          flex: 1,
          dataIndex: 'IsObsolete',
          hidden: true,
          reference: 'obsoletecolumn',
          renderer: function (value) {
            if (value === true) {
              return 'Yes';
            }
            return 'No';
          }
        },
        {
          text: 'Package Size',
          flex: 1,
          dataIndex: 'PackageSize',
          hidden: true,
          reference: 'packagesizecolumn'
        },
        {
          text: 'AWP Package Price',
          flex: 1,
          dataIndex: 'PriceAWPPkg',
          hidden: true,
          reference: 'awppackagepricecolumn'
        },
        {
          text: 'AWP Unit Price',
          flex: 1,
          dataIndex: 'PriceAWPUnit',
          hidden: true,
          reference: 'awpunitpricecolumn'
        },
        {
          text: 'Federal Upper Limit Price',
          flex: 1,
          dataIndex: 'PriceFedUprLimit',
          hidden: true,
          reference: 'fedupperlimitpricecolumn'
        },
        {
          text: 'Suggested Whole Package Price',
          flex: 1,
          dataIndex: 'PriceSuqWhlPkg',
          hidden: true,
          reference: 'suggestedwholepackagepricecolumn'
        },
        {
          text: 'Suggested Whole Unit Price',
          flex: 1,
          dataIndex: 'PriceSugWhlUnit',
          hidden: true,
          reference: 'suggestedwholeunitpricecolumn'
        },
        {
          text: 'WAC Package Price',
          flex: 1,
          dataIndex: 'PriceWACPkg',
          hidden: true,
          reference: 'wacpackagepricecolumn'
        },
        {
          text: 'WAC Unit Price',
          flex: 1,
          dataIndex: 'PriceWACUnit',
          hidden: true,
          reference: 'wacunitpricecolumn'
        },
        {
          text: 'MS Gen Ind',
          flex: 1,
          dataIndex: 'MSGenericIndicator',
          hidden: true,
          reference: 'msgenericindicatorcolumn',
          filter: {
            type: 'list',
            options: ['M', 'O', 'N', 'Y']
          }
        },
        {
          text: 'Market Category',
          flex: 1,
          dataIndex: 'MarketCategory',
          hidden: true,
          reference: 'marketcategorycolumn'
        },
        {
          text: 'Market End Date',
          flex: 1,
          dataIndex: 'MarketEndDate',
          hidden: true,
          reference: 'marketenddatecolumn'
        },
        {
          text: 'Market Start Date',
          flex: 1,
          dataIndex: 'MarketStartDate',
          hidden: true,
          reference: 'marketstartdatecolumn'
        },
        {
          text: 'Add Date',
          flex: 1,
          dataIndex: 'DateAdded',
          xtype: 'datecolumn',
          format: 'm/d/Y',
          hidden: true,
          reference: 'adddatecolumn'
        },
        {
          text: 'Tier',
          flex: 1,
          dataIndex: 'TierCode',
          hidden: true,
          reference: 'tiercodecolumn'
        },
        {
          text: 'Rule',
          flex: 1,
          dataIndex: 'DrugCatgName',
          hidden: true,
          reference: 'drugcatgnamecolumn'
        }
      ]
    },
    {
      region: 'east',
      reference: 'drugsearch-eastregion',
      flex: 1.1,
      layout: {
        type: 'fit',
        align: 'stretch'
      },
      split: true,
      collapsible: true,
      hidden: true
    }
  ]
});
