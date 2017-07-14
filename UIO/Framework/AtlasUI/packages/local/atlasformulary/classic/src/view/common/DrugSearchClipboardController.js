Ext.define('Atlas.atlasformulary.view.common.DrugSearchClipboardController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.drugsearchclipboard',
  mixins: ['Ext.mixin.Observable'],

  constructor: function (config) {
    this.mixins.observable.constructor.call(this, config);
  },

  addCriteria: function (criteria) {
    var criteriaStore = this.getViewModel().getStore('criteria'),
      criteriaEnglishStore = this.getViewModel().getStore('criteriaEnglish');

    criteriaStore.add(criteria);
    criteriaEnglishStore.add(
      Atlas.atlasformulary.service.RuleUtils.translateToPlainEnglish(criteria)
    );
  },

  completeInclude: function () {
    this.fireEvent('onClipboardComplete', this.getStore('criteria'));
  },

  completeExclude: function () {
    var criteriaStore = this.getStore('criteria');
    
    criteriaStore.each(function (criteria) {
      if (criteria.get('operator') === 'LIKE') {
        criteria.set('operator', 'NOT LIKE');
      } else {
        criteria.data.operator = '!=';
      }
    });
    this.fireEvent('onClipboardComplete', criteriaStore);
  },

  onRemoveClick: function (grid, rowIndex) {
    var vm = this.getViewModel();
    vm.getStore('criteria').removeAt(rowIndex);
    vm.getStore('criteriaEnglish').removeAt(rowIndex);
  }
});
