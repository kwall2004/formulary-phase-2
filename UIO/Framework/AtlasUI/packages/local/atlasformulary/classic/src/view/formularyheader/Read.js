Ext.define('Atlas.atlasformulary.view.formularyheader.Read', {
  extend: 'Atlas.atlasformulary.view.formularyheader.FormularyHeaderBase',
  xtype: 'formularyheader-read',

  bind: {
    title: '{titleMode} Formulary {formularyHeader.FrmlryName}'
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
            xtype: 'displayfield',
            labelAlign: 'right',
            labelWidth: 200
          },

          items: [
            {
              fieldLabel: 'Formulary Name',
              name: 'FrmlryName',
              bind: '{formularyHeader.FrmlryName}'
            },
            {
              name: 'EfctvStartDt',
              fieldLabel: 'Effective Date',
              bind: '{formularyHeader.EfctvStartDt}',
              renderer: Ext.util.Format.dateRenderer('m/d/Y')
            },
            {
              name: 'EfctvEndDt',
              fieldLabel: 'Expiration Date',
              bind: '{formularyHeader.EfctvEndDt}',
              renderer: Ext.util.Format.dateRenderer('m/d/Y')
            },
            {
              name: 'lOBSK',
              fieldLabel: 'Line of Business',
              bind: '{formularyHeader.LOBName}'
            },
            {
              fieldLabel: 'Product Type',
              name: 'planType',
              emptyText: 'PDP',
              bind: '{formularyHeader.PlanType}'
            },
            {
              name: 'drugRefDbSK',
              fieldLabel: 'Data Source',
              bind: '{formularyHeader.DrugRefDbName}',

              renderer: function (value) {
                if (value === 'FDB') {
                  return 'First DataBank (FDB)';
                }
                return value;
              }
            },
            {
              name: 'drugThrputcClsTypeSK',
              fieldLabel: 'Default Therapy Class',
              bind: '{formularyHeader.DrugThrputcClsTypeCode}'
            },
            {
              name: 'drugPostObsltAlwdDays',
              fieldLabel: 'Days Available After Obsolete',
              bind: '{formularyHeader.DrugPostObsltAlwdDays}'
            },
            {
              name: 'drugTypeFunction',
              fieldLabel: 'Drug Type Function',
              bind: '{formularyHeader.DrugTypeFunction}'
            },
            {
              xtype: 'container',
              padding: '15 10 0 10',
              cls: 'border-none',
              items: [
                {
                  xtype: 'checkbox',
                  boxLabel: 'Auto Assign New NDCs',
                  bind: '{formularyHeader.AutomaticallyAssignNewNDCsInd}',
                  disabled: true
                },
                {
                  xtype: 'checkbox',
                  boxLabel: 'Exclude OTC',
                  bind: '{formularyHeader.IsExcludeOTC}',
                  disabled: true
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
          viewOnly: true,
          listDataIndex: 'FrmlryDrugListName'
        },
        {
          xtype: 'formularytierselection',
          columnWidth: 0.33,
          bodyPadding: 10,
          margin: 10,
          allowBlank: false,
          viewOnly: true
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
      action: 'cancel',
      handler: 'onCancelClick'
    },
    {
      text: 'Next',
      action: 'next',
      handler: 'onNextClick'
    }
  ]
});
