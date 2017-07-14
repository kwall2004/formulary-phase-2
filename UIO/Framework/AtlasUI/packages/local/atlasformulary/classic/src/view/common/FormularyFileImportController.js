Ext.define('Atlas.atlasformulary.view.common.FormularyFileImportController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.formularyfileimport',
  requires: 'Ext.window.MessageBox',

  init: function (view) {
    this.callParent(view);

    view.down('#usernameField').setValue(Atlas.user.un);
    view.down('#sessionIdField').setValue(Atlas.sessionId);
  },

  onSaveClick: function () {
    var me = this,
      form = this.getReferences().formularyfileimportform,
      vm = this.getViewModel();

    if (form.isValid()) {
      form.submit({
        url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/fileimport?sk=' + vm.get('sk') + '&userid=' + Atlas.user.un + '&uploadtype=' + vm.get('importType'),

        success: function () {
          Ext.Msg.alert('Success', 'Please review the job queue for results.');
          me.getView().destroy();
        },
        failure: function () {
          //TODO: HACK!!! Get rid of this in favor of success call once we work out CORS issues with Sencha.
          Ext.Msg.alert('Success', 'Please review the job queue for results.');
          me.getView().destroy();
        }
      });
    }
  }
});
