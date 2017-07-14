/**
 * Created by j2560 on 7/11/2016.
 */
Ext.define('Atlas.casemanagement.view.CaseDetails', {
    extend: 'Ext.panel.Panel',
    alias:'CaseDetails',
    xtype: 'casemanagementCaseDetails',
    title: 'Case Details',
    layout: {
        type: 'vbox',
        align : 'stretch',
        pack  : 'start'
    },
    items: [
        {
            xtype: 'form'
            , flex:0.7,
            itemId:'pnlCaseDetail',
            layout: {
                type: 'hbox',
                align : 'stretch',
                pack  : 'start'
            },
            items: [
                {
                xtype: 'panel', layout: 'vbox', flex: 0.6,
                cls: 'card-panel',
                itemId:'pnlCase1',
                autoScroll: true,
                    overflowX: 'scroll',
                disabled:true,
                frame: true,
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Case General Information',
                        minWidth:400,
                        items: [
                            {
                                xtype: 'container',
                                layout: 'vbox',
                                defaults: {
                                    labelWidth: 200,
                                    minWidth:500
                                },
                                width:'100%',
                                items: [
                                    {
                                        xtype: 'membertypeahead',
                                        itemId: 'cbxMemberSearch',
                                        fieldLabel: 'MRx ID',
                                        allowBlank: false,
                                        displayField: 'recipientID',
                                        valueField: 'recipientID',
                                        hideLabel: false,
                                        listeners: {
                                            select: 'cbxMember_Select'//,
                                            /* beforequery: function (queryPlan) {
                                             queryPlan.query = 'wrdidx contains ' + queryPlan.query;
                                             }*/
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        defaults: {
                                            labelWidth: 200
                                        },
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                minWidth: 500,
                                                fieldLabel: 'Member Name',
                                                itemId: 'txtMemberFullName',
                                                disabled: true
                                            },
                                            {
                                                xtype: 'label',
                                                itemId: 'lblMemberStatus',
                                                text:''
                                            },
                                            {
                                                xtype: 'button',
                                                iconCls: 'fa fa-user',
                                                handler: 'btnGoToMember',
                                                itemId: 'btnGoToMember',
                                                tooltip:'View Member'

                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'combobox',
                                        itemId: 'cbxPlanGroupsUC',
                                        fieldLabel: 'Plan Group',
                                        allowBlank: false,
                                        displayField: 'planGroupName',
                                        emptyText: 'Select Plan Group',
                                        forceSelection:true,
                                        valueField: 'planGroupId',
                                        bind: {
                                            store: '{StoreMemPlanGroups}'
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        itemId: 'cbxCaseDesc',
                                        fieldLabel: 'Case Description',
                                        queryMode: 'local',
                                        allowBlank: false,
                                        displayField: 'name',
                                        forceSelection:true,
                                        emptyText: 'Select a description',
                                        valueField: 'value',
                                        bind: {
                                            store: '{StoreCaseDescription}'
                                        },
                                        listeners: {
                                            select: 'cbxCaseDesc_Select'
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        itemId: 'cbxCaseManager',
                                        allowBlank: false,
                                        fieldLabel: 'Case Manager',
                                        queryMode: 'local',
                                        displayField: 'userName',
                                        forceSelection:true,
                                        emptyText: 'Select a Case Manager',
                                        valueField: 'userName',
                                        bind: {
                                            store: '{StoreCaseManager}'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        defaults: {
                                            labelWidth: 200,
                                            minWidth: 500
                                        },
                                        items: [
                                            {
                                                xtype: 'textareafield',
                                                fieldLabel: 'Enroll Reason',
                                                itemId: 'txtEnrollReason'
                                            }

                                        ]
                                    },

                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        defaults: {
                                            labelWidth: 200,
                                            minWidth: 500
                                        },
                                        items: [
                                            {
                                                xtype: 'datefield',
                                                fieldLabel: 'Effective',
                                                itemId: 'dtEffective',
                                                allowBlank: false,
                                                emptyText: 'From',
                                                format : 'm/d/Y',
                                                listeners: {
                                                    focusleave: 'onLeaveDate'
                                                }
                                            },
                                            {
                                                xtype: 'datefield',
                                                itemId: 'dtTermDate',
                                                minWidth: 200,
                                                format : 'm/d/Y',
                                                listeners: {
                                                    focusleave: 'onLeaveDate'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        defaults: {
                                            labelWidth: 200,
                                            minWidth: 200
                                        },
                                        items: [
                                            {
                                                xtype: 'combobox',
                                                itemId: 'cbxStatus',
                                                minWidth: 500,
                                                fieldLabel: 'Status',
                                                displayField: 'name',
                                                queryMode: 'local',
                                                emptyText: 'Status',
                                                valueField: 'value',
                                                forceSelection:true,
                                                bind: {
                                                    store: '{StoreCaseStatus}'
                                                },
                                                listeners: {
                                                    select: 'cbxStatus_Select'
                                                }
                                            },
                                            {
                                                xtype: 'datefield',
                                                emptyText: 'Close Date',
                                                itemId: 'dtCloseDate',
                                                disabled:true,

                                                format : 'm/d/Y',
                                                listeners: {
                                                    focusleave: 'onLeaveDate',
                                                    render: function(control) {
                                                        control.setMaxValue(Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y'));
                                                    }

                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                itemId: 'cbxReason',
                                                displayField: 'name',
                                                forceSelection:true,
                                                emptyText: 'Reason to Close',
                                                valueField: 'value',
                                                disabled:true,
                                                bind: {
                                                    store: '{StoreReasonToClose}'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'combobox',
                                        itemId: 'cbxOptOutMethod',
                                        fieldLabel: 'OptOut Method',
                                        displayField: 'name',
                                        queryMode: 'local',
                                        forceSelection:true,
                                        emptyText: 'Opt Out Method',
                                        valueField: 'value',
                                        bind: {
                                            store: '{StoreOptOutMethod}'
                                        }
                                    }

                                ]

                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: 'Additional Case Details',
                        itemId:'FieldSet2',
                        minWidth:400,
                        items: [
                            {
                                xtype: 'container',
                                layout: 'vbox',
                                width:'100%',
                                defaults: {
                                    labelWidth: 200
                                },
                                items: [
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Signed MTM Waiver Date',
                                        itemId: 'dtWaiverDate',
                                        minValue: new Date('1/1/2010'),
                                        format : 'm/d/Y',
                                        listeners: {
                                            focusleave: 'onLeaveDate'
                                        }
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Signed HIPAA Date',
                                        itemId: 'dtHIPAA',
                                        minValue: new Date('1/1/2010'),
                                        format : 'm/d/Y',
                                        listeners: {
                                            focusleave: 'onLeaveDate'
                                        }
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Patient Profile Date',
                                        itemId: 'dtPatientProfile',
                                        minValue: new Date('1/1/2010'),
                                        format : 'm/d/Y',
                                        listeners: {
                                            focusleave: 'onLeaveDate'
                                        }
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Medication Record Date',
                                        itemId: 'dtRecord',
                                        minValue: new Date('1/1/2010'),
                                        format : 'm/d/Y',
                                        listeners: {
                                            focusleave: 'onLeaveDate'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'MTM Changes',
                                        itemId: 'txtMTMChanges'
                                    },
                                    {
                                        xtype: 'checkbox',
                                        fieldLabel: 'Cognitively Impaired',
                                        flex: 1,
                                        labelWidth: 205,
                                        itemId: 'chkCognitiveImpaired',
                                        listeners : {
                                            change : 'CognitivelyChecked'
                                        }
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Date Determined',
                                        itemId: 'dtDateDetermined',
                                        disabled: true,
                                        minValue: new Date('1/1/2010'),
                                        format : 'm/d/Y',
                                        listeners: {
                                            focusleave: 'onLeaveDate'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        defaults: {
                                            labelWidth: 200
                                        },
                                        items: [
                                            {
                                                xtype: 'textareafield',
                                                fieldLabel: 'Cognitively Impaired Notes',
                                                labelWidth: 200,
                                                disabled: true,
                                                itemId: 'TextCognitiveNotes'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'checkbox',
                                        checked: true,
                                        fieldLabel: 'Returned Mail',
                                        flex: 1,
                                        itemId: 'chkReturnedMail'
                                    }
                                ]
                            }]
                    }
                ]
            },
                {
                    xtype: 'panel', layout: 'vbox',
                    itemId:'pnlCase2',
                    cls: 'card-panel', flex: 0.4,
                    autoScroll: true,
                    overflowX: 'scroll',
                    disabled:true,
                    frame: true,
                    items: [{

                        xtype: 'fieldset',
                        title: 'Case Tracking Details',
                        minWidth:400,
                        items: [
                            {
                                xtype: 'container',
                                layout: 'vbox',
                                minWidth:400,
                                width:'100%',
                                defaults: {
                                    labelWidth: 200,
                                    fieldWidth: 500
                                },
                                items: [
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Enrolled On',
                                        itemId: 'lblEnrolledOn'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Enrolled By',
                                        itemId: 'lblEnrolledBy'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Invitation Letter Sent',
                                        itemId: 'lblInvitationLetterSent'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Call Attempt(s)',
                                        itemId: 'lblCallAttempts'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Days Open',
                                        itemId: 'lbldaysopen',
                                        hidden:true
                                    },

                                    {
                                        xtype: 'checkbox',
                                        flex: 1,
                                        labelWidth: 205,
                                        fieldLabel: 'Call Attempted',
                                        itemId: 'chkCallAttempted'
                                    }
                                    ,
                                    {
                                        xtype: 'combobox',
                                        itemId: 'cbxMemberResponse',
                                        minWidth: 500,
                                        fieldLabel: 'Member Response',
                                        displayField: 'name',
                                        forceSelection:true,
                                        emptyText: 'Select Member Response',
                                        queryMode: 'local',
                                        valueField: 'value',
                                        bind: {
                                            store: '{StoreMemberResponse}'
                                        },
                                        listeners: {
                                            select: 'cbxMemberResponse_Select'
                                        }
                                    },
                                    {
                                        xtype: 'reasontypeahead',
                                        width: 500,
                                        itemId: 'cbxReason1',
                                        fieldLabel: 'Reason',
                                        displayField: 'ContactCodeDispText',
                                        valueField: 'ContactCode'
                                    },
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        defaults: {
                                            labelWidth: 200
                                        },
                                        items: [
                                            {
                                                xtype: 'textareafield',
                                                width: 500,
                                                fieldLabel: 'Description',
                                                itemId: 'txtDescription'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Last Contact Date',
                                        itemId: 'dtLastContact',
                                        width: 500,
                                        minValue: new Date('1/1/2010'),
                                        format: 'm/d/Y',
                                        listeners: {
                                            focusleave: 'onLeaveDate'
                                        }
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Follow Up Date',
                                        itemId: 'dtFollowUpDate',
                                        width: 500,
                                        minValue: new Date('1/1/2010'),
                                        format: 'm/d/Y',
                                        listeners: {
                                            focusleave: 'onLeaveDate'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        defaults: {
                                            labelWidth: 200
                                        },
                                        items: [
                                            {
                                                xtype: 'textareafield',
                                                fieldLabel: 'Goal For Next Contact',
                                                width: 500,
                                                itemId: 'txtGoalForNextContact'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }]

                }],

            dockedItems : [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [

                                {
                                    xtype: 'button',
                                    text: 'Create MTM Invitation Letter',
                                    iconCls: 'fa  fa-plus-circle',
                                    handler: 'btnResetClick',
                                    disabled:true,
                                    hidden:true,
                                    itemId:'btnMTMInvitationLetter'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Add New Case',
                                    iconCls: 'fa  fa-plus-circle',
                                    handler: 'btnAddNewCaseClick',
                                    itemId:'btnAdd'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Cancel',
                                    iconCls: 'fa fa-remove',
                                    handler: 'btnCancelClick',
                                    disabled:true,
                                    itemId:'btnCancel'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Delete',
                                    iconCls: 'x-fa  fa-minus-circle',
                                    handler: 'btnDeleteClick',
                                    itemId:'btnDelete',
                                    disabled:true
                                }
                            ]
                        }
                        ,
                        '->',
                        {
                            xtype: 'button',
                            text: 'Save',
                            iconCls: 'fa fa-save',
                            handler:'btnSaveClick',
                            itemId:'btnSave',
                            disabled:true
                        }
                    ]
                }
            ]
            /* {
             xtype: 'panel', layout: 'hbox', flex: 1,

             items: []
             /!* grid*!/
             }*/
        },
        {
            xtype: 'panel',
            itemId:'plnGrid',
            layout : 'fit',
            title:'Contact Log'
            , flex: 0.3,
            labelWidth: 200,
            items: [{
                xtype: 'grid',
                width:'100%',

                itemId: 'gpContactLog',
                columns: {
                    defaults: {
                        flex: 1
                    },
                    items: [
                        {
                            text: 'Reason', dataIndex: 'Reason1'

                        },
                        {
                            text: 'Description', dataIndex: 'description',
                            renderer: function(value, metadata) {
                                metadata.style = 'white-space: normal !important;';
                                return value;
                            }

                        },
                        {
                            text: 'Status', dataIndex: 'CallStatusInfo'

                        },
                        {
                            text: 'User', dataIndex: 'contactUser'

                        },
                        {
                            text: 'CallTime', dataIndex: 'callDateTime',
                            xtype: 'datecolumn',
                            renderer:function(value)
                            {
                               return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(value, 'm/d/Y H:m:s');
                            }
                        },
                        {
                            text: 'Case #', dataIndex: 'CaseNum',hidden:true

                        },
                        {
                            text: 'Subject', dataIndex: 'subject',hidden:true

                        },
                        {
                            text: 'Type', dataIndex: 'ContactTypeInfo',hidden:true

                        },
                        {
                            text: 'LastModifiedBy', dataIndex: 'LastModifiedBy',hidden:true

                        },
                        {
                            text: 'LastModifiedDate', dataIndex: 'LastModified',hidden:true,
                            xtype: 'datecolumn',
                            renderer:function(value)
                            {
                                return Atlas.common.Util.setdateformatWithAMPM(value);
                            }

                        },
                        {
                            text: 'PlanGroup Id', dataIndex: 'planGroupId',hidden:true

                        },
                        {
                            text: 'Updated Datetime', dataIndex: 'updatedDatetime',hidden:true,
                            xtype: 'datecolumn',
                            renderer:function(value)
                            {
                                return Atlas.common.Util.setdateformatWithAMPM(value);
                            }

                        }
                    ]

                },
                bind: '{StoreContactLog}',
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        bind: '{StoreContactLog}',
                        displayInfo: true,
                        dock: 'bottom'
                    }

                ]
            }
            ]
        }
    ]
});