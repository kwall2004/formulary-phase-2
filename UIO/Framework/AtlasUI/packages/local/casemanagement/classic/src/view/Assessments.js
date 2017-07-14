/**
 * Created by s6627 on 11/22/2016.
 */
Ext.define('Atlas.casemanagement.view.Assessments', {
    extend: 'Ext.panel.Panel',
    xtype: 'Assessments',
    title: 'Assessments',
    controller: 'assessmentscontroller',
    viewModel: 'AssessmentsViewModel',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },
    items: [
        {
            xtype: 'panel'
            , flex: 0.7,
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [{
                xtype: 'grid',
                title: 'Questionnaires',
                width: '100%',
                itemId: 'gpQuestionnaire',
                columns: {
                    items:[
                        {
                            xtype: 'rownumberer'

                        },
                        {
                            text: '', dataIndex: 'assesmentListDescription',width:400

                        },
                        {
                            text:'',xtype: 'checkcolumn', dataIndex: 'AnswerTest',sortable: false

                        }
                    ]},
                bind: {
                    store: '{StoreQuestionnaire}'
                }
            }],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom', items: [
                    '->',
                    {
                        xtype: 'button',
                        text: 'Save',
                        iconCls: 'fa fa-save',
                        handler: 'btnSaveQuestionnaireClick',
                        itemId: 'btnSaveQuestionnaire'
                    }
                ]
                }
            ]
        },
        {
            xtype: 'panel'
            , flex: 0.3,
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [{
                xtype: 'grid',
                width: '100%',
                title: 'Assessments',
                itemId: 'gpAssessment',
                columns: {
                    items: [
                        {
                            xtype: 'rownumberer'
                        },
                        {
                            text: '', dataIndex: 'assesmentListDescription',width:400
                        },
                        {
                            text:'',  xtype: 'checkcolumn', dataIndex: 'AnswerTest',sortable: false,menuDisabled:true
                        }
                    ]
                },
                bind:{store:'{StoreAssessment}'}
            }],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom', items: [
                    '->',
                    {
                        xtype: 'button',
                        text: 'Save',
                        iconCls: 'fa fa-save',
                        handler: 'btnSaveAssessmentClick',
                        itemId: 'btnSaveAssessment'
                    }
                ]
                }
            ]
        }
    ]
})