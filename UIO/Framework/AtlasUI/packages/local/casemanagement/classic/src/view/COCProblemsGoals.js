/**
 * Created by mkorivi on 11/10/2016.
 */
Ext.define('Atlas.casemanagement.view.COCProblemsGoals', {
    extend: 'Ext.form.Panel',
    xtype: 'COCProblemsGoals',
    itemId: 'COCProblemsGoals',
    title: 'Problems and Goals',
    controller: 'COCProblemsGoals',
    items: [{
        xtype: 'form',
        region: 'center',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        flex: 1,
        items: [{
            dockedItems: {
                dock: 'top',
                xtype: 'toolbar',
                items: [
                    '->',
                    {
                        xtype: 'checkbox', fieldLabel: 'Closed Goals', itemId: 'chkclosedGoals',
                        listeners: {
                            change: 'LoadProblemAndGoalRecords'
                        }
                    },
                    {
                        xtype: 'checkbox', fieldLabel: 'History of Goals', itemId: 'chkHisGoals', listeners: {
                        change: 'LoadProblemAndGoalRecords'
                    }
                    }
                ]
            }
        },
            {xtype:'panel', autoscroll: true, layout : 'fit',height:200,
                flex: .33,items:[
            {
                xtype: 'gridpanel',
                frame: true,
                itemId: 'gpProblemsAndGoals',
                listeners: {
                    select: 'onRecordSelect'
                },
                columns: {
                    defaults: {
                        flex: 1
                    },


                    items: [
                        {text: 'Recipient ID', dataIndex: 'recipientId', width: 200,hidden:true},
                        {text: 'Seq.No.', dataIndex: 'seqNum', width: 200,hidden:true},
                        {text: 'Problem ID', dataIndex: 'problemID', width: 200,hidden:true},
                        {text: 'Case', dataIndex: 'caseType', width: 200},
                        {text: 'Problem Priority', dataIndex: 'priority'},
                        {text: 'Problem Description', dataIndex: 'problemShortDescription'},
                        {text: 'problem Start', dataIndex: 'problemStartDate', renderer: function(value, field){
                            return   Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');}, xtype: 'datecolumn'},
                        {text: '', dataIndex: 'STGoalID',hidden:true},
                        {text: 'Goal Description', dataIndex: 'STGoalShortDescription'},
                        {text: 'Goal Priority', dataIndex: 'goalPriority'},
                        {text: 'Goal Start', dataIndex: 'goalStartDate', renderer: function(value, field){
                            return   Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');}, xtype: 'datecolumn'},
                        {text: 'Progress', dataIndex: 'goalProgress'},
                        {text: 'Goal End', dataIndex: 'goalEndDate', renderer: function(value, field){
                            return   Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');}, xtype: 'datecolumn'},
                        {text: 'Created By', dataIndex: 'createUser'},
                        {text: 'Close Date', dataIndex: 'closeDate', renderer: function(value, field){
                            return   Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');}, xtype: 'datecolumn'},
                        {text: 'Close Reason', dataIndex: 'closeReason',hidden:true},
                        {text: 'system ID', dataIndex: 'systemID',hidden:true},
                        {text: 'Seq.No.', dataIndex: 'seqNum', width: 200,hidden:true}
                    ]
                }
            }
            ]},



            {
                xtype: 'form',
                itemId: 'POCInfo',
                collapsible:"true",
                border:false,
                title: 'Details',
                flex: .33,
                autoScroll: true,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Short Description',
                        readOnly: true,
                        itemId: 'lblSTGoalShortDescription',
                        bind: {value: '{pocrec.STGoalShortDescription}'},
                        disabled: 'true',
                        labelWidth: 500
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Long Description',
                        readOnly: true,
                        itemId: 'lblSTGoalLongDescription',
                        bind: {value: '{pocrec.STGoalLongDescription}'},
                        disabled: 'true',
                        labelWidth: 500

                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Long Term Goal',
                        readOnly: true,
                        itemId: 'lblLTGoalShortDescription',
                        bind: {value: '{pocrec.LTGoalShortDescription}'},
                        labelWidth: 500,
                        disabled: 'true'
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Long Term Goal Description',
                        readOnly: true,
                        itemId: 'lblLTGoalLongDescription',
                        bind: {value: '{pocrec.LTGoalLongDescription}'},
                        labelWidth: 500,
                        disabled: 'true'
                    },
                    {
                        xtype: 'panel',
                        itemId: 'POCDetails',
                        border:false,
                        layout: 'column',
                        items: [
                            {
                                columnWidth: .3,
                                autoScroll:true,
                                defaults: {
                                    labelWidth: 200
                                },
                                items: [
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Goal Priority',
                                        readOnly: true,
                                        itemId: 'cbxgoalPriority',
                                        name: 'cbxgoalPriority',
                                        bind: {
                                            store: '{StoregoalPriority}',
                                            value: '{pocrec.goalPriority}'
                                        },
                                        displayField: 'name',
                                        valueField: 'value'
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Start Date',
                                        readOnly: true,
                                        itemId: 'dtgoalStartDate',
                                        bind: {value: '{pocrec.goalStartDate}'},
                                        format: 'm/d/Y'

                                    },
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Member Agrees',
                                        readOnly: true,
                                        itemId: 'cbxmemberAgrees',
                                        name: 'cbxmemberAgrees',
                                        bind: {
                                            store: '{StorememberAgrees}',
                                            value: '{pocrec.memberAgreesYesNO}'
                                        },
                                        displayField: 'name',
                                        valueField: 'value'
                                    },
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Ready Change',
                                        readOnly: true,
                                        itemId: 'cbxreadinessToChange',
                                        name: 'cbxreadinessToChange',
                                        bind: {
                                            store: '{StorereadinessToChange}',
                                            value: '{pocrec.readinessToChange}'
                                        },
                                        displayField: 'name',
                                        valueField: 'value'
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: 'Close Date',
                                        readOnly: true,
                                        itemId: 'dtgoalEndDate',
                                        bind: {value: '{pocrec.goalEndDate}'},
                                        format: 'm/d/Y'

                                    }
                                ]
                            },
                            {
                                columnWidth: .3,
                                autoScroll:true,
                                defaults: {
                                    labelWidth: 200
                                },
                                items: [
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Progress',
                                        readOnly: true,
                                        itemId: 'cbxgoalProgress',
                                        name: 'cbxgoalProgress',
                                        bind: {store: '{StoregoalProgress}', value: '{pocrec.goalProgress}'},
                                        displayField: 'name',
                                        valueField: 'value'
                                    },
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Time Frame',
                                        readOnly: true,
                                        itemId: 'cbxtimeframe',
                                        name: 'cbxtimeframe',
                                        bind: {
                                            store: '{Storetimeframe}',
                                            value: '{pocrec.timeframe}'
                                        },
                                        displayField: 'name',
                                        valueField: 'value'

                                    },
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Disagree Reason',
                                        readOnly: true,
                                        itemId: 'cbxdisagreeReason',
                                        name: 'cbxdisagreeReason',
                                        bind: {
                                            store: '{StoreDisagreeReason}',
                                            value: '{pocrec.disagreeReason}'
                                        },
                                        displayField: 'listDescription',
                                        valueField: 'listItem'
                                    },
                                    {
                                        xtype: 'checkbox',
                                        fieldLabel: 'Exclude goal from POC',
                                        readOnly: true,
                                        itemId: 'ckexcludeGoalFromLetter',
                                        name: 'ckexcludeGoalFromLetter',
                                        bind: {value: '{pocrec.excludeGoalFromLetter}'}
                                    },
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Closed Reason',
                                        readOnly: true,
                                        itemId: 'cbxGoalClosedReason',
                                        name: 'cbxGoalClosedReason',
                                        bind: {
                                            store: '{StoreGoalClosedReason}',
                                            value: '{pocrec.ClosedReason}'
                                        },
                                        displayField: 'listDescription',
                                        valueField: 'listItem'
                                    },
                                    {xtype: 'label', itemId: 'lbltimeFrameDate',hidden:true, bind:{text:'{pocrec.timeFrameDate}'},name:'timeFrameDate'}
                                ]
                            },
                            {
                                columnWidth: .3,
                                autoScroll:true,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        autoScroll:true,
                                        title: 'Goal Update Note',
                                        readOnly: true,
                                        defaults: {
                                            labelWidth: 200
                                        },
                                        items: [
                                            {
                                                xtype: 'combobox',
                                                fieldLabel: 'Reason',
                                                readOnly: true,
                                                itemId: 'cbxchartReason',
                                                name: 'cbxchartReason',
                                                bind: {
                                                    store: '{StoreGoalReason}',
                                                    value: '{pocrec.chartReason}'
                                                },
                                                displayField: 'listDescription',
                                                valueField: 'listItem',
                                                allowBlank: false
                                            },
                                            {
                                                xtype: 'checkbox',
                                                fieldLabel: 'Include Note on POC',
                                                readOnly: true,
                                                itemId: 'ckincludeNoteOnPOC',
                                                name: 'ckincludeNoteOnPOC',
                                                bind: {value: '{pocrec.includeNoteOnPOC}'}
                                            },
                                            {
                                                xtype: 'textarea',
                                                fieldLabel: 'Goal Update Note',
                                                readOnly: true,
                                                itemId: 'GoalNote',
                                                name: 'GoalNote',
                                                bind: {value: '{pocrec.note}'},
                                                allowBlank: false
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
                xtype: 'panel',
                title: 'Barriers',
                autoScroll: true,
                collapsible:"true",
                flex: .33,
                layout: 'hbox',
                items: [
                    {
                        xtype: 'textarea',
                        disabled: true,
                        width: 500,
                        height:200,
                        itemId: 'txtBarriers',
                        allowBlank:false,
                        name: 'txtBarriers',
                        fieldLabel: 'Selected Barriers'
                    },
                    {
                        xtype: 'button',
                        disabled: true,
                        itemId: 'btnAddBarriers',
                        name: 'btnAddBarriers',
                        handler:'btnAddBarriers_Click',
                        text: 'Add',
                        padding: 10
                    },
                    {
                        xtype: 'panel', itemId:'AllBarriers' ,width: 700,height:200,hidden:true, items: [
                        {
                            anchor: '100%',
                            height:200,
                            xtype: 'multiselect',
                            msgTarget: 'side',
                            fieldLabel: 'All barriers',
                            itemId: 'MultiAllBarriers',
                            valueField: 'value',
                            displayField: 'value',
                            bind: {store: '{StoreAvailableBarriers}'}
                        }
                    ]
                    }
                ]

            }],
        dockedItems: [{
            dock: 'bottom',
            xtype: 'toolbar',
            items: [
                '->',

                {xtype: 'button', text: 'Update', itemId: 'btnUpdate', handler: 'btnUpdateClick',hidden:true},
                {xtype: 'button', text: 'Save', itemId: 'btnSave', handler: 'btnSaveClick',hidden:true},
                {xtype: 'button', text: 'Cancel', itemId: 'btnCancel',disabled:true, handler: 'btnCancel_Click'},
                {xtype: 'button', text: 'Chart', itemId: 'btnChart', handler: 'btnChartClick',disabled:true},
                {xtype: 'button', text: 'Follow Up', itemId: 'btnFollowUp', handler: 'btnFollowUpClick'},
                {
                    xtype: 'hidden', itemId: 'hiddenContactCancel'
                }
            ]
        }]

    }
    ],
    listeners:
    {
        afterrender:"loadContactWindow"
    }
});