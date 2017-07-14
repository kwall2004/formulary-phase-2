Ext.define('Atlas.atlasformulary.view.customndc.CustomNDCController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.formularycustomndc',
  require: ['Ext.window.Toast'],

  listen: {
    controller: {
      '*': {
        customNDCUpdated: 'onUpdated',
        customNDCCancelled: 'onCancelled'
      }
    }
  },

  init: function () {
    var pagingBar = this.getView().down('pagingtoolbar');
    pagingBar.down('#refresh').setHandler(this.onClearFiltersClick, this);
  },

  filter: null,

  onSearchKeyUp: function () {
    var vm = this.getViewModel(),
      searchText = vm.get('searchText').toLowerCase();

    if (searchText !== '') {
      this.filter = function (record) {
        var match = false;

        if (record.get('NDC').toLowerCase().indexOf(searchText) > -1) {
          match = true;
        }

        if (record.get('LabelName').toLowerCase().indexOf(searchText) > -1) {
          match = true;
        }

        return match;
      };
    } else {
      this.filter = null;
    }

    vm.getStore('paged').loadPage(1);
    vm.getStore('ndc').reload();
  },

  onClearFiltersClick: function () {
    var vm = this.getViewModel();

    vm.set('searchText', null);
    this.filter = null;
    vm.getStore('paged').clearFilter();

    this.getView().filters.clearFilters();
    this.onPageSizeSelect({
      value: 25
    });

    vm.getStore('paged').loadPage(1);
    vm.getStore('ndc').reload();
  },

  onAddClick: function () {
    Ext.create({
      xtype: 'customndc-add',
      autoShow: true
    });
    var button = this.lookup('addcustomndc');
    button.setDisabled(true);
  },

  onEditClick: function () {
    var grid = Ext.first('grid[itemId=customNDCGrid]'),
      selRow = grid.getSelectionModel().getSelection()[0];

    Ext.create({
      xtype: 'customndc-createedit',
      autoShow: true,
      row: selRow
    });
  },

  onViewClick: function () {
    var grid = Ext.first('grid[itemId=customNDCGrid]');

    Ext.create({
      xtype: 'customndc-read',
      autoShow: true,
      row: grid.getSelectionModel().getSelection()[0]
    });
  },

  onExportClick: function () {
    var reportingURL = Atlas.apiReportURL;
    var finalURL = reportingURL + '?%2fAtlas%2fFormulary%2fCustomNDCExport&rs:Command=Render&rc:Parameters=Collapsed';
    window.open(finalURL);
  },

  onHistoryClick: function () {
    Ext.create({
      xtype: 'customndc-history',
      autoShow: true,

      viewModel: {
        data: {
          ndc: this.getViewModel().get('selectedRow').get('NDC')
        }
      }
    });
  },

  onViewFormulariesClick: function () {
    Ext.create({
      xtype: 'customndc-viewformularies',
      autoShow: true,

      viewModel: {
        data: {
          ndc: this.getViewModel().get('selectedRow').get('NDC')
        }
      }
    });
  },

  onDeleteClick: function () {
    var view = this.getView(),
      selection = view.selection,
      store = this.getStore('ndc');

    store.getProxy().skParam = selection.data.NDC;
    Ext.Msg.show({
      title: 'Delete Custom NDC: Confirmation',
      message: 'Are you sure you want to delete the NDC <strong>' + selection.data.NDC + ' ?</strong>',
      buttons: Ext.Msg.YESNO,
      icon: Ext.Msg.QUESTION,
      fn: function (button) {
        if (button === 'yes') {
          view.mask(this.workingMsg);
          selection.drop();
          selection.erase({
            success: function (selection) { // eslint-disable-line no-shadow
              view.unmask();
              Ext.toast('<strong>' + selection.data.NDC + ' was deleted.</strong>', 'Custom NDC deleted', 't');
            },
            failure: function () {
              view.unmask();
            },
            callback: function () {
              store.reload();
            }
          });
        }
      }
    });
  },

  onCancelClick: function () {
    this.getView().destroy();
  },

  onUpdated: function () {
    this.getViewModel().getStore('ndc').reload();
    var button = this.lookup('addcustomndc');
    button.setDisabled(false);
    button.focus();
  },

  onCancelled: function () {
    this.getViewModel().getStore('ndc').reload();
    var button = this.lookup('addcustomndc');
    button.setDisabled(false);
  },

  onLoad: function (store, records) {
    var vm = this.getViewModel();

    if (this.filter) {
      vm.getStore('paged').getProxy().setData(records.filter(this.filter));
    } else {
      vm.getStore('paged').getProxy().setData(records);
    }

    vm.getStore('paged').reload();
  },

  onPageSizeSelect: function (combo) {
    var vm = this.getViewModel();

    vm.getStore('paged').loadPage(1);
    vm.getStore('paged').setPageSize(parseInt(combo.value, 10));
    this.getView().down('pagingtoolbar').doRefresh();
  },

  onPageSizeAfterRender: function (combo) {
    combo.select([25]);
  }
});
