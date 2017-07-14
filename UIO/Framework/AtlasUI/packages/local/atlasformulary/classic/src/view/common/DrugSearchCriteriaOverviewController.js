Ext.define('Atlas.atlasformulary.view.common.DrugSearchCriteriaOverviewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.drugsearchcriteriaoverview',

  init: function () {
    this.onCriteriaChanged();
    this.getStore('criteria').on('datachanged', this.onCriteriaChanged, this);
  },

  onCriteriaChanged: function () {
    var criteriaEnglishStore = this.getStore('criteriaEnglish');

    criteriaEnglishStore.removeAll();
    this.getStore('criteria').each(function (criteria) {
      criteriaEnglishStore.add(
        Atlas.atlasformulary.service.RuleUtils.translateToPlainEnglish(criteria)
      );
    }, this);
  },

  onRemoveClick: function (grid, rowIndex, columnIndex, method, e, record) { // eslint-disable-line max-params
    var vm = this.getViewModel(),
      criteriaId = record.get('criteriaId'),
      criteriaStore = vm.getStore('criteria'),
      recordToDelete = null;

    vm.getStore('criteriaEnglish').removeAt(rowIndex);
    if (vm.getStore('criteriaEnglish').getCount() === 0) {
      if (vm.get('callbackController')) {
        vm.get('callbackController').onClearFiltersClick();
      }
    } else {
      recordToDelete = criteriaStore.findRecord('id', criteriaId);
      criteriaStore.remove(recordToDelete);
    }
  },

  onOkClicked: function () {
    this.getView().destroy();
  }
});
