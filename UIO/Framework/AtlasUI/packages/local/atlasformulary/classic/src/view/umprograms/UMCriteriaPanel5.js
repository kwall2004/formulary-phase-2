Ext.define('Atlas.atlasformulary.view.umprograms.UMCriteriaPanel5', {
  extend: 'Ext.form.Panel',
  xtype: 'umprograms-umcriteriapanel5',
  margin: '20 0 0 20',

  items: [
    {
      xtype: 'container',
      layout: 'column',
      items: [
        {
          xtype: 'container',
          columnWidth: 0.25,
          layout: 'vbox',
          flex: 1,
          defaults: {
            xtype: 'displayfield',
            padding: '10 0 10 0'
          },
          /* eslint-disable object-curly-newline */
          items: [
            { fieldLabel: 'Age Limit' },
            { fieldLabel: 'Male Age Limit' },
            { fieldLabel: 'Female Age Limit' }
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
            labelWidth: 20,
            padding: '10 0 10 0'
          },
          items: [
            {
              fieldLabel: 'Min',
              name: 'AgeLimitMin',
              bind: '{umcriteriarec.AgeLimitMin}'
            },
            {
              fieldLabel: 'Min',
              name: 'MaleAgeLimitMin',
              bind: '{umcriteriarec.MaleAgeLimitMin}'
            },
            {
              fieldLabel: 'Min',
              name: 'FemaleAgeLimitMin',
              bind: '{umcriteriarec.FemaleAgeLimitMin}'
            }
          ]
        },
        {
          xtype: 'container',
          columnWidth: 0.25,
          layout: 'anchor',
          flex: 1,
          margin: '0 0 0 0',
          defaults: {
            xtype: 'textfield',
            padding: '10 0 10 0',
            labelWidth: 20
          },
          items: [
            {
              fieldLabel: 'Max',
              name: 'AgeLimitMax',
              bind: '{umcriteriarec.AgeLimitMax}'
            },
            {
              fieldLabel: 'Max',
              name: 'MaleAgeLimitMax',
              bind: '{umcriteriarec.MaleAgeLimitMax}'
            },
            {
              fieldLabel: 'Max',
              name: 'FemaleAgeLimitMax',
              bind: '{umcriteriarec.FemaleAgeLimitMax}'
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
            padding: '11 0 11 0'
          },
          items: [
            {
              xtype: 'combo',
              editable: true,
              name: 'AgeLimitType',
              itemId: 'AgeLimitType',
              emptyText: 'Days / Years',
              displayField: 'name',
              valueField: 'value',
              width: 150,
              bind: {
                store: '{rxFillsList}',
                value: '{umcriteriarec.AgeLimitType}'
              }
            },
            {
              xtype: 'combo',
              editable: true,
              name: 'MaleAgeLimitType',
              itemId: 'MaleAgeLimitType',
              emptyText: 'Days / Years',
              displayField: 'name',
              valueField: 'value',
              width: 150,
              bind: {
                store: '{rxFillsList}',
                value: '{umcriteriarec.MaleAgeLimitType}'
              }
            },
            {
              xtype: 'combo',
              editable: true,
              name: 'FemaleAgeLimitType',
              itemId: 'FemaleAgeLimitType',
              emptyText: 'Days / Years',
              displayField: 'name',
              valueField: 'value',
              width: 150,
              bind: {
                store: '{rxFillsList}',
                value: '{umcriteriarec.FemaleAgeLimitType}'
              }
            }
          ]
        }
      ]
    },
    {
      xtype: 'container',
      margin: '0 0 0 0',
      layout: 'anchor',
      flex: 1,
      defaults: {
        padding: '10 0 10 0'
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
          width: 250,
          bind: {
            store: '{pdlList}',
            value: '{umcriteriarec.PDLStatus}'
          }
        }
      ]

    }
  ]
});