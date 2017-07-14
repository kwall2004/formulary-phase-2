Ext.define('Atlas.atlasformulary.view.formularyreview.FormularyReview', {
  extend: 'Ext.panel.Panel',
  xtype: 'formulary-review',
  title: 'Formulary Review',
  controller: 'formularyreview',
  viewModel: 'formularyreview',
  layout: 'border',
  scrollable: true,
  requires: [
    'Ext.grid.filters.Filters'
  ],

  items: [
    {
      xtype: 'container',
      region: 'north',

      items: [
        {
          xtype: 'container',
          itemId: 'reviewTitle',
          html: '<h1 align=\'center\'>Formulary Review</h1>'
        },
        {
          xtype: 'panel',
          layout: 'hbox',

          defaults: {
            flex: 1
          },

          items: [
            {
              xtype: 'container',
              defaultType: 'displayfield',

              items: [
                {
                  fieldLabel: 'Status',
                  itemId: 'statusField',
                  bind: '{reviewrecord.StatDesc}'
                },
                {
                  fieldLabel: 'Version',
                  itemId: 'versionField',
                  bind: '{reviewrecord.FrmlryVer}'
                }
              ]
            },
            {
              xtype: 'container',
              defaultType: 'displayfield',

              items: [
                {
                  fieldLabel: 'Formulary Name',
                  itemId: 'formularyNameField',
                  bind: '{reviewrecord.FrmlryName}'
                },
                {
                  fieldLabel: 'Effective Date',
                  itemId: 'effectiveDateField',
                  bind: '{reviewrecord.EfctvStartDt}',
                  renderer: Ext.util.Format.dateRenderer('m/d/Y')
                }
              ]
            },
            {
              xtype: 'container',
              defaultType: 'displayfield',

              items: [
                {
                  fieldLabel: 'Line of Business',
                  itemId: 'lineOfBusinessField',
                  bind: '{reviewrecord.LOBName}'
                },
                {
                  fieldLabel: 'Plan Type',
                  itemId: 'planTypeField',
                  bind: '{reviewrecord.PlanType}'
                }
              ]
            },
            {
              xtype: 'container',
              defaultType: 'displayfield',

              items: [
                {
                  fieldLabel: 'Data Source',
                  itemId: 'dataSourceField',
                  bind: '{reviewrecord.DrugRefDbName}'
                },
                {
                  fieldLabel: 'Default Therapy Class',
                  itemId: 'defaultTherapyField',
                  bind: '{reviewrecord.DrugThrputcClsTypeCode}'
                }
              ],
              reference: 'displayfield'
            },
            {
              xtype: 'container',
              defaultType: 'displayfield',

              items: [
                {
                  fieldLabel: 'Days Active After Obsolete',
                  itemId: 'daysActiveField',
                  bind: '{reviewrecord.DrugPostObsltAlwdDays}'
                },
                {
                  fieldLabel: 'Drug Type',
                  itemId: 'drugTypeField',
                  bind: '{reviewrecord.DrugTypeFunction}'
                }
              ]

            }
          ]
        },
        {
          xtype: 'toolbar',

          items: [
            {
              xtype: 'smartdrugsearchcombo',

              listeners: {
                select: 'onSmartSearchSelect'
              }
            },
            {
              xtype: 'button',
              text: 'Clear Search Criteria',
              handler: 'onClearSearchCriteria'
            },
            '->',
            {
              text: 'Clear Filters',
              tooltip: 'Clear all filters',
              handler: 'onClearFilters'
            },
            {
              text: 'Export...',
              menu: [
                {
                  text: 'Export Rules',
                  handler: 'onExportFormularyRulesClick'
                },
                {
                  text: 'Export NDCs',
                  handler: 'onExportFormularyNDCClick'
                },
                {
                  text: 'Formulary Summary',
                  handler: 'onFormularySummaryClick'
                },
                {
                  text: 'Missing FDB NDCs',
                  handler: 'onMissingFDBNDCsClick',
                  hidden: true,
                  bind: {
                    hidden: '{!isMedispan}'
                  }
                }
              ]
            },
            {
              xtype: 'button',
              text: 'View Notes',
              handler: 'onViewNotesClick'
            },
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
            }
          ]
        }
      ]
    },
    {
      xtype: 'panel',
      title: 'AHFS - ETC - Rules - Tiers',
      region: 'west',
      split: true,
      layout: 'card',
      itemId: 'westContainer',
      collapsible: true,
      scrollable: true,
      flex: 1,

      dockedItems: [
        {
          xtype: 'toolbar',

          layout: {
            pack: 'center'
          },

          items: [
            {
              xtype: 'segmentedbutton',

              items: [
                {
                  text: 'AHFS',
                  handler: 'onAHFSClick',
                  pressed: true
                },
                {
                  text: 'ETC',
                  handler: 'onETCClick'
                },
                {
                  text: 'GPI',
                  handler: 'onGPIClick',
                  hidden: true
                },
                {
                  text: 'Rules',
                  handler: 'onRulesClick'
                },
                {
                  text: 'Tiers',
                  handler: 'onTiersClick'
                }
              ]
            }
          ]
        }
      ],

      items: [
        {
          xtype: 'treepanel',
          reference: 'ahfsView',
          itemId: 'ahfsView',
          bind: '{formularyreviewahfs}',
          rootVisible: false,

          columns: [
            {
              xtype: 'treecolumn',
              text: 'AHFS Tree',
              dataIndex: 'name',
              flex: 1
            }
          ],
          listeners: {
            select: 'onAHFSSelected'
          }
        },
        {
          xtype: 'hierarchytree',
          reference: 'etcView',
          itemId: 'etcView',
          bind: '{reviewetc}',
          rootVisible: false,

          listeners: {
            select: 'onHierarchySelected'
          }
        },
        {
          xtype: 'gridpanel',
          itemId: 'rulesView',
          reference: 'reviewRulesView',
          bind: '{reviewrules}',
          columns: [
            {
              text: 'Drug Category',
              flex: 1,
              dataIndex: 'DrugCatgName'
            }
          ],
          listeners: {
            cellclick: 'onRuleSelected'
          }
        },
        {
          xtype: 'gridpanel',
          itemId: 'tiersView',
          bind: '{formularyreviewtiers}',

          columns: [
            {
              text: 'Tier',
              flex: 1,
              dataIndex: 'FrmlryTierName'
            }
          ],

          listeners: {
            cellclick: 'onTierSelected'
          }
        },
        {
          xtype: 'hierarchytree',
          reference: 'gpiView',
          itemId: 'gpiView',
          bind: '{reviewgpi}',
          rootVisible: false,

          listeners: {
            select: 'onGPIHierarchySelected',
            activate: 'onActivateGpiView'
          }
        }
      ]
    },
    {
      xtype: 'druggrid',
      title: 'Drug Information',
      itemId: 'drugGrid',
      region: 'center',
      bind: '{formularyreviewdrugspaged}',
      plugins: 'gridfilters',
      flex: 3,

      dockedItems: [
        {
          xtype: 'pagingtoolbar',
          dock: 'bottom',
          displayInfo: true,
          // displayMsg: 'Displaying {2} drugs',
          split: true,
          bind: '{formularyreviewdrugspaged}'
        }
      ],

      columns: {
        defaults: {
          flex: 1,
          filter: true
        },
        items: [
          {
            text: 'Changes',
            dataIndex: 'FrmlryChanges',
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
            hidden: true
          },
          {
            text: 'GCN',
            dataIndex: 'GCN_SEQNO',
            hidden: true
          },
          {
            text: 'MED ID',
            dataIndex: 'MedId'
          },
          {
            text: 'HICL',
            dataIndex: 'HICL_SEQNO',
            hidden: true
          },
          {
            text: 'Drug Type',
            dataIndex: 'DrugType',
            filter: {
              type: 'list',
              options: ['SSB', 'MSB', 'GEN']
            }
          },
          {
            text: 'OTC',
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
            }
          },
          {
            text: 'Covered',
            dataIndex: 'IsCovered',
            hidden: true,
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
            text: 'ETC Name',
            dataIndex: 'ETC_NAME',
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
            hidden: true
          },
          {
            text: 'Dosage Form',
            dataIndex: 'DosageForm',
            hidden: true
          },
          {
            text: 'Route of Admin',
            dataIndex: 'RouteAdministration',
            hidden: true
          },
          {
            xtype: 'datecolumn',
            text: 'Add Date',
            dataIndex: 'EffectiveDate',
            format: 'm-d-Y',
            hidden: true
          },
          {
            text: 'AWPPkgPrc',
            dataIndex: 'PriceAWPPkg',
            renderer: function (value) {
              var price = Ext.util.Format.number(value, '0,0.00');
              if (value !== null) {
                price = '$' + price;
              }
              return price;
            },
            filter: 'number',
            hidden: true
          },
          {
            text: 'AWPUnitPrc',
            dataIndex: 'PriceAWPUnit',
            renderer: function (value) {
              var price = Ext.util.Format.number(value, '0,0.00');
              if (value !== null) {
                price = '$' + price;
              }
              return price;
            },
            filter: 'number',
            hidden: true
          },
          {
            text: 'MS Gen Ind',
            dataIndex: 'MSGenericIndicator',
            hidden: true,
            filter: {
              type: 'list',
              options: ['M', 'O', 'N', 'Y']
            }
          },
          {
            text: 'Specialty',
            dataIndex: 'IsSpecialtyDrug',
            hidden: true,
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
            text: 'Maintenance',
            dataIndex: 'IsMaintenanceDrug',
            hidden: true,
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
            xtype: 'datecolumn',
            text: 'Obsolete Date',
            dataIndex: 'ObsoleteDate',
            format: 'm-d-Y',
            hidden: true
          },
          {
            text: 'WACPkgPrc',
            dataIndex: 'PriceWACPkg',
            renderer: function (value) {
              var price = Ext.util.Format.number(value, '0,0.00');
              if (value !== null) {
                price = '$' + price;
              }
              return price;
            },
            filter: 'number',
            hidden: true
          },
          {
            text: 'WACUntPrc',
            dataIndex: 'PriceWACUnit',
            renderer: function (value) {
              var price = Ext.util.Format.number(value, '0,0.00');
              if (value !== null) {
                price = '$' + price;
              }
              return price;
            },
            filter: 'number',
            hidden: true
          },
          {
            text: 'FFPUL',
            dataIndex: 'PriceFedUprLimit',
            renderer: function (value) {
              var price = Ext.util.Format.number(value, '0,0.00');
              if (value !== null) {
                price = '$' + price;
              }
              return price;
            },
            filter: 'number',
            hidden: true
          },
          {
            text: 'SWPPdhPrc',
            dataIndex: 'PriceSugWhlPkg',
            renderer: function (value) {
              var price = Ext.util.Format.number(value, '0,0.00');
              if (value !== null) {
                price = '$' + price;
              }
              return price;
            },
            filter: 'number',
            hidden: true
          },
          {
            text: 'SWPuntPrc',
            dataIndex: 'PriceSugWhlUnit',
            renderer: function (value) {
              var price = Ext.util.Format.number(value, '0,0.00');
              if (value !== null) {
                price = '$' + price;
              }
              return price;
            },
            filter: 'number',
            hidden: true
          },
          {
            text: 'UM',
            dataIndex: 'CvrgPrptySummary',
            filter: false,
            hidden: true
          }
        ]
      }
    }
  ],

  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'bottom',
      layout: {
        pack: 'end'
      },

      defaultType: 'button',

      items: [
        {
          text: 'Previous',
          handler: 'onReturnToHeaderClick'
        },
        {
          text: 'UM Criteria',
          handler: 'onShowUMCriteria',
          bind: {
            disabled: '{!reviewRulesView.selection}'
          }
        },
        '->',
        {
          text: 'Back',
          itemId: 'returnHeaderButton',
          handler: 'onReturnToHeaderClick'
        },
        {
          text: 'Approve',
          itemId: 'approveButton',
          handler: 'onApproveClick'
        },
        {
          text: 'Reject',
          itemId: 'rejectButton',
          handler: 'onRejectClick'
        },
        {
          text: 'Cancel',
          itemId: 'cancelButton',
          handler: 'onCancelClick'
        }
      ]
    }
  ],

  initComponent: function (config) {
    this.getViewModel().set('formularySK', this.formularySK);
    this.getViewModel().set('formularyMode', this.mode);
    this.getViewModel().set('formularyStatus', this.formularyStatus);

    this.callParent(config);
  }
});
