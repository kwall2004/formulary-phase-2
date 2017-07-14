Ext.define('Atlas.atlasformulary.view.manageformulary.ManageFormularyController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.manageformularycontroller',

  init: function () {
    var store = this.getViewModel().getStore('formularyheaders'),
      proxy = store.getProxy();

    if (proxy.extraParams.frmlrysk) {
      delete proxy.getExtraParams().frmlrysk;
    }

    store.reload();

    this.callParent(arguments);

    var pagingBar = this.getView().down('#pagingBar');
    pagingBar.down('#refresh').setHandler(this.doHeadersReload, this);
  },

  doHeadersReload: function () {
    this.getViewModel().getStore('formularyheaders').reload();
  },

  onFormularyHeadersPaged: function (store, records) {
    var vm = this.getViewModel(),
      formularyHeadersPages = vm.getStore('formularyheaderspaged');

    formularyHeadersPages.getProxy().setData(records);
    formularyHeadersPages.reload();
  },

  onCancelClick: function () {
    this.getView().destroy();
  },

  onSingleRowClick: function () {
    var grid = this.getReferences('#manageformularygrid').manageformularygrid,
      formularyStatus = grid.getSelection()[0].getData().StatDesc,
      editButton = Ext.first('button[itemId=editButton]'),
      deleteButton = Ext.first('button[itemId=deleteButton]'),
      createNewVersionButton = Ext.first('button[itemId=createNewVersionButton]');

    if (formularyStatus !== 'Draft' && formularyStatus !== 'Rejected') {
      editButton.disable();
      deleteButton.disable();
    } else {
      editButton.enable();
      deleteButton.enable();
    }

    if (formularyStatus !== 'Approved') {
      createNewVersionButton.disable();
    } else {
      createNewVersionButton.enable();
    }
  },

  onViewFormularyClick: function () {
    var grid = this.getReferences('#manageformularygrid').manageformularygrid,
      selection = grid.selection,
      menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/manageformulary.ManageFormulary');

    if (selection) {
      this.fireEvent('formularyViewOpened');
      this.fireEvent('openView', 'merlin', 'atlasformulary', 'formularyheader_Read', {
        menuId: menuId,
        PId: menuId,
        formularySK: selection.data.FrmlrySK,
        mode: 'view',
        titleMode: 'Viewing'
      });
    } else {
      Ext.Msg.alert('Please Select A Formulary in order to Review...');
    }
  },

  onViewNotesClick: function () {
    var grid = this.getReferences('#manageformularygrid').manageformularygrid,
      selection = grid.selection,
      viewNotesWindow = Ext.create(Atlas.atlasformulary.view.common.FormularyNotesWindow, {
        viewModel: {
          data: {
            formularySK: selection.get('FrmlrySK')
          }
        }
      });
    viewNotesWindow.getController().loadFormularyNotes(selection.get('FrmlrySK'));
    viewNotesWindow.show();
  },

  onCreateFormularyClick: function () {
    var menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/manageformulary.ManageFormulary');

    this.fireEvent('formularyCreateEditOpened');
    this.fireEvent('openView', 'merlin', 'atlasformulary', 'formularyheader_CreateEdit', {
      menuId: menuId,
      PId: menuId,
      formularySK: null,
      mode: 'create',
      titleMode: 'Creating'
    });
  },

  onEditFormularyClick: function () {
    var grid = this.getReferences('#manageformularygrid').manageformularygrid,
      selection = grid.selection,
      menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/manageformulary.ManageFormulary');

    this.fireEvent('formularyCreateEditOpened');

    this.fireEvent('openView', 'merlin', 'atlasformulary', 'formularyheader_CreateEdit', {
      menuId: menuId,
      PId: menuId,
      formularySK: selection.data.FrmlrySK,
      mode: 'edit',
      titleMode: 'Editing'
    });
  },

  onCreateNewVersionClick: function (createNewVersionButton) {
    var me = this,
      grid = this.getReferences('#manageformularygrid').manageformularygrid,
      selection = grid.selection,
      store = me.getStore('formularyheaders'),
      sk = selection.data.FrmlrySK,
      message = '';

    var isNewVersion = !!createNewVersionButton; // eslint-disable-line no-implicit-coercion
    if (!isNewVersion) {
      message = 'New copy created.';
    } else {
      message = 'New version created.';
    }

    var params = {
      payload: [
        {
          formularySK_From: sk, // eslint-disable-line camelcase
          isNewVersion: isNewVersion,
          userId: Atlas.user.un
        }
      ]
    };

    grid.mask('Working...');

    Atlas.atlasformulary.data.proxy.FormularyAjax.request({
      url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/formularyheaderversionclone',
      method: 'PUT',
      jsonData: params,
      headers: {
        'sessionid': Atlas.sessionId,
        'username': Atlas.user.un
      },
      success: function (response) {
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/manageformulary.ManageFormulary');

        me.fireEvent('formularyCreateEditOpened');
        me.fireEvent('openView', 'merlin', 'atlasformulary', 'formularyheader_CreateEdit', {
          menuId: menuId,
          PId: menuId,
          formularySK: Ext.decode(response.responseText).Rows[0],
          mode: 'edit',
          titleMode: 'Editing'
        });
        grid.unmask();
        Ext.toast(message, 'Success');
        store.reload();
      },
      failure: function () {
        grid.unmask();
        // TODO: Add proper handling here. Currently handled by global REST handler.
      }
    });
  },

  onCopyFormularyClick: function () {
    this.onCreateNewVersionClick();
  },

  onDeleteFormularyClick: function () {
    var grid = this.getReferences('#manageformularygrid').manageformularygrid,
      store = this.getViewModel().getStore('formularyheaders'),
      selection = grid.getSelection()[0];

    Ext.Msg.show({
      title: 'Delete Formulary: Confirmation',
      message: 'Are you sure you want to delete <strong>' + selection.data.FrmlryName + ' ?</strong>',
      buttons: Ext.Msg.YESNO,
      icon: Ext.Msg.QUESTION,
      fn: function (btn) {
        if (btn === 'yes') {
          Atlas.atlasformulary.data.proxy.FormularyAjax.request({
            method: 'DELETE',
            url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/formularyheader?frmlrysk=' + selection.get('FrmlrySK'),
            headers: {
              'sessionid': Atlas.sessionId,
              'username': Atlas.user.un
            },
            success: function () {
              Ext.toast('<strong>' + selection.get('FrmlryName') + ' was deleted.</strong>', 'Success', 't');
              store.reload();
            },
            failure: function () {
              Ext.toast('An error occurred while deleting the formulary.', 'Error', 't');
            }
          });
        }
      }
    });
  },

  onCompareFormulariesClick: function () {
    var me = this;
    var vm = me.getViewModel();
    var popup = new Atlas.atlasformulary.view.manageformulary.CompareFormulariesPopUp({
      parentController: me,
      parentViewModel: vm
    });
    popup.show();
  },

  exportClick: function (url, type, verb) {
    var grid = this.getReferences('#manageformularygrid').manageformularygrid,
      selection = grid.selection;
    Atlas.atlasformulary.data.proxy.FormularyAjax.request({
      method: 'POST',
      url: Atlas.apiReportURL + '/' + url + '?formularysk=' + selection.data.FrmlrySK,
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

  onDiscrepancyReportClick: function () {
    return Ext.Msg.alert('onDiscrepancyReportClick', 'onDiscrepancyReportClick clicked.');
  },

  onValidationReportClick: function () {
    return Ext.Msg.alert('onValidationReportClick', 'onValidationReportClick clicked.');
  },

  onFormularySearchSelect: function () {
    // Grab store of grid on view
    var headersStore = this.getViewModel().getStore('formularyheaders'),
      headersStorePaged = this.getViewModel().getStore('formularyheaderspaged'),
      // Grab store of the combobox that returned results
      smartStore = this.getView().down('smartformularysearchcombo').getStore(),
      // Grab URL from proxy of the smart store
      proxyUrl = smartStore.getProxy().url,
      // Grab Value of combobox
      comboVal = this.getView().getReferences().smartformularysearchcombo.lastQuery;

    // Set proxy url of original store with new proxy url of combobox store
    headersStore.setProxy({
      type: 'formulary',
      url: proxyUrl + '?searchstring=' + comboVal
    });

    headersStorePaged.loadPage(1);

    // Load store with combobox store info
    headersStore.load();
  },

  onPageSizeSelect: function (pageSizeCombo) {
    var me = this,
      newCount = parseInt(pageSizeCombo.value, 10),
      searchParams = this.getViewModel().get('searchParams');

    searchParams.count = newCount;

    this.getViewModel().getStore('formularyheaderspaged').setPageSize(newCount);

    this.getViewModel().getStore('formularyheaders').load({
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

  onMissingFDBNDCsClick: function () {
    window.open(Atlas.apiReportURL + '?%2fAtlas%2fFormulary%2fMissingFDBDrugs');
  },

  onClearFiltersClick: function () {
    var headersStore = this.getViewModel().getStore('formularyheaders'),
      grid = this.getView().down('grid'),
      columns = grid.columnManager.getColumns();

    headersStore.setProxy({
      type: 'formulary',
      url: '/formularyheader',
      idParam: 'frmlrysk',
      skParam: ''
    });

    this.onPageSizeSelect({
      value: 25
    });
    columns.forEach(function (column) {
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
  }
});
