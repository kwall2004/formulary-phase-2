/**
 * Created by s6627 on 11/8/2016.
 */
Ext.define('Atlas.casemanagement.view.MTMMedication', {
    extend: 'Ext.panel.Panel',
    xtype: 'casemanagementMTMMedication',
    title: 'MTM Medication',
    controller:'mtmmedicationcontroller',
    viewModel: 'MTMMedicationViewModel',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },
    items: [
        {
            xtype: 'panel',
            itemId:'plnMedications'
            , flex: 0.7,
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'start'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [

                        {
                            xtype: 'button',
                            text: 'Reload from Claims',
                            iconCls: 'x-action-col-icon x-fa fa-undo',
                            handler: 'ReloadClick',
                            itemId: 'btnReloadFromClaims'
                        },
                        '->',

                        {
                            xtype: 'button',
                            text: 'Add Medication',
                            iconCls: 'fa  fa-plus-circle',
                            handler: 'add',
                            itemId: 'btnAddMedication'
                        },

                        {
                            xtype: 'button',
                            text: 'Add from Claim History',
                            iconCls: 'fa  fa-plus-circle',
                            handler: 'btnAddfromClaimHistoryClick',
                            itemId: 'btnAddFromClaimHistory'
                        },
                        {
                            xtype: 'button',
                            text: 'Remove Medication',
                            iconCls: 'fa  fa-minus-circle',
                            handler: 'remove',
                            itemId: 'btnRemoveMedication'
                        },
                        {
                            xtype: 'hidden', itemId: 'hiddenServiceType'
                        },
                        {
                            xtype: 'hidden', itemId: 'hdnServiceSystemId'
                        }

                    ]
                }],
            items: [{
                xtype: 'panel', flex: 1,
                cls: 'card-panel',
                layout: 'fit',
                frame: true,
                items: [
                    {
                        xtype: 'grid',
                        width: '100%',
                        itemId: 'gpMedications',
                        columns: {
                            items: [
                                {
                                    text: 'Letter(Y/N)', dataIndex: 'includeInLetter',
                                    renderer: function (value, summaryData, dataIndex) {
                                        if(value) return 'yes';
                                        else{return 'no'}
                                    },
                                    editor: {
                                        xtype:'checkbox',
                                        itemId:'chkIncludeInLetter'
                                    }

                                },
                                {
                                    text: 'MTMId', dataIndex: 'MTMId', hidden: true

                                },
                                {
                                    text: 'systemID', dataIndex: 'systemID',hidden: true

                                },
                                {
                                    text: 'Claim ID', dataIndex: 'transactionID', hidden: true

                                },
                                {
                                    text: 'NDC', dataIndex: 'NDC',width:300,
                                    editor: {
                                        xtype: 'drugtypeahead',
                                        emptyText: '[e.g. Nexium]',
                                        allowBlank: false,
                                        displayField: 'NDC',
                                        valueField: 'NDC',
                                        itemId: 'cbxNDC',
                                        hideLabel: true,
                                        listeners: {
                                            select: 'cbxDrugNDC_Select'
                                        }
                                        //listConfig: {
                                        //    // Custom rendering template for each item
                                        //    userCls: 'common-key-value-boundlist',
                                        //    getInnerTpl: function() {
                                        //        return '<b><span></span><font size=1>{LN}</b>-{LBLRID}<br>' +
                                        //            'NDC-{NDC}, GCN-{GCN_SEQNO}</font>';
                                        //    }
                                        //}
                                    }

                                },
                                {
                                    text: 'Medication', dataIndex: 'medicationName'

                                },
                                {
                                    text: 'Claim Date', dataIndex: 'transactionDate',
                                    xtype: 'datecolumn',
                                    format:'m/d/Y'
                                },
                                {
                                    text: 'Start Date', dataIndex: 'startDate',
                                    xtype: 'datecolumn',
                                    width:150,
                                    format:'m/d/Y',
                                    editor:{
                                        xtype: 'datefield',
                                        format: 'm/d/Y'
                                    }
                                },
                                {
                                    text: 'End Date', dataIndex: 'endDate',
                                    xtype: 'datecolumn',
                                    format:'m/d/Y',
                                    width:150,
                                    editor:{
                                        xtype: 'datefield',
                                        format: 'm/d/Y'
                                    }
                                },
                                {
                                    text: 'Data Source', dataIndex: 'dataSource',
                                    renderer:'rendererDataSource',
                                    editor: {
                                        xtype: 'combobox',
                                        itemId: 'cbxDataSource1',
                                        forceSelection:true,
                                        displayField: 'name',
                                        valueField: 'value',
                                        bind: {
                                            store: '{StoreDataSource}'
                                        }
                                    }

                                },

                                {
                                    text: 'Type', dataIndex: 'dataType',
                                    renderer:'rendererdataType',
                                    editor: {
                                        xtype: 'combobox',
                                        itemId: 'cbxType2',
                                        forceSelection:true,
                                        displayField: 'name',
                                        valueField: 'value',
                                        bind: {
                                            store: '{StoreType}'
                                        }
                                    }
                                },
                                {
                                    text: 'NPI', dataIndex: 'npi', width:300,
                                    editor: {
                                        xtype: 'prescribertypeahead',
                                        displayField: 'npi',
                                        valueField: 'npi',
                                        itemId: 'cbxPrescriber2',
                                        hideLabel: true/*,
                                        listConfig: {
                                            // Custom rendering template for each item
                                            userCls: 'common-key-value-boundlist',
                                            getInnerTpl: function() {
                                                return ' <h3><span></span>{fullname}</h3>' +
                                                    '{locaddr1}<br>{loccity}, {locstate} {loczip}';
                                            }
                                        }*/
                                    }
                                },
                                {
                                    text: 'Prescriber', dataIndex: 'prescriberName'

                                },
                                {
                                    text: 'Dosage', dataIndex: 'dosage', width:150,
                                    editor: {
                                        xtype:'textfield',
                                        itemId:'txtDosage'
                                    }
                                },
                                {
                                    text: 'Treatment Of', dataIndex: 'treatmentOf', width:150,
                                    editor: {
                                        xtype:'textfield',
                                        itemId:'txtTreatmentOf'
                                    }

                                },

                                {
                                    text: 'Additional Info', dataIndex: 'additionalInfo', width:150,
                                    editor: {
                                        xtype:'textfield',
                                        itemId:'txtAdditonalInfo'
                                    }


                                },
                                {
                                    xtype: 'booleancolumn',
                                    text: 'Oral HX', dataIndex: 'oralHX',
                                    trueText: 'Yes',
                                    falseText: 'No',
                                    editor: {
                                    xtype:'checkbox',
                                    itemId:'chkOralHX'
                                }
                                },
                                {
                                    xtype: 'booleancolumn',
                                    text: 'Filled', dataIndex: 'FILLED',
                                    trueText: 'Yes',
                                    falseText: 'No',
                                    editor: {
                                        xtype:'checkbox',
                                        itemId:'chkFilled'
                                    }
                                },
                                {
                                    xtype: 'booleancolumn',
                                    text: 'Samples', dataIndex: 'samples',
                                    trueText: 'Yes',
                                    falseText: 'No',
                                    editor: {
                                        xtype:'checkbox',
                                        itemId:'chkSamples'
                                    }
                                },
                                {
                                    xtype: 'booleancolumn',
                                    text: 'Know Name', dataIndex: 'knowDrugName',
                                    trueText: 'Yes',
                                    falseText: 'No',
                                    editor: {
                                        xtype:'checkbox',
                                        itemId:'chkKnowName'
                                    }
                                },

                                {
                                    xtype: 'booleancolumn',
                                    text: 'Know Frequency', dataIndex: 'knowFrequency',
                                    trueText: 'Yes',
                                    falseText: 'No',
                                    editor: {
                                        xtype:'checkbox',
                                        itemId:'chkKnowFrequency'
                                    }

                                },
                                {
                                    xtype: 'booleancolumn',
                                    text: 'Know Reason', dataIndex: 'knowReason',
                                    trueText: 'Yes',
                                    falseText: 'No',
                                    editor: {
                                        xtype:'checkbox',
                                        itemId:'chkKnowReason'
                                    }

                                },
                                {
                                    xtype: 'booleancolumn',
                                    text: 'Continue At Home', dataIndex: 'continueAtHome',
                                    trueText: 'Yes',
                                    falseText: 'No',
                                    editor: {
                                        xtype:'checkbox',
                                        itemId:'chkContinueAtHome'
                                    }

                                }
                            ]

                        },
                        bind: '{StoreMedications}',
                        plugins:[ {
                            ptype: 'rowediting',
                            clicksToEdit: 2,
                            autoCancel: false,
                            width:300,
                            listeners: {
                                'canceledit': function (rowEditing, context) {
                                    if (context.record.phantom) {
                                        context.store.remove(context.record);
                                    }
                                }
                            }
                        }],
                        bbar: [
                            {
                                xtype: 'pagingtoolbar',
                                bind: '{StoreMedications}',
                                displayInfo: true,
                                dock: 'bottom'
                            },
                            '->',
                            {
                                xtype: 'button',
                                text: 'Save',
                                iconCls: 'fa fa-save',
                                handler: 'btnSaveClick',
                                itemId: 'btnSave'
                            }

                        ]
                    }
                ]
            }]
        },
        {
            xtype: 'panel',
            itemId:'panelcmrtmr'
            , flex: 0.3,
            layout: {
                type: 'hbox',
                align : 'stretch',
                pack  : 'start'
            },
            items: [
                {
                    xtype: 'panel', layout: 'vbox', flex: 0.5,
                    cls: 'card-panel',
                    autoScroll: true,
                    frame: true,
                    items:[
                        {
                            xtype: 'grid',
                            tbar: [
                                {
                                    xtype: 'label',
                                    text:'CMR Details'
                                },
                                '->',
                                {
                                    xtype: 'button',
                                    text: 'Add CMR',
                                    iconCls: 'fa  fa-plus-circle',
                                    handler:'btnAddCMRClick'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Delete CMR',
                                    iconCls: 'fa  fa-minus-circle',
                                    itemId:'btnDeleteCMR',
                                    handler:'DeleteCMRTMR',
                                    disabled:true
                                }

                            ],
                            width: '100%',
                            layout: 'fit',
                            itemId: 'gpService',
                            columns: {
                                defaults: {
                                    flex: 1
                                },
                                items: [
                                    {
                                        text: 'Type', dataIndex: 'CMRTMRType',
                                        renderer: function (value, summaryData, dataIndex) {
                                            return '<span style="color:brown;"><b>CMR</b></span>';
                                        }
                                    },
                                    {
                                        text: 'System ID', dataIndex: 'systemID',hidden: true

                                    },
                                    {
                                        text: 'Record Type', dataIndex: 'recordType', hidden: true

                                    },
                                    {
                                        text: 'CMR Offer Date', dataIndex: 'CMROfferDate',
                                        xtype: 'datecolumn',
                                        format:'m/d/Y'

                                    },
                                    {
                                        text: 'CMR Date', dataIndex: 'CMRDate',
                                        xtype: 'datecolumn',
                                        format:'m/d/Y'
                                    },
                                    {
                                        text: 'CMR Offer Method', dataIndex: 'cmrOfferMethodDesc', hidden: true

                                    },
                                    {
                                        text: 'CMR Delivery Method', dataIndex: 'cmrDelvMethodDesc', hidden: true

                                    },
                                    {
                                        text: 'Intervention Date', dataIndex: 'interventionDate', hidden: true,
                                        xtype: 'datecolumn',
                                        format:'m/d/Y'
                                    },
                                    {
                                        text: 'Licensed Professional Type', dataIndex: 'LicProfTypeDesc', hidden: true

                                    },
                                    {
                                        text: 'CMR Recipient', dataIndex: 'cmrRecipientDesc', hidden: true

                                    },
                                    {
                                        text: 'Intervention Description', dataIndex: 'prescInterventions', hidden: true

                                    },
                                    {
                                        text: 'CMR Non Conf. Reason', dataIndex: 'CMRNonConfReason', hidden: true

                                    },
                                    {
                                        text: 'Therapy Change Date', dataIndex: 'therapyChangeDate', hidden: true,
                                        xtype: 'datecolumn',
                                        format:'m/d/Y'

                                    },
                                    {
                                        text: 'Therapy Change Type', dataIndex: 'TherapyChangeDesc', hidden: true

                                    }

                                ]

                            },
                            listeners: {
                                itemdblclick: 'gpService_Click',
                                select: 'gpService_select'
                            },
                            bind: '{StoreService}',
                            features: [{
                                id: 'group',
                                ftype: 'groupingsummary',
                                groupHeaderTpl: '{name}',
                                showSummaryRow:false
                            }]
                        }
                    ]
                },
                {
                    xtype: 'panel', layout: 'vbox', flex: 0.5,
                    cls: 'card-panel',
                    autoScroll: true,
                    frame: true,
                    items:[
                        {
                            xtype: 'grid',
                            tbar: [
                                {
                                    xtype: 'label',
                                    text:'TMR Details'
                                },
                                '->',
                                {
                                    xtype: 'button',
                                    text: 'Add TMR',
                                    iconCls: 'fa  fa-plus-circle',
                                    handler:'btnAddTMRClick'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Delete TMR',
                                    iconCls: 'fa  fa-minus-circle',
                                    itemId:'btnDeleteTMR',
                                    handler:'DeleteCMRTMR',
                                    disabled:true
                                }

                            ],
                            width: '100%',
                            layout: 'fit',
                            itemId: 'gpServiceTMR',
                            columns: {
                                defaults: {
                                    flex: 1
                                },
                                items: [
                                    {
                                        text: 'Type', dataIndex: 'CMRTMRType',
                                        renderer: function (value, summaryData, dataIndex) {
                                            return '<span style="color:blue;"><b>TMR</b></span>';
                                        }
                                    },
                                    {
                                        text: 'System ID', dataIndex: 'systemID',hidden: true

                                    },
                                    {
                                        text: 'Record Type', dataIndex: 'recordType', hidden: true

                                    },
                                    {
                                        text: 'TMR Date', dataIndex: 'TMRDate',
                                        xtype: 'datecolumn',
                                        format:'m/d/Y'

                                    },
                                    {
                                        text: 'CMR Date', dataIndex: 'CMRDate',
                                        xtype: 'datecolumn',
                                        format:'m/d/Y'

                                    },
                                    {
                                        text: 'TMR Description', dataIndex: 'targetedReviews', hidden: true

                                    },
                                    {
                                        text: 'Intervention Date', dataIndex: 'interventionDate', hidden: true,
                                        xtype: 'datecolumn',
                                        format:'m/d/Y'
                                    },
                                    {
                                        text: 'NPI', dataIndex: 'NPI', hidden: true

                                    },
                                    {
                                        text: 'Prescriber Name', dataIndex: 'prescriberName', hidden: true

                                    },
                                    {
                                        text: 'Intervention Description', dataIndex: 'prescInterventions', hidden: true

                                    },
                                    {
                                        text: 'CMR Non Conf. Reason', dataIndex: 'CMRNonConfReason', hidden: true

                                    },
                                    {
                                        text: 'Therapy Change Date', dataIndex: 'therapyChangeDate', hidden: true,
                                        xtype: 'datecolumn',
                                        format:'m/d/Y'

                                    },
                                    {
                                        text: 'Therapy Change Type', dataIndex: 'TherapyChangeDesc', hidden: true

                                    }

                                ]

                            },
                            listeners: {
                                itemdblclick: 'gpServiceTMR_Click',
                                select: 'gpServiceTMR_select'
                            },
                            bind: '{StoreServiceTMR}',
                            features: [{
                                id: 'group',
                                ftype: 'groupingsummary',
                                groupHeaderTpl: '{name}',
                                showSummaryRow:false
                            }]
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Create MTM Followup Letter',
                            iconCls: 'fa  fa-plus-circle',
                            handler: 'btnMTMFollowupLetterClick',
                            itemId: 'btnMTMFollowupLetter'
                        },
                        {
                            xtype: 'button',
                            text: 'Create Intervention Letter',
                            iconCls: 'fa  fa-plus-circle',
                            handler: 'btnPhyInterventionClick',
                            itemId: 'btnPhyIntervention'
                        }
                    ]
                }]

        }
    ]
})