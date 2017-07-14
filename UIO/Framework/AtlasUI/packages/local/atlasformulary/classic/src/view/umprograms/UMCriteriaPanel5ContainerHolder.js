Ext.define('Atlas.atlasformulary.view.umprograms.UMCriteriaPanel5ContainerHolder', {
  extend: 'Ext.form.Panel',
  xtype: 'umprograms-umcriteriapanel5containerholder',
  margin: '20 0 0 20',

  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    xtype: 'umprograms-umcriteriapanel5container',
    padding: '10 0 10 0',
    flex: 1
  },
  items: [
    {
      xtype: 'container',
      layout: 'anchor',
      flex: 1,

      defaults: {
        padding: '10 0 10 0',
        width: 300,
        labelWidth: 120,
        labelAlign: 'right'
      },

      items: [
        {
          xtype: 'combobox',
          editable: true,
          emptyText: 'Male / Female',
          name: 'Gender',
          itemId: 'Gender',
          fieldLabel: 'Gender Restricted To',
          displayField: 'name',
          valueField: 'value',
          forceSelection: true,
          bind: {
            store: '{genderList}',
            value: '{umcriteriarec.Gender}'
          }
        }
      ]

    },
    {
      itemConfig: {
        tgtLabel: 'Age Limit',
        tgtName: 'AgeLimit',
        tgtLblAlign: 'left',
        tgtItem1: 'AgeLimitMin',
        tgtBind1: '{umcriteriarec.AgeLimitMin}',
        tgtItem2: 'AgeLimitMax',
        tgtBind2: '{umcriteriarec.AgeLimitMax}',
        tgtItem3: 'AgeLimitType',
        tgtBind3: '{umcriteriarec.AgeLimitType}'
      }
    },
    {
      itemConfig: {
        tgtLabel: 'Male Age Limit',
        tgtName: 'MaleAgeLimit',
        tgtLblAlign: 'left',
        tgtItem1: 'MaleAgeLimitMin',
        tgtBind1: '{umcriteriarec.MaleAgeLimitMin}',
        tgtItem2: 'MaleAgeLimitMax',
        tgtBind2: '{umcriteriarec.MaleAgeLimitMax}',
        tgtItem3: 'MaleAgeLimitType',
        tgtBind3: '{umcriteriarec.MaleAgeLimitType}'
      }
    },
    {
      itemConfig: {
        tgtLabel: 'Female Age Limit',
        tgtName: 'FemaleAgeLimit',
        tgtLblAlign: 'left',
        tgtItem1: 'FemaleAgeLimitMin',
        tgtBind1: '{umcriteriarec.FemaleAgeLimitMin}',
        tgtItem2: 'FemaleAgeLimitMax',
        tgtBind2: '{umcriteriarec.FemaleAgeLimitMax}',
        tgtItem3: 'FemaleAgeLimitType',
        tgtBind3: '{umcriteriarec.FemaleAgeLimitType}'
      }
    },
    {
      xtype: 'container',
      layout: 'anchor',
      flex: 1,

      defaults: {
        padding: '10 0 10 0',
        width: 300,
        labelWidth: 120,
        labelAlign: 'right'
      },

      items: [
        {
          xtype: 'combobox',
          editable: true,
          emptyText: '',
          name: 'PDLStatus',
          itemId: 'PDLStatus',
          fieldLabel: 'PDL Status',
          displayField: 'name',
          valueField: 'value',
          bind: {
            store: '{pdlList}',
            value: '{umcriteriarec.PDLStatus}'
          }
        }
      ]
    }
  ]
});