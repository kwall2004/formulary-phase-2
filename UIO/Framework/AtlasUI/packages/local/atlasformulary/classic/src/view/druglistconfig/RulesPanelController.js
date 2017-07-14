Ext.define('Atlas.atlasformulary.view.druglistconfig.RulesPanelController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.druglistconfig-rulespanelcontroller',

  rulesGrid: null,

  loadingMsg: 'Loading...',
  workingMsg: 'Processing...',

  init: function () {
    var drugListSK = this.getViewModel().get('drugListSK');
    var mode = this.getViewModel().get('mode');
    var submitButton = Ext.first('button[itemId=saveRuleButton]');
    var deleteButton = Ext.first('button[itemId=deleteRuleButton]');

    if (mode === 'view') {
      submitButton.disable();
      deleteButton.disable();
    } 

    this.rulesGrid = Ext.create('Atlas.atlasformulary.view.druglistconfig.RulesGrid', {
      itemId: 'druglistconfig-rulesgrid',

      viewModel: {
        data: {
          drugListSK: drugListSK
        }
      }
    });

    this.rulesGrid.on('cellclick', this.onRuleCellClick, this);
    this.getView().down('#saveRuleButton').setHidden(this.getViewModel().get('mode') === 'read');

    this.showRules();
  },

  clear: function () {
    var vm = this.getViewModel();
    vm.set('saveRuleButtonText', 'Create Rule');
    if (vm.get('mode') === 'view') {
      var deleteButton = Ext.first('button[itemId=deleteRuleButton]');
      deleteButton.disable();
    }
    
    this.rulesGrid.getSelectionModel().deselectAll();
  },

  onViewButtonsToggled: function (container, button) {
    if (button.text === 'Rules') {
      this.showRules();
    } else {
      this.showTiers();
    }
  },

  onRuleCellClick: function (table, td, cellIndex, record) {
    var selected = table.getSelection().length > 0,
      vm = this.getViewModel(),
      mode = vm.get('mode'),
      submitButton = Ext.first('button[itemId=saveRuleButton]'),
      deleteButton = Ext.first('button[itemId=deleteRuleButton]');

    if (selected) {
      if(mode !== 'view') {
        vm.set('saveRuleButtonText', 'Update Rule');
        submitButton.enable();
        deleteButton.enable();
      }      
    } else {
      vm.set('saveRuleButtonText', 'Create Rule');
    }

    this.getView().fireEvent('ruleSelected', {
      drugListDetailSK: !selected ? null : record.get('DrugListDtlSK')
    });
  },

  onSaveRuleClick: function () {
    this.getView().fireEvent('saveRuleClick');
  },

  onBackPressed: function () {
    var vm = this.getViewModel(),
      mode = vm.get('mode'),
      menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/druglists.DrugLists');

    if (mode === 'view') {
      this.fireEvent('openView', 'merlin', 'atlasformulary', 'druglistheader_Read', {
        menuId: menuId,
        PId: menuId,
        drugListSK: vm.get('drugListSK'),
        mode: 'view',
        titleMode: 'Viewing'
      });
    } else {
      this.fireEvent('openView', 'merlin', 'atlasformulary', 'druglistheader_CreateEdit', {
        menuId: menuId,
        PId: menuId,
        drugListSK: vm.get('drugListSK'),
        mode: vm.get('mode'),
        titleMode: 'Editing'
      });
    }

    this.getView().fireEvent('closeConfig');
  },

  showRules: function () {
    var placeholder = this.getView().down('#contentPlaceHolder');

    placeholder.items.clear();
    placeholder.items.add(this.rulesGrid);
    placeholder.updateLayout();
  },

  onDeleteRuleClick: function () {
    var rule = Ext.first('[itemId=druglistconfig-rulesgrid]').getSelection()[0],
      rulesStore = this.rulesGrid.getStore();

    if (rule) {
      Ext.Msg.show({
        title: 'Delete Rule: Confirmation',
        message: 'Are you sure you want to delete <strong>' + rule.get('DrugListDtlName') + ' ?</strong>',
        buttons: Ext.Msg.YESNOCANCEL,
        icon: Ext.Msg.QUESTION,
        scope: this,
        fn: function (btn) {
          if (btn === 'yes') {
            this.getView().up().up().mask(this.workingMsg);
            Atlas.atlasformulary.data.proxy.FormularyAjax.request({
              scope: this,
              method: 'DELETE',
              headers: {
                sessionid: Atlas.sessionId,
                username: Atlas.user.un
              },
              url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/druglistcriteriagroup?druglistdetailsk=' + rule.get('DrugListDtlSK'),
              success: function () {
                rulesStore.reload({
                  scope: this,
                  callback: function (records, operation, success) {
                    this.getView().up().up().unmask();
                    if (success) {
                      Ext.toast('The rule was deleted.', 'Success', 't');
                    }
                  }
                });
                this.getView().fireEvent('ruleDeleted');
                this.getViewModel().set('saveRuleButtonText', 'Create Rule');
              },
              failure: function () {
                this.getView().up().up().unmask();
                Ext.toast('There was an error while attempting to delete the rule.');
              }
            });
          }
        }
      });
    }
  }
});
