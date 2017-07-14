Ext.define('Atlas.portals.view.provider.Feedback', {
  extend: 'Ext.Container',
  xtype: 'portalsproviderfeedback',
  controller: 'portalsproviderfeedback',

  viewModel: {
    stores: {
      FeedbackStore: {
        model: 'Atlas.portals.model.Feedback',
        remoteSort: true,
        remoteFilter: true
      }
    }
  },

  items: [
    {
      xtype: 'form',
      cls: 'card-panel',
      title: 'Feedback Form',
      reference: 'feedbackForm',
      width: 700,

      items: [
        {
          xtype: 'container',
          padding: '0 0 0 7',
          html: '<p>We are always interested in hearing from our users as we strive to improve our services. Please ' +
          'use the form below to send us suggestions or comments. If you would like to send an inquiry, please enter ' +
          'your name and email in the optional information section.</p>'
        },
        {
          xtype: 'fieldset',
          title: 'Optional',

          items: [{
            xtype: 'textfield',
            width: 400,
            fieldLabel: 'Name',
            id: 'feedbacknamefield'
          },
          {
            xtype: 'textfield',
            width: 400,
            fieldLabel: 'Email',
            id: 'feedbackemailfield'
          }]
        },
        {
          xtype: 'fieldset',
          title: 'Required',

          items: [{
            xtype: 'combobox',
            width: 400,
            editable: false,
            selectOnFocus: false,
            fieldLabel: 'Subject',
            store: [
              'General Feedback', 'Website Error',
              'Suggestions - Eligibility Inquiry',
              'Suggestions - Authorization',
              'Suggestions - Member',
              'Suggestions - Provider',
              'Suggestions - Claims',
              'Suggestions - HEDIS',
              'Suggestions - Others'
            ],
            id: 'feedbacksubjectfield',
            value: 'General Feedback'
          },
          {
            xtype: 'textareafield',
            fieldLabel: 'Message',
            id: 'feedbackmessagefield',
            maxHeight: 400,
            width: 600,
            scrollable: true
          }]
        }
      ],

      bbar: ['->',
        {
          xtype: 'button',
          text: 'Submit',
          handler: 'onSubmitClick'
        }, {
          xtype: 'button',
          text: 'Clear',
          handler: 'onClearClick'
        }
      ]
    }
  ]
});