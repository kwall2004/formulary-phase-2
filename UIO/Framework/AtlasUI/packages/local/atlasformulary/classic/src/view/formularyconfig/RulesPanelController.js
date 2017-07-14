Ext.define('Atlas.atlasformulary.view.formularyconfig.RulesPanelController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.formularyconfig-rulespanelcontroller',
  rulesGrid: null,
  tiers: null,

  listen: {
    controller: {
      '*': {
        umCriteriaSaved: 'onUmCriteriaSaved',
        deselectRule: 'deselectRule'
      }
    }
  },

  loadingMsg: 'Loading...',
  workingMsg: 'Processing...',

  init: function () {
    this.getViewModel().set('whichpage', 'FormularyConfig');
    var formularySK = this.getViewModel().get('formularySK'),
      formularyStatus = this.getViewModel().get('formularyStatus'),
      mode = this.getViewModel().get('mode');

    // If it's null then this is a new formulary. Set the status to draft.
    if (!formularyStatus) {
      formularyStatus = 'Draft';
    }

    this.getView().down('#coveredCheckbox').setDisabled(mode === 'view');
    this.getView().down('#saveRuleButton').setDisabled(mode === 'view');
    this.getView().down('#reviewButton').setDisabled(formularyStatus !== 'Draft' && formularyStatus !== 'Rejected');

    this.getView().down('#backButton').setHidden(mode === 'review');
    this.getView().down('#saveRuleButton').setHidden(mode === 'review' || mode === 'read');
    this.getView().down('#deleteRuleButton').setHidden(mode === 'review');
    this.getView().down('#reviewButton').setHidden(mode === 'review');
    this.getView().down('#approveButton').setHidden(mode !== 'review');
    this.getView().down('#rejectButton').setHidden(mode !== 'review');

    this.rulesGrid = Ext.create('Atlas.atlasformulary.view.formularyconfig.RulesGrid', {
      itemId: 'formularyconfig-rulesgrid',

      viewModel: {
        data: {
          formularySK: formularySK,
          mode: mode
        }
      }
    });

    this.tiers = Ext.create('Atlas.atlasformulary.view.formularyconfig.TiersGrid', {
      viewModel: {
        data: {
          formularySK: formularySK
        }
      }
    });

    this.rulesGrid.on('cellclick', this.onRuleCellClick, this);
    this.rulesGrid.on('itemcontextmenu', this.onRuleRightClick, this);
    this.tiers.on('cellclick', this.onTierSelected, this);

    this.showTiers();
  },

  onTiersLoaded: function (store) {
    var tierToSelect = store.findRecord('FrmlryTierNbr', 99, 0, false, false, true); // true for exactMatch
    this.getView().down('#tierCombo').select(tierToSelect);
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
      vm = this.getViewModel();

    if (selected && vm.get('mode') !== 'view') {
      this.updateButtons();
    } else {
      this.clear();
    }

    this.getView().fireEvent('ruleSelected', {
      drugCategorySK: !selected ? null : record.get('drugCategorySK'),
      name: !selected ? null : record.get('name')
    });
  },

  updateButtons: function () {
    var vm = this.getViewModel();

    if (vm.get('mode') !== 'view') {
      vm.set('saveRuleButtonText', 'Update Rule');
      this.getView().down('#deleteRuleButton').setDisabled(false);
    }
  },

  onRuleRightClick: function (table, record, item, index, e) {
    e.stopEvent();
    this.getView().fireEvent('deselectRule');
  },

  onTierSelected: function (table, td, cellIndex, record) {
    this.getView().up().up().mask(this.loadingMsg);
    this.getView().fireEvent('tierSelected', {
      tierNumber: record.get('FrmlryTierNbr')
    });
  },

  onDeleteRuleClick: function () {
    var rule = Ext.first('[itemId=formularyconfig-rulesgrid]').getSelection()[0],
      rulesStore = this.rulesGrid.getStore();

    if (rule) {
      Ext.Msg.show({
        title: 'Delete Rule: Confirmation',
        message: 'Are you sure you want to delete <strong>' + rule.get('name') + ' ?</strong>',
        buttons: Ext.Msg.YESNOCANCEL,
        icon: Ext.Msg.QUESTION,
        scope: this,
        fn: function (btn) {
          if (btn === 'yes') {
            this.getView().up().up().mask(this.workingMsg);
            Atlas.atlasformulary.data.proxy.FormularyAjax.request({
              scope: this,
              method: 'DELETE',
              url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/drugcategory?drugcategorysk=' + rule.get('drugCategorySK'),
              headers: {
                sessionid: Atlas.sessionId,
                username: Atlas.user.un
              },
              success: function () {
                rulesStore.getProxy().setExtraParam('isnewrequest', true);
                rulesStore.reload({
                  scope: this,
                  callback: function (records, operation, success) {
                    this.getView().up().up().unmask();
                    if (success) {
                      Ext.toast('The rule was deleted.', 'Success', 't');
                    }
                  }
                });
                this.clear();
                this.getView().fireEvent('ruleDeleted');
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
  },

  onSaveRuleClick: function () {
    this.getView().fireEvent('saveRuleClick');
  },

  onBackPressed: function () {
    var vm = this.getViewModel(),
      menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/manageformulary.ManageFormulary');

    if (vm.get('mode') === 'view') {
      this.fireEvent('openView', 'merlin', 'atlasformulary', 'formularyheader_Read', {
        menuId: menuId,
        PId: menuId,
        formularySK: vm.get('formularySK'),
        mode: 'view',
        titleMode: 'Viewing'
      });
    } else {
      this.fireEvent('openView', 'merlin', 'atlasformulary', 'formularyheader_CreateEdit', {
        menuId: menuId,
        PId: menuId,
        formularySK: vm.get('formularySK'),
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

  showTiers: function () {
    var placeholder = this.getView().down('#contentPlaceHolder');

    placeholder.items.clear();
    placeholder.items.add(this.tiers);
    placeholder.updateLayout();
  },

  onResize: function () {
    var placeholder = this.getView().down('#contentPlaceHolder');

    placeholder.updateLayout();
  },

  showUMCriteria: function () {
    this.getView().fireEvent('showUMCriteria');
  },

  onUmCriteriaSaved: function () {
    this.clear();
  },

  onSendForReviewClick: function () {
    var me = this,
      sk = this.getViewModel().get('formularySK'),
      userId = Atlas.user.un,
      menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/manageformulary.ManageFormulary');

    Atlas.atlasformulary.data.proxy.FormularyAjax.request({
      url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/formularyapprove',
      method: 'POST',

      params: {
        FrmlrySK: sk,
        AprvlTypePrity: 0,
        AprvlNotes: 'Sent for review.',
        UserId: userId
      },
      headers: {
        sessionid: Atlas.sessionId,
        username: Atlas.user.un
      },

      success: function () {
        Ext.toast('Formulary has been sent for review!', 'Success');
        me.getView().up().up().destroy();

        me.fireEvent('openView', 'merlin', 'atlasformulary', 'manageformulary_ManageFormulary', {
          menuId: menuId,
          PId: menuId
        });
      }
    });
  },

  onCombineClick: function () {
    var sk = this.getViewModel().get('formularySK');

    Atlas.atlasformulary.data.proxy.FormularyAjax.request({
      scope: this,
      method: 'POST',
      url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/formularyrulecombine?formularysk=' + sk,
      headers: {
        sessionid: Atlas.sessionId,
        username: Atlas.user.un
      },
      success: function () {
        this.rulesGrid.getViewModel().getStore('rules').reload();
      }
    });
  },

  onConvertMedIdClick: function () {
    var sk = this.getViewModel().get('formularySK');

    Atlas.atlasformulary.data.proxy.FormularyAjax.request({
      scope: this,
      method: 'POST',
      url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/formularyrulemedid?formularysk=' + sk,
      headers: {
        sessionid: Atlas.sessionId,
        username: Atlas.user.un
      },
      success: function () {
        this.rulesGrid.getViewModel().getStore('rules').reload();
      }
    });
  },

  onApproveClick: function () {
    this.approveOrReject(true);
  },

  onRejectClick: function () {
    this.approveOrReject(false);
  },

  deselectRule: function () {
    this.rulesGrid.getSelectionModel().deselectAll();
  },

  clear: function () {
    var vm = this.getViewModel();
    vm.set('saveRuleButtonText', 'Create Rule');
    this.getView().down('#deleteRuleButton').setDisabled(true);
    this.rulesGrid.getSelectionModel().deselectAll();
    this.tiers.getSelectionModel().deselectAll();
  },

  approveOrReject: function (approve) {
    var me = this,
      vm = this.getViewModel(),
      sk = vm.getData().formularySK,
      reviewPriority = null,
      userId = Atlas.user.un,
      reviewPriorityStore = vm.getStore('reviewpriority'),
      method = '',
      message = '',
      menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/dashboard.Dashboard');

    reviewPriorityStore.getProxy().setExtraParam('formularysk', sk);
    reviewPriorityStore.load({
      scope: this,
      callback: function (records, operation, success) {
        reviewPriority = records[0].getData().AprvlTypePrity;

        if (approve) {
          method = '/formularyapprove';

          if (reviewPriority === 3) {
            message = 'Formulary has been approved.';
          } else {
            message = 'Formulary has been sent for approval.';
          }
        } else {
          method = '/formularyreject';
          message = 'Formulary has been rejected.';
        }

        if (success) {
          Atlas.atlasformulary.data.proxy.FormularyAjax.request({
            url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + method,

            params: {
              FrmlrySK: sk,
              AprvlTypePrity: reviewPriority,
              AprvlNotes: '',
              UserId: userId
            },

            success: function () {
              Ext.MessageBox.show({
                title: 'Send Confirmation',
                msg: message,
                buttons: Ext.MessageBox.OK,
                scope: this,
                icon: Ext.MessageBox.INFO
              });

              me.fireEvent('openView', 'merlin', 'atlasformulary', 'dashboard_Dashboard', {
                menuId: menuId,
                PId: menuId,
                formularySK: vm.get('formularySK'),
                mode: 'view',
                titleMode: 'Viewing'
              });

              me.fireEvent('formularyApprovedOrRejected');
            }
          });
        }
      }
    });
  }
});
