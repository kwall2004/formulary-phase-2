Ext.define('Atlas.portals.view.provider.FeedbackViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.portalsproviderfeedback',

  onClearClick: function () {
    this.lookup('feedbackForm').reset();
  },

  onSubmitClick: function () {
    var messageInput = Ext.getCmp('feedbackmessagefield').value,
      email = Ext.getCmp('feedbackemailfield').value,
      name = Ext.getCmp('feedbacknamefield').value,
      subject = Ext.getCmp('feedbacksubjectfield').value,
      saveAction = [{
        'Save': {
          'key': 'mode',
          'value': 'Update'
        }
      }],
      extraParameters = {
        'pSubject': subject,
        'pFromName': name,
        'pFromEmail': email,
        'pEmailMessage': messageInput,
        'userState': Atlas.user.homeState,
        'pUserState': Atlas.user.homeState,
        'pUserType': ''
      },
      returnField = ['pJobNumber'],
      submitUpdate = Atlas.common.utility.Utilities.saveData([{}], 'portal/hp/portalfeedback/update', null, [true],
        extraParameters, saveAction, returnField);

    if ('' === messageInput || null === messageInput) {
      Ext.MessageBox.alert('Feedback Error', 'Message cannot be empty.');
    } else {
      if (('' !== email && '' === name) || ('' === email && '' !== name)) {
        Ext.Msg.alert('Validation Error', 'If you are providing optional information, both optional fields need to ' +
        'be filled out.');

        return;
      }

      if (0 === submitUpdate.code) {
        Ext.Msg.alert('Feedback Successful', 'Thank you for providing us your feedback!');
        this.onClearClick();
      }
    }
  }
});