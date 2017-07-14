Ext.define('Atlas.atlasformulary.view.druglistheader.CreateEdit', {
  extend: 'Atlas.atlasformulary.view.druglistheader.DrugListHeaderBase',
  xtype: 'druglistheader-createedit',

  bind: {
    title: '{titleMode} DrugList - {drugListHeader.DrugListName}'
  },

  scrollable: true,
  layout: 'column',

  items: [
    {
      xtype: 'form',
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
              fieldLabel: 'Drug List ID',
              labelWidth: 120,
              bind: '{drugListHeader.DrugListSK}'
            }
          ]
        },
        {
          xtype: 'panel',
          title: 'Drug List Information',
          columnWidth: 0.4,
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
              fieldLabel: 'Drug List Name',
              name: 'DrugListName',
              bind: '{drugListHeader.DrugListName}',
              enforceMaxLength: true,
              maxLength: 80
            },
            {
              xtype: 'datefield',
              name: 'EfctvStartDt',
              fieldLabel: 'Effective Date',
              itemId: 'drugListEfctvStartDt',
              bind: '{drugListHeader.EfctvStartDt}',
              format: 'n/j/Y',
              endDateField: 'drugListEfctvEndDt',
              vtype: 'formularyDateRange'
            },
            {
              xtype: 'datefield',
              name: 'EfctvEndDt',
              fieldLabel: 'Effective Date (end)',
              itemId: 'drugListEfctvEndDt',
              bind: '{drugListHeader.EfctvEndDt}',
              format: 'n/j/Y',
              startDateField: 'drugListEfctvStartDt',
              vtype: 'formularyDateRange'
            },
            {
              xtype: 'combobox',
              name: 'LOBSK',
              fieldLabel: 'Line of Business',
              queryMode: 'local',
              displayField: 'LOBName',
              valueField: 'LOBSK',
              forceSelection: true,
              bind: {
                value: '{drugListHeader.LOBSK}',
                store: '{lob}'
              }
            },
            {
              xtype: 'combobox',
              name: 'DrugRefDbSK',
              reference: 'datasource',
              fieldLabel: 'Data Source',
              queryMode: 'local',
              displayField: 'DrugRefDbName',
              valueField: 'DrugRefDbSK',
              forceSelection: true,
              allowBlank: true,
              bind: {
                value: '{drugListHeader.DrugRefDbSK}',
                store: '{drugrefdb}'
              },
              listeners: {
                select: 'onDataSourceSelect'
              }
            },
            {
              xtype: 'numberfield',
              name: 'DrugPostObsltAlwdDays',
              fieldLabel: 'Days Available After Obsolete',
              queryMode: 'local',
              displayField: 'DrugPostObsltAlwdDays',
              valueField: 'DrugPostObsltAlwdDays',
              forceSelection: true,
              emptyText: '365',
              bind: {
                value: '{drugListHeader.DrugPostObsltAlwdDays}'
              },
              minValue: 0,
              maxValue: 2500,
              keyNavEnabled: false,
              mouseWheelEnabled: false,
              hideTrigger: true
            },
            {
              xtype: 'container',
              padding: '15 10 0 10',
              cls: 'border-none',
              items: [
                {
                  xtype: 'checkbox',
                  boxLabel: 'Auto Assign New NDCs',
                  bind: '{drugListHeader.AutomaticallyAssignNewNDCsInd}',
                  checked: true
                }
              ]
            }
          ]
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
    }
  ],

  buttons: [
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
      formBind: true,
      handler: 'onNextClick'
    }
  ]
});
