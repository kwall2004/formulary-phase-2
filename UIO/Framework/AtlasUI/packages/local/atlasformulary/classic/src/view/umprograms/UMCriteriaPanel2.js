Ext.define('Atlas.atlasformulary.view.umprograms.UMCriteriaPanel2', {
  extend: 'Ext.form.Panel',
  xtype: 'umprograms-umcriteriapanel2',
  margin: '20 0 0 20',

  layout: 'column',

  items: [
    {
      xtype: 'container',
      columnWidth: 0.5,
      margin: '0 0 0 0',
      layout: 'anchor',
      flex: 1,
      defaults: {
        xtype: 'checkbox',
        padding: '10 0 10 0',
        labelWidth: 150,
        flex: 1
      },
      items: [
        {
          fieldLabel: 'PA Indicator',
          name: 'PAInd',
          itemId: 'PAInd',
          bind: '{umcriteriarec.PAInd}'
        },
        {
          xtype: 'combobox',
          editable: true,
          emptyText: 'Required Prior Authorization',
          name: 'PAName',
          itemId: 'PAName',
          displayField: 'ListDescription',
          valueField: 'ListDescription',
          width: 350,
          bind: {
            store: '{priorAuthNames}',
            value: '{umcriteriarec.PAName}'
          }
        }
      ]
    },
    {
      xtype: 'container',
      columnWidth: 0.5,
      layout: 'anchor',
      flex: 1,
      defaults: {
        xtype: 'textfield',
        labelWidth: 40,
        padding: '10 0 10 0',
        width: 120
      },
      items: [
        {
          xtype: 'displayfield',
          fieldLabel: 'PA Age Limit'
        },
        {
          fieldLabel: 'Min',
          name: 'PAMinAge',
          itemId: 'PAMinAge',
          bind: '{umcriteriarec.PAMinAge}'
        },
        {
          fieldLabel: 'Max',
          name: 'PAMaxAge',
          itemId: 'PAMaxAge',
          bind: '{umcriteriarec.PAMaxAge}'
        }
      ]
    }
  ]
});