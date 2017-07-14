Ext.define('Atlas.atlasformulary.view.drugsearch.DrugSearchController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.drugsearchcontroller',
  include: ['Ext.window.MessageBox'],
  clipboard: null,
  drugListSelection: null,
  criteriaOverview: null,

  loadingMsg: 'Loading...',
  workingMsg: 'Processing...',

  init: function () {
    var vm = this.getViewModel(),
      searchParams = vm.get('searchParams'),
      sortField = null;

    this.getStore('criteria').on('datachanged', this.onCriteriaChanged, this);

    searchParams.userId = Atlas.user.un;
    searchParams.sessionId = Atlas.sessionId;
    searchParams.formularySK = vm.get('formularySK');
    searchParams.drugListSK = vm.get('drugListSK');

    this.getView().configure(this.addIncludeCriteria.bind(this));

    this.getView().storedSort = Ext.util.LocalStorage.get('atlasFormularyDrugSearchSort');
    sortField = this.getView().storedSort.getItem('field');
    if (sortField) {
      searchParams.orderBy = sortField + ' ' + this.getView().storedSort.getItem('direction');
    }
  },

  clearFilters: function () {
    var searchParams = this.getViewModel().get('searchParams'),
      criteriaStore = this.getStore('criteria'),
      grid = this.lookup('druggrid');

    searchParams.payload = [];
    searchParams.criteriaChange = true;
    searchParams.startIndex = 0;

    criteriaStore.suspendEvent('datachanged');
    criteriaStore.getData().each(function (record) {
      if (record.get('operator') !== 'include') {
        criteriaStore.remove(record);
      }
    });
    criteriaStore.resumeEvent('datachanged');

    grid.getStore().removeAll();
    grid.down('pagingtoolbar').onLoad();
    if (this.criteriaOverview) {
      this.criteriaOverview.removeAll();
    }
  },

  onClearFiltersClick: function () {
    this.clearFilters();
    this.getView().down('hierarchytree').setSelection(null);
  },

  onDrugListImportClick: function () {
    var me = this,
      importWindow = Ext.create(Atlas.atlasformulary.view.common.FormularyFileImport, {
        viewModel: {
          data: {
            importType: 3,
            sk: me.getViewModel().data.drugListSK
          }
        }
      });
    importWindow.show();
  },

  onDrugListActivateClick: function () {
    Atlas.atlasformulary.data.proxy.FormularyAjax.request({
      method: 'POST',
      url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/druglistactivate?druglistsk=' + this.getViewModel().data.drugListSK,
      headers: {
        sessionid: Atlas.sessionId,
        username: Atlas.user.un
      },
      success: function () {
        Ext.toast('The drug list was successfully activated.', 'Success', 't');
      },
      failure: function () {
        Ext.toast('There was a problem in updating the drug list.', 'Failure', 't');
      }
    });
  },

  onDrugSearchExportClick: function () {
    var reportingURL = Atlas.apiReportURL,
      whichView = this.getViewModel().type;

    switch (whichView) {
      case 'drugsearch':
        window.open(reportingURL + '?%2fAtlas%2fFormulary%2fDrugSearchExport&rs:Command=Render&UserId=' + Atlas.user.un + '&SessionId=' + Atlas.sessionId + '&rc:Parameters=Collapsed');
        break;
      case 'druglistconfig':
        window.open(reportingURL + '?%2fAtlas%2fFormulary%2fDrugListExportNDC&rs:Command=Render&DrugListSK=' + this.getViewModel().data.drugListSK + '&rc:Parameters=Collapsed');
        break;
      default:
        throw new Error('Invalid type (' + whichView + ')');
    }
  },

  onPageSizeSelect: function (combo) {
    var store = this.lookup('druggrid').getStore(),
      newCount = parseInt(combo.value, 10),
      searchParams = this.getViewModel().get('searchParams');

    store.pageSize = newCount;
    searchParams.count = newCount;
    searchParams.criteriaChange = false;

    store.reload();
  },

  onPageSizeAfterRender: function (combo) {
    combo.select([25]);
  },

  onItemContextMenu: function (grid, record, item, index, e) {
    var ndcWarningTitle = 'NDC Must Enabled',
      ndcWarningMessage = 'NDC column must be enabled in order to use this context menu option.',
      position = [e.getX() - 1, e.getY() - 1],
      vm = this.getViewModel(),
      rightClickMenu = new Ext.menu.Menu({
        items: [
          {
            text: 'History',
            handler: function () {
              if (!record.get('NDC')) {
                Ext.Msg.alert(ndcWarningTitle, ndcWarningMessage);
              } else {
                var rightClickWindow = Ext.create(Atlas.atlasformulary.view.common.RightClickWindow, {
                  viewModel: {
                    data: {
                      NDC: record.data.NDC,
                      labelName: record.data.LabelName
                    }
                  }
                });
                rightClickWindow.down('tabpanel').setActiveTab(0);
                rightClickWindow.getController().loadAllStores(record.data.NDC);
                rightClickWindow.show();
              }
            }
          },
          {
            text: 'Formulary',
            handler: function () {
              if (!record.get('NDC')) {
                Ext.Msg.alert(ndcWarningTitle, ndcWarningMessage);
              } else {
                var rightClickWindow = Ext.create(Atlas.atlasformulary.view.common.RightClickWindow, {
                  viewModel: {
                    data: {
                      NDC: record.data.NDC,
                      labelName: record.data.LabelName
                    }
                  }
                });
                rightClickWindow.down('tabpanel').setActiveTab(1);
                rightClickWindow.getController().loadAllStores(record.data.NDC);
                rightClickWindow.show();
              }
            }
          },
          {
            text: 'Notes',
            handler: function () {
              if (!record.get('NDC')) {
                Ext.Msg.alert(ndcWarningTitle, ndcWarningMessage);
              } else {
                var rightClickWindow = Ext.create(Atlas.atlasformulary.view.common.RightClickWindow, {
                  viewModel: {
                    data: {
                      NDC: record.data.NDC,
                      labelName: record.data.LabelName
                    }
                  }
                });
                rightClickWindow.down('tabpanel').setActiveTab(2);
                rightClickWindow.getController().loadAllStores(record.data.NDC);
                rightClickWindow.show();
              }
            }
          },
          {
            text: 'Clinical Data',
            handler: function () {
              if (!record.get('NDC')) {
                Ext.Msg.alert(ndcWarningTitle, ndcWarningMessage);
              } else {
                var rightClickWindow = Ext.create(Atlas.atlasformulary.view.common.ClinicalDataWindow, {
                  viewModel: {
                    data: {
                      NDC: record.data.NDC,
                      labelName: record.data.LabelName
                    }
                  }
                });
                rightClickWindow.down('tabpanel').setActiveTab(0);
                rightClickWindow.getController().loadAllStores(record.data.NDC);
                rightClickWindow.show();
              }
            }
          }
        ]
      });

    if (this.getViewModel().get('drugRefDbName') && record.get('DrugCatgSK')) {
      rightClickMenu.add({
        text: 'UM',
        handler: function () {
          var umPopUp = new Atlas.atlasformulary.view.umprograms.UMCriteriaPopUp({
            itemConfig: {
              tgtUserId: Atlas.user.un,
              tgtDrugCatgSK: record.get('DrugCatgSK'),
              tgtFrmlrySK: vm.get('formularySK'),
              tgtFrmlryTierSK: record.get('TierSK'),
              tgtIsCovered: record.get('IsCovered'),
              tgtMode: 'view'
            }
          });
          umPopUp.show();
        }
      });
    }

    e.stopEvent();
    rightClickMenu.showAt(position);
  },

  onCellClick: function (table, td, cellIndex, record) {
    var tree = this.getView().down('hierarchytree'),
      storeNode = null;

    //deselect all items in case the item is not found so it will not leave an old selection there
    tree.getSelectionModel().deselectAll(true);
    //find the tree node with the etc_id in the record
    if (tree.getStore().type === 'etctree' && record.get('ETC_ID')) {
      storeNode = tree.getStore().findNode('ETC_ID', record.get('ETC_ID'));
    } else if (tree.getStore().type === 'gpitree' && record.get('GPI')) {
      storeNode = tree.getStore().findNode('GPI', record.get('GPI'));
    }
    if (storeNode) {
      //expand the tree node so that when it is selected, it can be seen
      tree.collapseAll();
      tree.expandPath(storeNode.getPath());
      //scroll the node into view
      var treeNode = tree.view.getNodeByRecord(storeNode);
      if (!treeNode) {
        treeNode = tree.view.getNodeById(storeNode.id);
      }
      if (treeNode) {
        treeNode.scrollIntoView();
      }
      //select the node in the tree
      tree.getSelectionModel().select(storeNode, false, true);
    }
  },

  onCellDblClick: function (table, td, cellIndex, record) {
    var columnHeader = table.panel.headerCt.getHeaderAtIndex(cellIndex);

    if (this.getViewModel().getStore('criteriaColumns').findRecord('ValQulfrCode', columnHeader.dataIndex)) {
      if (!this.clipboard || !this.clipboard.getController()) {
        this.clipboard = Ext.create('Atlas.atlasformulary.view.common.DrugSearchClipboard');
        this.clipboard.getController().on('onClipboardComplete', this.onClipboardComplete, this);
      }

      this.clipboard.show();

      if (columnHeader.dataIndex === 'RelatedDrugLists') {
        if (!this.drugListSelection || !this.drugListSelection.getController()) {
          this.drugListSelection = Ext.create('Atlas.atlasformulary.view.common.DrugListSelection', {
            viewModel: {
              data: {
                selectedDrug: record
              }
            }
          });

          this.drugListSelection.on('listSelected', this.onDrugListSelected, this);
          this.drugListSelection.showAt(300);
        }
      } else {
        var criteria = Atlas.atlasformulary.model.Rule.create({
          property: columnHeader.dataIndex,
          operator: '=',
          value: record.data[columnHeader.dataIndex] !== null ? record.data[columnHeader.dataIndex] : '***'
        });

        this.clipboard.getController().addCriteria(criteria);
      }
    }
  },

  onDrugListSelected: function (listName) {
    if (this.clipboard || this.clipboard.getController()) {
      var criteria = Atlas.atlasformulary.model.Rule.create({
        property: 'DrugLists',
        operator: 'LIKE',
        value: listName
      });

      this.clipboard.getController().addCriteria(criteria);
    }
  },

  onShowCriteriaClicked: function () {
    if (!this.criteriaOverview || !this.criteriaOverview.getController()) {
      this.criteriaOverview = Ext.create('Atlas.atlasformulary.view.common.DrugSearchCriteriaOverview', {
        viewModel: {
          stores: {
            criteria: this.getStore('criteria')
          },
          data: {
            callbackController: this
          }
        }
      });
    }

    this.criteriaOverview.show();
  },

  onClipboardComplete: function (store) {
    this.getStore('criteria').suspendEvent('datachanged');
    store.each(function (record) {
      this.addToCriteriaStore(record);
    }, this);
    this.getStore('criteria').resumeEvent('datachanged');

    this.onCriteriaChanged();
    if (this.criteriaOverview) {
      this.criteriaOverview.onCriteriaChanged();
    }
    this.clipboard.destroy();
  },

  onBeforeSort: function (store, sorters) {
    var searchParams = this.getViewModel().get('searchParams'),
      orderBy = sorters[0].getProperty() + ' ' + sorters[0].getDirection();

    if (orderBy !== searchParams.orderBy) {
      searchParams.orderBy = orderBy;
      searchParams.criteriaChange = true;

      this.getView().storedSort.setItem('field', sorters[0].getProperty());
      this.getView().storedSort.setItem('direction', sorters[0].getDirection());
    }
  },

  onBeforeLoad: function (store) {
    var searchParams = this.getViewModel().get('searchParams');

    this.getView().mask(this.loadingMsg);

    store.getProxy().setExtraParams({
      formularysk: searchParams.formularySK,
      druglistsk: searchParams.drugListSK,
      orderby: searchParams.orderBy,
      userid: searchParams.userId,
      sessionid: searchParams.sessionId,
      payload: searchParams.payload,
      criteriachange: searchParams.criteriaChange,
      count: searchParams.count,
      startindex: searchParams.startIndex
    });
  },

  onLoad: function () {
    this.getView().unmask();
  },

  onTreeToggle: function (segmentedButton, button, isPressed) {
    var vm = this.getViewModel(),
      sorters = this.lookup('druggrid').getStore().getSorters();

    vm.getStore('criteria').removeAll();
    sorters.clear();

    if (button.itemId === 'etcButton' && isPressed) {
      vm.set('dataSource', 'fdb');
    } else if (button.itemId === 'gpiButton' && isPressed) {
      vm.set('dataSource', 'medispan');
    }

    this.getView().configure(this.addIncludeCriteria.bind(this));

    sorters.clear();
  },

  onTreeSelectionChange: function (tree, selected) {
    this.clearFilters();
    selected.forEach(function (record) {
      var criteria = Ext.create('Atlas.atlasformulary.model.Rule');
      if (tree.getStore().type === 'etctree') {
        criteria.set('property', 'ETC_ID');
        criteria.set('operator', '=');
        criteria.set('value', record.get('ETC_ID') > 0 ? record.get('ETC_ID') : null);
        criteria.set('displayProperty', 'ETC');
        criteria.set('displayValue', record.get('ETC_NAME'));
      } else if (tree.getStore().type === 'gpitree') {
        criteria.set('property', 'GPI');
        criteria.set('operator', '=');
        criteria.set('value', record.get('GPI') > 0 ? record.get('GPI') : null);
      }
      this.addToCriteriaStore(criteria, false, true);
    }, this);
  },

  onCriteriaChanged: function () {
    var storeValues = [],
      searchParams = this.getViewModel().get('searchParams'),
      sortField = this.getView().storedSort.getItem('field'),
      sortDirection = this.getView().storedSort.getItem('direction'),
      sortColumn = null,
      grid = this.lookup('druggrid'),
      gridStore = grid.getStore();

    searchParams.criteriaChange = false;
    this.getStore('criteria').getData().each(function (record) {
      if (record.get('operator') !== 'include') {
        searchParams.criteriaChange = true;
      }
      storeValues.push(record.data);
    });

    if (searchParams.criteriaChange) {
      searchParams.payload = storeValues;
      searchParams.startIndex = 0;

      if (sortField) {
        sortColumn = grid.getColumns().find(function (column) {
          return column.dataIndex === sortField && !column.hidden;
        });
      }

      if (sortField && sortColumn) {
        gridStore.sort(sortField, sortDirection);
      } else {
        gridStore.getSorters().clear();
        gridStore.reload();
      }
    }
  },

  onSmartSearchFieldsSelect: function (combo, record) {
    if (record.get('SmartSearchFieldSK') === 0) {
      delete this.lookup('smartsearchcombo').getStore().getProxy().extraParams.smartcolumnsk;
    } else {
      this.lookup('smartsearchcombo').getStore().getProxy().setExtraParam('smartcolumnsk', record.get('SmartSearchFieldSK'));
    }
  },

  onSmartSearchSelect: function (combo, record) {
    this.addToCriteriaStore(Ext.create('Atlas.atlasformulary.model.Rule', record.get('Rule')));
  },

  addToCriteriaStore: function (newCriteria, silent, inclusive) {
    var criteriaStore = this.getStore('criteria'),
      existingCriteria = criteriaStore.getData().findBy(function (record) {
        return newCriteria.get('property') === record.get('property') && newCriteria.get('operator') === record.get('operator');
      });

    if (existingCriteria) {
      if ((!inclusive && (newCriteria.get('property') === 'ETC_ID' || newCriteria.get('property') === 'GPI')) || newCriteria.get('property') === 'TierNbr' || newCriteria.get('operator') === 'include') {
        existingCriteria.set('value', newCriteria.get('value'));
      } else {
        if (newCriteria.get('displayValue')) {
          if (existingCriteria.get('displayValue')) {
            existingCriteria.set('displayValue', existingCriteria.get('displayValue') + ',' + newCriteria.get('displayValue'));
          } else {
            existingCriteria.set('displayValue', newCriteria.get('displayValue'));
          }
        }
        existingCriteria.set('value', existingCriteria.get('value') + ',' + newCriteria.get('value'));
      }

      if (!silent) {
        this.onCriteriaChanged(); // Call explicitly because store doesn't fire datachanged on element modification.
      }
    } else {
      if (silent) {
        criteriaStore.suspendEvent('datachanged');
      }

      criteriaStore.add(newCriteria);

      if (silent) {
        criteriaStore.resumeEvent('datachanged');
      }
    }
  },

  onColumnShow: function (ct, column) {
    if (column.dataIndex !== null) {
      this.addIncludeCriteria(column);
    }

    this.getView().storedColumns.setItem(column.getReference(), 'show');
  },

  onColumnHide: function (ct, column) {
    var vm = this.getViewModel();

    if ((vm.get('dataSource') === 'fdb' && column.dataIndex === 'ETC_ID') || (vm.get('dataSource') === 'medispan' && column.dataIndex === 'GPI')) {
      Ext.Msg.show({
        title: 'Confirm',
        message: 'Removing the ' + column.text + ' column will disable the highlighting of hierarchy items when you select a row.',
        buttons: Ext.Msg.OKCANCEL,
        scope: this,
        fn: function (button) {
          var grid = this.lookup('druggrid');

          if (button === 'ok') {
            this.hideColumn(column);
          } else {
            grid.suspendEvent('columnshow');
            column.setVisible(true);
            grid.resumeEvent('columnshow');
          }
        }
      });
    } else {
      this.hideColumn(column);
    }
  },

  hideColumn: function (column) {
    var criteria = this.getStore('criteria');

    criteria.getData().each(function (record) {
      var dataIndex = column.dataIndex;

      if (column.dataIndex === 'RelatedDrugLists') {
        dataIndex = 'DrugLists';
      }

      if (record.get('property') === dataIndex && record.get('operator') === 'include') {
        criteria.remove(record);
      }
    });

    this.getView().storedColumns.removeItem(column.getReference());
  },

  addIncludeCriteria: function (column, silent) {
    var columnIndex = column.dataIndex;

    if (columnIndex === 'RelatedDrugLists') {
      columnIndex = 'DrugLists';
    }

    var criteria = Ext.create('Atlas.atlasformulary.model.Rule');
    criteria.set('property', columnIndex);
    criteria.set('operator', 'include');
    criteria.set('value', '0');
    this.addToCriteriaStore(criteria, silent);
  }
});
