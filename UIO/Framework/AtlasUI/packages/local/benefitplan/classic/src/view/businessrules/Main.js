/**
 * Created by s6393 on 10/24/2016.
 */
Ext.define('Atlas.benefitplan.view.businessrules.Main', {
    extend: 'Ext.Window',
    title: 'Business Rules ( HIX and COMMERCIAL ONLY)',
    iconCls: 'x-fa fa-question-circle',
    controller: 'benefitPackage-businessRules',
    closable: false,
    draggable: false,
    resizable: false,
    viewModel: {
        data: {
            changed: false
        },
        stores: {
            data: {
                changed: false,
                isEnabled: false

            },
            benefitPackageBusinessRules: {
                model : 'Atlas.benefitplan.model.BusinessRule'
            },
            posibleAnswer: {
                fields : [
                    'idk', 'AnswerValue'
                ]
            },
            posibleChildAnswer:{
                fields : [
                    'idk', 'AnswerValue'
                ]
            },
            Question10SelOpt: {
                fields : [
                ],
                listeners: {update : 'storeUpdated'}
            },
            Question10Dropdown:{
                fields:[]
            },
            Question10ChildAnswers:{
                fields:[]
            }
        }
    },
    canChangePBPBnftPlanList: false,
    pbpSK : '0', // this key will be from benefit package configuration screen.
    width: 1100,
    height: 600,
    layout: 'border',
    overflowY: 'scroll',
    modal: true,

    items: [
        {
            region: 'north',
            xtype: 'form',
            title: 'Business Rules Configuration',
            name:'questionsForm',
            layout: 'column',
            defaults: {
                xtype: 'container',
                reference : 'rulesContainer',

                layout: 'anchor',
                columnWidth: 1,
                margin: 5,
                defaultType: 'radiogroup',
                defaults: {
                    anchor: '100%',
                    labelWidth: 900
                }
            },
            items: [
                {
                    defaults : {
                        anchor: '-15',
                        xtype:'fieldset',
                        labelAlign : 'top',
                        columnWidth : 1,
                        columns: 1,
                        vertical: true
                    },
                    items:[] //dynamically load the questions and possible answers from the store in the controller.
                }
            ]
        }
    ],
    bbar: [
        '->',
        {
            text: 'Cancel',
            handler : 'onBusinessRulesCancel'
        },
        {
            text: 'Save',
            handler : 'onBusinessRulesSave',
            bind: {
                disabled: '{!changed || isReadOnly}'
            }
        }
    ]
});
