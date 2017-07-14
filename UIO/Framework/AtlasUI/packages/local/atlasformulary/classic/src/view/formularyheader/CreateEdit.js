Ext.define('Atlas.atlasformulary.view.formularyheader.CreateEdit', {
  extend: 'Atlas.atlasformulary.view.formularyheader.FormularyHeaderBase',
  xtype: 'formularyheader-createedit',

  bind: {
    title: '{titleMode} Formulary {formularyHeader.FrmlryName}'
  },

  scrollable: true,
  layout: 'column',

  items: [
    {
      xtype: 'form',
      itemId: 'formularyheader-form',
      flex: 1,
      columnWidth: 1,
      layout: 'column',

      items: [
        {
          xtype: 'container',
          columnWidth: 1,
          bodyPadding: 10,
          margin: 10,

          defaults: {
            labelAlign: 'right'
          },

          items: [
            {
              xtype: 'displayfield',
              fieldLabel: 'Formulary ID',
              name: 'FrmlryID',
              bind: '{formularyHeader.FrmlryID}'
            },
            {
              xtype: 'displayfield',
              fieldLabel: 'Version',
              name: 'FrmlryVer',
              bind: '{formularyHeader.FrmlryVer}',
              emptyText: 1
            },
            {
              xtype: 'displayfield',
              fieldLabel: 'Status',
              name: 'StatDesc',
              emptyText: 'Draft',
              bind: '{formularyHeader.StatDesc}'
            }
          ]
        },
        {
          xtype: 'panel',
          title: 'Formulary Information',
          columnWidth: 0.34,
          bodyPadding: 10,
          margin: '10 0 0 10',

          layout: {
            type: 'vbox',
            align: 'stretch'
          },

          defaults: {
            labelAlign: 'right',
            labelWidth: 200,
            allowBlank: false
          },

          items: [
            {
              xtype: 'textfield',
              fieldLabel: 'Formulary Name',
              name: 'FrmlryName',
              bind: '{formularyHeader.FrmlryName}',
              enforceMaxLength: true,
              maxLength: 80
            },
            {
              xtype: 'datefield',
              name: 'EfctvStartDt',
              fieldLabel: 'Effective Date',
              itemId: 'efctvStartDt',
              bind: '{formularyHeader.EfctvStartDt}',
              format: 'n/j/Y',
              endDateField: 'efctvEndDt',
              vtype: 'formularyDateRange'
            },
            {
              xtype: 'datefield',
              name: 'EfctvEndDt',
              fieldLabel: 'Expiration Date',
              itemId: 'efctvEndDt',
              bind: '{formularyHeader.EfctvEndDt}',
              format: 'n/j/Y',
              startDateField: 'efctvStartDt',
              vtype: 'formularyDateRange'
            },
            {
              xtype: 'combobox',
              name: 'LOBSK',
              fieldLabel: 'Line of Business',
              displayField: 'LOBName',
              valueField: 'LOBSK',
              forceSelection: true,

              bind: {
                value: '{formularyHeader.LOBSK}',
                store: '{lob}'
              },

              queryMode: 'local',

              listeners: {
                select: 'onLineOfBusinessSelect'
              }
            },
            {
              xtype: 'combobox',
              name: 'PlanType',
              fieldLabel: 'Product Type',
              displayField: 'FrmlryPlanTypeName',
              valueField: 'FrmlryPlanTypeName',
              forceSelection: true,

              bind: {
                value: '{formularyHeader.PlanType}',
                disabled: '{formularyHeader.LOBSK !== 1}',
                store: '{formularyplantype}'
              },

              allowBlank: true
            },
            {
              xtype: 'combobox',
              name: 'SNPType',
              fieldLabel: 'SNP Type',
              displayField: 'FrmlryPlanSubTypeName',
              valueField: 'FrmlryPlanSubTypeName',
              queryMode: 'local',
              allowBlank: true,
              forceSelection: true,

              bind: {
                hidden: '{formularyHeader.LOBSK !== 1 || formularyHeader.PlanType !== "SNP"}',
                store: '{formularyplansubtype}'
              }
            },
            {
              xtype: 'combobox',
              name: 'dataSource',
              reference: 'datasource',
              itemId: 'dataSource',
              fieldLabel: 'Data Source',
              queryMode: 'local',
              displayField: 'DrugRefDbName',
              valueField: 'DrugRefDbSK',
              forceSelection: true,

              bind: {
                value: '{formularyHeader.DrugRefDbSK}',
                store: '{drugrefdb}'
              },

              listeners: {
                select: 'onDataSourceSelect'
              }
            },
            {
              xtype: 'combobox',
              name: 'therapyClass',
              reference: 'therapyclass',
              itemId: 'therapyClass',
              fieldLabel: 'Default Therapy Class',
              queryMode: 'local',
              displayField: 'DrugThrputcClsTypeCode',
              valueField: 'DrugThrputcClsTypeSK',
              forceSelection: true,

              bind: {
                value: '{formularyHeader.DrugThrputcClsTypeSK}',
                store: '{therapeuticclasstypes}'
              }
            },
            {
              xtype: 'numberfield',
              name: 'drugPostobltAlwdDays',
              fieldLabel: 'Days Available After Obsolete',
              emptyText: '365',

              bind: {
                value: '{formularyHeader.DrugPostObsltAlwdDays}',
                disabled: '{disableDaysAfterObsolete}'
              },

              minValue: 0,
              maxValue: 2500,
              keyNavEnabled: false,
              mouseWheelEnabled: false,
              hideTrigger: true
            },
            {
              xtype: 'combobox',
              name: 'drugTypeFunction',
              reference: 'drugTypeFunction',
              itemId: 'drugTypeFunction',
              fieldLabel: 'Drug Type Function',
              queryMode: 'local',
              displayField: 'DrugTypeFnDesc',
              valueField: 'DrugTypeFnCd',
              forceSelection: true,

              bind: {
                value: '{formularyHeader.DrugTypeFunction}',
                disabled: '{!formularyHeader.DrugRefDbSK}',
                store: '{drugtypefn}'
              }
            },
            {
              xtype: 'container',
              padding: '15 10 0 10',
              cls: 'border-none',
              items: [
                {
                  xtype: 'checkbox',
                  boxLabel: 'Auto Assign New NDCs',
                  bind: '{formularyHeader.AutomaticallyAssignNewNDCsInd}'
                },
                {
                  xtype: 'checkbox',
                  boxLabel: 'Exclude OTC',
                  bind: '{formularyHeader.IsExcludeOTC}'
                }
              ]
            }
          ]
        },
        {
          xtype: 'atlas-druglisteditor-main',
          columnWidth: 0.33,
          bodyPadding: 10,
          margin: '10 0 0 10',
          allowBlank: false,
          listDataIndex: 'FrmlryDrugListName',

          listeners: {
            onAddDrugList: 'addDrugList',
            onRemoveDrugList: 'removeDrugList'
          }
        },
        {
          xtype: 'formularytierselection',
          columnWidth: 0.33,
          bodyPadding: 10,
          margin: 10,
          allowBlank: false,
          viewOnly: false,

          listeners: {
            onListEditorAdd: 'addTier',
            onListEditorRemove: 'removeTier'
          }
        },
        {
          xtype: 'panel',
          columnWidth: 1,
          cls: 'border-none',
          layout: 'hbox',

          items: [
            {
              xtype: 'formularyheader-ownertree',
              flex: 0.5,
              margin: '10 0 0 10'
            },
            {
              xtype: 'formularyheader-visibilitytree',
              flex: 0.5,
              margin: 10
            }
          ]
        }
      ]
    },
    {
      xtype: 'formularyheader-summaryconfig',
      modal: true,
      closable: false
    }
  ],

  buttons: [
    {
      text: 'Configure Summary',
      handler: 'onConfigureSummaryClick',
      disabled: true,
      bind: {
        disabled: '{formularySK == null}'
      }
    },
    {
      text: 'Clear',
      handler: 'onClearClick'
    },
    {
      text: 'Cancel',
      handler: 'onCancelClick'
    },
    {
      text: 'Save',
      handler: 'onSaveClick'
    },
    {
      text: 'Next',
      handler: 'onNextClick'
    }
  ]
});
