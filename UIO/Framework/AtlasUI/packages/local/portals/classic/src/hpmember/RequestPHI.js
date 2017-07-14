Ext.define('Atlas.portals.view.hpmember.RequestPHI', {
    extend: 'Ext.Container',
    xtype: 'portalshpmemberrequestphi',
    controller: 'portalshpmemberrequestphi',
    scrollable: 'y',
    viewModel: {
        data: {
            userTitle: '',
            basePhiURL: 'resources/hpmember/forms/phi',
            userState: '',
            address: {}
        }
    },
    title: 'Request PHI',
    items: {
        xtype: 'panel',
        title: 'Request Protected Health Information',
        cls: 'card-panel',
        bodyPadding: '15 50 15 15',
        width: 680,
        items: [
            {
                xtype: 'fieldset',
                title: 'Member Info',
                width: 400,
                defaults: {
                    xtype: 'displayfield',
                    labelWidth: 100
                },
                items: [
                    {
                        reference: 'recipientId',
                        name: 'recipientId',
                        hidden: true
                    },
                    {
                        fieldLabel: 'Member ID',
                        reference: 'memberId',
                        name: 'memberId'
                    },
                    {
                        fieldLabel: 'Last Name',
                        reference: 'lastname',
                        name: 'lastname'
                    },
                    {
                        fieldLabel: 'First Name',
                        reference: 'firstname',
                        name: 'firstname'
                    },
                    {
                        reference: 'reasonId',
                        name: 'reasonId',
                        value: '',
                        hidden: true
                    }
                ]
            },
            {
                xtype: 'container',
                style: {
                    padding: '20px 0'
                },
                defaults: {
                    xtype: 'container',
                    width: 525
                },
                items: [
                {
                    html: '<p style="color: red; font-weight: 600">Please click on the links below to open the PHI Request forms.</p>'
                },
                {
                    bind: {
                        html: '<p style="color: red; font-weight: 600">The first link opens a release form that allows {userTitle} to release information to the member.</p>'
                    }
                },
                {
                    bind: {
                        html: '<p style="color: red; font-weight: 600">The second link opens a release form that allows {userTitle} to release information to other organizations,' +
                        'or for other organizations to release information to {userTitle}.</p>'
                    }
                },
                {
                    bind: {
                        html: '<p style="color: red; font-weight: 600">Both forms can be filled out online.  They both need to be printed, signed and sent back to {userTitle} ' +
                        ' at the address indicated on the form.</p>'
                    }
                }
            ]
            },
            {
                xtype: 'container',

                style: {
                    width: 350
                },

                items: {
                    xtype: 'container',

                    bind: {
                        html: '<br><span style="font-weight: 600">{userTitle}</span>' +
                        '<br><span style="font-weight: 600">Attn: Privacy Officer</span>' +
                        '<br><span style="font-weight: 600">{address.line1}</span>' +
                        '<br><span style="font-weight: 600">{address.line2}</span>' +
                        '<br><span style="font-weight: 600">{address.details}</span>'
                    }
                }
            },
            {
                xtype: 'container',

                style: {
                    width: 580
                },

                items: {
                    xtype: 'container',

                    bind: {
                        html: '<br><a href="{basePhiURL}/phirequestform_{userState}.pdf" target=_blank>Click here to download Request for Protected Health Information</a>' +
                            '<br><a href="{basePhiURL}/phiclaimrequestform_{userState}.pdf" target=_blank>Click here to download Authorization for Release of Protected Health Information (Claims)</a>'
                    }
                }
            }
        ]
    }
});