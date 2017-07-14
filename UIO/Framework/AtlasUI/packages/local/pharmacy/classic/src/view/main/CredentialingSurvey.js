Ext.define('Atlas.pharmacy.view.main.CredentialingSurvey', {
    extend: 'Ext.Panel',

    requires: [
        'Ext.layout.container.Accordion'
    ],
    controller: 'pharmacy-main-cred',
    viewModel: {
        type: 'pharmacy-main-cred'
    },
    layout: 'accordion',

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    text: 'Save Credentialing',
                    iconCls: 'x-fa fa-plus',
                    handler: 'onSave'
                },
                '->',
                {
                    text: 'Print Verification Sheet',
                    iconCls: 'x-fa fa-print',
                    handler: 'onPrint'
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'form',
            reference: 'general',
            title: 'General Information',
            layout: 'column',
            defaults: {
                xtype: 'container',
                layout: 'anchor',
                defaults: {
                    xtype: 'textfield',
                    anchor: '100%',
                    labelWidth: 170
                },
                columnWidth: 0.5
            },
            scrollable: true,
            items: [
                {
                    items: [
                        {
                            fieldLabel: 'Legal Business Name',
                            readOnly: true,
                            name: 'legalBusinessName'
                        },
                        {
                            fieldLabel: 'Name',
                            readOnly: true,
                            name: 'name'
                        },
                        {
                            fieldLabel: 'Contact First Name',
                            readOnly: true,
                            name: 'contactFirstName'
                        },
                        {
                            fieldLabel: 'Contact Last Name',
                            readOnly: true,
                            name: 'contactLastName'
                        },
                        {
                            fieldLabel: 'Pharmacist in Charge (PIC)',
                            name: 'PIC'
                        },
                        {
                            fieldLabel: 'PIC License #',
                            name: 'PicLic'
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'PIC Exp. Date',
                                    width: 350,
                                    emptyText: '[mm/dd/yyyy]',
                                    labelWidth: 170,
                                    name: 'PICExpDate',
                                    format: 'm/d/Y'
                                },
                                {
                                    xtype: 'displayfield',
                                    userCls: 'm-red-color-displayfield',
                                    name: '__picExpExpired'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'PIC Verf. Date',
                                    width: 350,
                                    emptyText: '[mm/dd/yyyy]',
                                    labelWidth: 170,
                                    name: 'PICVerfDate',
                                    format: 'm/d/Y'
                                },
                                {
                                    xtype: 'button',
                                    userCls: 'temp-fix-inline-bt',
                                    text: 'PIC Update History',
                                    iconCls: 'x-fa fa-history',
                                    handler: 'onWinPICVerifDate'
                                },
                                {
                                    xtype: 'displayfield',
                                    userCls: 'm-red-color-displayfield',
                                    name: '__picVerifExpired'
                                }
                            ]
                        },
                        {
                            fieldLabel: 'PIC Discip. Action',
                            name: 'PICDiscpAction'
                        },
                        {
                            fieldLabel: 'NCPDP Provider ID',
                            readOnly: true,
                            name: 'ncpdpId'
                        },
                        {
                            fieldLabel: 'National Provider ID (NPI)',
                            readOnly: true,
                            name: 'npi'
                        },
                        {
                            fieldLabel: 'Federal Tax ID',
                            readOnly: true,
                            name: 'fedTaxId'
                        },
                        {
                            fieldLabel: 'DEA Registration ID',
                            readOnly: true,
                            name: 'deaId'
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'DEA Exp. Date [NCPDP]',
                                    width: 350,
                                    anchor: false, // disable anchor so width can be taken in to account
                                    readOnly: true,
                                    labelWidth: 170,
                                    name: 'NCPDPDeaExpDate',
                                    format: 'm/d/Y'
                                },
                                {
                                    xtype: 'displayfield',
                                    userCls: 'm-red-color-displayfield',
                                    name: '__deaExpiredNCPDP'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'DEA Exp. Date',
                                    width: 350,
                                    anchor: null,
                                    emptyText: '[mm/dd/yyyy]',
                                    labelWidth: 170,
                                    name: 'DeaExpDate',
                                    format: 'm/d/Y'
                                },
                                {
                                    xtype: 'displayfield',
                                    userCls: 'm-red-color-displayfield',
                                    name: '__deaExpired'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'DEA Verf. Date',
                                    width: 350,
                                    emptyText: '[mm/dd/yyyy]',
                                    labelWidth: 170,
                                    name: 'DEAVerfDate',
                                    format: 'm/d/Y'
                                },
                                {
                                    xtype: 'button',
                                    userCls: 'temp-fix-inline-bt',
                                    text: 'DEA Update History',
                                    iconCls: 'x-fa fa-history',
                                    handler: 'onWinDeaVerifDate'
                                }
                            ]
                        },
                        {
                            fieldLabel: 'DEA Discip. Action',
                            name: 'DEADiscpAction'
                        },
                        {
                            xtype: 'datefield',
                            width: 350,
                            anchor: false,
                            fieldLabel: 'OIG Verf. Date',
                            emptyText: '[mm/dd/yyyy]',
                            name: 'OIGVerfDate',
                            format: 'm/d/Y'
                        },
                        {
                            fieldLabel: 'OIG Discip. Action',
                            name: 'OIGDiscpAction'
                        }
                    ]
                },
                {
                    items: [
                        {
                            fieldLabel: 'State License Number',
                            readOnly: true,
                            name: 'stateLicNum'
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            readOnly: true,
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Expiration Date[NCPDP]',
                                    width: 350,
                                    readOnly: true,
                                    labelWidth: 170,
                                    name: 'NCPDPStLicExpDate',
                                    format: 'm/d/Y'
                                },
                                {
                                    xtype: 'displayfield',
                                    userCls: 'm-red-color-displayfield',
                                    name: '__expNCPDPExpired' // TODO
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'State Lic. Exp. Date',
                                    width: 350,
                                    emptyText: '[mm/dd/yyyy]',
                                    labelWidth: 170,
                                    name: 'StLicExpDate',
                                    format: 'm/d/Y'
                                },
                                {
                                    xtype: 'button',
                                    userCls: 'temp-fix-inline-bt',
                                    text: 'NCPDP Source Data',
                                    iconCls: 'x-fa fa-database',
                                    handler: 'onWinNCPDPDetails'
                                },
                                {
                                    xtype: 'displayfield',
                                    userCls: 'm-red-color-displayfield',
                                    name: '__expStateLicExpired'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'State Lic. Verf. Date',
                                    width: 350,
                                    emptyText: '[mm/dd/yyyy]',
                                    labelWidth: 170,
                                    name: 'StLicVerfDate',
                                    format: 'm/d/Y'
                                },
                                {
                                    xtype: 'button',
                                    userCls: 'temp-fix-inline-bt',
                                    text: 'PBM License Update History',
                                    iconCls: 'x-fa fa-history',
                                    handler: 'onWinPbmLicHistory'
                                }
                            ]
                        },
                        {
                            fieldLabel: 'State Lic. Discip. Action',
                            name: 'StLicDiscpAction'
                        },
                        {
                            fieldLabel: 'Medicaid # (if applicable)',
                            readOnly: true,
                            name: 'medicaidId'
                        },
                        {
                            fieldLabel: 'Medicare Provider ID',
                            readOnly: true,
                            name: 'medicareSupplierId'
                        },
                        {
                            fieldLabel: 'Amount of Coverage',
                            name: 'insuranceAmt'
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Coverage Expiration Date',
                                    width: 350,
                                    emptyText: '[mm/dd/yyyy]',
                                    labelWidth: 170,
                                    name: 'insuranceExpDate',
                                    format: 'm/d/Y'
                                },
                                {
                                    xtype: 'displayfield',
                                    userCls: 'm-red-color-displayfield',
                                    name: '__coverageExpired'
                                }
                            ]
                        },
                        {
                            fieldLabel: 'Insurance Company',
                            name: 'insuranceName'
                        },
                        {
                            fieldLabel: 'Account #',
                            name: 'insuranceAcctNum'
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Insurance Verf. Date',
                                    width: 350,
                                    emptyText: '[mm/dd/yyyy]',
                                    labelWidth: 170,
                                    name: 'insuranceVerfDate',
                                    format: 'm/d/Y'
                                },
                                {
                                    xtype: 'button',
                                    userCls: 'temp-fix-inline-bt',
                                    text: 'PBM Insurance Update History',
                                    iconCls: 'x-fa fa-history',
                                    handler: 'onWinPbmInsuranceVerif'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Inspection Date',
                                    width: 350,
                                    emptyText: '[mm/dd/yyyy]',
                                    labelWidth: 170,
                                    name: 'lastInspectionDate',
                                    format: 'm/d/Y'
                                },
                                {
                                    xtype: 'displayfield',
                                    userCls: 'm-red-color-displayfield',
                                    name: '__inspectionExpired'
                                }
                            ]
                        },
                        {
                            fieldLabel: 'Grade',
                            name: 'lastInspectionGrade'
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Evidence of debarment',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    columns: 2,
                                    name: 'EvidDebar',
                                    items: [
                                        {
                                            boxLabel: 'Yes',
                                            name: 'debarment',
                                            inputValue: true
                                        },
                                        {
                                            boxLabel: 'No',
                                            name: 'debarment',
                                            inputValue: false,
                                            checked: true
                                        }
                                    ],
                                    listeners: {
                                        change: function (grp, newValue) {
                                            var descrField = grp.up('form').down('[name=EvidDebarDet]'),
                                                isDisabled = newValue.debarment !== true;

                                            descrField.setDisabled(isDisabled);

                                            if (isDisabled) {
                                                descrField.setValue('');
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    disabled: true,
                                    name: 'EvidDebarDet'
                                },
                                {
                                    xtype: 'displayfield',
                                    userCls: 'm-red-color-displayfield',
                                    name: '__debarExpired'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'EPLS Verf. Date',
                                    width: 350,
                                    emptyText: '[mm/dd/yyyy]',
                                    labelWidth: 170,
                                    name: 'EPLSVerfDate',
                                    format: 'm/d/Y'
                                },
                                {
                                    xtype: 'displayfield',
                                    userCls: 'm-red-color-displayfield',
                                    name: '__eplsExpired'
                                }
                            ]
                        },
                        {
                            fieldLabel: 'EPLS Discip. Action',
                            name: 'EPLSDiscpAction'
                        },
                        {
                            xtype: 'fieldset',
                            defaults: {
                                width: 540,
                                labelWidth: 160
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Verf. Performed By',
                                    name: 'VerfPerfBy'
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Verf. Performed Date',
                                            width: 350,
                                            emptyText: '[mm/dd/yyyy]',
                                            labelWidth: 160,
                                            name: 'VerfPerfDate',
                                            format: 'm/d/Y'
                                        },
                                        {
                                            xtype: 'button',
                                            userCls: 'temp-fix-inline-bt',
                                            text: 'PBM Verification History',
                                            iconCls: 'x-fa fa-history',
                                            handler: 'onWinPbmVerif'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Cred. Comm. Appr. Date',
                                            width: 350,
                                            emptyText: '[mm/dd/yyyy]',
                                            labelWidth: 160,
                                            name: 'CredCommApprDate',
                                            format: 'm/d/Y'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            userCls: 'm-red-color-displayfield',
                                            name: '__credCommExpired'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'textarea',
                                    fieldLabel: 'Comments',
                                    name: 'Comments'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            reference: 'payment',
            title: 'Payment Information',
            layout: 'column',
            defaults: {
                xtype: 'container',
                layout: 'anchor',
                defaults: {
                    xtype: 'textfield',
                    anchor: '100%',
                    labelWidth: 170
                },
                columnWidth: 0.5
            },
            scrollable: true,
            items: [
                {
                    items: [
                        {
                            fieldLabel: 'Remittance Contact Name',
                            name: 'ReCntName'
                        },
                        {
                            fieldLabel: 'Remittance Address 1',
                            name: 'ReAddress1'
                        },
                        {
                            fieldLabel: 'City',
                            name: 'ReCity'
                        },
                        {
                            xtype: 'combo',
                            name: 'ReState',
                            fieldLabel: 'State',

                            displayField: 'name',
                            valueField: 'value',
                            bind: {
                                store: '{states}'
                            },
                            publishes: 'value',
                            queryMode: 'local',
                            typeAhead: true,
                            forceSelection: true,
                            emptyText: 'Select a state'
                        }
                    ]

                },
                {

                    items: [
                        {
                            fieldLabel: 'Zip Code',
                            name: 'ReZip'
                        },
                        {
                            fieldLabel: 'Remittance Phone Number',
                            emptyText: '[123-456-7890]',
                            vtype: 'phone',
                            minLength: 10,
                            plugins: {
                                ptype: 'phonenumberformatter'
                            },
                            name: 'RePhone'
                        },
                        {
                            fieldLabel: 'Remittance Fax Number',
                            emptyText: '[123-456-7890]',
                            vtype: 'fax',
                            minLength: 10,
                            plugins: {
                                ptype: 'faxnumberformatter'
                            },
                            name: 'ReFax'
                        },
                        {
                            fieldLabel: 'Remittance Email Address',
                            emptyText: '[Email Address]',
                            name: 'ReEmail'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            reference: 'services',
            title: 'Patient Services',
            layout: 'column',
            defaults: {
                xtype: 'fieldset',
                layout: 'anchor',
                defaults: {
                    anchor: '100%',
                    labelWidth: 120
                }
            },
            scrollable: true,
            items: [
                {
                    columnWidth: 0.4,
                    title: 'Pharmacy Type',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'box',
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    html: '% of Business',
                                    width: 100
                                },
                                {
                                    xtype: 'label',
                                    html: 'State Licensed?',
                                    width: 140
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                width: 50,
                                value: 0
                            },
                            fieldLabel: 'Retail',
                            items: [
                                {
                                    xtype: 'textfield',
                                    maskRe: /[0-9]/,
                                    name: 'RetBusPct',
                                    listeners: {
                                        blur: 'onCheckBlank'
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    margin: '0 0 0 50',
                                    inputValue: true,
                                    uncheckedValue: false,
                                    name: 'RetLicensed'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                width: 50,
                                value: 0
                            },
                            fieldLabel: 'Mail Service',
                            items: [
                                {
                                    xtype: 'textfield',
                                    maskRe: /[0-9]/,
                                    name: 'MailSrvBusPct',
                                    listeners: {
                                        blur: 'onCheckBlank'
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    margin: '0 0 0 50',
                                    inputValue: true,
                                    uncheckedValue: false,
                                    name: 'MailSrvLicensed'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                width: 50,
                                value: 0
                            },
                            fieldLabel: 'Long Term Care',
                            items: [
                                {
                                    xtype: 'textfield',
                                    maskRe: /[0-9]/,
                                    name: 'LonTrmBusPct',
                                    listeners: {
                                        blur: 'onCheckBlank'
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    margin: '0 0 0 50',
                                    inputValue: true,
                                    uncheckedValue: false,
                                    name: 'LonTrmLicensed'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                width: 50,
                                value: 0
                            },
                            fieldLabel: 'Specialty',
                            items: [
                                {
                                    xtype: 'textfield',
                                    maskRe: /[0-9]/,
                                    name: 'SpecDspnsrBusPct',
                                    listeners: {
                                        blur: 'onCheckBlank'
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    margin: '0 0 0 50',
                                    inputValue: true,
                                    uncheckedValue: false,
                                    name: 'SpecDspnsrLicensed'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                width: 50,
                                value: 0
                            },
                            fieldLabel: 'Compounding',
                            items: [
                                {
                                    xtype: 'textfield',
                                    maskRe: /[0-9]/,
                                    name: 'CompBusPct',
                                    listeners: {
                                        blur: 'onCheckBlank'
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    margin: '0 0 0 50',
                                    inputValue: true,
                                    uncheckedValue: false,
                                    name: 'CompLicensed'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                width: 50,
                                value: 0
                            },
                            fieldLabel: 'IV Infusion',
                            items: [
                                {
                                    xtype: 'textfield',
                                    maskRe: /[0-9]/,
                                    name: 'IVFusBusPct',
                                    listeners: {
                                        blur: 'onCheckBlank'
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    margin: '0 0 0 50',
                                    inputValue: true,
                                    uncheckedValue: false,
                                    name: 'IVFusLicensed'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                width: 50,
                                value: 0
                            },
                            fieldLabel: 'Internet',
                            items: [
                                {
                                    xtype: 'textfield',
                                    maskRe: /[0-9]/,
                                    name: 'InternetBusPct',
                                    listeners: {
                                        blur: 'onCheckBlank'
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    margin: '0 0 0 50',
                                    inputValue: true,
                                    uncheckedValue: false,
                                    name: 'InternetLicensed'
                                }
                            ]
                        }
                    ]
                },
                {
                    columnWidth: 0.6,
                    title: 'Physical Location Provider Hours (if different from NCPDP info)',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                xtype: 'textfield',
                                labelWidth: 24,
                                emptyText: '8:00AM - 9:00PM',
                                width: 160,
                                margin: '0 20 0 0',
                                labelSeparator: ''
                            },
                            items: [
                                {
                                    fieldLabel: 'M-F',
                                    name: 'PharHrM-F'
                                },
                                {
                                    fieldLabel: 'Sat.',
                                    name: 'PharHrSat'
                                },
                                {
                                    fieldLabel: 'Sun.',
                                    name: 'PharHrSun'
                                }
                            ]
                        },
                        {
                            xtype: 'box',
                            html: '<hr>'
                        },
                        {
                            xtype: 'checkbox',
                            boxLabel: 'Patient counseling?',
                            inputValue: true,
                            uncheckedValue: false,
                            name: 'PatCnslng'
                        },
                        {
                            xtype: 'checkbox',
                            boxLabel: 'Written literature about the prescription being dispensed?',
                            inputValue: true,
                            uncheckedValue: false,
                            name: 'Literature'
                        },
                        {
                            xtype: 'checkbox',
                            boxLabel: 'Physical location compounding service?',
                            inputValue: true,
                            uncheckedValue: false,
                            name: 'PhyLocCompSrv'
                        },
                        {
                            xtype: 'checkbox',
                            boxLabel: 'Separate charge for delivery service?',
                            inputValue: true,
                            uncheckedValue: false,
                            name: 'SepChrDelSrv'
                        },
                        {
                            xtype: 'checkbox',
                            boxLabel: 'Physical location language?',
                            inputValue: true,
                            uncheckedValue: false,
                            name: 'PhyLocLang'
                        },
                        {
                            xtype: 'checkbox',
                            boxLabel: 'Physical location?',
                            inputValue: true,
                            uncheckedValue: false,
                            name: 'PhyLoc'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            reference: 'other',
            title: 'Other Questions / Other Services Provided',
            layout: 'column',
            defaults: {
                xtype: 'fieldset',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                }
            },
            scrollable: true,
            items: [
                {
                    columnWidth: 0.6,
                    title: 'Other Questions',
                    defaults: {
                        xtype: 'checkbox',
                        inputValue: true,
                        uncheckedValue: false
                    },
                    items: [
                        {
                            boxLabel: 'Does your pharmacy have a store front with the name posted?',
                            name: 'NamePost'
                        },
                        {
                            boxLabel: 'Do members have access to walk in and get prescriptions while they wait?',
                            name: 'PrepWait'
                        },
                        {
                            boxLabel: 'Has your pharmacy had any claims, settlements or judgements against it in the last 10 years?',
                            name: 'Litigation'
                        },
                        {
                            boxLabel: 'Has your pharmacy ever filed for bankruptcy, receivership or reorganization?',
                            name: 'BusFail'
                        },
                        {
                            boxLabel: 'Has your pharmacy been sited for violation of any state or federal laws or payment requirements?',
                            name: 'LegalViolations'
                        },
                        {
                            boxLabel: 'Has any pharmacist working in your pharmacy had action taken against them by a state or federal agency or licensing board?',
                            name: 'Allegations'
                        }
                    ]
                },
                {
                    columnWidth: 0.4,
                    title: 'Other Services Provided',
                    items: [
                        {
                            xtype: 'textarea',
                            userCls: 'temp-textarea-fix',
                            name: 'OtherSvcsProvided'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'grid',
            itemId: 'gpPharmacistLicenseInformation',
            title: 'Pharmacist License Information',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            text: 'Add Pharmacist',
                            iconCls: 'x-fa fa-plus',
                            handler: 'onAddPharmacist'
                        },
                        {
                            text: 'Remove Pharmacist',
                            iconCls: 'x-fa fa-minus',
                            handler: 'onRemovePharmacist'
                        }
                    ]
                }
            ],
            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    {
                        text: 'Pharmacist License #', dataIndex: 'sLicenseNum',
                        editor: {
                            emptyText: '',
                            allowBlank: false,
                            itemId: 'itemsLicenseNum',
                            width: 400,
                            hideLabel: true
                        }
                    },
                    {
                        text: 'Pharmacist Name', dataIndex: 'sPharmacistName',
                        editor: {
                            allowBlank: false,
                            itemId: 'itemsPharmacistName',
                            emptyText: ''
                        }
                    },
                    {
                        text: 'Employment Type', dataIndex: 'sEmployType',
                        editor: {
                            xtype: 'combobox',
                            //itemId: 'cbxemptype', //overridden below?
                            width: 350,
                            itemId: 'itemsEmployType',
                            displayField: 'name',
                            valueField: 'id',
                            listConfig: {
                                maxWidth: 220
                            },
                            bind: {
                                //value:'{OTCInd}',
                                store: '{storeEmpType}'
                            }
                        }, renderer: 'comboBoxsEmployTypeRenderer'
                    }
                    //,
                    // {
                    //     xtype: 'widgetcolumn',
                    //     align: 'center',
                    //     width: 100,
                    //     hideable : false,
                    //     flex:0,
                    //     widget: {
                    //         xtype: 'container',
                    //         bind: true,
                    //         defaults: {
                    //             xtype: 'tool',
                    //             viewModel: true
                    //         },
                    //         items: [
                    //             // reject tool
                    //             {
                    //                 xtype: 'button',
                    //                 text: 'Reject',
                    //                 width: 75,
                    //                 iconCls: 'x-action-col-icon x-fa fa-undo',
                    //                 bind: {
                    //                     hidden: '{!record.isNeedUpdate}',
                    //                     tooltip: 'Reject '
                    //                 },
                    //                 handler: 'onUndoChangeClick'
                    //             }
                    //         ]
                    //     }
                    // }
                ]
            },
            plugins: {
                ptype: 'rowediting',
                clicksToEdit: 2,
                autoCancel: false,
                listeners: {
                    edit: 'gpPharmacistLicenseInformation_afteredit'
                }
            },
            listeners: {
                beforeedit: 'gpPharmacistLicenseInformation_beforeedit',
                edit: 'onEdit'
            },
            bind: '{storePharmacistLicenseInformation}'
            // , dockedItems: [
            //      {
            //          xtype: 'pagingtoolbar',
            //          bind: '{storePharmacistLicenseInformation}',
            //          displayInfo: true,
            //          dock: 'bottom',
            //          pageSize: 10
            //      }
            //
            //  ]

        }
    ]
});