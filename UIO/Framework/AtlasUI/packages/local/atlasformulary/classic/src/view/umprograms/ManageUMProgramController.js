Ext.define('Atlas.atlasformulary.view.umprograms.ManageUMProgramController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.manageumprogramcontroller',

  init: function () {
    var store = this.getViewModel().getStore('umprograms');
    store.reload();

    var pagingBar = this.getView().down('#pagingBar');
    pagingBar.down('#refresh').setHandler(this.doHeadersReload, this);
  },

  doHeadersReload: function () {
    this.getViewModel().getStore('umprograms').reload();
  },

  onUMProgramsPaged: function (store, records) {
    var vm = this.getViewModel(),
      programPages = vm.getStore('umprogramspaged');

    programPages.getProxy().setData(records);
    programPages.reload();
  },

  onSingleRowClick: function () {
    // var editButton = Ext.first('button[itemId=editButton]');
    // var deleteButton = Ext.first('button[itemId=deleteButton]');
    // editButton.enable();
    // deleteButton.enable();
  },
  
  onViewProgramClick: function () {
    var grid = this.getReferences('#umprogramsgrid').umprogramsgrid,
      selection = grid.selection,
      menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/umprograms.ManageUMProgram');

    if (selection.data.CvrgPrptyTypeDesc === 'Step Therapy') {
      //this.fireEvent('formularyViewOpened');
      this.fireEvent('openView', 'merlin', 'atlasformulary', 'umprograms_STCreateEdit', {
        menuId: menuId,
        PId: menuId,
        programSK: selection.data.CvrgPrptyPgmSK,
        mode: 'view',
        titleMode: 'Viewing'
      });
    } else if (selection.data.CvrgPrptyTypeDesc === 'Prior Authorization') {
      Ext.Msg.alert('Not implemented yet.');
    }
  },

  onCreatePAProgramClick: function () {
    Ext.Msg.alert('Not implemented yet.');
  },

  onCreateSTProgramClick: function () {
    var menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/umprograms.ManageUMProgram');

    //this.fireEvent('formularyCreateEditOpened');
    this.fireEvent('openView', 'merlin', 'atlasformulary', 'umprograms_STCreateEdit', {
      menuId: menuId,
      PId: menuId,
      programSK: null,
      mode: 'create',
      titleMode: 'Creating'
    });
  },

  onEditProgramClick: function () {
    var grid = this.getReferences('#umprogramsgrid').umprogramsgrid,
      selection = grid.selection,
      menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/umprograms.ManageUMProgram');

    //this.fireEvent('formularyCreateEditOpened');
    if (selection.data.CvrgPrptyTypeDesc === 'Step Therapy') {
        this.fireEvent('openView', 'merlin', 'atlasformulary', 'umprograms_STCreateEdit', {
          menuId: menuId,
          PId: menuId,
          programSK: selection.data.CvrgPrptyPgmSK,
          mode: 'edit',
          titleMode: 'Editing'
      });
    } else if (selection.data.CvrgPrptyTypeDesc === 'Prior Authorization') {
      Ext.Msg.alert('Not implemented yet.');
    }    
  },

  onCopyProgramClick: function () {
    var me = this,
      grid = this.getReferences('#umprogramsgrid').umprogramsgrid,
      selection = grid.selection,
      store = me.getStore('umprograms'),
      sk = selection.data.CvrgPrptyPgmSK,
      message = 'New copy created.';

    grid.mask('Working...');

    Atlas.atlasformulary.data.proxy.FormularyAjax.request({
      url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/UMProgram?coveragePropertyProgramSK=' + sk,
      method: 'POST',
      //jsonData: params,
      headers: {
        'sessionid': Atlas.sessionId,
        'username': Atlas.user.un
      },
      success: function (response) {
        /*var menuId = Atlas.common.Util.menuIdFromRoute('merlin/atlasformulary/manageformulary.ManageFormulary');

        me.fireEvent('formularyCreateEditOpened');
        me.fireEvent('openView', 'merlin', 'atlasformulary', 'formularyheader_CreateEdit', {
          menuId: menuId,
          PId: menuId,
          formularySK: Ext.decode(response.responseText).Rows[0],
          mode: 'edit',
          titleMode: 'Editing'
        });*/
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

  onDeleteProgramClick: function () {
    var grid = this.getReferences('#umprogramsgrid').umprogramsgrid,
      store = this.getViewModel().getStore('umprograms'),
      selection = grid.getSelection()[0];

    Ext.Msg.show({
      title: 'Delete UM Program: Confirmation',
      message: 'Are you sure you want to delete <strong>' + selection.data.CvrgPrptyPgmName + ' ?</strong>',
      buttons: Ext.Msg.YESNO,
      icon: Ext.Msg.QUESTION,
      fn: function (btn) {
        if (btn === 'yes') {
          Atlas.atlasformulary.data.proxy.FormularyAjax.request({
            method: 'DELETE',
            url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/UMProgram?coveragePropertyProgramSK=' + selection.get('CvrgPrptyPgmSK'),
            headers: {
              'sessionid': Atlas.sessionId,
              'username': Atlas.user.un
            },
            success: function () {
              Ext.toast('<strong>' + selection.get('CvrgPrptyPgmName') + ' was deleted.</strong>', 'Success', 't');
              store.reload();
            },
            failure: function () {
              Ext.toast('An error occurred while deleting the program.', 'Error', 't');
            }
          });
        }
      }
    });
  },  

  // onProgramSearchSelect: function () {
  //   // Grab store of grid on view
  //   var headersStore = this.getViewModel().getStore('formularyheaders'),
  //     headersStorePaged = this.getViewModel().getStore('formularyheaderspaged'),
  //     // Grab store of the combobox that returned results
  //     smartStore = this.getView().down('smartformularysearchcombo').getStore(),
  //     // Grab URL from proxy of the smart store
  //     proxyUrl = smartStore.getProxy().url,
  //     // Grab Value of combobox
  //     comboVal = this.getView().getReferences().smartformularysearchcombo.lastQuery;

  //   // Set proxy url of original store with new proxy url of combobox store
  //   headersStore.setProxy({
  //     type: 'formulary',
  //     url: proxyUrl + '?searchstring=' + comboVal
  //   });

  //   headersStorePaged.loadPage(1);

  //   // Load store with combobox store info
  //   headersStore.load();
  // },

  onPageSizeSelect: function (pageSizeCombo) {
    var me = this,
      newCount = parseInt(pageSizeCombo.value, 10),
      searchParams = this.getViewModel().get('searchParams');

    searchParams.count = newCount;

    this.getViewModel().getStore('umprogramspaged').setPageSize(newCount);

    this.getViewModel().getStore('umprograms').load({
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

  onClearFiltersClick: function () {
    // var headersStore = this.getViewModel().getStore('umprograms'),
    //   grid = this.getView().down('grid'),
    //   columns = grid.columnManager.getColumns();

    // headersStore.setProxy({
    //   type: 'formulary',
    //   url: '/formularyheader',
    //   idParam: 'frmlrysk',
    //   skParam: ''
    // });

    // this.onPageSizeSelect({
    //   value: 25
    // });
    // columns.forEach(function (column) {
    //   if (column.filter) {
    //     if (column.filter.type === 'string') {
    //       column.filter.setValue(null);
    //     } else if (column.filter.menu) {
    //       column.filter.menu.items.each(function (item) {
    //         if (item.setChecked) {
    //           item.setChecked(false);
    //         }
    //         return true;
    //       });
    //     }
    //   }
    // });
    // grid.filters.clearFilters();
  }
});
