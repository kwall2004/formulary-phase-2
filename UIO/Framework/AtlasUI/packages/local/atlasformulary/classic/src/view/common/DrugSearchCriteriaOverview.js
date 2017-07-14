Ext.define('Atlas.atlasformulary.view.common.DrugSearchCriteriaOverview', {
  extend: 'Ext.window.Window',
  xtype: 'criteriaoverview',
  itemId: 'criteriaoverview',

  requires: [
    'Atlas.atlasformulary.view.common.DrugSearchCriteriaOverviewController'
  ],

  height: 400,
  width: 600,

  title: 'Criteria',
  constrain: true,
  scrollable: true,

  closeAction: 'destroy',

  controller: 'drugsearchcriteriaoverview',

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

  onCriteriaChanged: function () {
    var controller = this.getController();

    if (controller) {
      controller.onCriteriaChanged();
    }
  },

  removeAll: function () {
    var vm = this.getViewModel();

    if (vm) {
      vm.getStore('criteriaEnglish').removeAll();
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
            flex: 8,
            text: 'Description',
            dataIndex: 'description',
            cellWrap: true
          },
          {
            xtype: 'actioncolumn',
            flex: 2,
            items: [
              {
                iconCls: 'x-fa fa-minus',
                tooltip: 'Remove',
                handler: 'onRemoveClick',

                isDisabled: function (view, rowIndex, colIndex, item, record) {
                  return record.get('property') === 'DrugCatgSK';
                }
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
          text: 'Ok',
          listeners: {
            click: 'onOkClicked'
          }
        }
      ]
    }
  ]
});
