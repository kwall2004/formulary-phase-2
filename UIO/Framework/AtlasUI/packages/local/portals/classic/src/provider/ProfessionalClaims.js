/**
 * Created by c4539 on 11/14/2016.
 */
Ext.define('Atlas.portals.view.provider.ProfessionalClaims', {
    extend: 'Ext.Container',
    controller: 'portalsproviderprofessionalclaims',
    title: 'Professional Claims',
    scrollable: 'y',
    viewModel: {
        stores: {
            providers: {
                model: 'Atlas.portals.provider.model.ProviderListWeb'
            },
            memberIds: {
                model: 'Atlas.portals.provider.model.PortalMemberFuncs'
            },
            authMasterRecords: {
                model: 'Atlas.portals.provider.model.MemberOdcdMasterApi'
            },
            memberODCDs: {
                model: 'Atlas.portals.provider.model.MemberOdcdMasterApi'
            },
            frequencyCodes: {
                fields: [
                    'key', 'value'
                ],
                data: [
                    {key: '1', value: 'Original Claims'},
                    {key: '7', value: 'Replacement Claims'}
                ]
            },
            serviceClaims: {
                model: 'Atlas.portals.provider.model.RemitDetailWeb'
            }
        },
        data: {
            providerId: -1,
            isClaimsEditTabVisited: false,
            isLtss: false,
            recipientId: '',
            minServiceDate: '',
            memberTermDate: '',
            lobId: '',
            selectedFrequencyCode: '',
            controlNumber: '',
            billingNpi: '',
            billingTin: '',
            taxonomy: '',
            isEditing: false
        }
    },
    items: [
        {
            xtype: 'panel',
            cls: 'card-panel',
            reference: 'alertsToolbar',
            title: 'Alerts',
            hidden: true,
            items: [{
                xtype: 'displayfield',
                reference: 'alertDisplayField'
            }]
        },
        {
            xtype: 'form',
            cls: 'card-panel',
            title: 'Professional Claims',
            reference: 'mainClaimForm',
            layout: 'hbox',
            scrollable: 'x',
            items: [
                {
                    xtype: 'container',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'combo',
                                    reference: 'providerCombo',
                                    name: 'provider',
                                    fieldLabel: 'Provider',
                                    displayField: 'displayName',
                                    valueField: 'provID',
                                    queryMode: 'local',
                                    bind: {
                                        store: '{providers}'
                                    },
                                    listeners: {
                                        select: 'onProviderSelect'
                                    },
                                    dataIndex: 'servProvId'
                                },
                                {
                                    xtype: 'textfield',
                                    reference: 'providerSpecialty',
                                    name: 'providerSpecialty',
                                    fieldLabel: 'Primary Specialty',
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            defaults: {
                                xtype: 'checkbox'
                            },
                            items: [
                                { boxLabel: 'In Plan', reference: 'inPlan', name: 'inPlan' },
                                { boxLabel: 'PCP', reference: 'pcp', name: 'pcp' },
                                { boxLabel: 'Accepting New Members', reference: 'accepting', name: 'accepting' },
                                { boxLabel: 'Provider Open', reference: 'open', name: 'open' }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            cls: 'card-panel',
            minHeight: 300,
            maxHeight: 450,
            title: 'Professional Claim',
            reference: 'professionalClaimForm',
            layout: 'hbox',
            scrollable: true,
            bbar: {
                xtype: 'toolbar',
                items: [
                    {
                        xtype: 'button',
                        text: 'OB Visits',
                        handler: 'showObVisits'
                    },
                    {
                        xtype: 'button',
                        text: 'Create New Claim',
                        handler: 'createClaim'
                    },
                    {
                        xtype: 'button',
                        text: 'Submit/Resubmit Claim',
                        handler: 'submitClaim'
                    }
                ]
            },
            items: [
                {
                    xtype: 'container',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'container',
                            padding: 7,
                            html: '<b>Note:</b> A taxonomy is <i>required</i> if the services on this claim are not <i>waivered</i> services.'
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Member ID',
                                    reference: 'memberId',
                                    labelWidth: 168,
                                    name: 'memberId',
                                    dataIndex: 'dispMemberID',
                                    allowBlank: false,
                                    listeners: {
                                        blur: 'onMemberIdBlur'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Member Name',
                                    reference: 'memberName',
                                    labelWidth: 161,
                                    name: 'memberName',
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combo',
                                    labelWidth: 168,
                                    fieldLabel: 'Select Member\'s Plan',
                                    reference: 'memberPlan',
                                    name: 'memberPlan',
                                    displayField: 'key',
                                    valueField: 'value',
                                    queryMode: 'local',
                                    readOnly: false,
                                    disabled: true,
                                    listeners: {
                                        select: 'onMemberPlanSelected'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            labelWidth: 168,
                                            fieldLabel: 'Prior Auth #',
                                            reference: 'priorAuthNumber',
                                            name: 'priorAuthNumber',
                                            dataIndex: 'priorAuthNum',
                                            style: {
                                                width: '315px'
                                            },
                                            listeners: {
                                                blur: 'onPriorAuthNumberBlur'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            margin: '0 10 0 0',
                                            iconCls: 'x-fa fa-search',
                                            handler: 'onPriorAuthSearch'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    labelWidth: 161,
                                    reference: 'patientAccountNumber',
                                    name: 'patientAccountNumber',
                                    fieldLabel: 'Patient Account#',
                                    dataIndex: 'ptnAccountNum'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Billing NPI',
                                    labelWidth: 168,
                                    reference: 'billingNpi',
                                    name: 'billingNpi',
                                    bind: {
                                        hidden: '{isLtss}'
                                    },
                                    allowBlank: false,
                                    dataIndex: 'billprovnpi'
                                },
                                {
                                    xtype: 'numberfield',
                                    labelWidth: 161,
                                    fieldLabel: 'Serv Prov NPI',
                                    reference: 'serviceNpi',
                                    name: 'serviceNpi',
                                    dataIndex: 'servprovnpi'
                                },
                                {
                                    xtype: 'checkbox',
                                    labelWidth: 120,
                                    width: 150,
                                    boxLabel: 'Same as billing',
                                    listeners: {
                                        change: 'onSameAsBillingChange'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    labelWidth: 168,
                                    fieldLabel: 'Billing TIN',
                                    xtype: 'numberfield',
                                    reference: 'billingTin',
                                    name: 'billingTin',
                                    allowBlank: false,
                                    dataIndex: 'fedTaxId'
                                },
                                {
                                    xtype: 'textfield',
                                    labelWidth: 161,
                                    fieldLabel: 'Serv Prov Taxonomy',
                                    reference: 'serviceProviderTaxonomy',
                                    name: 'serviceProviderTaxonomy',
                                    dataIndex: 'serviceprovtaxonomy'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    labelWidth: 168,
                                    fieldLabel: 'Billing Taxonomy',
                                    reference: 'billingTaxonomy',
                                    name: 'billingTaxonomy'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    labelWidth: 168,
                                    fieldLabel: 'Claim Freq Code',
                                    xtype: 'combo',
                                    reference: 'freqCode',
                                    name: 'freqCode',
                                    displayField: 'value',
                                    valueField: 'key',
                                    queryMode: 'local',
                                    value: '1',
                                    bind: {
                                        store: '{frequencyCodes}'
                                    },
                                    listeners: {
                                        select: 'onFrequencyCodeSelect'
                                    },
                                    dataIndex: 'freqCode'
                                },
                                {
                                    xtype: 'textfield',
                                    labelWidth: 161,
                                    fieldLabel: 'Orig. Claim Ref',
                                    xtype: 'textfield',
                                    reference: 'origRefNum',
                                    name: 'origRefNum',
                                    dataIndex: 'origRefnum'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    labelWidth: 168,
                                    fieldLabel: 'Place of Service',
                                    xtype: 'combo',
                                    reference: 'placeOfService',
                                    name: 'placeOfService',
                                    queryMode: 'local',
                                    displayField: 'key',
                                    valueField: 'value',
                                    allowBlank: false,
                                    listeners: {
                                        select: 'onPlaceOfServiceSelect'
                                    },
                                    dataIndex: 'pos'
                                },
                                {
                                    xtype: 'textfield',
                                    labelWidth: 161,
                                    fieldLabel: 'Facility NPI',
                                    reference: 'facilityNpi',
                                    name: 'facilityNpi',
                                    dataIndex: 'facilitynpi'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    labelWidth: 168,
                                    fieldLabel: 'Admit Date',
                                    xtype: 'datefield',
                                    reference: 'admitDate',
                                    name: 'admitDate',
                                    format: 'm/d/Y',
                                    invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                                    listeners: {
                                        blur: 'onAdmitDateBlur'
                                    },
                                    dataIndex: 'admitDate'
                                },
                                {
                                    xtype: 'textfield',
                                    labelWidth: 161,
                                    fieldLabel: 'Discharge Date',
                                    xtype: 'datefield',
                                    reference: 'dischargeDate',
                                    name: 'dischargeDate',
                                    format: 'm/d/Y',
                                    invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                                    dataIndex: 'dischargeDate'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            defaults: {
                                xtype: 'textfield',
                                labelWidth: 168,
                                listeners: {
                                    blur: 'onDiagCodeBlur'
                                },
                                width: 92
                            },
                            items: [
                                {
                                    fieldLabel: 'Diag. Code',
                                    reference: 'diagCode1',
                                    name: 'diagCode1',
                                    dataIndex: 'diagCd1',
                                    allowBlank: false,
                                    width: 264
                                },
                                { reference: 'diagCode2', name: 'diagCode2', dataIndex: 'diagCd2' },
                                { reference: 'diagCode3', name: 'diagCode3', dataIndex: 'diagCd3' },
                                { reference: 'diagCode4', name: 'diagCode4', dataIndex: 'diagCd4' },
                                { reference: 'diagCode5', name: 'diagCode5', dataIndex: 'diagCd5' },
                                { reference: 'diagCode6', name: 'diagCode6', dataIndex: 'diagCd6' },
                                { reference: 'diagCode7', name: 'diagCode7', dataIndex: 'diagCd7' },
                                { reference: 'diagCode8', name: 'diagCode8', dataIndex: 'diagCd8' }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    labelWidth: 168,
                                    fieldLabel: 'Carrier',
                                    reference: 'otherpayername',
                                    name: 'otherpayername',
                                    listeners: {
                                        blur: 'onPayerBlur'
                                    },
                                    dataIndex: 'otherpayername'
                                },
                                {
                                    xtype: 'textfield',
                                    labelWidth: 161,
                                    fieldLabel: 'Insured',
                                    reference: 'otherinslastname',
                                    name: 'otherinslastname',
                                    dataIndex: 'otherInsLastName'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    labelWidth: 168,
                                    fieldLabel: 'Paid Amount',
                                    reference: 'otherInsPaidAmt',
                                    name: 'otherInsPaidAmt',
                                    listeners: {
                                        blur: 'onPayerBlur'
                                    },
                                    dataIndex: 'otherInsPaidAmt'
                                },
                                {
                                    xtype: 'textfield',
                                    labelWidth: 161,
                                    fieldLabel: 'Deny Reason',
                                    reference: 'denyReason',
                                    name: 'adjrsncode'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'datefield',
                                    labelWidth: 168,
                                    fieldLabel: 'LMP Date',
                                    reference: 'lmpdate',
                                    name: 'lmpdate',
                                    format: 'm/d/Y',
                                    invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                                    dataIndex: 'lmpdate'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textarea',
                                    labelWidth: 168,
                                    fieldLabel: 'Notes',
                                    reference: 'remarks',
                                    name: 'remarks',
                                    style: {
                                        width: '680px'
                                    },
                                    dataIndex: 'remarks'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textarea',
                                    labelWidth: 168,
                                    fieldLabel: 'OB Visits',
                                    reference: 'obVisits',
                                    name: 'obVisits',
                                    readOnly: true,
                                    hidden: true,
                                    style: {
                                        width: '680px'
                                    },
                                    dataIndex: 'obvisitsText'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'gridpanel',
            reference: 'serviceGrid',
            cls: 'card-panel',
            plugins: [{
                ptype: 'rowediting',
                saveBtnText : 'Save'
            }],
            title: 'Services',
            height: 250,
            tbar: {
                xtype: 'toolbar',
                items: [
                    {
                        xtype: 'button',
                        text: 'Add',
                        iconCls: 'x-fa fa-plus-circle',
                        handler: 'addService'
                    },
                    {
                        xtype: 'button',
                        text: 'Remove',
                        iconCls: 'x-fa fa-minus-circle',
                        handler: 'removeService'
                    }
                ]
            },
            listeners: {
                canceledit: 'cancelServiceUpdate',
                edit: 'maybeEditService',
                beforeedit: 'onBeforeEdit'
            },
            bind: {
                store: '{serviceClaims}'
            },
            columns: [
                {
                    text: '#',
                    dataIndex: 'lineNum',
                    width: 30,
                    sortable: false
                },
                {
                    xtype: 'datecolumn',
                    format: 'm/d/Y',
                    text: 'Serv. From',
                    width: 150,
                    dataIndex: 'servLnFromDate',
                    sortable: false,
                    editor: {
                        xtype: 'datefield',
                        itemId: 'servLnFromDate',
                        allowBlank: false,
                        format: 'm/d/Y',
                        invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                        listeners: {
                            blur: 'onServiceLineFromDateBlur'
                        }
                    }
                },
                {
                    xtype: 'datecolumn',
                    format: 'm/d/Y',
                    text: 'To',
                    width: 150,
                    dataIndex: 'servLnToDate',
                    sortable: false,
                    editor: {
                        xtype: 'datefield',
                        itemId: 'servLnToDate',
                        allowBlank: false,
                        format: 'm/d/Y',
                        invalidText: '{0} is not a valid date - it must be in the format mm/dd/yyyy',
                        listeners: {
                            blur: 'onServiceLineToDateBlur'
                        }
                    }
                },
                {
                    text: 'Proc Code',
                    dataIndex: 'servLnProcCode',
                    sortable: false,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        listeners: {
                            blur: 'onServLnProcCodeBlur'
                        }
                    }
                },
                {
                    text: 'Description',
                    dataIndex: 'servLnProcCodeDesc',
                    sortable: false,
                    editor: {
                        xtype: 'textfield',
                        itemId: 'servLnProcCodeDesc',
                        readOnly: true
                    }
                },
                {
                    text: 'NDC',
                    dataIndex: 'servLnNDC',
                    sortable: false,
                    editor: {
                        xtype: 'textfield',
                        itemId: 'servLnNDC'
                    }
                },
                {
                    text: 'Units',
                    dataIndex: 'servLnUnits',
                    sortable: false,
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },
                {
                    text: 'Billed',
                    dataIndex: 'servLnBilled',
                    sortable: false,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        maskRe: /[0-9.]/
                    }
                },
                {text: '1', dataIndex: 'mod1', width: 50, sortable: false, editor: {xtype: 'textfield'}},
                {text: '2', dataIndex: 'mod2', width: 50, sortable: false, editor: {xtype: 'textfield'}},
                {text: '3', dataIndex: 'mod3', width: 50, sortable: false, editor: {xtype: 'textfield'}},
                {text: '4', dataIndex: 'mod4', width: 50, sortable: false, editor: {xtype: 'textfield'}},
                {
                    text: 'Diag Cd',
                    dataIndex: 'servLnDiagCode',
                    sortable: false,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        listeners: {
                            blur: 'onServiceLineDiagCodeBlur'
                        }
                    }
                },
                {
                    text: 'Other Ins Paid',
                    dataIndex: 'servLnOtherInsPaid',
                    sortable: false,
                    width: 120,
                    editor: {
                        xtype: 'textfield',
                        maskRe: /[0-9.]/
                    }
                }
            ]
        }
    ]
});