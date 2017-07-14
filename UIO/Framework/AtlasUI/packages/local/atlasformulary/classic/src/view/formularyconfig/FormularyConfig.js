Ext.define('Atlas.atlasformulary.view.formularyconfig.FormularyConfig', {
  extend: 'Atlas.atlasformulary.view.drugsearch.DrugSearch',
  controller: 'formularyconfig',
  title: 'Formulary Configuration',
  viewModel: 'formularyconfig',

  enableHierarchyToggle: false,

  initComponent: function () {
    var vm = this.getViewModel();
    vm.set('formularySK', this.formularySK);
    vm.set('drugListSK', this.drugListSK);
    vm.set('mode', this.mode);
    vm.set('titleMode', this.titleMode);
    vm.set('formularyStatus', this.formularyStatus);
    vm.set('drugRefDbName', this.drugRefDbName);

    if (!this.drugRefDbName || this.drugRefDbName === 'FDB') {
      vm.set('dataSource', 'fdb');
    } else if (this.drugRefDbName === 'Medispan') {
      vm.set('dataSource', 'medispan');
    }

    this.callParent();
  }
});
