Ext.define('Atlas.prescriber.view.detail.General', {
    extend: 'Ext.form.Panel',
    xtype: 'prescriber-general',
    reference: 'prescriber-general-form',
    title: 'General Information',
    scrollable: 'y',

    layout: {
        type: 'hbox'
    },
    listeners: {
        render: 'onRender'
    },

    defaults: {
        flex: 1,
        layout: 'anchor',
        defaults: {
            xtype: 'displayfield',
            labelWidth: 140,
            anchor: '80%'
        }
    },
    items: [
        {
            xtype: 'panel',
            cls: 'card-panel',
            title: 'General Information',
            defaults: {
                xtype: 'displayfield',
                margin: 10,
                labelWidth: 145
            },
            items: [
                {
                    fieldLabel: 'NPI',
                    name: 'npi',
                    bind: {
                        value: "{masterrecord.npi}"
                    }
                },
                {
                    fieldLabel: 'Last Name',
                    name: 'lastname',
                    bind: {
                        value: "{masterrecord.lastname}"
                    }
                },
                {
                    fieldLabel: 'First Name',
                    name: 'firstname',
                    bind: {
                        value: "{masterrecord.firstname}"
                    }
                },
                {
                    fieldLabel: 'Degree',
                    name: 'degree',
                    bind: {
                        value: "{masterrecord.degree}"
                    }


                },
                {
                    fieldLabel: 'DEA',
                    name: 'deaNum',
                    bind: {
                        value: "{masterrecord.deaNum}"
                    }
                },
                {
                    fieldLabel: 'State Licensed',
                    name: 'licstate',
                    bind: {
                        value: "{masterrecord.licstate}"
                    }
                },
                {
                    fieldLabel: 'Specialty',
                    name: 'speciality',
                    bind: {
                        value: "{masterrecord.Specialty}"
                    }

                },
                {
                    fieldLabel: 'PECOS Enrollment',
                    name: 'PECOEnrollmentOptedOut',
                    bind: {
                        value: '{masterrecord.PECOEnrollmentOptedOut}'
                    }
                },
                {
                    fieldLabel: 'PECOS Start Date',
                    name: 'PECOEnrollmentEffDate',
                    bind: {
                        value: '{masterrecord.PECOEnrollmentEffDate}'
                    }
                },
                {
                    fieldLabel: 'PECOS End Date',
                    name: 'PECOEnrollmentTermDate',
                    bind: {
                        value: '{masterrecord.PECOEnrollmentTermDate}'
                    }
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [{
                        xtype: 'container',
                        width: 150,
                        html: '<label style="color:red; font-weight:600">FWA Prescriber Lock:</label>'
                    }, {
                        xtype: 'checkbox',
                        name: 'FwaFlag',
                        bind: {
                            value: '{masterrecord.FWAPrescriberLockFlag=="yes"}'
                        },
                        disabled: true

                    }, {
                        xtype: 'textfield',
                        name: 'FWAPrescriberLockLOB',
                        disabled: true,
                        bind: {
                            value: '{masterrecord.FWAPrescriberLockLOBName}'
                        }
                    }]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [{
                        xtype: 'container',
                        width: 140,
                        html: '<label style="color:red; font-weight:600">Notes:</label>'
                    }, {
                        xtype: 'textarea',
                        disabled: true,
                        flex: 1,
                        name: 'prescriberLockNote',
                        bind: {
                            value: '{masterrecord.prescriberLockNote}'
                        }
                    }]
                }
            ]
        },
        {
            xtype: 'panel',
            cls: 'card-panel',
            title: 'Location Information',
            defaults: {
                xtype: 'displayfield',
                margin: 10
            },
            items: [
                {
                    fieldLabel: 'Address 1',
                    name: 'locaddr1',
                    bind: {
                        value: '{masterrecord.locaddr1}'
                    }
                },
                {
                    fieldLabel: 'Address 2',
                    name: 'locaddr2',
                    bind: {
                        value: '{masterrecord.locaddr2}'
                    }
                },
                {
                    fieldLabel: 'City',
                    name: 'loccity',
                    bind: {
                        value: '{masterrecord.loccity}'
                    }
                },
                {
                    fieldLabel: 'State',
                    name: 'locstate',
                    bind: {
                        value: '{masterrecord.locstate}'
                    }
                },
                {
                    fieldLabel: 'Zip',
                    name: 'zip',
                    bind: {
                        value: '{masterrecord.zip}'
                    }
                },
                {
                    fieldLabel: 'Phone',
                    name: 'locphone',
                    bind: {
                        value: '{masterrecord.locphone}'
                    }
                },
                {
                    fieldLabel: 'Fax',
                    name: 'locfax',
                    bind: {
                        value: '{masterrecord.locfax}'
                    }
                },
                {
                    fieldLabel: 'Auth Fax',
                    name: 'authfax',
                    bind: {
                        value: "{masterrecord.locauthfax}"
                    }
                }

            ]
        }
    ]
});
