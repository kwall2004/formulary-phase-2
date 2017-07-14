Ext.define('Atlas.atlasformulary.view.umprograms.UMCriteriaPanel4', {
  extend: 'Ext.form.Panel',
  xtype: 'umprograms-umcriteriapanel4',
  margin: '20 0 0 20',

  layout: 'column',

  items: [
    {
      xtype: 'container',
      columnWidth: 0.25,
      layout: 'anchor',
      flex: 1,
      defaults: {
        xtype: 'displayfield',
        labelWidth: 50,
        padding: '10 0 10 0'
      },
      /* eslint-disable object-curly-newline */
      items: [
        { fieldLabel: 'Fills' },
        { fieldLabel: 'Quantity Limits' },
        { fieldLabel: 'Days Supply' }
      ]
      /* eslint-enable object-curly-newline */
    },
    {
      xtype: 'container',
      columnWidth: 0.25,
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
          fieldLabel: 'Max',
          name: 'MaxFillQty',
          itemId: 'MaxFillQty',
          bind: '{umcriteriarec.MaxFillQty}'
        },
        {
          fieldLabel: 'Max',
          name: 'QLFillQty',
          itemId: 'QLFillQty',
          bind: '{umcriteriarec.QLFillQty}'
        },
        {
          fieldLabel: 'Max',
          name: 'DaysSupplyFillQty',
          itemId: 'DaysSupplyFillQty',
          bind: '{umcriteriarec.DaysSupplyFillQty}'
        }
      ]
    },
    {
      xtype: 'container',
      columnWidth: 0.25,
      layout: 'anchor',
      flex: 1,
      defaults: {
        xtype: 'textfield',
        padding: '10 0 10 0',
        labelWidth: 40
      },
      items: [
        {
          fieldLabel: 'Per',
          name: 'MaxFillPerPeriod',
          itemId: 'MaxFillPerPeriod',
          bind: '{umcriteriarec.MaxFillPerPeriod}'
        },
        {
          fieldLabel: 'Per',
          name: 'QLFillPerPeriod',
          itemId: 'QLFillPerPeriod',
          bind: '{umcriteriarec.QLFillPerPeriod}'
        },
        {
          fieldLabel: 'Per',
          name: 'DaysSupplyFillPerPeriod',
          itemId: 'DaysSupplyFillPerPeriod',
          bind: '{umcriteriarec.DaysSupplyFillPerPeriod}'
        }
      ]
    },
    {
      xtype: 'container',
      columnWidth: 0.25,
      layout: 'anchor',
      flex: 1,
      defaults: {
        xtype: 'textfield',
        padding: '12 0 12 0',
        width: 150
      },
      items: [
        {
          xtype: 'combo',
          editable: true,
          name: 'MaxFillPeriodType',
          itemId: 'MaxFillPeriodType',
          emptyText: 'Days / Years',
          displayField: 'name',
          valueField: 'value',
          bind: {
            store: '{rxFillsList}',
            value: '{umcriteriarec.MaxFillPeriodType}'
          }
        },
        {
          xtype: 'combo',
          editable: true,
          name: 'QLFillPeriodType',
          itemId: 'QLFillPeriodType',
          emptyText: 'Days / Years',
          displayField: 'name',
          valueField: 'value',
          bind: {
            store: '{rxFillsList}',
            value: '{umcriteriarec.QLFillPeriodType}'
          }
        },
        {
          xtype: 'combo',
          editable: true,
          name: 'DaysSupplyPeriodType',
          itemId: 'DaysSupplyPeriodType',
          emptyText: 'Days / Years',
          displayField: 'name',
          valueField: 'value',
          bind: {
            store: '{rxFillsList}',
            value: '{umcriteriarec.DaysSupplyPeriodType}'
          }
        }
      ]
    }
  ]
});