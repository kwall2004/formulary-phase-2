Ext.define('Atlas.atlasformulary.view.umprograms.UMCriteriaPanel3', {
  extend: 'Ext.form.Panel',
  xtype: 'umprograms-umcriteriapanel3',
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
          fieldLabel: 'Step Therapy Indicator',
          name: 'IsSTRequired',
          itemId: 'IsSTRequired',
          bind: '{umcriteriarec.IsSTRequired}'

        },
        {
          xtype: 'combobox',
          editable: true,
          emptyText: 'Required Step Therapy',
          name: 'StepTherapyName',
          itemId: 'StepTherapyName',
          displayField: 'RuleName',
          valueField: 'RuleName',
          width: 350,
          bind: {
            store: '{stepNames}',
            value: '{umcriteriarec.StepTherapyName}'
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
        flex: 1,
        minWidth: 50,
        maxWidth: 50,
        xtype: 'textfield'
      },
      items: [

      ]
    }
  ]
});