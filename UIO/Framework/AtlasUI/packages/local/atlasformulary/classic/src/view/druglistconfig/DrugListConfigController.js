Ext.define('Atlas.atlasformulary.view.druglistconfig.DrugListConfigController', {
  extend: 'Atlas.atlasformulary.view.drugsearch.DrugSearchController',
  alias: 'controller.druglistconfig',

  rulesPanel: null,

  listen: {
    controller: {
      '*': {
        drugListCreateEditOpened: 'onDrugListCreateEditOpened',
        drugListViewOpened: 'onDrugListViewOpened'
      }
    }
  },

  loadingMsg: 'Loading...',
  workingMsg: 'Processing...',

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

  init: function (view) {
    this.createAndAddRules();
    this.createAndAddDetailsHeader();

    // Button lives on drug search which this extends.
    this.getView().down('#criteriaClearButton').on('click', function () {
      this.clear(false);
    }, this);

    this.callParent(view);
  },

  onRuleSelected: function (params) {
    var vm = this.getViewModel(),
      criteriaStore = Ext.create('Atlas.atlasformulary.store.DrugListCriteria');

    if (params.drugListDetailSK) {
      vm.set('drugListDetailSK', params.drugListDetailSK);
      criteriaStore.getProxy().setExtraParam('druglistdetailsk', params.drugListDetailSK);
      this.getView().mask(this.loadingMsg);
      criteriaStore.load({
        scope: this,
        callback: function (records, operation, success) {
          if (success) {
            if (records.length === 0) {
              this.getView().unmask();
              return;
            }

            this.getView().suspendLayouts();
            this.onClearFiltersClick();
            records.forEach(function (record) {
              var criteria = Ext.create('Atlas.atlasformulary.model.Rule');
              criteria.set('property', record.get('ValQulfrCode'));
              criteria.set('operator', '=');
              criteria.set('value', record.get('CrtriaVal'));
              this.addToCriteriaStore(criteria);
            }, this);
            this.getView().resumeLayouts(true);
          } else {
            this.getView().unmask();
            Ext.toast('There was an error while attempting to retrieve criteria for selected rule.');
          }
        }
      });
    } else {
      vm.set('drugListDetailSK', null);
      this.onClearFiltersClick();
    }
  },

  onSaveRuleClick: function () {
    var vm = this.getViewModel();

    if (vm.get('drugListDetailSK')) {
      Ext.Msg.show({
        title: 'Confirm',
        message: 'Are you sure you want to update this rule?',
        buttons: Ext.Msg.YESNO,
        icon: Ext.Msg.QUESTION,
        scope: this,
        fn: function (btn) {
          if (btn === 'yes') {
            this.saveRule(vm.get('drugListDetailSK'));
          }
        }
      }, this);
    } else {
      this.saveRule();
    }
  },

  saveRule: function (drugListDetailSK) {
    var vm = this.getViewModel(),
      currentCriteria = vm.getStore('criteria'),
      ruleToSave = Ext.create('Atlas.atlasformulary.model.SaveDrugListDetail'),
      criteriaToSave = [],
      criteria = Ext.create('Atlas.atlasformulary.model.SaveDrugCriteria');

    this.getView().mask(this.workingMsg);

    ruleToSave.set('DrugListDtlSK', drugListDetailSK);
    ruleToSave.set('DrugListSk', vm.get('drugListSK'));
    ruleToSave.set('UserId', Atlas.user.un);
    ruleToSave.set('CriteriaName', '');

    currentCriteria.each(function (ruleCriteria) {
      if ((ruleCriteria.get('property') === 'ETC_ID' && ruleCriteria.get('value') === 0) || (ruleCriteria.get('property') === 'GPI' && ruleCriteria.get('value') === 0) || ruleCriteria.get('operator') === 'include') {
        return;
      }

      criteria.set('ValQulfrCode', ruleCriteria.get('property'));
      criteria.set('OperTypeCode', ruleCriteria.get('operator'));
      criteria.set('CrtriaVal', ruleCriteria.get('value'));

      criteriaToSave.push(criteria.getData());
    });

    ruleToSave.set('tblRules', criteriaToSave);
    ruleToSave.save({
      scope: this,
      success: function () {
        this.rulesPanel.getController().rulesGrid.getStore('rules').reload({
          scope: this,
          callback: function (records, operation, success) {
            this.getView().unmask();
            if (success) {
              Ext.toast('The rule was saved.', 'Success', 't');
            } else {
              this.getView().unmask();
              Ext.toast('There was an error while attempting to save the rule.');
            }
          }
        });
      },
      failure: function () {
        this.getView().unmask();
        Ext.toast('There was an error while attempting to save the rule.');
      }
    });
  },

  onRuleDeleted: function () {
    this.getViewModel().set('drugListDetailSK', null);
    this.onClearFiltersClick();
  },

  clear: function (callClearFilters) {
    this.rulesPanel.getController().clear();
    this.getViewModel().set('drugListDetailSK', null);

    if (callClearFilters) {
      this.onClearFiltersClick();
    }
  },

  createAndAddRules: function () {
    this.rulesPanel = Ext.create({
      xtype: 'druglistconfig-rulespanel',

      viewModel: {
        data: {
          drugListSK: this.getViewModel().get('drugListSK'),
          mode: this.getViewModel().get('mode')
        }
      }
    });

    var eastRegion = this.lookupReference('drugsearch-eastregion');
    eastRegion.add(this.rulesPanel);
    eastRegion.show();

    this.rulesPanel.on('ruleSelected', this.onRuleSelected, this);
    this.rulesPanel.on('saveRuleClick', this.onSaveRuleClick, this);
    this.rulesPanel.on('ruleDeleted', this.onRuleDeleted, this);
    this.rulesPanel.on('closeConfig', function () {
      this.getView().destroy();
    }, this);
  },

  createAndAddDetailsHeader: function () {
    var headerStore = Atlas.atlasformulary.model.DrugList.load(this.getViewModel().get('drugListSK')),
      headerRegion = this.lookupReference('drugsearch-northregion'),
      drugListDetailsHeader = Ext.create({
        xtype: 'druglistconfig-header',
        viewModel: {
          data: {
            drugListHeader: headerStore
          }
        },
        flex: 1
      });

    headerRegion.add(drugListDetailsHeader);
    headerRegion.show();
  }
});
