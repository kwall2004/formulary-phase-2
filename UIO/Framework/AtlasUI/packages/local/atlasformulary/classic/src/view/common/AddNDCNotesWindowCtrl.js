Ext.define('Atlas.atlasformulary.view.common.AddNDCNotesWindowCtrl', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.addndcnoteswindow',

  onSaveNDCNote: function () {
    var me = this,
      NDCNote = this.getViewModel().get('note');

    Atlas.atlasformulary.data.proxy.FormularyAjax.request({
      method: 'POST',
      url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/ndcnotes',
      params: NDCNote,
      headers: {
        'sessionid': Atlas.sessionId,
        'username': Atlas.user.un
      },
      success: function () {
        Ext.toast('Note saved.', 'Success');
        me.fireEvent('newNDCNoteSaved');
        me.onCloseClick();
      },
      failure: function () {
        Ext.toast('Could not save note.', 'Failure');
        me.onCloseClick();
      }
    });
  },

  onCloseClick: function () {
    this.getView().destroy();
  }

});
