Ext.define('Atlas.atlasformulary.view.formularyheader.FormularyHeaderController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.formularyheadercontroller',
  itemId: 'formularyheadercontroller',
  requires: ['Ext.window.Toast'],

  listen: {
    controller: {
      '*': {
        formularyCreateEditOpened: 'onFormularyCreateEditOpened',
        formularyViewOpened: 'onFormularyViewOpened'
      }
    }
  },

  loadingMsg: 'Loading...',
  workingMsg: 'Processing...',

  onFormularyCreateEditOpened: function () {
    if (this.getViewModel().get('mode') !== 'view') {
      this.getView().destroy();
    }
  },

  onFormularyViewOpened: function () {
    if (this.getViewModel().get('mode') === 'view') {
      this.getView().destroy();
    }
  },

  init: function () {
    var vm = this.getViewModel(),
      tierStore = vm.getStore('tiers'),
      mode = vm.get('mode'),
      dataCombo = this.lookup('datasource'),
      therapyCombo = this.lookup('therapyclass');

    if (mode === 'review') {
      Atlas.atlasformulary.data.proxy.FormularyAjax.request({
        headers: {
          sessionid: Atlas.sessionId,
          username: Atlas.user.un
        },
        url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/formularyreview?formularysk=' + vm.get('formularySK')
      }); // Fire and forget. If there's an error we'll set it in the logs.
    }

    if (mode === 'create') { // add the non-formulary tier if creating a brand new formulary.
      var nonFormulary = Ext.create(Atlas.atlasformulary.model.FormularyTierModel, {
        FrmlryTierNbr: 99,
        FrmlryTierName: 'Non-Formulary',
        FrmlryTierDesc: 'Non-Formulary'
      });
      tierStore.add(nonFormulary);
    }

    this.listen({
      store: {
        '#formularytierstore': {
          load: 'onFormularyTiersLoaded'
        }
      }
    });

    if (mode === 'edit') {
      dataCombo.setDisabled(true);
      therapyCombo.setDisabled(true);
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
    if (store.type === 'summaryconfig') {
      store.insert(0, new Atlas.atlasformulary.model.SummaryConfig({
        SumRptCfgSK: -1,
        SumRptCfgName: 'New',
        SumRptCfgDesc: ''
      })
      );
    }
  },

  onFormularyTiersLoaded: function (store) {
    if (store.count() === 0) {
      var formularySK = this.getViewModel().get('formularySK');

      var nonFormulary = Ext.create(Atlas.atlasformulary.model.FormularyTierModel, {
        FrmlryTierNbr: 99,
        FrmlryTierName: 'Non-Formulary',
        FrmlryTierDesc: 'Non-Formulary',
        FrmlrySK: formularySK
      });

      store.add(nonFormulary);
    }
  },

  onConfigureSummaryClick: function () {
    this.getView().down('formularyheader-summaryconfig').getController().loadData();
    this.getView().down('formularyheader-summaryconfig').show();
  },

  onClearClick: function () {
    var vm = this.getViewModel(),
      formularySK = vm.get('formularySK'),
      tierStore = vm.getStore('tiers'),
      drugListStore = vm.getStore('druglistdata');

    if (formularySK) {
      vm.set('formularyHeader',
        Atlas.atlasformulary.model.FormularyHeader.load(formularySK));
      tierStore.reload();
      drugListStore.reload();
    } else {
      vm.set('formularyHeader',
        Ext.create('Atlas.atlasformulary.model.FormularyHeader'));
      tierStore.removeAll();
      drugListStore.removeAll();

      this.onFormularyTiersLoaded(tierStore);
    }
  },

  onCancelClick: function () {
    this.getViewModel().set('savePressed', false);
    this.getView().destroy();
  },

  onSaveClick: function (btn) {
    this.getViewModel().set('savePressed', true);
    this.onNextClick(btn);
  },

  onDataSourceSelect: function (combo) {
    var vm = this.getViewModel(),
      drugTypeFunctionStore = this.lookup('drugTypeFunction').getStore();

    vm.set('DrugTypeFunction', null);
    drugTypeFunctionStore.getProxy().setExtraParams({
      drugrefdbsk: combo.value
    });
    drugTypeFunctionStore.reload();

    vm.get('formularyHeader').set('DrugRefDbName', combo.getDisplayValue());
  },

  onNextClick: function (button) {
    var vm = this.getViewModel(),
      form = this.getView().down('#formularyheader-form'),
      tierStore = vm.getStore('tiers'),
      tiers = tierStore.data.items,
      mode = vm.get('mode'),
      header = vm.get('formularyHeader'),
      sk = header.get('FrmlrySK'),
      status = header.get('StatDesc');

    switch (mode) {
      case 'review':
        if (parseInt(vm.get('formularyHeader').get('FrmlryVer'), 10) === 1) {
          this.navigateToConfig(sk, mode, status);
        } else {
          this.navigateToReview(sk, mode, status);
        }
        break;
      case 'view':
        this.navigateToConfig(sk, mode, status);
        break;
      case 'create':
      case 'edit':
        if (form.isValid() === false) {
          var invalidFields = Ext.Array.map(form.query('field{isValid()===false}'), function (item) {
            return '<li>' + item.fieldLabel + '</li>';
          });
          Ext.Msg.alert({
            title: 'Required Field(s) Missing',
            iconCls: 'x-fa fa-warning',
            message: 'Please complete all of the following required information as indicated by the asterisk (*)' + invalidFields.join(''),
            buttons: Ext.MessageBox.OK
          });
        } else if (header.dirty) {
          vm.set('headerDirty', true);
          if (!tiers.length) {
            Ext.toast('Please create at least one tier before saving.', 'Failure');
            break;
          }
          this.getView().mask(this.loadingMsg);
          header.save({
            scope: this,
            success: this.onSaveSuccess,
            failure: function () {
              this.getView().unmask();
            }
          });
        } else {
          this.saveTiers(sk, mode, status);
        }
        break;
      default:
        Ext.raise({
          msg: 'Invalid mode.',
          mode: mode
        });
    }
  },

  addTier: function (inputText) {
    var vm = this.getViewModel(),
      tierStore = vm.getStore('tiers');

    if (inputText) {
      var tierNumber = 1;
      var tierStoreCount = tierStore.count();

      if (tierStoreCount > 0) {
        var last = tierStore.last();

        if (last.get('FrmlryTierNbr') == 99 && tierStoreCount > 1) { // eslint-disable-line eqeqeq
          tierNumber = tierStore.getAt(tierStoreCount - 2).get('FrmlryTierNbr') + 1;
        } else if (last.get('FrmlryTierNbr') != 99) { // eslint-disable-line eqeqeq
          tierNumber = last.get('FrmlryTierNbr') + 1;
        }
      }

      var record = Ext.create(Atlas.atlasformulary.model.FormularyTierModel, {
        FrmlryTierNbr: tierNumber,
        FrmlryTierName: inputText,
        FrmlryTierDesc: inputText,
        FrmlrySK: vm.get('formularySK')
      });

      tierStore.add(record);
      vm.set('inputText', '');
    }
  },

  removeTier: function (rec) {
    var vm = this.getViewModel();
    var tierStore = vm.getStore('tiers');

    tierStore.remove(rec);
    vm.set('inputText', '');
  },

  addDrugList: function () {
    var vm = this.getViewModel(),
      drugListStore = vm.getStore('druglistdata'),
      drugListValue = this.getView().down('#drugListCombo').getSelection();

    if (drugListValue && !drugListStore.findRecord('DrugListSK', drugListValue.get('DrugListSK'))) {
      var record = Ext.create(Atlas.atlasformulary.model.FormularyDrugList, {
        FrmlryDrugListName: drugListValue.get('DrugListName'),
        DrugListSK: drugListValue.get('DrugListSK'),
        FrmlrySK: vm.get('formularySK')
      });
      drugListStore.add(record);
      vm.set('drugListInput', '');
    }
  },

  removeDrugList: function (rec) {
    var vm = this.getViewModel();
    var drugListStore = vm.getStore('druglistdata');

    drugListStore.remove(rec);
    vm.set('drugListInput', '');
  },

  onLineOfBusinessSelect: function () {
    var formularyHeader = this.getViewModel().get('formularyHeader');

    formularyHeader.PlanType = null;
    formularyHeader.SNPType = null;
  },

  onSaveSuccess: function (record, operation) {
    var vm = this.getViewModel(),
      mode = vm.get('mode');

    // let's move the logic for the final success message to further down the chain.
    // at this point, the view is still masked 'Working...'

    var response = Ext.decode(operation._response.responseText);
    var sk = parseInt(response.Rows[0], 10),
      status = vm.get('formularyHeader').StatDesc;

    vm.set('formularySK', sk);
    vm.get('formularyHeader').set('FrmlrySK', sk);

    if (!status) { // We've just created a formulary. It needs to be in draft.
      vm.get('formularyHeader').StatDesc = 'Draft';
    }

    this.saveTiers(sk, mode, status);
  },

  saveTiers: function (sk, mode, status) {
    var tierStore = this.getViewModel().getStore('tiers'),
      tiers = tierStore.data.items,
      tierProxy = tierStore.getProxy(),
      tierNumbersOut = '',
      tierNamesOut = '';

    if (tierStore.needsSync) {
      this.getViewModel().set('headerDirty', true);
      Ext.Array.each(tiers, function (tier, index) {
        tierNumbersOut += tier.get('FrmlryTierNbr');
        tierNamesOut += tier.get('FrmlryTierName');

        if (index < (tiers.length - 1)) {
          tierNumbersOut += ',';
          tierNamesOut += ',';
        }
      });

      tierProxy.setExtraParams({
        formularysk: sk,
        tiernumber_list: tierNumbersOut, // eslint-disable-line camelcase
        tiername_list: tierNamesOut, // eslint-disable-line camelcase
        userid: Atlas.user.un
      });
      tierStore.save({
        scope: this,
        success: function () {
          delete tierProxy.getExtraParams().formularysk;
          delete tierProxy.getExtraParams().tiername_list;
          delete tierProxy.getExtraParams().userid;

          this.saveDrugLists(sk, mode, status);
        },
        failure: function () {
          delete tierProxy.getExtraParams().formularysk;
          delete tierProxy.getExtraParams().tiername_list;
          delete tierProxy.getExtraParams().userid;

          this.getView().unmask();
        }
      });
    } else {
      this.saveDrugLists(sk, mode, status);
    }
  },

  saveDrugLists: function (sk, mode, status) {
    var drugListsStore = this.getViewModel().getStore('druglistdata'),
      drugListsOut = '';

    if (drugListsStore.needsSync) {
      this.getViewModel().set('headerDirty', true);
      drugListsStore.each(function (druglist, index, count) {
        drugListsOut += druglist.get('FrmlryDrugListName');

        if (index < (count - 1)) {
          drugListsOut += ',';
        }
      });

      var payload = {
        formularySK: sk,
        drugListNames: drugListsOut,
        userId: Atlas.user.un
      };

      Atlas.atlasformulary.data.proxy.FormularyAjax.request({
        scope: this,
        url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/formularydruglist',
        method: 'POST',
        params: payload,
        headers: {
          sessionid: Atlas.sessionId,
          username: Atlas.user.un
        },
        success: function () {
          this.navigateToConfig(sk, mode, status);
        },
        callback: function () {
          this.getView().unmask();
        }
      });
    } else {
      this.getView().unmask();
      this.navigateToConfig(sk, mode, status);
    }
  },

  navigateToConfig: function (sk, mode, status) {
    var vm = this.getViewModel(),
      menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/manageformulary.ManageFormulary');

    if (vm.get('savePressed')) {
      if (vm.get('headerDirty') === true) {
        Ext.Msg.show({
          title: 'Save Success',
          message: 'Formulary Header saved successfully.',
          buttons: Ext.Msg.OK,
          icon: Ext.Msg.INFO
        });
      } else {
        Ext.Msg.show({
          title: 'Formulary Not Saved',
          message: 'Nothing to save.',
          buttons: Ext.Msg.OK,
          icon: Ext.Msg.WARNING
        });
      }
      vm.set('savePressed', false);
      vm.set('headerDirty', false);
    } else {
      this.fireEvent('openView', 'merlin', 'atlasformulary', 'formularyconfig_FormularyConfig', {
        menuId: menuId,
        PId: menuId,
        formularySK: sk,
        mode: mode,
        formularyStatus: status,
        drugRefDbName: vm.get('formularyHeader').get('DrugRefDbName'),
        atlasId: 'formulary-config-' + (Math.floor(Math.random() * 1001) + 1)
      });

      vm.set('savePressed', false);
      vm.set('headerDirty', false);
      this.getView().destroy();
    }
  },

  navigateToReview: function (sk, mode, status) {
    var menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/manageformulary.ManageFormulary');

    this.fireEvent('openView', 'merlin', 'atlasformulary', 'formularyreview_FormularyReview', {
      menuId: menuId,
      PId: menuId,
      formularySK: sk,
      mode: mode,
      formularyStatus: status
    });

    this.getView().destroy();
  }
});
