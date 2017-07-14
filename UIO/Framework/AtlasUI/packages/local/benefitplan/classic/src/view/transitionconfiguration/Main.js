/**
 * Created by n6570 on 2/13/2017.
 */
Ext.define('Atlas.benefitplan.view.transitionconfiguration.Main', {
    extend:'Ext.form.Panel',
    title: 'Transition Configuration',
    trackResetOnLoad:true,
    cmbBenefitPlanSK: 0,
    cmbBenefitType: 0,
    LOBName: 0,
    layout: 'fit',
    viewModel: {
        data: {
            changed: false,
            validform: false,
            isFillRules: false,
            transitionYear: false
        },
        stores: {
            transitionRestartMonth:{
                model:'Atlas.benefitplan.model.TransitionRestartMonth',
                autoLoad: true
            },
            benefitPlanTransition: {
                model: 'Atlas.benefitplan.model.BenefitPlanTransition',
                sorters: 'BnftPlanSK',
                listeners: {update: 'transConfigStoreUpdated'},
                proxy: {
                    actionMethods: {
                        create: 'PUT',
                        read: 'GET',
                        update: 'PUT',
                        destroy: 'PUT'
                    },
                    type: 'benefitplan',
                    url: '/BenefitPlanTransition'
                }
            }
        }
    },
    reference: 'transitionConfigForm',
    controller: 'transitionConfigurationController',
    listeners: {
        beforeClose: 'checkForUnsavedRecords'
    },
    items: [
        {
            layout: 'border',
            items: [
                /*Progress Bar*/
                {
                    xtype: 'benefitplan-progress',
                    region: 'north',
                    itemId: 'thermometerPanel'
                },
                /*LICS Config Screen*/
                {
                    xtype:'container',

                    scrollable:true,
                    region: 'center',
                    items:[
                        /*Transition Rules Form*/
                        {   xtype: 'fieldset',
                            title: 'Transition Rules',
                            items:[
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'Allow Transition Fills',
                                    name: 'AllowTransitionFillsInd',
                                    reference:'transition',
                                    listeners: {
                                        change: 'onFillsChanged'
                                    }

                                }
                            ]
                        },
                        /*Transition Configuration Form*/
                        {   xtype: 'fieldset',
                            title: ' Transition Configuration',
                            items: [

                                {
                                    layout: 'column',
                                    defaults: {
                                        layout: 'anchor',
                                        columnWidth: 0.5,
                                        margin: 5,
                                        defaultType: 'numberfield',
                                        defaults: {
                                            bind: {
                                                disabled: '{!isFillRules}'
                                            },
                                            anchor: '100%',
                                            labelWidth: 250,
                                            hideTrigger : true,
                                            decimalPrecision : 0,
                                            maxValue : 999,
                                            minValue : 0
                                        }
                                    },
                                    items: [
                                        {
                                            items: [
                                                {
                                                    fieldLabel: 'Transition TimeFrame (Days)',
                                                    allowBlank:false,
                                                    name: 'TransitionTimeframeDays',
                                                    reference:'TransitionTimeframeDay',
                                                    listeners: {
                                                        change: 'onItemChanged'
                                                    },
                                                    bind: {
                                                        disabled: '{!isFillRules}'
                                                    }
                                                },
                                                {
                                                    fieldLabel: 'System Look Back Period (Days)',
                                                    allowBlank:false,
                                                    name: 'TransitionLookBackPerDays',
                                                    listeners: {
                                                        change: 'onItemChanged'
                                                    },
                                                    bind: {
                                                        disabled: '{!isFillRules}'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    fieldLabel: 'Transition Days Allowed LTC',
                                                    allowBlank:false,
                                                    name: 'LTCTransitionAlwdDays',
                                                    listeners: {
                                                        change: 'onItemChanged'
                                                    },
                                                    bind: {
                                                        disabled: '{!isFillRules}'
                                                    }
                                                },
                                                {
                                                    fieldLabel: 'Transition Days Allowed Retail',
                                                    allowBlank:false,
                                                    name: 'RtlTransitionAlwdDays',
                                                    listeners: {
                                                        change: 'onItemChanged'
                                                    },
                                                    bind: {
                                                        disabled: '{!isFillRules}'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    items:[
                                        {
                                            xtype: 'checkbox',
                                            reference: 'checkboxselection',
                                            boxLabel: 'Transition Restart Plan Year',
                                            checked: true,
                                            name:'RestartTransitionatPlanYrInd',
                                            id: 'checkboxselection',
                                            bind: {
                                                disabled: '{!isFillRules}'
                                            },
                                            listeners:{
                                                change: 'onItemChanged'
                                            }
                                        },
                                        {

                                            xtype: 'combo',
                                            fieldLabel: 'Restart Month',
                                            typeAhead: true,
                                            reference: 'transitionrestartyear',
                                            allowBlank: false,
                                            forceSelection: true,
                                            bind:
                                            {
                                                store: '{transitionRestartMonth}',
                                                disabled: '{!isFillRules || !transitionYear}'
                                            },
                                            queryMode: 'local',
                                            name: 'TransitionRestartMthNbr',
                                            displayField: 'Text',
                                            listeners: {
                                                change: 'onItemChanged'
                                            },
                                            valueField: 'Value'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    bbar: [
        '->',
        {
            text: 'Cancel',
            handler: 'onCancelClick'
        },
        {
            text: 'Save',
            handler: 'onSaveClick',
            bind: {
                disabled: '{!validForm ||  !isTransConfigChanged}'
            }
        }
    ]
});