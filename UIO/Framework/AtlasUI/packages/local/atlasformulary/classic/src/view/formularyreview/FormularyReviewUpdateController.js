Ext.define('Atlas.atlasformulary.view.formularyreview.FormularyUpdateController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.formularyaddnote',
  requires: [ 'Ext.window.Toast' ],

  onActionClick: function () {
    var me = this,
      vm = this.getViewModel(),
      sk = vm.getData().reviewrecord.FrmlrySK,
      reviewPriority = null,
      userId = Atlas.user.un,
      reviewNotes = Ext.first('textareafield[itemId=reviewNotes]').value,
      action = this.getViewModel().getData().action;

    Atlas.atlasformulary.model.FormularyReviewPriority.load(sk, {
      failure: function () {
        Ext.toast('Something Went wrong. Please try again.');
      },
      success: function (record) {
        var actionPath = action === 'Approve' ? '/formularyapprove' : '/formularyreject';
        reviewPriority = record.get('AprvlTypePrity');

        var payload = {
          FrmlrySK: sk,
          AprvlTypePrity: reviewPriority,
          AprvlNotes: reviewNotes,
          UserId: userId
        };

        Atlas.atlasformulary.data.proxy.FormularyAjax.request({
          url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + actionPath,

          jsonData: payload,

          headers: {
            'sessionid': Atlas.sessionId,
            'username': Atlas.user.un
          },

          failure: function () {
            if (action === 'Approve') {
              Ext.toast('There was an issue while approving the formulary!');
            } else if (action === 'Reject') {
              Ext.toast('There was an issue while rejecting the formulary!');
            }
          },
          success: function () {
            if (action === 'Approve') {
              Ext.toast('Formulary has been approved!');
            } else if (action === 'Reject') {
              Ext.toast('Formulary has been rejected!');
            }

            me.fireEvent('formularyReviewUpdateComplete');
            me.getView().destroy();
          }
        });
      }
    });
  },

  onCancelClick: function () {
    this.getView().destroy();
  }
});
