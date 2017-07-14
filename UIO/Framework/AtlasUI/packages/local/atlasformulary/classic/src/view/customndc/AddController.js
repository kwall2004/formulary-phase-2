Ext.define('Atlas.atlasformulary.view.customndc.AddController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.formularyaddcontroller',
  require: [ 'Ext.window.Toast' ],

  workingMsg: 'Processing...',

  onCancelClick: function () {
    var me = this;
    me.fireEvent('customNDCCancelled');
    this.getView().destroy();
  },

  onAddClick: function () {
    var me = this;
    me.getView().mask(this.workingMsg);
    this.getViewModel().get('customNDC').save({
      failure: function (record, operation) {
        //TODO: after exception handling message codes are being sent, confirm the code and send the appropriate message.
        var exceptionString = operation.error.response.responseText,
          exceptionToFind = '"ExceptionCode":"',
          exceptionToFindLength = exceptionToFind.length,
          exceptionPosition = exceptionString.search(exceptionToFind);
        var exceptionCode = exceptionString.substr(exceptionToFindLength + exceptionPosition, 3);
        var errorMessage = '';
        switch (exceptionCode) {
          case '030':
            errorMessage = 'NDC must be 11 digits.';
            break;
          case '031':
            errorMessage = 'NDC must be unique.';
            break;
          case '032':
            errorMessage = 'NDC must be numeric value';
            break;
          default:
            errorMessage = 'Failed to create NDC';
        }
        me.getView().unmask();
        Ext.Msg.alert({
          title: 'Custom NDC Error',
          iconCls: 'x-fa fa-warning',
          message: errorMessage,
          buttons: Ext.MessageBox.OK
        });
      },
      success: function () {
        me.getView().unmask();
        Ext.toast('Successfully created custom NDC!');
        me.fireEvent('customNDCUpdated');
        me.getView().destroy();
      }
    });
  }
});