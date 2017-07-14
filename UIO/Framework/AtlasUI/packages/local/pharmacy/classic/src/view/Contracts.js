Ext.define('Atlas.pharmacy.view.Contracts', {
    extend: 'Ext.panel.Panel',
    title: 'Pharmacy Contracts',
    layout: 'border',
    controller: 'contracts',
    viewModel: 'contracts',
    dockedItems: [
        {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'box',
                    html: ' Search by'
                },
                {
                    xtype: 'segmentedbutton',
                    items: [
                        {
                            text: 'Relationship',
                            hint: '[Relationship]',
                            action: 'relationshipId',
                            tooltip: 'Search Relationship Contract',
                            iconCls: 'x-fa fa-search',
                            pressed: true
                        },
                        {
                            text: 'Pharmacy',
                            hint: '[Pharmacy]',
                            tooltip: 'Search Pharmacy Contract',
                            iconCls: 'x-fa fa-search',
                            action: 'pharmacy'
                        }
                    ],
                    listeners: {
                        toggle: 'onSearchTypeToggle'
                    }
                },
                {
                    xtype: 'relationshiptypeahead',
                    itemId: 'cbxRel',
                    displayField: 'Relationshipname',
                    valueField: 'relationshipID',
                    forceSelection: true,
                    width: 250,
                    emptyText: '[e.g. CVS MI]',
                    listeners: {
                        select: 'cbxRelationship_Select'
                    }
                },
                {
                    xtype: 'providertypeahead',
                    itemId: 'cbxPhar',
                    displayField: 'Pharname',
                    hidden: true,
                    valueField: 'ncpdpId',
                    forceSelection: true,
                    width: 250,
                    emptyText: '[e.g. Target Pharmacy MI 48188]',
                    listeners: {
                        select: 'cbxPharmacy_Select'
                    }
                },
                {
                    text: 'View Pharmacy',
                    itemId: 'viewPhar',
                    tooltip: 'Go To Pharmacy Details',
                    iconCls: 'x-fa fa-home',
                    bind: {
                        disabled: 'true'
                    },
                    handler: 'onPharmacyClick'
                },
                '->',
                {
                    xtype: 'button',
                    itemId: 'btnAddContract',
                    text: 'Add',
                    disabled: true,
                    iconCls: 'fa fa-plus-circle',
                    handler: 'btnAddContract_Click'
                },
                {
                    xtype: 'button',
                    itemId: 'btnViewDetail',
                    text: 'View/Edit Contracts',
                    disabled: true,
                    iconCls: 'fa fa-file-o',
                    handler: 'btnViewDetail_Click'
                },
                {
                    xtype: 'button',
                    itemId: 'btnDelete',
                    text: 'Delete',
                    disabled: true,
                    iconCls: 'fa fa-minus-circle',
                    handler: 'btnDelete_Click'
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'form',
            itemId: 'formContractsMain',
            region: 'north',
            height: '100%',
            layout: 'vbox',
            items: [
                {
                    xtype: 'panel',
                    flex: .35,
                    layout: 'hbox',
                    height: '100%',
                    width: '100%',
                    align: 'stretch',
                    items: [
                        {
                            xtype: 'panel',
                            flex: .5,
                            itemId: 'pnlDescription',
                            layout: 'vbox',
                            height: '100%',
                            width: '100%',
                            overflowY: true,
                            align: 'stretch',
                            title: 'Contract Entity Information',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    itemId: 'dispKeyValue',
                                    fieldLabel: 'NCPDP'
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'dispType',
                                    fieldLabel: 'Type'
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'dispAddress',
                                    fieldLabel: 'Location',
                                    value: 'Address'
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            width: 100
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'dispCityState',
                                            value: 'City, State'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'dispMailingAddress',
                                    fieldLabel: 'Mailing',
                                    value: 'Address'
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            width: 100
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'dispMailingCityState',
                                            value: 'City, State'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'dispContactTitle',
                                    fieldLabel: 'Contact',
                                    value: 'Contact'
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'displayPhone',
                                    fieldLabel: 'Phone',
                                    value: 'Phone Number',
                                    vtype: 'phone',
                                    plugins: {
                                        ptype: 'phonenumberformatter'
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'displayFax',
                                    fieldLabel: 'Fax',
                                    value: 'Fax Number',
                                    vtype: 'fax',
                                    plugins: {
                                        ptype: 'faxnumberformatter'
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'dispEmail',
                                    fieldLabel: 'Email',
                                    value: 'Email'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: .5,
                            layout: 'hbox',
                            height: '100%',
                            width: '100%',
                            align: 'stretch',
                            title: 'Payment Centers and Relationships',
                            items: [
                                {
                                    xtype: 'grid',
                                    width: '100%',
                                    itemId: 'gridPayment',
                                    columns: {
                                        items: [
                                            {text: 'Payment Center ID', dataIndex: 'PCpayCenterId', flex: 1},
                                            {text: 'Payment Center Name', dataIndex: 'PCpayCenterName', flex: 1.5},
                                            {text: 'Relationship ID', dataIndex: 'RSrelationshipID', flex: 1},
                                            {text: 'Relationship Name', dataIndex: 'RSname', flex: 1.5},
                                            {text: 'Address', dataIndex: 'PCremitAddress1', flex: 1, hidden: true},
                                            {text: 'City', dataIndex: 'PCremitCity', flex: 1, hidden: true},
                                            {text: 'State', dataIndex: 'PCremitState', flex: 1, hidden: true},
                                            {text: 'Zip', dataIndex: 'PCremitZip', flex: 1, hidden: true}
                                        ]
                                    },
                                    bind: '{storePaymentCenter}'
                                }
                            ],
                            dockedItems: {
                                dock: 'bottom',
                                xtype: 'toolbar',
                                items: [
                                    {
                                        xtype: 'button',
                                        itemId: 'btnEFT',
                                        text: 'Pharmacy EFT/VAN',
                                        disabled: true,
                                        handler: 'btnEFT_Click'
                                    },
                                    {
                                        xtype: 'label',
                                        itemId: 'lblEFTFlag',
                                        disabled: true,
                                        text: '-EFT Enrolled'
                                    },
                                    '->',
                                    {
                                        xtype: 'button',
                                        itemId: 'btnFax',
                                        text: 'Send fax',
                                        disabled: true,
                                        iconCls: 'fa  fa-send-o',
                                        handler: 'btnFax_Click'
                                    }
                                ]
                            }
                        }
                    ]
                }
                ,
                {
                    xtype: 'tabpanel',
                    itemId: 'tabPanelPharmacyContracts',
                    flex: .65,
                    height: '100%',
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel',
                            title: 'Contract Terms',
                            itemId: 'tabContractTerms',
                            flex: 1,
                            height: '100%',
                            width: '100%',
                            layout: 'hbox',
                            align: 'stretch',
                            items: [
                                {
                                    xtype: 'form',
                                    itemId: 'pnlTerms',
                                    title: 'Effective Dates & Terms',
                                    height: '100%',
                                    width: '100%',
                                    overflowY: true,
                                    disabled: true,
                                    flex: 1,
                                    layout: 'vbox',
                                    align: 'stretch',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            title: 'Detail',
                                            width: '100%',
                                            defaults: {
                                                labelWidth: 150
                                            },
                                            collapsible: true,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'txtContractID',
                                                    fieldLabel: 'Contract ID',
                                                    name: 'ContractID',
                                                    disabled: true
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'cbxContractStatus',
                                                    fieldLabel: 'Contract Status',
                                                    name: 'contractStatus',
                                                    forceSelection: 'true',
                                                    displayField: 'name',
                                                    valueField: 'value',
                                                    value: 'Draft',
                                                    bind: {
                                                        store: '{storeContractStatus}'
                                                    },
                                                    allowBlank: true
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'cbxPharmacyNetwork',
                                                    fieldLabel: 'Pharmacy Network',
                                                    allowBlank: 'false',
                                                    displayField: 'NetworkName',
                                                    valueField: 'NetworkID',
                                                    bind: {
                                                        store: '{storePharmaNetwork}'
                                                    },
                                                    multiSelect: true,
                                                    forceSelection: true,
                                                    queryMode: 'local',
                                                    triggerAction: 'all',
                                                    emptyText: '[Select a pharmacy network]',
                                                    listeners: {
                                                        //change:'comboxbox_multiselect'
                                                    },
                                                    listConfig: {
                                                        tpl: Ext.create('Ext.XTemplate',
                                                            '<div style="margin-top:5px"><tpl for=".">',
                                                            '<div class="boundList x-boundlist-item" style="display:table">',
                                                            '<span style="display:table-cell; vertical-align: middle;"><div class="chkbox" value={NetworkID}></div>{NetworkName}</span>',
                                                            '</div>',
                                                            '</tpl></div>'
                                                        ),
                                                        listeners: {
                                                            //itemclick:'comboxbox_itemclick'
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    itemId: 'DFEffDate',
                                                    allowBlank: 'false',
                                                    fieldLabel: 'Effective Date',
                                                    name: 'effDate',
                                                    endDateField: 'DFTermDate',
                                                    format: 'm/d/Y'


                                                },
                                                {
                                                    xtype: 'datefield',
                                                    itemId: 'DFTermDate',
                                                    name: 'termDate',
                                                    fieldLabel: 'Termination Date',
                                                    startDateField: 'DFEffDate',
                                                    format: 'm/d/Y'

                                                },
                                                {
                                                    xtype: 'datefield',
                                                    itemId: 'DFRenewDate',
                                                    fieldLabel: 'Renewal Date',
                                                    name: 'renewalDate',
                                                    format: 'm/d/Y'
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    itemId: 'chkSalesTax',
                                                    labelWidth: 155,
                                                    fieldLabel: 'Sales Tax'
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    itemId: 'chkPayToPhar',
                                                    labelWidth: 155,
                                                    fieldLabel: 'Pay to Pharmacies'
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    itemId: 'chkPrefNetworkPgm',
                                                    labelWidth: 155,
                                                    fieldLabel: 'Pref. Network Program'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'cbxMacList',
                                                    fieldLabel: 'Mac List',
                                                    name: 'macListId',
                                                    forceSelection: true,
                                                    queryMode: 'local',
                                                    displayField: 'MACListName',
                                                    valueField: 'MACListID',
                                                    bind: {
                                                        store: '{storeMACList}'
                                                    }
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'cbxCustPriceList',
                                                    fieldLabel: 'Custom Price List',
                                                    name: 'customPriceListID',
                                                    forceSelection: true,
                                                    queryMode: 'local',
                                                    displayField: 'customPriceName',
                                                    valueField: 'customPriceListId',
                                                    bind: {
                                                        store: '{storeCustPriceList}'
                                                    }
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'cbxPaymentType',
                                                    fieldLabel: 'Payment Type',
                                                    allowBlank: 'false',
                                                    name: 'paymentType',
                                                    forceSelection: true,
                                                    queryMode: 'local',
                                                    displayField: 'name',
                                                    valueField: 'value',
                                                    value: 'Fee for Service',
                                                    bind: {
                                                        store: '{storePaymentType}'
                                                    }
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    itemId: 'spPayCycle',
                                                    allowBlank: 'false',
                                                    minValue: '1',
                                                    maxValue: '52',
                                                    value: '2',
                                                    fieldLabel: 'Payment Cycle(Weeks)',
                                                    name: 'paymentCycle'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'txtMaxDays',
                                                    allowBlank: 'false',
                                                    fieldLabel: 'Max Day Supply',
                                                    name: 'maxDaysSupply',
                                                    value: '90',
                                                    maskRe: /[0-9]/,
                                                    maxLength: 3,
                                                    enforceMaxLength: 3
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'txtDays',
                                                    allowBlank: 'false',
                                                    fieldLabel: 'Maintenance Days',
                                                    name: 'maintDays',
                                                    value: '30',
                                                    maskRe: /[0-9]/,
                                                    maxLength: 3,
                                                    enforceMaxLength: 3
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            title: 'Contact',
                                            width: '100%',
                                            defaults: {
                                                labelWidth: 150
                                            },
                                            collapsible: true,
                                            items: [
                                                {
                                                    xtype: 'textarea',
                                                    itemId: 'txtContractContact',
                                                    fieldLabel: 'Contact Name',
                                                    name: 'contactName'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'txtContractPhone',
                                                    fieldLabel: 'Contact Phone',
                                                    name: 'contactPhone',
                                                    vtype: 'phone',
                                                    plugins: {
                                                        ptype: 'phonenumberformatter'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'txtContractFax',
                                                    fieldLabel: 'Contact Fax',
                                                    name: 'contactFax',
                                                    vtype: 'fax',
                                                    plugins: {
                                                        ptype: 'faxnumberformatter'
                                                    }
                                                }
                                            ]
                                        }
                                    ],
                                    dockedItems: {
                                        dock: 'bottom',
                                        xtype: 'toolbar',
                                        items: [
                                            '->',
                                            {
                                                xtype: 'button',
                                                itemId: 'btSaveContractInfo',
                                                text: 'Save',
                                                iconCls: 'fa fa-save',
                                                handler: 'btSaveContractInfo_Click'
                                            },
                                            {
                                                xtype: 'button',
                                                itemId: 'btCancelContractInfo',
                                                text: 'Cancel',
                                                iconCls: 'fa fa-close',
                                                handler: 'btCancelContractInfo_Click'
                                            },
                                            {
                                                xtype: 'button',
                                                itemId: 'btnAddNote',
                                                text: 'Notes',
                                                iconCls: 'fa fa-sticky-note-o',
                                                handler: 'btnAddNote_Click'
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    height: '100%',
                                    width: '100%',
                                    layout: 'vbox',
                                    align: 'stretch',
                                    items: [
                                        {
                                            xtype: 'form',
                                            itemId: 'pnlAttachment',
                                            flex: 4,
                                            height: '100%',
                                            width: '100%',
                                            align: 'stretch',
                                            layout: 'vbox',
                                            disabled: true,
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    itemId: 'gridFile',
                                                    flex: 1,
                                                    width: '100%',
                                                    height: '100%',
                                                    overflowY: true,
                                                    bind: {
                                                        store: '{storeAttachment}'
                                                    },
                                                    columns: {
                                                        items: [
                                                            {
                                                                text: 'File Name',
                                                                hideable: false,
                                                                dataIndex: 'fileName',
                                                                flex: 4.5
                                                            },
                                                            {
                                                                text: 'Description',
                                                                hideable: false,
                                                                dataIndex: 'Subject',
                                                                flex: 4.5
                                                            },
                                                            {
                                                                xtype: 'widgetcolumn',
                                                                flex: 0.5,
                                                                widget: {
                                                                    xtype: 'button',
                                                                    text: '',
                                                                    iconCls: 'x-fa fa-paperclip',
                                                                    handler: 'openContractAttachment'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'widgetcolumn',

                                                                flex: 0.5,
                                                                widget: {
                                                                    xtype: 'button',
                                                                    text: '',
                                                                    iconCls: 'x-fa fa-minus-circle',
                                                                    handler: 'deleteContractAttachment'
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            ],
                                            dockedItems: {
                                                dock: 'bottom',
                                                xtype: 'toolbar',
                                                items: [
                                                    '->',
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'btnAddAttachment',
                                                        text: 'Add Attachment',
                                                        iconCls: 'x-fa fa-paperclip',
                                                        handler: 'btnAddAttachment_Click'
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'form',
                                            itemId: 'pnlCompensation',
                                            title: 'Service Compensation',
                                            height: '100%',
                                            width: '100%',
                                            overflowY: true,
                                            disabled: true,
                                            flex: 6,
                                            align: 'stretch'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'pharmacy-inclusionexclusion',
                            itemId: 'pnlExclusion',
                            title: 'Inclusions/Exclusions',
                            layout: 'hbox',
                            disabled: true
                        }
                    ],
                    listeners: {
                        'tabchange': 'tabPanelPharmacyContracts_tabchange'
                    }
                },
                {
                    xtype: 'panel',
                    itemId: 'hdnContainer_Contracts',
                    hidden: true,
                    items: [
                        {xtype: 'hidden', itemId: 'hiddenKey'},
                        {xtype: 'hidden', itemId: 'hiddenContractID'},
                        {xtype: 'hidden', itemId: 'hiddenContractStatus'},
                        {xtype: 'hidden', itemId: 'hiddenContractTermDate'},
                        {xtype: 'hidden', itemId: 'hiddenContractSystemID'},
                        {xtype: 'hidden', itemId: 'hiddenType'}
                    ]
                }
            ]
        }
    ]
});
