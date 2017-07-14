Ext.define('Atlas.atlasformulary.view.druglists.DrugListsController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.druglists',

  init: function () {
    var store = this.getViewModel().getStore('druglists'),
      proxy = store.getProxy();
    if (proxy.extraParams.druglistsk) {
      delete proxy.getExtraParams().druglistsk;
    }
    delete proxy.getExtraParams().includeinactive;
    store.reload();

    this.callParent(arguments);

    var pagingBar = this.getView().down('#pagingBar');
    pagingBar.down('#refresh').setHandler(this.doListsReload, this);
  },

  doListsReload: function () {
    this.getViewModel().getStore('druglists').reload();
  },

  onDrugListsPaged: function (store, records) {
    var vm = this.getViewModel(),
      drugListsPaged = vm.getStore('druglistspaged');

    drugListsPaged.getProxy().setData(records);
    drugListsPaged.reload();
  },

  onCancelClick: function () {
    this.getView().destroy();
  },

  onViewDrugListClick: function () {
    var grid = this.getReferences('#druglistsgrid').druglistsgrid,
      selection = grid.selection,
      menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/druglists.DrugLists');

    if (selection) {
      this.fireEvent('drugListViewOpened');
      this.fireEvent('openView', 'merlin', 'atlasformulary', 'druglistheader_Read', {
        menuId: menuId,
        PId: menuId,
        drugListSK: selection.data.DrugListSK,
        mode: 'view',
        titleMode: 'Viewing',
        atlasId: 'druglist-header-' + (Math.floor(Math.random() * 1001) + 1)
      });
    } else {
      Ext.Msg.alert('Please Select A Drug List in order to Review...');
    }
  },

  onCreateDrugListClick: function () {
    var openTab = this.getView().up().up().lookup('druglistheader-createedit'),
      menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/druglists.DrugLists');

    if (openTab) {
      openTab.destroy();
    }
    this.fireEvent('drugListCreateEditOpened');
    this.fireEvent('openView', 'merlin', 'atlasformulary', 'druglistheader_CreateEdit', {
      menuId: menuId,
      PId: menuId,
      drugListSK: null,
      mode: 'create',
      titleMode: 'Creating',
      atlasId: 'druglist-header-' + (Math.floor(Math.random() * 1001) + 1)
    });
  },

  onEditDrugListClick: function () {
    var grid = this.getReferences('#druglistsgrid').druglistsgrid,
      selection = grid.selection,
      menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/druglists.DrugLists'),
      openTab = this.getView().up().up().lookup('druglistheader-createedit');

    if (openTab) {
      openTab.destroy();
    }
    if (selection) {
      this.fireEvent('drugListCreateEditOpened');
      this.fireEvent('openView', 'merlin', 'atlasformulary', 'druglistheader_CreateEdit', {
        menuId: menuId,
        PId: menuId,
        drugListSK: selection.data.DrugListSK,
        mode: 'edit',
        titleMode: 'Editing',
        atlasId: 'druglist-header-' + (Math.floor(Math.random() * 1001) + 1)
      });
    }
  },

  onCopyDrugListClick: function () {
    var me = this,
      grid = this.getReferences('#druglistsgrid').druglistsgrid,
      selection = grid.selection,
      menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/druglists.DrugLists');

    grid.mask('Working...');
    Atlas.atlasformulary.data.proxy.FormularyAjax.request({
      url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/druglist/copy?druglistsk=' + selection.get('DrugListSK'),

      method: 'POST',
      headers: {
        'sessionid': Atlas.sessionId,
        'username': Atlas.user.un
      },

      success: function (response) {
        me.fireEvent('drugListCreateEditOpened');
        me.fireEvent('openView', 'merlin', 'atlasformulary', 'druglistheader_CreateEdit', {
          menuId: menuId,
          PId: menuId,
          drugListSK: parseInt(response.responseText, 10),
          mode: 'edit',
          titleMode: 'Editing',
          atlasId: 'druglist-header-' + (Math.floor(Math.random() * 1001) + 1)
        });
        grid.unmask();
        Ext.toast('Successfully created copy.');
        me.getViewModel().getStore('druglists').reload();
      },

      failure: function () {
        grid.unmask();
        Ext.toast('An error occurred while attempting to create a copy.');
      }

    });
  },

  onDeleteDrugListClick: function (button) {
    var grid = button.up('grid'),
      selection = grid.selection,
      proxy = this.getStore('druglists').getProxy();
    proxy.skParam = selection.data.DrugListSK;
    Ext.Msg.show({
      title: 'Delete Formulary: Confirmation',
      message: 'Are you sure you want to delete <strong>' + selection.data.DrugListName + ' ?</strong>',
      buttons: Ext.Msg.YESNO,
      icon: Ext.Msg.QUESTION,
      fn: function (button) { // eslint-disable-line no-shadow
        if (button === 'yes') {
          selection.drop();
          selection.erase({
            callback: function (selection) { // eslint-disable-line no-shadow
              Ext.toast('<strong>' + selection.data.DrugListName + ' was deleted.</strong>', 'Drug List deleted', 't');
            }
          });
        }
      }
    });
  },

  onExportDrugListClick: function () {
    var reportingURL = Atlas.apiReportURL;

    var grid = this.getReferences('#druglistsgrid').druglistsgrid,
      selection = grid.selection;
    var inDrugListSK = selection.data.DrugListSK;

    var finalURL = reportingURL + '?%2fAtlas%2fFormulary%2fDrugListExportNDC&rs:Command=Render&DrugListSK=' + inDrugListSK + '&rc:Parameters=Collapsed';

    window.open(finalURL);
  },

  onSearchChanged: function () {
    var searchText = this.getViewModel().get('searchText').toLowerCase();
    if (searchText !== '') {
      this.getViewModel().getStore('druglists').filterBy(function (record) {
        var match = false;

        if (record.get('DrugListName').toLowerCase().indexOf(searchText) > -1) {
          match = true;
        }

        if (record.get('TenantOwner').toLowerCase().indexOf(searchText) > -1) {
          match = true;
        }

        return match;
      }, this);
    } else {
      this.getViewModel().getStore('druglists').clearFilter();
    }
  },

  onClearFiltersClick: function () {
    var headersStore = this.getViewModel().getStore('druglists'),
      grid = this.getReferences('#druglistsgrid').druglistsgrid;

    headersStore.setProxy({
      type: 'formulary',
      url: '/druglist',
      idParam: 'druglistsk'
    });

    grid.columnManager.getColumns().forEach(function (column) {
      if (column.filter) {
        if (column.filter.type === 'string') {
          column.filter.setValue(null);
        } else if (column.filter.menu) {
          column.filter.menu.items.each(function (item) {
            if (item.setChecked) {
              item.setChecked(false);
            }
            return true;
          });
        }
      }
    });
    grid.filters.clearFilters();
    // Grab store of grid on view
    var originalStore = this.getStore('druglists');
    // Load store with original info
    originalStore.reload();
    this.getViewModel().getStore('druglists').clearFilter();
    this.getViewModel().set('searchText', '');
  },

  onLoadAssocFormularies: function (theGrid, rowIndex, columnIndex, comp, e, selection) { // eslint-disable-line max-params
    var associatedFormulariesWindow = Ext.create(Atlas.atlasformulary.view.common.AssocFormulariesWindow);

    if (selection) {
      associatedFormulariesWindow.getController().loadAssocFormularies(parseInt(selection.get('DrugListSK'), 10));
      associatedFormulariesWindow.show();
    } else {
      Ext.toast('Please select a row first.', 'Hint');
    }
  },

  onPageSizeSelect: function (pageSizeCombo) {
    var me = this,
      newCount = parseInt(pageSizeCombo.value, 10);

    this.getViewModel().getStore('druglistspaged').setPageSize(newCount);

    this.getViewModel().getStore('druglists').load({
      scope: me,
      params: {
        pageSize: newCount,
        count: newCount
      },
      callback: function () {
        this.getView().down('grid').down('pagingtoolbar').doRefresh();
      }
    });
  },

  onPageSizeSelectRendered: function (pageSizeCombo) {
    pageSizeCombo.select([25]);
  },

  onDrugListSearchSelect: function () {
    // Grab store of grid on view
    var headersStore = this.getViewModel().getStore('druglists'),
      headersStorePaged = this.getViewModel().getStore('druglistspaged'),
      // Grab store of the combobox that returned results
      smartStore = this.getView().down('smartdruglistsearchcombo').getStore(),
      // Grab URL from proxy of the smart store
      proxyUrl = smartStore.getProxy().url,
      // Grab Value of combobox
      comboVal = this.getView().getReferences().smartdruglistsearchcombo.lastQuery;

    // Set proxy url of original store with new proxy url of combobox store
    headersStore.setProxy({
      type: 'formulary',
      url: proxyUrl + '?searchstring=' + comboVal
    });

    headersStorePaged.loadPage(1);

    // Load store with combobox store info
    headersStore.load();
  }
});
