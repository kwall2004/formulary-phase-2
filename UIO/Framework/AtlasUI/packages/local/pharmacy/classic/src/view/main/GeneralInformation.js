Ext.define('Atlas.pharmacy.view.main.GeneralInformation', {
    extend: 'Ext.form.Panel',

    xtype: 'pharmacy-general',

    requires: [
        'Ext.layout.container.Column'
    ],

    controller: 'pharmacy-general',

    layout: 'column',
    scrollable: true,
    defaults: {
        xtype: 'container',
        columnWidth: 0.5,
        defaults: {
            xtype: 'fieldset',
            collapsible: true,
            layout: 'anchor',
            defaults: {
                xtype: 'displayfield',
                anchor: '100%',
                labelWidth: 140
            }
        }
    },
    items: [
        {
            items: [
                {
                    title: 'Physical Location Information',
                    items: [
                        {
                            fieldLabel: 'Legal Business Name',
                            name: 'legalBusinessName'
                        },
                        {
                            fieldLabel: 'Store Close Date',
                            userCls: 'm-red-color-displayfield',
                            name: 'locCloseDate'
                        },
                        {
                            fieldLabel: 'Dispenser Class',
                            name: 'dispClassCode',
                            renderer: function (value) {
                                return Ext.isArray(value) ? value[0] : value;
                            }
                        },
                        {
                            fieldLabel: 'NCPDP ID',
                            name: 'ncpdpid'
                        },
                        {
                            fieldLabel: 'NPI',
                            name: 'npi'
                        },
                        {
                            fieldLabel: 'DEA',
                            name: 'deaid'
                        },
                        {
                            fieldLabel: 'Address',
                            name: 'locAddress1'
                        },
                        {
                            hideEmptyLabel: false,
                            name: 'locAddressLine2'
                        },
                        {
                            fieldLabel: 'Cross Street',
                            name: 'locCrossStreet'
                        },
                        {
                            fieldLabel: 'Phone',
                            name: 'locPhone',
                            renderer: function (value) {
                                return Atlas.common.Util.formatPhone(value);
                            }
                        },
                        {
                            fieldLabel: 'Fax',
                            name: 'locFax',
                            renderer: function (value) {
                                return Atlas.common.Util.formatfax(value);
                            }
                        },
                        {
                            fieldLabel: 'Email',
                            name: 'locEmail'
                        },
                        {
                            xtype: 'checkbox',
                            checkedValue: 'Y',
                            fieldLabel: 'Contract Sent',
                            readOnly: true,
                            name: 'ContractSendDateCheck' //TODO Find this field name in old system
                        },
                        {
                            fieldLabel: 'Contract Sent Date',
                            name: '@ContractSendDate'
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            fieldLabel: 'FWA Pharmacy Lock',
                            labelClsExtra: 'm-red-color',
                            items: [
                                {
                                    xtype: 'checkbox',
                                    itemId: 'chkFWAPharmacylock',
                                    readOnly: true
                                },
                                {
                                    xtype: 'splitter'
                                },
                                {
                                    xtype: 'displayfield',
                                    name: '@FWALockLOBDesc'
                                }
                            ]
                        },
                        {
                            fieldLabel: 'Notes',
                            labelClsExtra: 'm-red-color',
                            readOnly: true,
                            name: 'PharmacyAdditionalInfo.lockNote'
                        }
                    ]
                },
                {
                    title: 'Contract Status',
                    itemId: 'contracts',
                    items: [{
                        fieldLabel: 'Contract Status',
                        //name: '_contractStatus',
                        itemId:'contractStatusInfo'
                    }, {
                        fieldLabel: 'Effective Date',
                        name: '_effectiveDate'
                    }, {
                        fieldLabel: 'Term Date',
                        name: '_termDate'
                    }, {
                        fieldLabel: 'Contracts',
                        name: '_contracts'
                    }]
                },
                {
                    title: 'Mailing Address',
                    items: [{
                        fieldLabel: 'Address',
                        name: 'mailAddress1'
                    }, {
                        hideEmptyLabel: false,
                        name: 'mailAddress2'
                    }]
                },
                {
                    title: 'Contact Information',
                    items: [{
                        fieldLabel: 'Contact Name',
                        name: 'contactFullName'
                    }, {
                        fieldLabel: 'Contact Title',
                        name: 'contactTitle'
                    }, {
                        fieldLabel: 'Contact Phone',
                        name: 'contactPhoneExt'
                    }, {
                        fieldLabel: 'Contact Email',
                        name: 'ContactEmail'
                    }]
                },
                {
                    title: 'Ownership Details',
                    collapsed: true,
                    items: [{
                        name: '@OwnerShipHistory',
                        userCls: 'm-displayfield-table m-pharmacy-ownership',
                        renderer: function (val) {
                            return val ? Atlas.common.Util.buildTable(val, ['NCPDPID', 'Old NCPDPID', 'Old Store Closed Date', 'Ownership Eff. Date']) : '';
                        }
                    }]
                }
            ]
        },
        {
            items: [
                {
                    title: 'Services',
                    defaults: {
                        xtype: 'checkbox',
                        checkedValue: 'Y',
                        labelWidth: 230,
                        readOnly: true
                    },
                    items: [
                        {
                            fieldLabel: 'Handicap Access',
                            name: '@locHandicapAccessFlag'
                        },
                        {
                            fieldLabel: 'Drive-up Window',
                            name: '@locDriveUpFlag'
                        },
                        {
                            fieldLabel: 'Sells Durable Medical Equipment',
                            name: '@locDMEflag'
                        },
                        {
                            fieldLabel: 'Accepts E-Prescriptions',
                            name: '@locAcceptsErxFlag'
                        },
                        {
                            fieldLabel: 'Prescription Compounding Services',
                            name: '@locCompoundServFlag'
                        },
                        {
                            fieldLabel: 'Prescription Delivery Services',
                            name: '@locDeliveryServiceFlag'
                        },
                        {
                            fieldLabel: 'Open 24 Hours',
                            name: 'loc24hourFlag'
                        },
                        {
                            fieldLabel: 'Multi-Dose Packaging',
                            name: '@multiDoseIndFlag'
                        },
                        {
                            fieldLabel: 'Walk-In Clinic',
                            name: '@walkInIndFlag'
                        },
                        {
                            fieldLabel: 'Immunizations Provider',
                            name: '@immProvIndFlag'
                        },
                        {
                            fieldLabel: '340B Status',
                            name: '@status340BIndFlag'
                        },
                        {
                            fieldLabel: 'Closed Door Facility',
                            name: '@closedDoorFacilityIndFlag'
                        },
                        {
                            fieldLabel: '24 Hours Emergency Service',
                            name: '@twentyFourHourIndFlag'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Service Types (NCPDP Data)',
                            name: 'txtDispenser' // matching name from old code
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Service Type (PBM Data)',
                            name: 'txtServiceType' // matching name from old code
                        }
                    ]
                },
                {
                    title: 'Store Hours',
                    items: [{
                        name: '@fnlocHours',
                        userCls: 'm-displayfield-table m-store-hours',
                        renderer: function (val) {
                            if (Ext.isArray(val) && val.length === 1) {
                                //24 hour store
                                return val[0];
                            }

                            return val ? Atlas.common.Util.buildTable(val, ['', 'From', 'To']) : '';
                        }
                    }]
                }
            ]
        }
    ]
});
