Ext.define('Atlas.letter.createeditletter.CLWPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'CLWPanel',
    viewModel: 'letter-clwviewmodel',
    collapsible: true,
    collapseDirection: 'left',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype:'fieldset',
            collapsible: true,
            title: 'Claim Info',
            defaults: {
                xtype: 'displayfield',
                isFormField: false
            },
            items: [
                {fieldLabel: 'Authe ID:'},
                {fieldLabel: 'Auth Date:'},
                {fieldLabel: 'Reviewer:'},
                {fieldLabel: 'Plan name:'}
            ],
            bind: {
                hidden:'{!showClaim}'
            }
        },
        {
            xtype:'fieldset',
            collapsible: true,
            title: 'MedicationNew',
            defaults: {
                xtype: 'textfield',
                readOnly: true
            },
            items: [
                {fieldLabel: 'GCN:'},
                {fieldLabel: 'GPI Code:'},
                {fieldLabel: 'Drug:'}
            ],
            bind: {
                hidden:'{!showMedication}'
            }
        },
        {
            xtype:'fieldset',
            collapsible: true,
            title: 'Member',
            defaults: {
                xtype: 'displayfield'
            },
            items: [
                {fieldLabel: 'ID:', bind: { value: '{MCSRecipientId}'} },
                {fieldLabel: 'Name:'},
                {fieldLabel: 'LOB:'},
                {fieldLabel: 'Phone:'},
                {fieldLabel: 'DOB:'},
                {fieldLabel: 'Gender:'}
            ],
            bind: {
                hidden:'{!showMember}'
            }
        },
        {
            xtype:'fieldset',
            collapsible: true,
            title: 'PCP',
            defaults: {
                xtype: 'displayfield'
            },
            items: [
                {fieldLabel: 'NPI:'},
                {fieldLabel: 'Name:'},
                {fieldLabel: 'Phone:'},
                {fieldLabel: 'Fax:'}
            ],
            bind: {
                hidden:'{!showPCP}'
            }
        },
        {
            xtype:'fieldset',
            collapsible: true,
            title: 'Pharmacy',
            defaults: {
                xtype: 'displayfield'
            },
            items: [
                {fieldLabel: 'NCPDP:'},
                {fieldLabel: 'Name:'},
                {fieldLabel: 'Phone:'}
            ],
            bind: {
                hidden:'{!showPharmacy}'
            }
        }
    ]
});