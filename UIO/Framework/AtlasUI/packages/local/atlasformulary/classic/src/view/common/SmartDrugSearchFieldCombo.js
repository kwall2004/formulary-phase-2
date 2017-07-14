Ext.define('Atlas.atlasformulary.view.common.SmartDrugSearchFieldCombo', {
  extend: 'Ext.form.field.ComboBox',
  xtype: 'smartdrugsearchfieldcombo',

  controller: {
    init: function () {
      this.getView().configure();
    }
  },

  viewModel: {
    stores: {
      fdb: {
        type: 'fdbsmartdrugfield'
      },
      medispan: {
        type: 'medispansmartdrugfield'
      }
    }
  },

  configure: function () {
    var vm = this.getViewModel();

    if (!vm.get('dataSource') || vm.get('dataSource') === 'fdb') {
      this.setStore(vm.getStore('fdb'));
      this.setValue(0);
    } else if (vm.get('dataSource') === 'medispan') {
      this.setStore(vm.getStore('medispan'));
      this.setValue(0);
    } else {
      Ext.raise({
        msg: 'Invalid source.',
        source: vm.get('dataSource')
      });
    }

    this.getStore().load();
  },

  value: 0,
  queryMode: 'local',
  editable: false,
  selectOnFocus: false,
  displayField: 'SmartSearchFieldName',
  valueField: 'SmartSearchFieldSK',
  fieldLabel: 'In column',
  labelAlign: 'right',
  labelWidth: 0,
  forceSelection: true
});
