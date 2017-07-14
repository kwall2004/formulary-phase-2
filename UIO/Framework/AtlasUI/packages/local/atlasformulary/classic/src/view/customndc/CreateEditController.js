Ext.define('Atlas.atlasformulary.view.customndc.CreateEditController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.formularycreateeditcontroller',
  require: [ 'Ext.window.Toast' ],

  workingMsg: 'Processing...',

  onCancelClick: function () {
    this.getView().destroy();
  },

  onSaveCustomNDCClick: function (button) {
    var me = this,
      saveModel = this.getViewModel().get('customNDC2');
    me.getView().mask(this.workingMsg);
    saveModel.save({
      failure: function () {
        me.getView().unmask();
        Ext.toast('Failed to update NDC!');
      },
      success: function () {
        me.getView().unmask();
        Ext.toast('NDC was updated successfully.');
        me.fireEvent('customNDCUpdated');
      },
      callback: function () {
        button.up('window').destroy();
      }
    });
  },

  onChange: function () {
    this.lookupReference('customndceditsave').enable();
  }
});
