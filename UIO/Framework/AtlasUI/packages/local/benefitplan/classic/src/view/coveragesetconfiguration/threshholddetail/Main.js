Ext.define('Atlas.benefitplan.view.coveragesetconfiguration.threshholddetail.Main',
{
    extend: 'Ext.container.Container',
    xtype : 'threshholddetail',
    reference : 'thresholdDetailRef',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack : 'center'
    },
    bind: {
        disabled: '{!copying && !creatingnew && !isCoverageSetCmbselected}'
    },
    items : [
        {
            xtype:'fieldcontainer',
            fieldLabel:'Select Threshold:',
            layout:'hbox',
            items:[
                {
                    xtype : 'combo',
                    reference: 'thresholdsListref',
                    bind :{
                        store : '{coveragethresholdstore}'
                    },
                    displayField : 'BenefitThresholdName',
                    allowBlank: false,
                    valueField : 'ThresholdSK',
                    queryMode : 'local',
                    forceSelection:true,
                    width:200
                },
                {
                    xtype: 'button',
                    reference : 'btnCopyThreshold',
                    text: 'Add Threshold',
                    handler : 'onAddSelectedThresholdToGrid',
                    bind: {
                        disabled:'{!thresholdsListref.selection}'
                    }
                }
            ]
        },
        {
            xtype : 'container',
            layout : 'fit',
            height : 200,
            items : [
                {
                    xtype: 'grid',
                    title : 'Threshold Names',
                    reference : 'thresholdGridRef',
                    minHeight : 200,
                    viewConfig: {
                        loadMask: false
                    },
                    columns: [
                        {
                            flex : 1,
                            dataIndex: 'BenefitThresholdName'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            defaults: {
                                width: 100
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Add Row',
                                    handler : 'onAddThreshold'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Remove Row',
                                    handler : 'onRemoveThreshold',
                                    bind: {
                                        disabled:'{!thresholdGridRef.selection}'
                                    }
                                }
                            ]
                        }],
                    listeners : {
                        selectionchange: 'onThresholdGridSelectionChange',
                        canceledit: 'onthresholdGridItemCancelEdit',
                        edit: 'onthresholdGridItemComplete',
                        beforeedit: 'onthresholdGridItemStartEdit',
                        beforedeselect :'onthresholdGridDeSelect'
                    }
                }
            ]
        },
        {
            xtype : 'form',
            bind: {
                disabled:'{!thresholdGridRef.selection}'
            },
            reference : 'thresholdFormRef',
            trackResetOnLoad:true,
            layout:'column',
            items : [
                {
                    xtype : 'container',
                    columnWidth: 0.5 ,
                    layout : 'column',
                    width : 400,
                    columns : 3,
                    defaults : {
                        padding : 10
                    },
                    items : [
                        {
                            xtype : 'label',
                            text  : 'Threshold Name',
                            columnWidth: 0.6,
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            xtype : 'textfield',
                            name : 'BenefitThresholdName',
                            allowBlank:false,
                            columnWidth: 0.4,
                            maxLength: 30,
                            listeners : {
                                blur : 'afterThresholdNameChanged',
                                change: 'onItemChanged'
                            }
                        },
                        {
                            xtype : 'label',
                            text  : 'Threshold Restart Calendar Year',
                            columnWidth: 0.6,
                            vtype:'year'
                        },
                        {
                            xtype : 'numberfield',
                            hideTrigger : true,
                            name : 'RestartThresholdCalendarYear',
                            fieldLabel : '',
                            vtype:'year',
                            columnWidth: 0.4,
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            xtype : 'label',
                            text  : 'Threshold Restart Days After Last Service',
                            columnWidth: 0.6
                        },
                        {
                            xtype : 'numberfield',
                            hideTrigger : true,
                            vtype:'numeric',
                            maxValue: 9999,
                            maxLength:4,
                            name : 'ThresholdRestartDaysAfterLastService',
                            columnWidth: 0.4,
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            xtype : 'label',
                            text  : 'Threshold Restart Months After Last Service',
                            columnWidth: 0.6
                        },
                        {
                            xtype : 'numberfield',
                            name : 'ThresholdRestartMonthsAfterLastService',
                            hideTrigger : true,
                            fieldLabel : '',
                            columnWidth: 0.4,
                            vtype:'numeric',
                            maxValue: 9999,
                            maxLength:4,
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            xtype : 'label',
                            text  : 'Month',
                            tdAttrs: {
                                align: 'right'
                            },
                            columnWidth: 0.6
                        },
                        {
                            xtype : 'combo',
                            bind : {
                                store :   '{monthListstore}'
                            },
                            listeners: {
                                change: 'onItemChanged'
                            },
                            forceSelection:true,
                            displayField : 'Text',
                            valueField : 'Value',
                            queryMode : 'local',
                            name : 'ThresholdRestartAtBegOfMonthNbr',
                            columnWidth: 0.4
                        }
                    ]
                },
                {
                    xtype : 'container',
                    columnWidth: 0.5 ,
                    layout : 'column',
                    width : 400,
                    columns : 3,
                    defaults : {
                        padding : 10
                    },
                    items : [
                        {
                            xtype : 'hidden',
                            name : 'ThresholdSK'
                        },
                        {
                            xtype : 'hidden',
                            name : 'CvrgSetThresholdSK'
                        },
                        {
                            xtype : 'hidden',
                            name : 'CurrentUser'
                        },
                        {
                            xtype : 'label',
                            text  : 'Threshold Qualifier',
                            colspan : 2,
                            columnWidth: 0.6
                        },
                        {
                            xtype : 'combo',
                            bind :{
                                store : '{thresholdqualifiertypestore}'
                            },
                            listeners: {
                                change: 'onItemChanged'
                            },
                            forceSelection:true,
                            allowBlank:false,
                            name : 'ThresholdQulfrTypeSK',
                            displayField : 'ThresholdQulfrTypeDesc',
                            valueField : 'ThresholdQulfrTypeSK',
                            queryMode : 'local',
                            columnWidth: 0.4
                        },
                        {
                            xtype : 'label',
                            text  : 'Threshold Limit',
                            colspan : 2,
                            columnWidth: 0.6,
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            xtype : 'textfield',
                            name : 'ThresholdLimit',
                            vtype:'numeric',
                            columnWidth: 0.4,
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            xtype : 'label',
                            text  : 'Threshold Restart Plan Year',
                            columnWidth: 0.6,
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            xtype : 'numberfield',
                            hideTrigger : true,
                            vtype:'year',
                            name : 'RestartThresholdPlanYear',
                            columnWidth: 0.4,
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            xtype : 'label',
                            text  : 'Threshold Restart Days After Member Enrollment',
                            columnWidth: 0.6,
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            xtype : 'numberfield',
                            hideTrigger : true,
                            vtype:'numeric',
                            name : 'ThresholdRestartDaysAfterMbrEnroll',
                            maxValue: 9999,
                            maxLength:4,
                            columnWidth: 0.4,
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            xtype : 'label',
                            text  : 'Threshold Restart Months After Member Enrollment',
                            columnWidth: 0.6,
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            xtype : 'numberfield',
                            columnWidth: 0.4,
                            hideTrigger : true,
                            vtype:'numeric',
                            name : 'ThresholdRestartMonthsAfterMbrEnroll',
                            colspan : 2,
                            maxValue: 9999,
                            maxLength:4,
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            xtype : 'container',
                            colspan : 2,
                            layout : 'hbox',
                            columnWidth: 0.6,
                            items :[
                                {
                                    xtype : 'checkbox',
                                    uncheckedValue: false,
                                    fieldLabel  : 'Apply To',
                                    name : 'ApplyToBenefitThreshold',
                                    flex : 1,
                                    listeners: {
                                        change: 'onItemChanged'
                                    }
                                },
                                {
                                    xtype : 'checkbox',
                                    uncheckedValue: false,
                                    fieldLabel  : 'Limit By',
                                    name : 'LimitByBenefitThreshold',
                                    flex:1,
                                    listeners: {
                                        change: 'onItemChanged'
                                    }
                                }
                            ]
                        },
                        {
                            xtype : 'label',
                            columnWidth: 0.4,
                            colspan : 2
                        }
                    ]
                }
            ]
        }
    ]
});