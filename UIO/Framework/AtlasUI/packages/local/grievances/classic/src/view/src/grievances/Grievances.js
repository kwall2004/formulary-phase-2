/*
 Developer: Tremaine Grant
 Description: A view that shows a form to log a grievance

 */
Ext.define('Atlas.grievances.view.grievances.Grievances', {
    extend: 'Ext.panel.Panel',
    xtype: 'Grievances',
    title: 'Grievances',
    controller: 'grievancescontroller',
    viewModel: 'grievancesviewmodel',
    dockedItems: {
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                xtype: 'button',
                text: 'Add',
                itemId: 'btnAdd',
                iconCls : 'fa fa-plus-circle',
                handler: 'btnAdd_Click'
            },
            {
                xtype: 'button',
                text: 'View All Grievances',
                itemId: 'btnViewAll',
                iconCls : 'fa fa-search',
                handler: 'onViewGrievancesClick'
            }, '->',
            {
                xtype: 'button',
                text: 'Add Grievance',
                itemId: 'btnSave',
                iconCls : 'fa fa-save',
                listeners: {
                    click: 'btnSave_Click'
                }
            }
        ]
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    height: '100%',
    width: '100%',
    items: [
        {
            xtype: 'form',
            itemId: 'GrievanceForm',
            flex: 10,
            autoScroll:true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    title: 'Reporting by Information <span class="m-red-color">(Required)</span>',
                    xtype: 'panel',
                    collapsible: true,
                    autoScroll:true,
                    overFlowY : 'scroll',
                    overFlowX : 'scroll',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            border: false,
                            minWidth : 1500,
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    groupName: 'radInitType',
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'Member',
                                            //width: 20,
                                            itemId: 'radInitTypeMember',
                                            listeners: {
                                                change: 'enableDisableType',
                                                params: {
                                                    initRept: 'Init',
                                                    type: 'MEMBER'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'membertypeahead',
                                            itemId: 'cbxInitMember',
                                            emptyText: '[MemberID Name SSN MeridianRxID]',
                                            displayField: 'tmemberID',
                                            valueField: 'tmemberID',
                                            minWidth: 250,
                                            listeners: {
                                                select: 'membertypeahead_Select',
                                                params: {
                                                    initRept: 'Init'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblRecipID',
                                            hidden: true
                                        },
                                        {
                                            xtype: 'button',
                                            //width: 20,
                                            iconCls: 'fa fa-user',
                                            itemId: 'btnDispRecipID',
                                            handler: 'btnDispRecipID_Click',
                                            tooltip : 'Member Info'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            minWidth: 50
                                        },
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'Prescriber',
                                            //width: 20,
                                            itemId: 'radInitTypePrescriber',
                                            listeners: {
                                                change: 'enableDisableType',
                                                params: {
                                                    initRept: 'Init',
                                                    type: 'PRESCRIBER'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'prescribertypeahead',
                                            itemId: 'cbxInitPrescriber',
                                            emptyText: '[NPI DEA PrescriberName Address]',
                                            displayField: 'npi',
                                            valueField: 'npi',
                                            minWidth: 250,
                                            listeners: {
                                                select: 'prescribertypeahead_Select',
                                                params: {
                                                    initRept: 'Init'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'fa fa-user',
                                            itemId: 'btnDispPrescID',
                                            handler: 'btnDispPrescID_Click',
                                            tooltip : 'Prescriber Info'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            minWidth: 50
                                        },
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'Pharmacy',
                                            //width : 20,
                                            itemId: 'radInitTypePharmacy',
                                            listeners: {
                                                change: 'enableDisableType',
                                                params: {
                                                    initRept: 'Init',
                                                    type: 'PHARMACY'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'providertypeahead',
                                            emptyText: '[NCPDP NPI PharmacyName]',
                                            itemId: 'cbxInitPhar',
                                            displayField: 'ncpdpId',
                                            valueField: 'ncpdpId',
                                            minWidth: 250,
                                            listeners: {
                                                select: 'providertypeahead_Select',
                                                params: {
                                                    initRept: 'Init'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'fa fa-home',
                                            itemId: 'btnDispPharmacyID',
                                            handler: 'btnDispPharmacyID_Click',
                                            tooltip : 'Pharmacy Info'
                                        }
                                    ]
                                }
                            ]


                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            border: false,
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'First Name',
                                    itemId: 'lblInitFirstName',
                                    width: '20%'
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Last Name',
                                    itemId: 'lblInitLastName',
                                    width: '15%',
                                    labelWidth: 90
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'DOB',
                                    itemId: 'lblInitDOB',
                                    labelWidth: 50,
                                    minWidth : 150,
                                    renderer: function(date) {
                                        return Atlas.common.utility.Utilities.formatDate(date, 'm/d/Y');
                                    }
                                 },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Gender',
                                    itemId: 'lblInitGender',
                                    labelWidth: 60
                                }

                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            border: false,
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Address',
                                    itemId: 'lblInitAddress',
                                    width: '35%'
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Pharmacy Name',
                                    itemId: 'lblInitPharmacyName'
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Reporting On Information <span class="m-red-color">(Required)</span>',
                    xtype: 'panel',
                    autoScroll:true,
                    overFlowY : 'scroll',
                    overFlowX : 'scroll',
                    collapsible: true,
                    items: [
                        {
                            xtype: 'container',
                            //defaultType: 'radiofield',
                            layout: 'hbox',
                            border: false,
                            minWidth : 1500,
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    groupName: 'radReptType',
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'Member',
                                            itemId: 'radReptTypeMember',
                                            hidden: true,
                                            listeners: {
                                                change: 'enableDisableType',
                                                params: {
                                                    initRept: 'Rept',
                                                    type: 'MEMBER'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'membertypeahead',
                                            itemId: 'cbxReptMember',
                                            displayField: 'MemberID',
                                            valueField: 'MemberID',
                                            emptyText: '[MemberID Name SSN MeridianRxID]',
                                            hidden: true,
                                            minWidth: 250,
                                            listeners: {
                                                select: 'membertypeahead_Select',
                                                params: {
                                                    initRept: 'Rept'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'Prescriber',
                                            itemId: 'radReptTypePrescriber',
                                            listeners: {
                                                change: 'enableDisableType',
                                                params: {
                                                    initRept: 'Rept',
                                                    type: 'PRESCRIBER'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'prescribertypeahead',
                                            itemId: 'cbxReptPrescriber',
                                            emptyText: '[NPI DEA PrescriberName Address]',
                                            displayField: 'npi',
                                            valueField: 'npi',
                                            minWidth: 250,
                                            listeners: {
                                                select: 'prescribertypeahead_Select',
                                                params: {
                                                    initRept: 'Rept'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'fa fa-user',
                                            itemId: 'btnDispPrescID1',
                                            handler: 'btnDispPrescID1_Click',
                                            tooltip : 'Prescriber Info'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            minWidth: 40
                                        },
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'Pharmacy',
                                            itemId: 'radReptTypePharmacy',
                                            listeners: {
                                                change: 'enableDisableType',
                                                params: {
                                                    initRept: 'Rept',
                                                    type: 'PHARMACY'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'providertypeahead',
                                            itemId: 'cbxReptPhar',
                                            displayField: 'ncpdpId',
                                            valueField: 'ncpdpId',
                                            emptyText: '[NCPDP NPI PharmacyName]',
                                            minWidth: 250,
                                            listeners: {
                                                select: 'providertypeahead_Select',
                                                params: {
                                                    initRept: 'Rept'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'fa fa-home',
                                            itemId: 'btnDispPharmacyID1',
                                            handler: 'btnDispPharmacyID1_Click',
                                            tooltip : 'Pharmacy Info'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            minWidth: 50
                                        },
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'PBM',
                                            itemId: 'radReptTypePBM',
                                            listeners: {
                                                change: 'enableDisableType',
                                                params: {
                                                    initRept: 'Rept',
                                                    type: 'PBM'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txtPBM',
                                            minWidth: 250
                                        }
                                    ]
                                }
                            ]


                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            border: false,
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'First Name',
                                    itemId: 'lblReptFirstName',
                                    width: '20%'
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Last Name',
                                    itemId: 'lblReptLastName',
                                    width: '15%',
                                    labelWidth: 90
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'DOB',
                                    itemId: 'lblReptDOB',
                                    hidden: true
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Gender',
                                    itemId: 'lblReptGender',
                                    hidden: true
                                }

                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            border: false,
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Address',
                                    itemId: 'lblReptAddress',
                                    width: '35%'
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Pharmacy Name',
                                    itemId: 'lblReptPharmacyName'
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Other Information',
                    xtype: 'panel',

                    autoScroll:true,
                    //overFlowY : 'scroll',
                    //overFlowX : 'scroll',
                    flex: 4,
                    collapsible: true,
                    items: [
                        {
                            xtype: 'container',
                            minWidth : 1200,
                            autoScroll:true,
                            overFlowY : 'scroll',
                            overFlowX : 'scroll',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        //width: '25%',
                                        minWidth: 400,
                                        labelWidth: 180
                                    },
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblInitiatedDate',
                                            fieldLabel: 'Initiated Date'
                                            //labelWidth: 185
                                        },
                                        {
                                            xtype: 'label',
                                            //width: '25%',
                                            fieldLabel: ' '
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblDaysOpen',
                                            fieldLabel: 'No. of Days Open',
                                            labelWidth: 185
                                            //width: 350
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        //width: '25%',
                                        minWidth: 400,
                                        labelWidth: 180
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            itemId: 'dtIncidentDate',
                                            fieldLabel: 'Incident Date',
                                            emptyText : '[mm/dd/yyyy]',
                                            format: 'm/d/Y',
                                            formatText: 'Expected date format mm/dd/yyyy',
                                            listeners: {
                                                focusleave: 'onLeaveDatefield'
                                            },
                                            maxValue : new Date()
                                            // listeners : {
                                            //     focusleave: 'onLeaveDatefield',
                                            //     render: function(obj) {
                                            //         //obj.setRawValue(Ext.Date.format(Atlas.common.Util.getServerDateTime(), 'm/d/Y'));
                                            //         obj.setMaxValue(Ext.Date.format(Atlas.common.Util.getServerDateTime(), 'm/d/Y'));
                                            //     }
                                            // }

                                        },
                                        {
                                            xtype: 'label',
                                            //width: '25%',
                                            fieldLabel: ' '
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblAckLetterDue',
                                            fieldLabel: 'Ack. Letter Due',
                                            labelWidth: 185
                                            //width: '35%'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        //width: '25%',
                                        minWidth: 400,
                                        labelWidth: 180
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cbxNotificationMenthod',
                                            bind: {
                                                store: '{StoreNotifyMethod}'
                                            },
                                            fieldLabel: 'Notification Method',
                                            displayField: 'name',
                                            valueField: 'value'
                                        },
                                        {
                                            xtype: 'label',
                                            //width: '25%',
                                            fieldLabel: ' '
                                        },
                                        {
                                            xtype: 'datefield',
                                            itemId: 'dtAckLetterSent',
                                            fieldLabel: 'Ack. Letter Sent',
                                            emptyText: '[mm/dd/yyyy]',
                                            labelWidth: 180,
                                            //width: 350,
                                            format: 'm/d/Y',
                                            formatText: 'Expected date format mm/dd/yyyy',
                                            listeners: {
                                                focusleave: 'onLeaveDatefield'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        //width: '25%',
                                        minWidth: 400,
                                        labelWidth: 180
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cbxCategory',
                                            bind: {
                                                store: '{StoreGrievanceCategory}'
                                            },
                                            fieldLabel: 'Category',
                                            displayField: 'Descr',
                                            valueField: 'Category',
                                            allowBlank: false,
                                            listeners: {select: 'getGrievanceType'}
                                        },
                                        {
                                            xtype: 'label',
                                            //width: '25%',
                                            fieldLabel: ' '
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'lblResLetterDue',
                                            fieldLabel: 'Resolution Letter Due',
                                            labelWidth: 185
                                            //width: '35%'

                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        //width: '25%',
                                        //width: 400,
                                        labelWidth: 180
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cbxType',
                                            minWidth: 400,
                                            bind:{
                                                store : '{StoreGrievanceType}'
                                            },
                                            fieldLabel: 'Type',
                                            displayField: 'TypeDesc',
                                            valueField: 'Type',
                                            allowBlank: true,
                                            listeners : {
                                                select : 'cbxType_Select'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            //width: '25%',
                                            minWidth: 400,
                                            fieldLabel: ' '
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            minWidth: 525,
                                            //width: '35%',
                                            items: [
                                                {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Resolution Letter Sent',
                                                    itemId: 'dtResLetterSent',
                                                    emptyText: '[mm/dd/yyyy]',
                                                    labelWidth: 178,
                                                    minWidth: 348,
                                                    format: 'm/d/Y',
                                                    formatText: 'Expected date format mm/dd/yyyy',
                                                    listeners: {
                                                        focusleave: 'onLeaveDatefield'
                                                    }
                                                },
                                                {
                                                    xtype: 'timefield',
                                                    itemId: 'tmResLetterSent',
                                                    minWidth: 170,
                                                    emptyText: 'hh:mm',
                                                    iconCls: 'fa fa-clock-o',
                                                    incremen: 1
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        //width: '25%',
                                        minWidth: 400,
                                        labelWidth: 180
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cbxLevel',
                                            bind: {
                                                store: '{StoreLevel}'
                                            },
                                            fieldLabel: 'Level',
                                            displayField: 'name',
                                            valueField: 'value'
                                        },
                                        {
                                            xtype: 'label',
                                            //width: '25%',
                                            fieldLabel: ' '
                                        },
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Follow-up Date',
                                            itemId: 'dtFollowupDate',
                                            //maxValue: new Date(),
                                            emptyText: '[mm/dd/yyyy]',
                                            /*labelWidth: 178,
                                            width: 348,*/
                                            labelWidth: 180,
                                            format: 'm/d/Y',
                                            formatText: 'Expected date format mm/dd/yyyy',
                                            listeners: {
                                                focusleave: 'onLeaveDatefield'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        //width: '25%',
                                        minWidth: 400,
                                        labelWidth: 180
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            itemId: 'dtComplianceCommDate',
                                            fieldLabel: 'Compliance Committee Date',
                                            emptyText: '[mm/dd/yyyy]',
                                            format: 'm/d/Y',
                                            formatText: 'Expected date format mm/dd/yyyy',
                                            listeners: {
                                                focusleave: 'onLeaveDatefield'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            //width: '25%',
                                            fieldLabel: ' '
                                        },
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cbxUsers',
                                            minWidth: 525,
                                            bind: {
                                                store: '{StoreUsers}'
                                            },
                                            fieldLabel: 'Assigned To',
                                            emptyText : '[Select a User]',
                                            displayField: 'userName',
                                            valueField: 'userName',
                                            queryMode: 'local',
                                            labelWidth: 182,
                                            forceSelection : true

                                        },
                                        {
                                            xtype: 'displayfield',
                                            minWidth: 2
                                        },
                                        {
                                            xtype : 'button',
                                            disabled : false,
                                            iconCls : 'fa  fa-info',
                                            minWidth :15,
                                            tooltip : 'You can search for a user by typing in any part of the user name'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    minWidth : 1500,
                                    defaults: {
                                        //width: '25%',
                                        minWidth: 400,
                                        labelWidth: 180
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cbxResolution',
                                            bind: {
                                                store: '{StoreResolution}'
                                            },
                                            fieldLabel: 'Resolution',
                                            displayField: 'name',
                                            valueField: 'value'
                                        },
                                        {
                                            xtype: 'label',
                                            //width: '25%',
                                            fieldLabel: ' '
                                        },
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cbxStatus',
                                            minWidth: 525,
                                            bind: {
                                                store: '{StoreStatus}'
                                            },
                                            fieldLabel: 'Status',
                                            displayField: 'name',
                                            valueField: 'value',
                                            allowBlank: false,
                                            labelWidth: 182

                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        //width: '25%',
                                        minWidth:400,
                                        labelWidth: 180
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cbxDispostion',
                                            bind: {
                                                store: '{StoreDisposition}'
                                            },
                                            fieldLabel: 'Disposition',
                                            displayField: 'name',
                                            valueField: 'value'
                                        },
                                        {
                                            xtype: 'label',
                                            //width: '25%',
                                            fieldLabel: ' '
                                        },
                                        {
                                            xtype: 'textarea',
                                            itemId: 'txtNotes',
                                            fieldLabel: 'Notes',
                                            minWidth: 525,
                                            labelWidth: 182
                                        },
                                        {
                                            xtype: 'displayfield',
                                            minWidth: 2
                                        },
                                        {
                                            xtype : 'button',
                                            disabled : false,
                                            iconCls : 'fa  fa-info',
                                            minWidth :15,
                                            tooltip : 'Notes is required while creating a Grievance or updating the Grievance Status.'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        //width: '25%',
                                        minWidth: 400,
                                        labelWidth: 180
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            itemId: 'dtGrievanceCommitteDate',
                                            fieldLabel: 'Grievance Committee Date <br/>(Level 2 Grievances Only)',
                                            emptyText: '[mm/dd/yyyy]',
                                            format: 'm/d/Y',
                                            formatText: 'Expected date format mm/dd/yyyy',
                                            listeners: {
                                                focusleave: 'onLeaveDatefield'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            //width: '25%',
                                            fieldLabel: ' '
                                        },
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cbxResponse',
                                            minWidth: 525,
                                            bind: {
                                                store: '{StoreMethodOfResponce}'
                                            },
                                            fieldLabel: 'Method of Response',
                                            displayField: 'name',
                                            valueField: 'value',
                                            emptyText: '[Select a Method Of Response]'

                                        }
                                    ]
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cbxLOB',
                                    //width: '25%',
                                    minWidth: 400,
                                    labelWidth: 180,
                                    bind: {
                                        store: '{StoreLOB}'
                                    },
                                    fieldLabel: 'LOB',
                                    displayField: 'name',
                                    valueField: 'value'
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cbxExtRqst',
                                    //width: '25%',
                                    minWidth: 400,
                                    labelWidth: 180,
                                    bind: {
                                        store: '{StoreExtensionRequest}'
                                    },
                                    fieldLabel: 'Extension Requested',
                                    displayField: 'name',
                                    valueField: 'value',
                                    emptyText: '[Select Extension Request]'
                                }
                                //---------------------
                            ]
                        }
                    ]
                },
                {
                    title: 'Attachments',
                    xtype: 'panel',
                    autoScroll:true,
                    flex: 4,
                    height: '100%',
                    width: '100%',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    collapsible: true,
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            height: '100%',
                            width: '100%',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            defaults: {
                                //width: '50%',
                                labelWidth: 180
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    itemId: 'gridAttachment',
                                    flex: 1,
                                    bind: '{StoreAttachment}',
                                    columns: [
                                        {text: 'File Name', dataIndex: 'fileName',flex: 2,hideable : false,hideable : false,
                                            renderer: function(value) {
                                            if(value!="" && value !=null)
                                            {
                                                var arr=value.split('/');
                                                return arr[arr.length - 1];
                                            }
                                        }},
                                        {text: 'Description', dataIndex: 'Subject',hideable : false,flex: 1},
                                        {
                                            text: 'View',
                                            xtype: 'actioncolumn',
                                            hideable : false,
                                            width: 50,
                                            items: [{
                                                xtype: 'button',
                                                iconCls: 'x-fa fa-paperclip',  // Use a URL in the icon config
                                                tooltip: 'View Attachment',
                                                handler: function (grid) {
                                                    Atlas.common.utility.Utilities.viewDocument(grid.eventPosition.record.get('DocumentID'));
                                                }
                                            }]
                                        },
                                        {
                                            text: 'Delete',
                                            xtype: 'actioncolumn',
                                            hideable : false,
                                            flex: 1,
                                            items: [{
                                                iconCls: 'x-fa fa-trash-o',
                                                tooltip: 'Delete Attachment',
                                                handler: function (grid, rowIndex, colIndex) {
                                                    var rec = grid.getStore().getAt(rowIndex);
                                                    if (rec.data.inOut == 'Letter') {
                                                        Ext.Msg.alert('PBM Message', 'Cannot remove the letter which already sent.');
                                                    }
                                                    else {
                                                        Ext.Msg.show({
                                                            title : 'Delete Attachment',
                                                            msg: 'Are you sure you would like to remove this attachment?',
                                                            buttons: Ext.Msg.YESNO,
                                                            icon: Ext.Msg.QUESTION,
                                                            fn: function (btn, text) {
                                                                if (btn == 'yes') {
                                                                    var gridPanel = grid.up('panel'),
                                                                        vc = Ext.ComponentQuery.query('#gridAttachment')[0].up('panel').up('panel').up('panel').controller;
                                                                    vc.deleteAttachment(rec.data.DocumentID);
                                                                }
                                                            }
                                                        })

                                                    }
                                                }
                                            }]
                                        }
                                    ],
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'bottom',
                                            displayInfo: 'false',
                                            items: [
                                                '->',
                                                {
                                                    xtype: 'button',
                                                    text: 'Add Attachment',
                                                    disabled:true,
                                                    itemId: 'btnAddAttachment',
                                                    iconCls: 'x-fa fa-file',
                                                    handler: 'showGrieAddAttachmentPopUp'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Notes History',
                    xtype: 'panel',
                    autoScroll:true,
                    flex: 4,
                    collapsible: true,
                    itemId: 'pnlNotesHistory',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'textarea',
                            itemId: 'txtNotesHistory',
                            fieldLabel: '',
                            readOnly : true
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    itemId: 'hdnContainer_Grievance',
                    autoScroll:true,
                    hidden: true,
                    items: [
                        {xtype: 'hidden', itemId: 'hiddenGrievanceId'},
                        {xtype: 'hidden', itemId: 'hiddenOldGrievanceStatus'},
                        {xtype: 'hidden', itemId: 'hiddenOldAssignedTo'},
                        {xtype: 'hidden', itemId: 'hiddenKeyValue'},
                        {xtype: 'hidden', itemId: 'hiddenKeyType'},
                        {xtype: 'hidden', itemId: 'hiddenStatus'},
                        {xtype: 'hidden', itemId: 'hidMemberInfoMenuID'},
                        {xtype: 'hidden', itemId: 'hidPrescriberInfoMenuID'},
                        {xtype: 'hidden', itemId: 'hidPharmacyInfoMenuID'}
                    ]
                }

            ]
        }
    ]

});
