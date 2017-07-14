Ext.define('Atlas.atlasformulary.view.common.AddFormularyNotesWindowCtrl', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.addformularynoteswindow',

  onSaveFormularyNote: function () {
    var me = this,
      formularyNote = this.getViewModel().get('note');

    if (formularyNote.Subject && formularyNote.Subject != '' && formularyNote.Notes && formularyNote.Note != '') { // eslint-disable-line eqeqeq
      Atlas.atlasformulary.data.proxy.FormularyAjax.request({
        method: 'POST',
        url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/formularynotes',
        params: formularyNote,
        headers: {
          'sessionid': Atlas.sessionId,
          'username': Atlas.user.un
        },
        success: function () {
          Ext.toast('Note saved.', 'Success');
          me.fireEvent('newFormularyNoteSaved');
          me.onCloseClick();
        },
        failure: function () {
          Ext.toast('Could not save note.', 'Failure');
          me.onCloseClick();
        }
      });
    } else {
      Ext.toast('Please fill in all fields.', 'Error');
    }
  },

  onCloseClick: function () {
    this.getView().destroy();
  }

});
