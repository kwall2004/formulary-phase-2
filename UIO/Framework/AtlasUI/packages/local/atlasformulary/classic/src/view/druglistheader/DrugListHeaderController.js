Ext.define('Atlas.atlasformulary.view.druglistheader.DrugListHeaderController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.druglistheader',

  listen: {
    controller: {
      '*': {
        drugListCreateEditOpened: 'onDrugListCreateEditOpened',
        drugListViewOpened: 'onDrugListViewOpened'
      }
    }
  },

  onDrugListCreateEditOpened: function () {
    if (this.getViewModel().get('mode') !== 'view') {
      this.getView().destroy();
    }
  },

  onDrugListViewOpened: function () {
    if (this.getViewModel().get('mode') === 'view') {
      this.getView().destroy();
    }
  },

  init: function () {
    var mode = this.getViewModel().getData().mode,
      combo = this.lookup('datasource');
    if (mode === 'edit') {
      combo.setDisabled(true);
    }
  },

  onStoreBeforeLoad: function (store) {
    this.getViewModel().get('pendingCalls').push(store.type);
  },

  onStoreLoad: function (store) {
    var pendingCalls = this.getViewModel().get('pendingCalls');
    pendingCalls.splice(pendingCalls.indexOf(store.type), 1);
    if (pendingCalls.length === 0) {
      this.getView().unmask();
    }
  },

  onDataSourceSelect: function (combo) {
    this.getViewModel().get('drugListHeader').set('DrugRefDbName', combo.getDisplayValue());
  },

  onCancelClick: function () {
    this.getView().destroy();
  },

  onSaveClick: function (button) {
    this.getViewModel().set('savePressed', true);
    this.onNextClick(button);
  },

  onNextClick: function () {
    var vm = this.getViewModel(),
      mode = vm.get('mode'),
      header = vm.get('drugListHeader');

    if (mode !== 'view') {
      if (header.dirty) {
        vm.set('headerDirty', true);
      }
      header.save({
        scope: this,
        success: this.onSaveSuccess
      });
    } else {
      this.navigateToConfig(vm.get('drugListSK'), vm.get('mode'));
    }
  },

  onSaveSuccess: function (record, operation) {
    var mode = this.getViewModel().data.mode;
    var sk = parseInt(Ext.decode(operation._response.responseText), 10);

    this.getViewModel().set('drugListSK', sk);
    this.getViewModel().get('drugListHeader').set('DrugListSK', sk);
    this.navigateToConfig(sk, mode);
  },

  navigateToConfig: function (sk) {
    var vm = this.getViewModel(),
      mode = vm.get('mode'),
      verb = mode === 'create' ? 'created' : 'updated',
      menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/druglists.DrugLists');

    if (vm.get('savePressed')) {
      if (vm.get('headerDirty') === true) {
        Ext.Msg.show({
          title: 'Save Success',
          message: 'Drug List saved successfully.',
          buttons: Ext.Msg.OK,
          icon: Ext.Msg.INFO
        });
      } else {
        Ext.Msg.show({
          title: 'Drug List Not Saved',
          message: 'Nothing to save.',
          buttons: Ext.Msg.OK,
          icon: Ext.Msg.WARNING
        });
      }
      vm.set('savePressed', false);
      vm.set('headerDirty', false);
    } else {
      if (vm.get('headerDirty') === true) {
        Ext.toast('Successfully ' + verb + ' drug list!');
      }
      this.fireEvent('openView', 'merlin', 'atlasformulary', 'druglistconfig_DrugListConfig', {
        menuId: menuId,
        PId: menuId,
        drugListSK: sk,
        mode: mode,
        drugRefDbName: vm.get('drugListHeader').data.DrugRefDbName,
        atlasId: 'druglist-config-' + (Math.floor(Math.random() * 1001) + 1)
      });

      vm.set('savePressed', false);
      vm.set('headerDirty', false);
      this.getView().destroy();
    }
  }
});
