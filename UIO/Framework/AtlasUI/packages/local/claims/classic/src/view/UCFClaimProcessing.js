/**
 * Created by T4317 on 11/3/2016.
 */
Ext.define('Atlas.claims.view.UCFClaimProcessing', {
    extend: 'Ext.form.Panel',
    title: 'UCF Claim Processing',
    controller: 'claims-ucfprocess',
    viewModel: 'claims-ucfprocess',
    requires: [
        'Ext.grid.plugin.RowEditing'
    ],
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [{
            xtype: 'textfield',
            reference: 'claimbox',
            fieldLabel: 'UCF Claim ID',
            emptyText: '[UCF ClaimID]',
            name: 'transactionId',
            listeners: {
                specialkey: 'onSpecialKeyPress'
            }
        }, {
            text: 'Add UCF Claim',
            handler: 'clearValues'
        }, {
            text: 'Delete UCF Claim',
            handler: 'deleteClaim'
        }, '->',
            {
                xtype: 'label',
                text: 'PBM Claim Id'
            },
            {
                xtype: 'button',
                name: 'claimRefNum',
                tooltip: 'View more claim info',
                reference: 'routeToClaimDetailRef',
                iconCls: 'fa fa-external-link',
                disabled: true,
                handler: 'routeToClaimDetail'


            }, {
                xtype: 'displayfield',
                reference: 'claimStatusLabelRef',
                //fieldLabel:'Claim Status',
                //fieldCls:'m-red-color',
                //renderer:'renderClaimStatus',
                name: 'claimStatusLabel'
            }, {
                text: 'Fax Q',
                handler: 'openFaxQueue'
            }]
    }, {
        dock: 'bottom',
        xtype: 'toolbar',
        items: ['->', {
            text: 'Save',
            reference: 'saveButton',
            //disabled:true,
            handler: 'onSaveUCFClaim'
        }, {
            text: 'Submit Claim',
            reference: 'submitButton',
            //disabled:true,
            handler: 'processClaim'
        }]
    }],
    defaults: {
        flex: 1
    },
    items: [{
        flex: 2,
        scrollable: true,
        defaults: {
            xtype: 'fieldset'
        },
        items: [{
            title: 'Member Info',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                xtype: 'container'
            },
            items: [{
                flex: 2,
                items: [{
                    //xtype:'textfield',
                    xtype: 'claimsmembertypeahead',
                    reference: 'insuredId',
                    fieldLabel: 'Insured Id',
                    allowBlank: false,
                    emptyText: '[e.g 000123]',
                    matchFieldWidth: false,
                    width: 275,
                    name: 'insuredId',
                    listeners: {
                        select: 'onMemberTypeAheadSelect'
                    }

                },
                    {
                        xtype: 'displayfield',
                        labelWidth: 30,
                        name: 'recipientID',
                        hidden: true

                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Service Date',
                        name: 'serviceDate',
                        reference: 'sDate',
                        maxValue: new Date(),
                        format: 'm/d/Y',
                        emptyText: '[mm/dd/yyyy]',
                        width: 275
                    }, {
                        xtype: 'combobox',
                        fieldLabel: 'PCN',
                        disableKeyFilter: false,
                        reference: 'PCNID',
                        tooltip: 'PCN',
                        name: 'PCN',
                        allowBlank: false,
                        displayField: 'pcnCode',
                        valueField: 'pcnCode',
                        bind: {
                            store: '{pcnlist}'
                        },
                        forceSelection: true,
                        queryMode: 'local',
                        width: 275
                    }, {
                        xtype: 'combobox',
                        fieldLabel: 'Residence Code',
                        disableKeyFilter: false,
                        name: 'patResidenceCode',
                        displayField: 'name',
                        valueField: 'value',
                        bind: {
                            store: '{residencecode}'
                        },
                        forceSelection: true,
                        queryMode: 'local',
                        width: 275
                    }]
            }, {
                flex: 2,
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Name',
                    labelWidth: 50,
                    name: 'memberFullName'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Address',
                    labelWidth: 50,
                    name: 'memberAddress'
                }, {
                    xtype: 'combobox',
                    fieldLabel: 'Other Coverage Code',
                    name: 'otherCoverageCode',
                    displayField: 'name',
                    valueField: 'value',
                    bind: {
                        store: '{othercoverage}'
                    },
                    forceSelection: true,
                    queryMode: 'local',
                    labelWidth: 150,
                    width: 300,
                    listeners: {
                        focus: function () {
                            var me = this;

                            if (!me.isExpanded) {
                                me.expand()
                            }
                            me.getPicker().focus();
                        }
                    }
                }, {
                    xtype: 'combobox',
                    fieldLabel: 'CMS Qualified Facility',
                    name: 'CMSQualFacility',
                    store: ['Yes', 'No'],
                    forceSelection: true,
                    queryMode: 'local',
                    width: 300,
                    labelWidth: 150,
                    listeners: {
                        focus: function () {
                            var me = this;

                            if (!me.isExpanded) {
                                me.expand()
                            }
                            me.getPicker().focus();
                        }
                    }
                }]
            }, {
                flex: 1,
                items: [{
                    xtype: 'displayfield',
                    labelWidth: 30,
                    fieldLabel: 'DOB',
                    name: 'dateOfBirth',
                    renderer: function (value) {
                        return Atlas.common.utility.Utilities.formatDate(value, "m/d/Y");
                    }
                }, {
                    xtype: 'displayfield',
                    labelWidth: 30,
                    fieldLabel: 'Gender',
                    name: 'genderCode'
                }]
            }]
        }, {
            title: 'Drug Info',
            defaults: {
                xtype: 'container'
            },
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                flex: 2,
                items: [{
                    xtype: 'drugtypeahead',
                    fieldLabel: 'NDC #',
                    width: 275,
                    matchFieldWidth: false,
                    emptyText: '[e.g Nexium]',
                    name: 'productId',
                    reference: 'ndcnum',
                    listeners: {
                        select: 'onDrugTypeAheadSelect'
                    }
                    //renderer:'getNcpdpIdDesc'
                }, {
                    xtype: 'displayfield',
                    padding: 5,
                    name: 'LN'
                },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Dispense Qty',
                        reference: 'dQty',
                        maskRe: /[0-9]/,
                        name: 'dispQuantity'
                    }, {
                        xtype: 'combobox',
                        fieldLabel: 'Dosage Form',
                        name: 'compoundDosageForm',
                        displayField: 'name',
                        valueField: 'value',
                        disabled: true,
                        forceSelection: true,
                        queryMode: 'local',
                        reference: 'dosageFormCombo',
                        bind: {
                            store: '{dosageform}'
                        },
                        listeners: {
                            focus: function () {
                                var me = this;

                                if (!me.isExpanded) {
                                    me.expand()
                                }
                                me.getPicker().focus();
                            }
                        }
                    }, {
                        xtype: 'combobox',
                        fieldLabel: 'Rx Origin',
                        name: 'rxOrigin',
                        displayField: 'name',
                        valueField: 'value',
                        forceSelection: true,
                        queryMode: 'local',
                        bind: {
                            store: '{rxorigin}'
                        },
                        listeners: {
                            focus: function () {
                                var me = this;

                                if (!me.isExpanded) {
                                    me.expand()
                                }
                                me.getPicker().focus();
                            }
                        }
                    }]
            }, {
                flex: 2,
                items: [{
                    xtype: 'combobox',
                    fieldLabel: 'DAW Code',
                    name: 'dawCode',
                    forceSelection: true,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'value',
                    bind: {
                        store: '{dawcode}'
                    },
                    listeners: {
                        focus: function () {
                            var me = this;

                            if (!me.isExpanded) {
                                me.expand()
                            }
                            me.getPicker().focus();
                        }
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Days Supply',
                    reference: 'daySupply',
                    maskRe: /[0-9]/,
                    name: 'daysSupply'
                }, {
                    xtype: 'combobox',
                    fieldLabel: 'Dispensing Unit',
                    name: 'compoundDispUnitForm',
                    reference: 'dispensingUnitCombo',
                    displayField: 'name',
                    valueField: 'value',
                    disabled: true,
                    forceSelection: true,
                    queryMode: 'local',
                    bind: {
                        store: '{dispunit}'
                    },
                    listeners: {
                        focus: function () {
                            var me = this;

                            if (!me.isExpanded) {
                                me.expand()
                            }
                            me.getPicker().focus();
                        }
                    }
                }]
            }, {
                flex: 1,
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'GCN',
                    name: 'gcnseq',
                    labelWidth: 40
                }, {
                    xtype: 'button',
                    text: 'Compound Drug',
                    handler: 'onCompoundDrug'
                }]
            }]
        }, {
            title: 'Prescriber Info',
            defaults: {
                xtype: 'container',
                flex: 1
            },
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'prescribertypeahead',
                            fieldLabel: 'DEA/NPI',
                            emptyText: '[e.g Dr. Smith]',
                            matchFieldWidth: false,
                            name: 'prescriberId',
                            reference: 'deaNPI',
                            listeners: {
                                select: 'onProviderTypeAheadSelect'
                            }
                        }, {
                            xtype: 'displayfield',
                            padding: 5,
                            name: 'prescriberName'
                        }]
                }, {
                    items: [{
                        xtype: 'displayfield',
                        fieldLabel: 'Phone',
                        name: 'prescriberPhone',
                        plugins: {
                            ptype: 'phonenumberformatter'
                        }
                    }]
                }, {
                    items: [{
                        xtype: 'displayfield',
                        fieldLabel: 'Sanctioned',
                        name: 'excludedPharmacy'
                    }]
                }]
        }, {
            title: 'Pharmacy Info',
            defaults: {
                xtype: 'container'
            },
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    width: 350,
                    items: [
                        {
                            xtype: 'pharmacytypeahead',
                            reference: "ncppdpIdCombo",
                            matchFieldWidth: false,
                            fieldLabel: 'NCPDP',
                            emptyText: '[NPI# / NCPDP #]',
                            width: 300,
                            name: 'PharmacyNameDescr',
                            listeners: {select: 'onNcpdpSelect'}
                        },
                        {
                            xtype: 'displayfield',
                            hidden: true,
                            name: 'ncpdpId'
                        },
                        {
                            xtype: 'displayfield',
                            hidden: true,
                            name: 'PharmacyName'
                        },
                        {
                            xtype: 'textfield',
                            reference: 'rxno',
                            fieldLabel: 'Rx Num',
                            width: 300,
                            name: 'rxNum',
                            maskRe: /[0-9]/
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Fill #',
                            width: 300,
                            name: 'fillNumber',
                            maskRe: /[0-9]/
                        }, {
                            xtype: 'combobox',
                            fieldLabel: 'Basis of Cost',
                            width: 300,
                            name: 'basisOfCost',
                            forceSelection: true,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value',
                            bind: {
                                store: '{ucfcostbasis}'
                            },
                            listeners: {
                                focus: function () {
                                    var me = this;

                                    if (!me.isExpanded) {
                                        me.expand()
                                    }
                                    me.getPicker().focus();
                                }
                            }

                        }]
                },
                {
                    flex: 1,
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'name',
                            inputWrapCls: '',
                            triggerWrapCls: '',
                            fieldStyle: 'background:none',
                            disabled: true,
                            fieldLabel: 'Address',
                            name: 'pharmacyAddress',
                            width: '95%'
                        }, {
                            xtype: 'textfield',
                            inputWrapCls: '',
                            triggerWrapCls: '',
                            fieldStyle: 'background:none',
                            fieldLabel: 'Phone',
                            disabled: true,
                            name: 'PharmacyPhone'
                        }, {
                            xtype: 'datefield',
                            fieldLabel: 'Date Written',
                            emptyText: '[mm/dd/yyyy]',
                            reference: 'dWrit',
                            name: 'dateWritten',
                            maxValue: new Date(),
                            format: 'm/d/Y'
                        }, {
                            xtype: 'combobox',
                            fieldLabel: 'Pharmacy Type',
                            name: 'PharmacyServType',
                            forceSelection: true,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value',
                            bind: {
                                store: '{dispensertype}'
                            },
                            listeners: {
                                focus: function () {
                                    var me = this;

                                    if (!me.isExpanded) {
                                        me.expand()
                                    }
                                    me.getPicker().focus();
                                }
                            }
                        }]
                }]
        }, {
            title: 'Clinical Info',
            defaults: {
                xtype: 'container'
            },
            layout: {
                type: 'hbox',
                align: 'stretch'
            },

            items: [
                /*{
                 xtype: 'button',
                 text: 'Add',
                 handler: 'AddDurClinicalClick'
                 },*/
                {
                    xtype: 'container',
                    flex: 2,
                    items: [
                        {
                            xtype: 'grid',
                            //itemId:'durClinicalGrid',
                            reference: 'durClinicalGrid',
                            height: 200,
                            bind: {
                                store: '{ucfclaimspps}'
                            },
                            plugins: [
                                {
                                    ptype: 'rowediting',
                                    triggerEvent: 'celldblclick',
                                    removeUnmodified: true,
                                    id: 'rowEdit'
                                },
                                {
                                    ptype: 'gridfilters'
                                }
                            ],

                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [{
                                        text: 'Add',
                                        reference: 'addDurClinicalButton',
                                        handler: 'onAddDurClinical',
                                        alignment: 'left'
                                    }]
                                }],


                            columns: {
                                defaults: {
                                    //width: 200
                                    //filter: {type: 'string'}
                                },
                                items: [
                                    {
                                        text: 'DUR Override Code',
                                        flex: 1,
                                        dataIndex: 'serviceRsnCode',
                                        renderer: 'getDUROverride',
                                        editor: {
                                            xtype: 'combo',
                                            queryMode: 'local',
                                            bind: {
                                                store: '{durType}'
                                            },
                                            forceSelection: true,
                                            queryMode: 'local',
                                            selectOnFocus: true,
                                            displayField: 'name',
                                            valueField: 'value',
                                            listeners: {
                                                focus: function () {
                                                    var me = this;

                                                    if (!me.isExpanded) {
                                                        me.expand()
                                                    }
                                                    me.getPicker().focus();
                                                }
                                            }

                                        }
                                    },
                                    {
                                        text: 'Prof. Serv. Code',
                                        flex: 1,
                                        dataIndex: 'profServCode',
                                        renderer: 'getProfServCode',
                                        disableKeyFilter: true,
                                        editor: {
                                            xtype: 'combo',
                                            queryMode: 'local',
                                            bind: {
                                                store: '{tdoverrideServiceCodes}'
                                            },
                                            forceSelection: true,
                                            queryMode: 'local',
                                            selectOnFocus: true,
                                            displayField: 'name',
                                            valueField: 'value',
                                            listeners: {
                                                focus: function () {
                                                    var me = this;

                                                    if (!me.isExpanded) {
                                                        me.expand()
                                                    }
                                                    me.getPicker().focus();
                                                }
                                            }
                                        }
                                    },
                                    {
                                        text: 'Result of Serv. Code',
                                        flex: 1,
                                        dataIndex: 'resultOfServiceCode',
                                        renderer: 'getResultOfServCode',
                                        editor: {
                                            xtype: 'combo',
                                            queryMode: 'local',
                                            bind: {
                                                store: '{durResultOfService}'
                                            },
                                            forceSelection: true,
                                            queryMode: 'local',
                                            selectOnFocus: true,
                                            displayField: 'name',
                                            valueField: 'value',
                                            listeners: {
                                                focus: function () {
                                                    var me = this;

                                                    if (!me.isExpanded) {
                                                        me.expand()
                                                    }
                                                    me.getPicker().focus();
                                                }
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'widgetcolumn',
                                        align: 'center',
                                        width: 100,
                                        hideable: false,
                                        widget: {
                                            xtype: 'container',
                                            bind: true,
                                            defaults: {
                                                xtype: 'tool',
                                                viewModel: true
                                            },

                                            items: [
                                                {
                                                    xtype: 'button',
                                                    width: 75,
                                                    iconCls: 'x-action-col-icon x-fa fa-minus-circle',
                                                    handler: 'onDurDelete'

                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]

                },
                {
                    xtype: 'container',
                    flex: 1,

                    items: [
                        {
                            xtype: 'grid',
                            reference: 'diagClinicalGrid',
                            height: 200,
                            bind: {
                                store: '{ucfclaimdiagdetail}'
                            },

                            plugins: [
                                {
                                    ptype: 'rowediting',
                                    triggerEvent: 'celldblclick',
                                    removeUnmodified: true,
                                    id: 'rowEdit2'
                                },
                                {
                                    ptype: 'gridfilters'
                                }
                            ],

                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [{
                                        text: 'Add',
                                        reference: 'addDiagClinicalButton',
                                        handler: 'onAddDiagClinical',
                                        alignment: 'left'
                                    }]
                                }],

                            columns: {
                                defaults: {
                                    flex: 1
                                    //width: 100,
                                    //filter: {type: 'string'}
                                },
                                items: [
                                    {text: 'Diag Code Qual', dataIndex: 'diagCodeQual', hidden: true},
                                    {
                                        text: 'Diagnosis Code',
                                        dataIndex: 'diagCode',
                                        editor: {
                                            xtype: 'textfield'
                                        }
                                    },
                                    {
                                        xtype: 'widgetcolumn',
                                        align: 'center',
                                        width: 100,
                                        hideable: false,
                                        widget: {
                                            xtype: 'container',
                                            bind: true,
                                            defaults: {
                                                xtype: 'tool',
                                                viewModel: true
                                            },

                                            items: [
                                                {
                                                    xtype: 'button',
                                                    width: 75,
                                                    iconCls: 'x-action-col-icon x-fa fa-minus-circle',
                                                    handler: 'onDiagDelete'
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }, {
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'textarea',
                reference: 'notesTextArea',
                fieldLabel: 'Notes'

            }, {
                xtype: 'button',
                text: 'Notes History',
                handler: 'onNotesHistoryClick'

            }, {
                xtype: 'textfield',
                reference: 'repField',
                fieldLabel: 'Representative',
                name: 'representativeName'
            }]
        }]
    }, {
        defaults: {
            xtype: 'fieldset'
        },
        flex: 1,
        scrollable: true,
        items: [{
            title: 'UCF Image',
            items: [{
                xtype: 'grid',
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        displayInfo: 'false',
                        items: [
                            '->',
                            {
                                xtype: 'button',
                                text: 'Add Attachment',
                                itemId: 'btnAddAttachment',
                                iconCls: 'x-fa fa-file',
                                handler: 'showAddAttachmentPopUp'
                            }
                        ]
                    }
                ],
                viewConfig: {
                    plugins: {
                        ptype: 'gridviewdragdrop',
                        containerScroll: true,
                        dragGroup: 'faxDDGroup',
                        dropGroup: 'faxDDGroup',
                        enableDrag: false
                    },
                    listeners: {
                        drop: function (node, data, dropRec, dropPosition) {
                            data.records[data.records.length - 1].dirty = true;
                        }
                    }
                },
                plugins: [{
                    ptype: 'rowediting',
                    clicksToEdit: 2
                }],
                minHeight: 150,
                bind: {
                    store: '{ucfimage}'
                },
                columns: {
                    defaults: {
                        width: 150
                        //filter: {type: 'string'}
                        //filter: {type: 'string'}
                    },
                    items: [
                        {text: 'In-Out', dataIndex: 'InOut'},
                        {
                            text: 'Name', dataIndex: 'Subject',
                            editor: {
                                xtype: 'textfield',
                                itemId: 'Subject'
                            }
                        },
                        {text: 'Doc ID', dataIndex: 'DocumentID'},
                        {
                            xtype: 'widgetcolumn',
                            align: 'center',
                            hideable: false,
                            widget: {
                                xtype: 'container',
                                bind: true,
                                defaults: {
                                    xtype: 'tool',
                                    viewModel: true
                                },

                                items: [
                                    {
                                        xtype: 'button',
                                        tooltip: 'View',
                                        width: 25,
                                        iconCls: 'x-action-col-icon x-fa fa-file-photo-o',
                                        handler: 'onViewPdf'
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'widgetcolumn',
                            align: 'center',
                            hideable: false,
                            widget: {
                                xtype: 'container',
                                bind: true,
                                defaults: {
                                    xtype: 'tool',
                                    viewModel: true
                                },

                                items: [
                                    {
                                        xtype: 'button',
                                        tooltip: 'Detach',
                                        width: 25,
                                        iconCls: 'x-action-col-icon x-fa fa-minus-circle',
                                        handler: 'detachUCFImage'
                                    }
                                ]
                            }
                        }
                    ]
                }
            }]
        }, {
            title: 'Formulary Info',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                xtype: 'container'
            },
            items: [{
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                defaults: {
                    xtype: 'container'
                },
                overflowX: true,
                items: [{
                    defaults: {
                        xtype: 'displayfield'
                    },
                    items: [{
                        fieldLabel: 'On Formulary',
                        reference: 'onFormularyLabel'

                    }, {
                        fieldLabel: 'Excluded Drug',
                        reference: 'excludedDrug'
                    }]
                }, {
                    defaults: {
                        xtype: 'displayfield'
                    },
                    items: [{
                        fieldLabel: 'Qty Limit',
                        labelWidth: 40,
                        reference: 'qtyLimit'
                    }, {
                        fieldLabel: 'Non Matched NDC',
                        reference: 'nonMatchedNDC'
                    }]
                }, {
                    xtype: 'displayfield',
                    labelWidth: 40,
                    fieldLabel: 'PA Reqd',
                    reference: 'paReq'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'ST Reqd',
                    labelWidth: 40,
                    reference: 'stReqd'
                }]
            }]
        }, {
            title: 'Drug Pricing',
            items: [{
                xtype: 'grid',
                reference: 'drugPricingGrid',
                height: 200,
                bind: {
                    store: '{drugpricing}'
                },
                plugins: [
                    {
                        ptype: 'rowediting',
                        triggerEvent: 'celldblclick',
                        removeUnmodified: true,
                        id: 'rowEdit3'
                    },
                    {
                        ptype: 'gridfilters'
                    }
                ],

                columns: {
                    defaults: {
                        //width: 150,
                        flex: 1
                        //filter: {type: 'string'}
                    },
                    items: [
                        {text: 'Description', dataIndex: 'DESCRIPTION'},
                        {
                            text: 'Submitted',
                            dataIndex: 'submitted',
                            renderer: 'getFormattedSubmitted',
                            editor: {
                                xtype: 'textfield'
                            }
                        }


                    ]
                }
            }]
        }, {
            title: 'COB Info',
            items: [{
                xtype: 'container',
                defaults: {
                    xtype: 'textfield'
                },
                items: [{
                    fieldLabel: 'Paid Amount',
                    reference: 'paidAmount'
                }, {
                    fieldLabel: 'Payer Id',
                    reference: 'payerId'
                }, {
                    xtype: 'datefield',
                    fieldLabel: 'Date Paid',
                    reference: 'datePaid',
                    emptyText: '[mm/dd/yyyy]'

                }, {
                    fieldLabel: 'Reject Codes',
                    reference: 'rejectCodes'
                }]
            }, {
                xtype: 'grid',
                reference: 'patRespGrid',
                height: 200,
                plugins: [
                    {
                        ptype: 'rowediting',
                        triggerEvent: 'celldblclick',
                        removeUnmodified: true,
                        id: 'rowEdit4'
                    },
                    {
                        ptype: 'gridfilters'
                    }
                ],
                bind: {
                    store: '{ufcpatrespqual}'
                },
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [{
                            text: 'Add',
                            reference: 'addPatientResponsibiityGrid',
                            handler: 'onAddPatientResponsibiityGrid',
                            alignment: 'left'
                        }]
                    }],
                columns: {
                    defaults: {
                        flex: 1
                        // filter: {type: 'string'}
                    },
                    items: [
                        {
                            text: 'Patient Resp. Qualifier',
                            dataIndex: 'otherPayerPatRespQual',
                            renderer: 'getOtherPayerPatRespQual',
                            allowBlank: false,
                            editor: {
                                xtype: 'combobox',
                                bind: {
                                    store: '{qualifiedfac}'
                                },
                                displayField: 'name',
                                valueField: 'value',
                                listeners: {
                                    focus: function () {
                                        var me = this;

                                        if (!me.isExpanded) {
                                            me.expand()
                                        }
                                        me.getPicker().focus();
                                    }
                                }
                            }
                        },
                        {
                            text: 'Resp. Amount',
                            dataIndex: 'otherPayerPatRespAmt',
                            allowBlank: false,
                            editor: {
                                xtype: 'textfield'
                            },
                            renderer: 'getOtherPayerPatRespAmt'
                        },
                        {
                            xtype: 'widgetcolumn',
                            align: 'center',
                            hideable: false,
                            widget: {
                                xtype: 'container',
                                bind: true,
                                defaults: {
                                    xtype: 'tool',
                                    viewModel: true
                                },

                                items: [
                                    {
                                        xtype: 'button',
                                        width: 75,
                                        iconCls: 'x-action-col-icon x-fa fa-minus-circle',
                                        handler: 'onPatRespDelete'
                                    }
                                ]
                            }
                        }

                    ]
                }
            }]
        }]
    }]

});