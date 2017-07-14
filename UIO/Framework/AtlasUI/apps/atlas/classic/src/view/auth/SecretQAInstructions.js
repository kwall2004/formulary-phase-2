Ext.define('Atlas.view.auth.HpProviderSecretQAInstructions', {
    extend: 'Ext.window.Window',
    xtype: 'hpprovider-secretqainstructions',
    title: 'New Security Feature - Notification',
    controller: 'auth-secretqainstructions',
    width: 600,
    closable: false,
    onEsc: Ext.emptyFn, // prevent esc from closing window
    autoShow: true,
    modal: true,
    layout: 'center',
    viewModel: {
        data: {
            start: null
        }
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    text: 'Proceed',
                    reference: 'proceedButton',
                    handler: 'onProceedClick'
                },
                '->'
            ]
        }],
    defaultButton: 'validateButton',
    items: [
        {
            xtype: 'container',
            padding: 10,
            html: "<center><h2>Security Measure</h2></center>" +
            "<center><b>Please read the following carefully.</b></center>" +
            "<p>A new security measure has been implemented for MCS Web Portal users.</p>" +
            "<p>All MCS Web Portal users must select two questions from a list and supply answers to each.</p>" +
            "<p>There are two reasons for this new security measure.</p>" +
            "<ol><li>If a user forgets their password, they can supply the answers to the questions they selected.  If the answers are correct, the MCS Web Portal emails the user a new password.</li>" +
            "<li>If a user logs in from a different computer, the MCS Web Portal requires the user to answer the questions to make sure that the user is authorized to access the web portal.</li></ol>" +
            "<h3>Remember Me</h3>" +
            "<p>After answering the two questions, the user can select the 'Remember Me' check box.  This stores a cookie on the user's computer which prevents the user from having to answer their secret questions each time they login to the MCS Web Portal.</p>" +
            "<p>If the 'Remember Me' check box is not checked, the user needs to answer their questions upon each login.</p>" +
            "<h3>Logging in from a Different Computer</h3>" +
            "<p>If the user logs in from a different computer, they need to supply the answers to their questions regardless of whether the 'Remember Me' check box was selected or not.</p>"
        }
    ]
});