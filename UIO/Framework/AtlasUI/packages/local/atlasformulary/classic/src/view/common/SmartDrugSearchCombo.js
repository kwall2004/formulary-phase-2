Ext.define('Atlas.atlasformulary.view.common.SmartDrugSearchCombo', {
  extend: 'Ext.form.field.ComboBox',
  xtype: 'smartdrugsearchcombo',

  controller: {
    init: function () {
      this.getView().configure();
    }
  },

  viewModel: {
    stores: {
      fdb: {
        type: 'fdbsmartdrug'
      },
      fdbDrugList: {
        type: 'fdbsmartdrugdruglist'
      },
      fdbFormulary: {
        type: 'fdbsmartdrugformulary'
      },
      medispan: {
        type: 'medispansmartdrug'
      },
      medispanDrugList: {
        type: 'medispansmartdrugdruglist'
      },
      medispanFormulary: {
        type: 'medispansmartdrugformulary'
      }
    }
  },

  configure: function () {
    var vm = this.getViewModel();

    if (!vm.get('dataSource') || vm.get('dataSource') === 'fdb') {
      if (vm.get('formularySK')) {
        vm.getStore('fdbFormulary').getProxy().setExtraParam('frmlrysk', vm.get('formularySK'));
        this.setStore(vm.getStore('fdbFormulary'));
      } else if (vm.get('drugListSK')) {
        vm.getStore('fdbDrugList').getProxy().setExtraParam('druglistsk', vm.get('drugListSK'));
        this.setStore(vm.getStore('fdbDrugList'));
      } else {
        this.setStore(vm.getStore('fdb'));
      }
    } else if (vm.get('dataSource') === 'medispan') {
      if (vm.get('formularySK')) {
        vm.getStore('medispanFormulary').getProxy().setExtraParam('frmlrysk', vm.get('formularySK'));
        this.setStore(vm.getStore('medispanFormulary'));
      } else if (vm.get('drugListSK')) {
        vm.getStore('medispanDrugList').getProxy().setExtraParam('druglistsk', vm.get('drugListSK'));
        this.setStore(vm.getStore('medispanDrugList'));
      } else {
        this.setStore(vm.getStore('medispan'));
      }
    } else {
      Ext.raise({
        msg: 'Invalid source.',
        source: vm.get('dataSource')
      });
    }
  },

  typeAhead: false,
  hideLabel: true,
  hideTrigger: true,
  emptyText: 'Smart search...',

  listConfig: {
    // Custom rendering template for each item
    getInnerTpl: function () {
      return '<ul style="list-style:none; padding: 10px; line-height: 15px;">' +
        '<li><strong>Matched On: {[Atlas.atlasformulary.service.RuleUtils.translateToPlainEnglish(values.Rule).data.description]}</strong></li>' +
        '<li>Label Name: <span style="font-weight:200">{LabelName}</span></li>' +
        '<li>Brand Name: <span style="font-weight:200">{BrandName}</span></li>' +
        '<li>Generic Name: <span style="font-weight:200">{GenericName}</span></li>' +
        '<li>NDC: <span style="font-weight:200">{NDC}</span></li>' +
        '<li>GCN: <span style="font-weight:200">{GCN}</span></li>' +
        '<li>HICL: <span style="font-weight:200">{HICL}</span></li>' +
        '<li>MedId: <span style="font-weight:200">{MedId}</span></li>' +
        '</ul>';
    }
  },

  minChars: 0,
  queryParam: 'queryString',
  queryMode: 'remote'
});
