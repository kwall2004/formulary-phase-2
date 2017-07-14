Ext.define('Atlas.atlasformulary.view.missingndc.EditController', {
  alias: 'controller.missingNdc_edit',
  extend: 'Ext.app.ViewController',
  require: ['Ext.window.Toast'],

  workingMsg: 'Processing...',

  init: function () {
    var dataSource = this.getViewModel().get('dataSource');
    var references = this.getReferences();

    if (dataSource === 'FDB') {
      references.fdbndcsearchcombo.setVisible(true);
      references.medispangpisearchcombo.setVisible(true);
      references.medispanndcsearchcombo.setDisabled(true);
      references.fdbgcnsearchcombo.setDisabled(true);
    } else if (dataSource === 'Medispan') {
      references.medispanndcsearchcombo.setVisible(true);
      references.fdbgcnsearchcombo.setVisible(true);
      references.fdbndcsearchcombo.setDisabled(true);
      references.medispangpisearchcombo.setDisabled(true);
    }
  },

  onCancel: function () {
    this.getView().destroy();
  },

  onSave: function () {
    var me = this;
    me.getView().mask(this.workingMsg);
    this.getViewModel().get('missingNDC').save({
      success: function () {
        me.getView().unmask();
        Ext.toast('Successfully added custom NDC.');
        me.getView().fireEvent('customNDCAdded');
        me.getView().destroy();
      },
      failure: function () {
        me.getView().unmask();
        Ext.toast('There was an error while adding the custom NDC.');
      }
    });
  },

  onNDCSelect: function (combo, record) {
    var missingNDC = this.getViewModel().get('missingNDC');
    missingNDC.set('NDC', record.get('NDC'));
    missingNDC.set('LabelName', record.get('LabelName'));
    var dataSource = this.getViewModel().get('dataSource');
    if (dataSource === 'FDB') {
      this.lookup('fdbndcsearchcombo').setValue(record.get('NDC'));
    } else if (dataSource === 'Medispan') {
      this.lookup('medispanndcsearchcombo').setValue(record.get('NDC'));
    }
  },

  onGCNSelect: function (combo, record) {
    this.lookup('fdbgcnsearchcombo').setValue(record.get('GCN_SEQNO'));
  },

  onGPISelect: function (combo, record) {
    this.lookup('medispangpisearchcombo').setValue(record.get('GPI'));
  }
});