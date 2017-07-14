Ext.define('Atlas.portals.view.hpmember.UsageConditions', {
    extend: 'Ext.window.Window',
    xtype: 'hpmember-usageconditions',
    controller: 'usageconditionscontroller',
    title: 'Terms and Conditions',
    modal: true,
    width: 600,
    closable: false,

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',

        defaults: {
            xtype: 'button'
        },

        items: [
            '->',
            {
                text: 'I agree',
                handler: 'onOkClick',
                bind: {
                    disabled: '{isIAgreeDisabled}'
                }
            },
            {
                text: 'I do not agree',
                handler: 'onCancelClick'
            },
            '->']
    }],

    items: [{
        xtype: 'panel',
        defaults: {
            xtype: 'displayfield',
            padding: 10
        },
        items: [
            {
                bind: 'Please take a minute to review and accept our Privacy Policy and Terms of Use before continuing.'
            },
            {
                xtype: 'checkboxfield',
                reference: 'privacyAndTerms',
                bind: {
                    boxLabel: '{conditionDescription} {conditionUrl}'
                },
                listeners: {
                    change: 'onPrivacyAndTermsChange'
                }
            }
        ]
    }]
});