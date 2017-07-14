Ext.define('Atlas.atlasformulary.view.druglistconfig.DrugListConfig', {
  extend: 'Atlas.atlasformulary.view.drugsearch.DrugSearch',
  controller: 'druglistconfig',
  title: 'Drug List Configuration',
  viewModel: 'druglistconfig',

  initComponent: function () {
    var vm = this.getViewModel();
    vm.set('drugListSK', this.drugListSK);
    vm.set('mode', this.mode);
    vm.set('titleMode', this.titleMode);
    vm.set('drugRefDbName', this.drugRefDbName);
    vm.set('drugListImportHidden', false);
    vm.set('drugListActivateHidden', false);

    if (this.mode === 'view') {
      vm.set('drugListImportHidden', true);
      vm.set('drugListActivateHidden', true);
    }

    if (!this.drugRefDbName || this.drugRefDbName === 'FDB') {
      vm.set('dataSource', 'fdb');
    } else if (this.drugRefDbName === 'Medispan') {
      vm.set('dataSource', 'medispan');
    }

    this.callParent();
  }
});
