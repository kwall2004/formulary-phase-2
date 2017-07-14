Ext.define('Atlas.atlasformulary.view.formularyconfig.FormularyDetailsController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.formularydetailscontroller',
  itemId: 'formularydetailscontroller',

  exportClick: function (url, type, verb) {
    Atlas.atlasformulary.data.proxy.FormularyAjax.request({
      method: 'POST',
      url: Atlas.apiReportURL + '/' + url + '?formularysk=' + this.getViewModel().data.formularyHeader.id,
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

  onImportFormularyRulesClick: function () {
    var importWindow = Ext.create(Atlas.atlasformulary.view.common.FormularyFileImport, {
      viewModel: {
        data: {
          importType: 1,
          sk: this.getViewModel().data.formularyHeader.id
        }
      }
    });
    importWindow.show();
  },

  onMissingFDBNDCsClick: function () {
    window.open(Atlas.apiReportURL + '?%2fAtlas%2fFormulary%2fMissingFDBDrugs');
  },

  onImportFormularyNDCClick: function () {
    var importWindow = Ext.create(Atlas.atlasformulary.view.common.FormularyFileImport, {
      viewModel: {
        data: {
          importType: 2,
          sk: this.getViewModel().data.formularyHeader.id
        }
      }
    });

    importWindow.show();
  },

  onViewNotesClick: function () {
    var me = this,
      viewNotesWindow = Ext.create(Atlas.atlasformulary.view.common.FormularyNotesWindow, {
        viewModel: {
          data: {
            formularySK: me.getViewModel().get('formularyHeader').get('FrmlrySK')
          }
        }
      });
    viewNotesWindow.getController().loadFormularyNotes(me.getViewModel().get('formularyHeader').get('FrmlrySK'));
    viewNotesWindow.show();
  }

});
