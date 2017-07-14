Ext.define('Atlas.atlasformulary.view.druglistconfig.Header', {
  extend: 'Ext.panel.Panel',
  xtype: 'druglistconfig-header',

  cls: 'border-none',

  viewModel: {
    data: {
      drugListHeader: null
    }
  },

  items: [
    {
      xtype: 'container',
      layout: 'column',

      items: [
        {
          xtype: 'container',
          columnWidth: 0.15,
          bodyPadding: 10,
          margin: 10,

          defaults: {
            labelAlign: 'right',
            labelWidth: 125
          },

          items: [
            {
              xtype: 'displayfield',
              fieldLabel: 'Drug List ID',
              bind: '{drugListHeader.DrugListSK}'
            },
            {
              xtype: 'displayfield',
              fieldLabel: 'Effective Date',
              bind: '{drugListHeader.EfctvStartDt}',
              renderer: Ext.util.Format.dateRenderer('m/d/Y')
            }
          ]
        },
        {
          xtype: 'container',
          columnWidth: 0.35,
          bodyPadding: 10,
          margin: 10,

          layout: {
            type: 'vbox',
            align: 'stretch'
          },

          defaults: {
            labelAlign: 'right',
            labelWidth: 125
          },

          items: [
            {
              xtype: 'displayfield',
              fieldLabel: 'Drug List Name',
              bind: '{drugListHeader.DrugListName}'
            },
            {
              xtype: 'displayfield',
              fieldLabel: 'Line of Business',
              bind: '{drugListHeader.LOBName}'
            }
          ]
        },
        {
          xtype: 'container',
          columnWidth: 0.25,
          bodyPadding: 10,
          margin: 10,

          defaults: {
            labelAlign: 'right',
            labelWidth: 125
          },

          items: [
            {
              xtype: 'displayfield',
              fieldLabel: 'Data Source',
              bind: '{drugListHeader.DrugRefDbName}'
            }
          ]
        }
      ]
    }
  ]
});
