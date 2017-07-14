Ext.define('Atlas.atlasformulary.view.umprograms.UMCriteriaPanel4ContainerHolder', {
  extend: 'Ext.form.Panel',
  xtype: 'umprograms-umcriteriapanel4containerholder',
  margin: '20 0 0 20',

  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    xtype: 'umprograms-umcriteriapanel4container',
    padding: '10 0 10 0',
    flex: 1
  },
  items: [
    {
      itemConfig: {
        tgtLabel: 'Fills',
        tgtName: 'Fills',
        tgtLblAlign: 'left',
        tgtItem1: 'MaxFillQty',
        tgtBind1: '{umcriteriarec.MaxFillQty}',
        tgtItem2: 'MaxFillPerPeriod',
        tgtBind2: '{umcriteriarec.MaxFillPerPeriod}',
        tgtItem3: 'MaxFillPeriodType',
        tgtBind3: '{umcriteriarec.MaxFillPeriodType}'
      }
    },
    {
      itemConfig: {
        tgtLabel: 'Quantity Limits',
        tgtName: 'QuantityLimits',
        tgtLblAlign: 'left',
        tgtItem1: 'QLFillQty',
        tgtBind1: '{umcriteriarec.QLFillQty}',
        tgtItem2: 'QLFillPerPeriod',
        tgtBind2: '{umcriteriarec.QLFillPerPeriod}',
        tgtItem3: 'QLFillPeriodType',
        tgtBind3: '{umcriteriarec.QLFillPeriodType}'
      }
    },
    {
      itemConfig: {
        tgtLabel: 'Days Supply',
        tgtName: 'DaysSupply',
        tgtLblAlign: 'left',
        tgtItem1: 'DaysSupplyFillQty',
        tgtBind1: '{umcriteriarec.DaysSupplyFillQty}',
        tgtItem2: 'DaysSupplyFillPerPeriod',
        tgtBind2: '{umcriteriarec.DaysSupplyFillPerPeriod}',
        tgtItem3: 'DaysSupplyPeriodType',
        tgtBind3: '{umcriteriarec.DaysSupplyPeriodType}'
      }
    }
  ]
});