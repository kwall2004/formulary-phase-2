Ext.define('Atlas.atlasformulary.view.druglistheader.DrugListHeaderBase', {
  extend: 'Ext.form.Panel',
  controller: 'druglistheader',
  viewModel: 'druglistheader',

  listeners: {
    afterlayout: function (view) {
      if (this.getViewModel().get('pendingCalls').length > 0) {
        view.mask('Loading...');
      }
    }
  },

  initComponent: function () {
    var vm = this.getViewModel(),
      pendingCalls = vm.get('pendingCalls');

    vm.set('mode', this.mode);
    vm.set('titleMode', this.titleMode);
    vm.set('userId', Atlas.user.un);

    if (this.drugListSK) {
      vm.set('drugListSK', this.drugListSK);

      pendingCalls.push('header');
      vm.set('drugListHeader', Atlas.atlasformulary.model.DrugList.load(vm.get('drugListSK'), {
        scope: this,
        success: function (record) {
          record.data.UserId = vm.get('userId');
        },
        failure: function (record, op) {
          Ext.Msg.alert({
            title: 'Error',
            message: 'Could not load the correct drug list. Here\'s some debug info.\n' + record + '\n' + op
          });
        },
        callback: function () {
          pendingCalls.splice(pendingCalls.indexOf('header'), 1);
          if (pendingCalls.length === 0) {
            this.unmask();
          }
        }
      }));
    } else {
      vm.set('drugListHeader', Ext.create('Atlas.atlasformulary.model.DrugList', {
        DrugRefDbSK: 1,
        DrugRefDbName: 'FDB',
        UserId: vm.get('userId'),
        DrugPostObsltAlwdDays: 365
      }));
    }

    this.callParent(arguments);
  }
});
