Ext.define('Atlas.portals.prescriber.ContactDetailsWindow', {
    extend: 'Ext.Container',

    xtype: 'portalprescribercontactdetailswindow',

    controller: 'portalsprescribercontactdetailswindow',

    items: [
        {
            xtype: 'form',
            reference: 'contactForm',
            defaults: {
                flex: 1,
                xtype: 'displayfield',
                labelWidth: 100
            },
            items: [
                {
                    fieldLabel: 'Phone',
                    reference: 'pgFullContactPhone',
                    name: 'pgFullContactPhone'
                },
                {
                    fieldLabel: 'Fax',
                    reference: 'pgContactFax',
                    name: 'pgContactFax'
                },
                {
                    fieldLabel: 'Hours',
                    reference: 'pgFullAvailability',
                    name: 'pgFullAvailability'
                }
            ],
            bbar: {
                xtype: 'toolbar',

                items: [
                    '->',
                    {
                        xtype: 'button',
                        text: 'All Contact Details',
                        handler: 'goToContacts'
                    }
                ]
            }
        }
    ]
});