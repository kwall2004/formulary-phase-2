Ext.define('Atlas.atlasformulary.view.missingndc.MissingNDCController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.missingndc',

  workingMsg: 'Processing...',

  init: function () {
    var pagingBar = this.getView().down('#pagingBar');
    pagingBar.down('#refresh').setHandler(this.reloadGrid, this);
  },

  reloadGrid: function () {
    var dataSource = this.getViewModel().get('dataSource');
    if (dataSource === 'FDB') {
      this.getViewModel().getStore('missingFdbNDCs').reload();
    } else if (dataSource === 'Medispan') {
      this.getViewModel().getStore('missingNDCs').reload();
    }
  },

  onSearchChanged: function () {
    var searchText = this.getViewModel().get('searchText').toLowerCase();
    if (searchText !== '') {
      this.getViewModel().getStore('missingNDCsPaged').filterBy(function (record) {
        var match = false;

        if (record.get('NDC').toLowerCase().indexOf(searchText) > -1) {
          match = true;
        }

        if (record.get('LabelName') && record.get('LabelName').toLowerCase().indexOf(searchText) > -1) {
          match = true;
        }

        return match;
      }, this);
    } else {
      this.getViewModel().getStore('missingNDCsPaged').clearFilter();
    }
  },

  onClearFiltersClicked: function () {
    this.getViewModel().getStore('missingNDCsPaged').clearFilter();
    this.getViewModel().set('searchText', '');
  },

  onNDCAddClick: function () {
    var dataSource = this.getViewModel().get('dataSource');
    var addWindow = Ext.create('Atlas.atlasformulary.view.missingndc.Add', {
      dataSource: dataSource
    });
    addWindow.on('customNDCAdded', this.reloadGrid, this);
    addWindow.show();
  },

  onNDCEditClick: function () {
    var selection = this.getView().selection;
    var dataSource = this.getViewModel().get('dataSource');

    var editWindow = Ext.create('Atlas.atlasformulary.view.missingndc.Edit', {
      missingNdc: selection,
      dataSource: dataSource
    });

    editWindow.on('customNDCAdded', this.reloadGrid, this);
    editWindow.show();
  },

  onExportMissingNDCClick: function () {
    var dataSource = this.getViewModel().get('dataSource'),
      reportingURL = Atlas.apiReportURL,
      finalURL = null;

    if (dataSource === 'Medispan') {
      finalURL = reportingURL + '?%2fAtlas%2fFormulary%2fMissingNDCExport&rs:Command=Render&rc:Parameters=Collapsed';
      window.open(finalURL);
    } else if (dataSource === 'FDB') {
      finalURL = reportingURL + '?%2fAtlas%2fFormulary%2fMissingNDCExport_Medispan&rs:Command=Render&rc:Parameters=Collapsed';
      window.open(finalURL);
    }
  },

  onNDCDeleteClick: function () {
    var view = this.getView(),
      selection = view.selection,
      dataSource = this.getViewModel().get('dataSource'),
      storeString = '';

    if (dataSource === 'FDB') {
      storeString = 'missingFdbNDCs';
    } else if (dataSource === 'Medispan') {
      storeString = 'missingNDCs';
    }

    var store = this.getViewModel().getStore(storeString);
    store.getProxy().skParam = selection.data.NDC;
    var selectedNdc = selection.data.NDC;

    Ext.Msg.show({
      title: 'Delete the NDC: Confirmation',
      message: 'Are you sure you want to delete the NDC <strong>' + selection.data.NDC + ' ?</strong>',
      buttons: Ext.Msg.YESNO,
      icon: Ext.Msg.QUESTION,
      fn: function (button) {
        if (button === 'yes') {
          view.mask(this.workingMsg);
          store.remove(selection);
          store.sync({
            success: function () {
              view.unmask();
              Ext.toast('<strong>' + selectedNdc + ' was deleted.</strong>', 'NDC deleted', 't');
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

  onMissingNDCsPaged: function (store, records) {
    var missingNDCsPaged = this.getViewModel().getStore('missingNDCsPaged');

    missingNDCsPaged.getProxy().setData(records);
    missingNDCsPaged.reload();
  },

  onPageSizeSelect: function (pageSizeCombo) {
    var me = this,
      newCount = parseInt(pageSizeCombo.value, 10);

    this.getViewModel().getStore('missingNDCsPaged').setPageSize(newCount);

    this.getViewModel().getStore('missingNDCs').load({
      scope: me,
      params: {
        pageSize: newCount,
        count: newCount
      },
      callback: function () {
        this.getView().down('pagingtoolbar').doRefresh();
      }
    });
  },

  onPageSizeSelectRendered: function (pageSizeCombo) {
    pageSizeCombo.select([25]);
  },

  onSourceButtonToggled: function (combo, record) {
    var source = record.data.DrugRefDbName;
    var currentSource = this.getViewModel().get('dataSource');
    if (source === 'FDB' && currentSource !== 'FDB') {
      this.getViewModel().set('dataSource', 'FDB');
      this.getViewModel().getStore('missingFdbNDCs').load();
      this.updateDrugGridColumns();
    } else if (source === 'Medispan' && currentSource !== 'Medispan') {
      this.getViewModel().set('dataSource', 'Medispan');
      this.getViewModel().getStore('missingNDCs').load();
      this.updateDrugGridColumns();
    }
  },

  onSourceComboLoad: function (store, records) {
    var me = this;
    records.forEach(function (currentValue) {
      if (currentValue.data.DrugRefDbName === 'Medispan') {
        var sourceCombo = me.getReferences().datasourcecombo;
        sourceCombo.setValue(currentValue);
        me.getViewModel().set('dataSource', currentValue.data.DrugRefDbName);
      }
    });

    var dataSource = this.getViewModel().get('dataSource');
    if (dataSource === 'FDB') {
      this.getViewModel().getStore('missingFdbNDCs').load();
    } else if (dataSource === 'Medispan') {
      this.getViewModel().getStore('missingNDCs').load();
    }
    this.updateDrugGridColumns();
  },

  updateDrugGridColumns: function () {
    var references = this.getReferences();
    var dataSource = this.getViewModel().get('dataSource');

    if (dataSource === 'FDB') {
      references.medispanndccolumn.setVisible(false);
      references.fdbndccolumn.setVisible(true);
      references.fdbgcncolumn.setVisible(false);
      references.medispangpicolumn.setVisible(true);
    } else if (dataSource === 'Medispan') {
      references.medispanndccolumn.setVisible(true);
      references.fdbndccolumn.setVisible(false);
      references.fdbgcncolumn.setVisible(true);
      references.medispangpicolumn.setVisible(false);
    }
  }

});
