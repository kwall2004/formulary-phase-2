/**
 * This Class represents the Pharmacy and Patient Tab within the Pharmacy Information tab of Pharmacy Credentialing Module
 */
Ext.define('Atlas.pharmacy.view.credentialing.tabs.pharmacy.PharmacyAndPatient', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pharmacy-pharmacyandpatient',
    reference: 'pharmacyAndPatientFormRef',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [

        {
            xtype: 'panel',
            flex: 1,
            overflowY: true,
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'left'
            },
            items: [
                {
                    xtype: 'panel',
                    title: 'Pharmacy Information',
                    scrollable: true,
                    defaults: {
                        width: 450,
                        labelWidth: 142
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Legal Business Name',
                            emptyText: 'Legal Business Name',
                            name: 'LegalBusinessNAME'
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Dispenser Class',
                            emptyText: '[Dispenser Type]',
                            forceSelection: true,
                            name: 'DispenserClass',
                            bind: {
                                store: '{dispenserclasslist}'
                            },
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Name',
                            emptyText: 'Name',
                            name: 'PharmacyName'
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    emptyText: 'Federal TaxID',
                                    fieldLabel: 'Federal TaxID',
                                    labelWidth: 140,
                                    name: 'FederalTaxID'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Federal Tax History',
                                    // margin: 5,
                                    handler: 'getFederalTaxHistory'
                                }
                            ]
                        }
                    ]
                },

                {
                    xtype: 'panel',
                    title: 'Business Information',
                    layout: {
                        type: 'table',
                        columns: 2,
                        tdAttrs: {
                            align: 'right',
                            padding: 5
                        }
                    },
                    defaults: {
                        labelWidth: 201,
                        margin: '0 0 0 20'
                    },
                    scrollable: true,
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: '% of Business ',
                                    flex: 1
                                },
                                {
                                    xtype: 'label',
                                    text: '|   State Licensed?',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: '% of Business',
                                    flex: 1
                                },

                                {
                                    xtype: 'label',
                                    text: '|   State Licensed?',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Retail',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    emptyText: '[ % ]',
                                    hideTrigger: true,
                                    name: 'RetBusPct',
                                    width: 50
                                },

                                {
                                    xtype: 'checkbox',
                                    name: 'RetLicensed',
                                    padding: '0 0 0 70',
                                    uncheckedValue: false
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Mail Service',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    emptyText: '[ % ]',
                                    hideTrigger: true,
                                    name: 'MailSrvBusPct',
                                    width: 50
                                },

                                {
                                    xtype: 'checkbox',
                                    name: 'MailSrvLicensed',
                                    padding: '0 0 0 70',
                                    uncheckedValue: false
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Long Term Care',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    emptyText: '[ % ]',
                                    hideTrigger: true,
                                    name: 'LonTrmBusPct',
                                    width: 50
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'LonTrmLicensed',
                                    padding: '0 0 0 70',
                                    uncheckedValue: false
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Specialty',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    emptyText: '[ % ]',
                                    hideTrigger: true,
                                    name: 'SpecDspnsrBusPct',
                                    width: 50
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'SpecDspnsrLicensed',
                                    padding: '0 0 0 70',
                                    uncheckedValue: false
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Compounding',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    emptyText: '[ % ]',
                                    hideTrigger: true,
                                    name: 'CompBusPct',
                                    width: 50
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'CompLicensed',
                                    padding: '0 0 0 70',
                                    uncheckedValue: false
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'IV Infusion',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    emptyText: '[ % ]',
                                    hideTrigger: true,
                                    name: 'IVFusBusPct',
                                    width: 50
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'IVFusLicensed',
                                    padding: '0 0 0 70',
                                    uncheckedValue: false
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Indian Tribal Unit',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    emptyText: '[ % ]',
                                    hideTrigger: true,
                                    name: 'busPctITU',
                                    width: 50
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'licensedITU',
                                    padding: '0 0 0 70',
                                    uncheckedValue: false
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Indian Health Service',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    emptyText: '[ % ]',
                                    hideTrigger: true,
                                    name: 'busPctIHS',
                                    width: 50
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'licensedIHS',
                                    padding: '0 0 0 70',
                                    uncheckedValue: false
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: '340B',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    emptyText: '[ % ]',
                                    hideTrigger: true,
                                    name: 'busPct340B',
                                    width: 50
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'licensed340B',
                                    padding: '0 0 0 70',
                                    uncheckedValue: false
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Internet',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    emptyText: '[ % ]',
                                    hideTrigger: true,
                                    name: 'InternetBusPct',
                                    width: 50
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'InternetLicensed',
                                    padding: '0 0 0 70',
                                    uncheckedValue: false
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: 'Other Questions',
                    defaults: {
                        xtype: 'checkbox',
                        uncheckedValue: false
                    },
                    items: [
                        {
                            boxLabel: ' Does your pharmacy have a store front with the name posted?',
                            name: 'NamePost'
                        }, {
                            boxLabel: 'Do members have access to walk in and get prescriptions while they wait?',
                            name: 'PrepWait'
                        }, {
                            boxLabel: 'Has your pharmacy had any claims, settlements or judgements against it in the last 10 years?',
                            name: 'Litigation'
                        }, {
                            boxLabel: ' Has your pharmacy ever filed for bankruptcy, receivership or reorganization?',
                            name: 'BusFail'
                        }, {
                            boxLabel: 'Has your pharmacy been sited for violation of any state or federal laws or payment requirements?',
                            name: 'LegalViolations'
                        }, {
                            boxLabel: 'Has any pharmacist working in your pharmacy had action taken against them by a state or federal agency or licensing board?',
                            name: 'Allegations'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            title: 'Physical Location Provider Hours (if different from NCPDP info):',
            flex: 1,
            overflowY: true,
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'top'
            },
            items: [
                {
                    xtype: 'panel',
                    defaults: {
                        width: 450,
                        labelWidth: 142,
                        padding: 5
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'M-F',
                            emptyText: '8:00AM - 9:00PM',
                            name: 'PharHrM-F'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Sat',
                            emptyText: '8:00AM - 9:00PM',
                            name: 'PharHrSat'
                        },

                        {
                            xtype: 'textfield',
                            fieldLabel: 'Sun',
                            emptyText: '8:00AM - 9:00PM',
                            name: 'PharHrSun'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    defaults: {
                        xtype: 'checkbox',
                        uncheckedValue: false
                    },
                    items: [
                        {
                            boxLabel: 'Patient counseling?',
                            name: 'PatCnslng'
                        }, {
                            boxLabel: 'Delivery service provided?',
                            name: 'deliveryServProv'
                        }, {
                            boxLabel: 'Written literature about the prescription being dispensed?',
                            name: 'Literature'
                        }, {
                            boxLabel: 'Physical location compounding service?',
                            name: 'PhyLocCompSrv'
                        }, {
                            boxLabel: 'Separate charge for delivery service?',
                            name: 'SepChrDelSrv'
                        }, {
                            boxLabel: 'Physical location language?',
                            name: 'PhyLocLang'
                        }, {
                            boxLabel: 'Physical location?',
                            name: 'PhyLoc'
                        }, {
                            boxLabel: 'Mail Order Services outside your state?',
                            name: 'mailService'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: 'Other Services Provided',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'textarea',
                            margin: 20,
                            name: 'OtherSvcsProvided'
                        }
                    ]
                }
            ]
        }
    ]
});