Ext.define('Atlas.atlasformulary.view.umprograms.UMCriteriaPopUpController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.umcriteriapopup',

  init: function () {
    if (this.getViewModel().get('mode') === 'read' || this.getViewModel().get('mode') === 'view') {
      var view = this.getView();

      view.down('#btnSave').setHidden(true);
      view.down('#btnCancel').setText('OK');
    }
  },

  onCancel: function () {
    this.getView().destroy();
  },

  onSave: function () {
    var me = this;
    if (!this.onSaveValidation()) {
      Ext.toast('Failed to update UM because a PA or ST not selected.');
    } else {
      this.getViewModel().get('umcriteriarec').save({
        failure: function () {
          Ext.toast('Failed to update UM!');
        },

        success: function () {
          Ext.toast('Successfully updated UM!');
          me.fireEvent('umCriteriaSaved');
          me.getView().destroy();
        }
      });
    }
  },

  onSaveValidation: function () {
    var record = this.getViewModel().get('umcriteriarec');
    if (record.data.PAInd == true && record.data.PAName == null) { // eslint-disable-line no-eq-null, eqeqeq
      return false;
    }
    if (record.data.IsSTRequired == true && record.data.StepTherapyName == null) { // eslint-disable-line no-eq-null, eqeqeq
      return false;
    }
    return true;
  }
});
