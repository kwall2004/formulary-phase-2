Ext.define('Atlas.view.auth.HpProviderTerms', {
    extend: 'Ext.window.Window',
    xtype: 'hpprovider-terms',
    controller: 'providertermscontroller',
    title: 'Provider Admin - Terms and Conditions',
    modal: true,
    width: 600,
    closable: false,
    onEsc: Ext.emptyFn, // prevent esc from closing window

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',

        defaults: {
            xtype: 'button'
        },

        items: [
            '->',
            {
                text: 'Accept Terms',
                handler: 'onAcceptClick',
                bind: {
                    disabled: '{isIAgreeDisabled}'
                }
            },
            {
                text: 'Deny Terms',
                handler: 'onDenyClick'
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
                xtype: 'fieldset',
                title: 'Terms for Organization and Administration',
                items: [
                    {
                        xtype: 'displayfield',
                        bind: '1.) Providers are responsible for communicating and maintaining accurate organizational contact information to the health plan, including authorized individuals who can approve changes or add/update user access privileges, incident management, notification, etc.'
                    },
                    {
                        xtype: 'displayfield',
                        bind: '2.) In order for HIPAA compliance to be maintained, Providers are responsible for providing immediate written notification of changes to individuals authorized to access MCS (including, but not limited to, termination of employees with access to MCS), and at all times are responsible for the physical security of all devices residing at their operational facilities.'
                    }]
            },
            {
                xtype: 'fieldset',
                title: 'Claims Processing',
                items: [
                    {
                        xtype: 'displayfield',
                        bind: '1.) Providers are responsible for ensuring that they receive a 997 for claims submitted via EDI.'
                    }
                ]
            }
        ]
    }]
});