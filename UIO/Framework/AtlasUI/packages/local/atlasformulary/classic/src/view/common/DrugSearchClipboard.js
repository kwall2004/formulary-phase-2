Ext.define('Atlas.atlasformulary.view.common.DrugSearchClipboard', {
  extend: 'Ext.window.Window',
  xtype: 'clipboard',
  id: 'clipboard',
  requires: [
    'Atlas.atlasformulary.view.common.DrugSearchClipboardController'
  ],

  height: 400,
  width: 600,

  title: 'Clipboard',
  constrain: true,
  scrollable: true,

  closeAction: 'destroy',

  controller: 'drugsearchclipboard',

  viewModel: {
    stores: {
      criteria: {
        type: 'rules'
      },
      criteriaEnglish: {
        model: 'Atlas.atlasformulary.model.TranslatedRule',
        proxy: {
          type: 'memory'
        }
      }
    }
  },

  items: [
    {
      xtype: 'grid',
      bind: '{criteriaEnglish}',
      flex: 1,
      columns: {
        items: [
          {
            text: 'Description',
            flex: 8,
            dataIndex: 'description'
          },
          {
            xtype: 'actioncolumn',
            flex: 2,
            items: [
              {
                iconCls: 'x-fa fa-minus',
                tooltip: 'Remove',
                handler: 'onRemoveClick'
              }
            ]
          }
        ]
      }
    }
  ],

  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'bottom',
      items: [
        {
          xtype: 'button',
          text: 'Include',
          listeners: {
            click: 'completeInclude'
          }
        },
        {
          xtype: 'button',
          text: 'Exclude',
          listeners: {
            click: 'completeExclude'
          }
        }
      ]
    }
  ]
});
