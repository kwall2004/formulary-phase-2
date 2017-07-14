Ext.define('Atlas.atlasformulary.view.druglistheader.Read', {
  extend: 'Atlas.atlasformulary.view.druglistheader.DrugListHeaderBase',
  xtype: 'druglistheader-read',

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
            xtype: 'displayfield',
            labelAlign: 'right',
            labelWidth: 200,
            allowBlank: false
          },

          items: [
            {
              fieldLabel: 'Drug List Name',
              name: 'DrugListName',
              bind: '{drugListHeader.DrugListName}'
            },
            {
              name: 'EfctvStartDt',
              fieldLabel: 'Effective Date',
              bind: '{drugListHeader.EfctvStartDt}',
              renderer: Ext.util.Format.dateRenderer('m/d/Y')
            },
            {
              name: 'EfctvEndDt',
              fieldLabel: 'Effective Date (end)',
              bind: '{drugListHeader.EfctvEndDt}',
              renderer: Ext.util.Format.dateRenderer('m/d/Y')
            },
            {
              name: 'LOBSK',
              fieldLabel: 'Line of Business',
              bind: '{drugListHeader.LOBName}'
            },
            {
              name: 'DrugRefDBSK',
              fieldLabel: 'Data Source',
              bind: '{drugListHeader.DrugRefDbName}'
            },
            {
              name: 'DrugPostObsltAlwdDays',
              fieldLabel: 'Days Available After Obsolete',
              bind: '{drugListHeader.DrugPostObsltAlwdDays}'
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
                  checked: true,
                  disabled: true
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
      text: 'Next',
      formBind: true,
      handler: 'onNextClick'
    }
  ]
});
