Ext.define('Atlas.atlasformulary.view.newdrugstomarket.NewDrugsSearchCombo', {
  extend: 'Ext.form.field.ComboBox',
  xtype: 'newdrugssearchcombo',

  controller: {
    init: function () {
      this.getView().configure();
    }
  },

  viewModel: {
    stores: {
      fdb: {
        type: 'fdbsmartnewdrugstomarket'
      },
      medispan: {
        type: 'medispansmartnewdrugstomarket'
      }
    }
  },

  configure: function () {
    var vm = this.getViewModel();

    if (!vm.get('dataSource') || vm.get('dataSource') === 'fdb') {
      this.setStore(vm.getStore('fdb'));
    } else if (vm.get('dataSource') === 'medispan') {
      this.setStore(vm.getStore('medispan'));
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
  emptyText: 'Smart Search...',

  listConfig: {
    userCls: 'common-key-value-boundlist',
    getInnerTpl: function () {
      return '<h5>Label Name: <span> {LabelName}</span></h5>' +
        '<h5>Generic Name:<span> {GenericName}</span></h5>' +
        '<h5>MedId:<span> {MedId}</span></h5>' +
        '<h5>NDC: <span>{NDC}</span></h5>';
    }
  },

  minChars: 0,
  queryParam: 'searchstring',
  queryMode: 'remote'
});
