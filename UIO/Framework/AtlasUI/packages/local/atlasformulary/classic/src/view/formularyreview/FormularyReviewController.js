Ext.define('Atlas.atlasformulary.view.formularyreview.FormularyReviewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.formularyreview',

  listen: {
    controller: {
      '*': {
        formularyReviewUpdateComplete: 'onFormularyReviewUpdateComplete'
      }
    }
  },

  init: function () {
    //If we're in review mode, let's init the review now to give it a head start.
    var vm = this.getViewModel(),
      formularyStatus = vm.getData().formularyStatus,
      reviewStore = vm.getStore('reviewstore'),
      reviewRulesStore = vm.getStore('reviewrules'),
      reviewETCStore = vm.getStore('reviewetc'),
      reviewGPIStore = vm.getStore('reviewgpi'),
      reviewAHFSStore = vm.getStore('formularyreviewahfs'),
      reviewTiersStore = vm.getStore('formularyreviewtiers'),
      sk = vm.get('formularySK'),
      rejectButton = Ext.first('button[itemId=rejectButton]'),
      exportButton = Ext.first('button[itemId=exportButton]'),
      cancelButton = Ext.first('button[itemId=cancelButton]'),
      drugGrid = Ext.first('grid[itemId=drugGrid]'),
      reviewTitle = Ext.first('container[itemId=reviewTitle]');
    if (formularyStatus === 'Pending Review') {
      rejectButton.setVisible(true);
      cancelButton.setVisible(true);
      drugGrid.columns[0].setVisible(false);
    } else if (formularyStatus === 'Pending Level 1 Approval' || formularyStatus === 'Pending Level 2 Approval') {
      rejectButton.setVisible(true);
      cancelButton.setVisible(true);
      drugGrid.columns[0].setVisible(false);
      reviewTitle.setHtml('<h1 align=\'center\'>Formulary Review - Approvers</h1>');
    } else {
      rejectButton.setVisible(false);
      exportButton.setVisible(false);
      cancelButton.setVisible(true);
      reviewTitle.setHtml('<h1 align=\'center\'>Formulary Review - No Status</h1>');
    }

    reviewStore.getProxy().setExtraParam('frmlrysk', sk);
    reviewStore.load({
      scope: this,
      callback: function (record) {
        var reviewRecord = record[0].getData();
        vm.set('reviewrecord', reviewRecord);
        this.getViewModel().set('isMedispan', reviewRecord.DrugRefDbName === 'Medispan');
        if (reviewRecord.DrugRefDbName === 'Medispan') {
          this.getView().down('[text="ETC"]').hide();
          this.getView().down('[text="GPI"]').show();
          Ext.first('panel[itemId=westContainer]').setTitle('AHFS - GPI - Rules - Tiers');
        }
      }
    });
    reviewRulesStore.getProxy().setExtraParam('formularysk', sk);
    reviewRulesStore.load();
    reviewETCStore.getProxy().setExtraParam('formularysk', sk);
    reviewETCStore.load();
    reviewGPIStore.getProxy().setExtraParam('formularysk', sk);
    reviewGPIStore.load();
    reviewAHFSStore.getProxy().setExtraParam('formularysk', sk);
    reviewAHFSStore.load();
    reviewTiersStore.getProxy().setExtraParam('formularysk', sk);
    reviewTiersStore.load();
  },

  onAHFSClick: function () {
    var segmentedButtonContainer = Ext.first('panel[itemId=westContainer]');
    segmentedButtonContainer.setActiveItem(0);
  },

  onETCClick: function () {
    var segmentedButtonContainer = Ext.first('panel[itemId=westContainer]');
    segmentedButtonContainer.setActiveItem(1);
  },

  onGPIClick: function () {
    var segmentedButtonContainer = Ext.first('panel[itemId=westContainer]');
    segmentedButtonContainer.setActiveItem(4);
  },

  onActivateGpiView: function (newActiveItem) {
    newActiveItem.down('treecolumn').setText('GPI Hierarchy');
  },

  onRulesClick: function () {
    var segmentedButtonContainer = Ext.first('panel[itemId=westContainer]');
    segmentedButtonContainer.setActiveItem(2);
  },

  onTiersClick: function () {
    var segmentedButtonContainer = Ext.first('panel[itemId=westContainer]');
    segmentedButtonContainer.setActiveItem(3);
  },

  onReturnToHeaderClick: function () {
    var vm = this.getViewModel(),
      menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/manageformulary.ManageFormulary');

    this.fireEvent('openView', 'merlin', 'atlasformulary', 'formularyheader_Read', {
      menuId: menuId,
      PId: menuId,
      formularySK: vm.get('formularySK'),
      mode: 'review',
      titleMode: 'Reviewing',
      formularyStatus: vm.get('status')
    });
    this.getView().destroy();
  },

  onApproveClick: function () {
    this.approveOrReject(true);
  },

  onRejectClick: function () {
    this.approveOrReject(false);
  },

  onClearSearchCriteria: function () {
    var me = this,
      searchParams = this.getViewModel().get('searchParams'),
      hierarchytree = me.lookup('etcView'),
      gpihierarchytree = me.lookup('gpiView'),
      ahfsTree = me.lookup('ahfsView');

    searchParams.payload = [];
    searchParams.criteriaChange = true;
    searchParams.etcId = null;
    this.getViewModel().getStore('formularyreviewdrugs').removeAll();
    this.getViewModel().getStore('formularyreviewdrugspaged').removeAll();
    Ext.first('grid[itemId=drugGrid]').reconfigure(this.getViewModel().getStore('formularyreviewdrugspaged'));
    hierarchytree.setSelection(null);
    gpihierarchytree.setSelection(null);
    ahfsTree.setSelection(null);
    this.getStore('rules').removeAll();
    this.reloadPagingToolbar();
  },

  onClearFilters: function () {
    var grid = Ext.first('grid[itemId=drugGrid]');

    grid.filters.clearFilters();
    this.onPageSizeSelect({
      value: 25
    });
  },

  reloadPagingToolbar: function () {
    if (this.getView().down('pagingtoolbar').getStore('formularyreviewdrugspaged').lastOptions) {
      this.getView().down('pagingtoolbar').getStore('formularyreviewdrugspaged').lastOptions.page = 1;
    }
    this.getView().down('pagingtoolbar').onLoad();
    this.getView().down('pagingtoolbar').updateBarInfo();
  },

  onDataSortChanged: function (store, sorters) {
    var searchParams = this.getViewModel().data.searchParams;
    searchParams.orderBy = sorters[0].getProperty() + ' ' + sorters[0].getDirection();
    searchParams.criteriaChange = true;
  },

  onDrugsBeforeLoad: function (store) {
    store.getProxy().extraParams = this.getViewModel().data.searchParams;
  },

  onHierarchySelected: function (hierarchyTree, record) {
    var store = this.getViewModel().getStore('formularyreviewdrugs'),
      sk = this.getViewModel().get('formularySK'),
      proxy = store.getProxy();
    this.clearProxyParameters();

    proxy.setExtraParam('formularysk', sk);
    proxy.setExtraParam('etc_id', record.data.ETC_ID);
    Ext.first('grid[itemId=drugGrid]').mask('Working...');
    store.reload({
      callback: function () {
        Ext.first('grid[itemId=drugGrid]').unmask();
      }
    });
  },

  onGPIHierarchySelected: function (hierarchyTree, record) {
    var store = this.getViewModel().getStore('formularyreviewdrugs'),
      sk = this.getViewModel().get('formularySK'),
      proxy = store.getProxy();
    this.clearProxyParameters();

    proxy.setExtraParam('formularysk', sk);
    proxy.setExtraParam('gpi', record.data.GPI);
    Ext.first('grid[itemId=drugGrid]').mask('Working...');
    store.reload({
      callback: function () {
        Ext.first('grid[itemId=drugGrid]').unmask();
      }
    });
  },

  onAHFSSelected: function (hierarchytree, record) {
    var store = this.getViewModel().getStore('formularyreviewdrugs'),
      sk = this.getViewModel().get('formularySK'),
      proxy = store.getProxy();

    this.clearProxyParameters();

    proxy.setExtraParam('formularysk', sk);
    proxy.setExtraParam('ahfs_id', record.data.id);
    Ext.first('grid[itemId=drugGrid]').mask('Working...');
    store.reload({
      callback: function () {
        Ext.first('grid[itemId=drugGrid]').unmask();
      }
    });
  },

  onMissingFDBNDCsClick: function () {
    window.open(Atlas.apiReportURL + '?%2fAtlas%2fFormulary%2fMissingFDBDrugs');
  },


  clearProxyParameters: function () {
    var proxy = this.getViewModel().getStore('formularyreviewdrugs').getProxy();
    var extraParams = proxy.getExtraParams();
    delete extraParams.formularysk;
    delete extraParams.gpi;
    delete extraParams.etc_id;
    delete extraParams.drugcatgsk;
    delete extraParams.ahfs_id;
    delete extraParams.tiersk;
    delete extraParams.criteriaproperty;
    delete extraParams.criteriaoperator;
    delete extraParams.criteriavalue;
  },

  onRuleSelected: function (theGrid, td, cellIndex, record) {
    var store = this.getViewModel().getStore('formularyreviewdrugs'),
      sk = this.getViewModel().get('formularySK'),
      proxy = store.getProxy();

    this.clearProxyParameters();

    proxy.setExtraParam('formularysk', sk);
    proxy.setExtraParam('drugcatgsk', record.get('DrugCatgSK'));
    Ext.first('grid[itemId=drugGrid]').mask('Working...');
    store.reload({
      callback: function () {
        Ext.first('grid[itemId=drugGrid]').unmask();
      }
    });
  },

  onTierSelected: function (theGrid, td, cellIndex, record) {
    var store = this.getViewModel().getStore('formularyreviewdrugs'),
      sk = this.getViewModel().get('formularySK'),
      proxy = store.getProxy();

    this.clearProxyParameters();

    proxy.setExtraParam('formularysk', sk);
    proxy.setExtraParam('tiersk', record.get('FrmlryTierSK'));
    Ext.first('grid[itemId=drugGrid]').mask('Working...');
    store.reload({
      callback: function () {
        Ext.first('grid[itemId=drugGrid]').unmask();
      }
    });
  },

  onSmartSearchSelect: function (combo, record) {
    this.onClearSearchCriteria();
    this.clearProxyParameters();

    var store = this.getViewModel().getStore('formularyreviewdrugs'),
      sk = this.getViewModel().get('formularySK'),
      proxy = store.getProxy();

    this.clearProxyParameters();

    var rule = record.get('Rule');
    proxy.setExtraParam('formularysk', sk);
    proxy.setExtraParam('criteriaproperty', rule.property);
    proxy.setExtraParam('criteriaoperator', rule.operator);
    proxy.setExtraParam('criteriavalue', rule.value);
    Ext.first('grid[itemId=drugGrid]').mask('Working...');
    store.reload({
      callback: function () {
        Ext.first('grid[itemId=drugGrid]').unmask();
      }
    });
  },

  onViewNotesClick: function () {
    var me = this,
      viewNotesWindow = Ext.create(Atlas.atlasformulary.view.common.FormularyNotesWindow, {
        viewModel: {
          data: {
            formularySK: me.getViewModel().get('formularySK')
          }
        }
      });
    viewNotesWindow.getController().loadFormularyNotes(me.getViewModel().get('formularySK'));
    viewNotesWindow.show();
  },

  onCancelClick: function () {
    this.getView().destroy();
  },

  exportClick: function (url, type, verb) {
    Atlas.atlasformulary.data.proxy.FormularyAjax.request({
      method: 'POST',
      url: Atlas.apiReportURL + '/' + url + '?formularysk=' + this.getViewModel().data.formularySK,
      headers: {
        sessionid: Atlas.sessionId,
        username: Atlas.user.un
      },
      success: function () {
        Ext.toast('The ' + type + ' ' + verb + ' successfully exported.', 'Success', 't');
      },
      failure: function () {
        Ext.toast('There was a problem in exporting the ' + type + '.', 'Failure', 't');
      }
    });
  },

  onExportFormularyRulesClick: function () {
    this.exportClick('FormularyRulesExport', 'formulary rules', 'were');
  },

  onExportFormularyNDCClick: function () {
    this.exportClick('FormularyNdcExport', 'NDCs', 'were');
  },

  onFormularySummaryClick: function () {
    this.exportClick('FormularySummaryReportExport', 'formulary summary', 'was');
  },

  onFormularyReviewUpdateComplete: function () {
    var menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/dashboard.Dashboard');

    this.fireEvent('openView', 'merlin', 'atlasformulary', 'dashboard_Dashboard', {
      menuId: menuId,
      PId: menuId
    });
    this.getView().destroy();
  },

  onShowUMCriteria: function () {
    var sk = this.getViewModel().get('formularySK'),
      rulesView = this.getReferences('#reviewRulesView').reviewRulesView,
      selection = rulesView.selection;

    if (!selection.data.DrugCatgSK) {
      Ext.toast('Please select a rule before opening UM!');
      return;
    }

    var wPopUp = new Atlas.atlasformulary.view.umprograms.UMCriteriaPopUp({
      itemConfig: {
        tgtUserId: Atlas.user.un,
        tgtDrugCatgSK: selection.data.DrugCatgSK,
        tgtFrmlrySK: sk,
        tgtMode: 'read'
      }
    });
    wPopUp.show();
  },

  onFormularyReviewDrugsPaged: function (store, records) {
    var vm = this.getViewModel(),
      formularyReviewDrugsPaged = vm.getStore('formularyreviewdrugspaged');

    formularyReviewDrugsPaged.getProxy().setData(records);
    formularyReviewDrugsPaged.reload();
  },

  onPageSizeSelect: function (pageSizeCombo) {
    var me = this,
      newCount = parseInt(pageSizeCombo.value, 10),
      sk = this.getViewModel().get('formularySK'),
      searchParams = this.getViewModel().get('searchParams');

    searchParams.count = newCount;

    this.getViewModel().getStore('formularyreviewdrugspaged').setPageSize(newCount);

    this.getViewModel().getStore('formularyreviewdrugs').load({
      scope: me,
      params: {
        pageSize: newCount,
        count: newCount,
        formularySK: sk
      },
      callback: function () {
        me.getView().down('pagingtoolbar').doRefresh();
      }
    });
  },

  onPageSizeSelectRendered: function (pageSizeCombo) {
    pageSizeCombo.select([25]);
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
              'FrmlrySK': sk,
              'AprvlTypePrity': reviewPriority,
              'AprvlNotes': '',
              'UserId': userId
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

              me.getView().destroy();
            }
          });
        }
      }
    });
  }
});
