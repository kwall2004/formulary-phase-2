Ext.define('Atlas.portals.view.provider.MemberHEDISUpdate', {
    extend: 'Ext.window.Window',
    xtype: 'portalsMemberHEDISUpdate',
    title: 'HEDIS Update',
    width: 1300,
    modal: true,
    reference: 'memberHedisUpdateModal',



    controller: 'memberhedisupdate',
    viewModel: {
        stores: {
            measuredetail: {
                model: 'Atlas.portals.provider.model.MeasureDetailMasterWeb'
            }
        },
        formulas: {
            something1: {
                bind: {
                    x: '{isAdult}',
                    y: '{isBaby}'

                },

                get: function (data) {
                    if (data.y == 1) {
                        return true;
                    } else {
                        if (data.x == 1) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            },
            something2: {
                bind: {
                    x: '{isAdult}',
                    y: '{isBaby}'
                },

                get: function (data) {
                    if (data.y == 1) {
                        return false;
                    } else {
                        if (data.x == 1) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            },
            something3: {
                bind: {
                    y: '{isBaby}'
                },

                get: function (data) {
                    if (data.y == 1) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }
    },

    items: [
        {
            xtype: 'form',
            cls: 'card-panel',
            bind: {
                title: '{title}'
            },
            reference: 'bmiForm',
            items: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'displayfield',
                            value: 'BMI not required for child from 0-2yrs',
                            name: 'infantMessage',
                            reference: 'infantMessage',
                            bind: {
                                hidden: '{!something3}'
                            }
                        },
                        {
                            xtype: 'datefield',
                            labelWidth: 90,
                            name: 'BMIDate',
                            reference: 'BMIDate',
                            Width: 55,
                            bind: {
                                hidden: '{something3}',
                                fieldLabel: '{bmidatetitle}'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'BMI Percentile',
                            labelWidth: 124,
                            name: 'ChBMIPercentile',
                            reference: 'ChBMIPercentile',
                            Width: 35,
                            bind: {
                                hidden: '{something1}'
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Calculate',
                            handler: 'calculateBMI',
                            bind: {
                                hidden: '{something1}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            value: 'OR',
                            name: 'ChBMIOR',
                            reference: 'ChBMIOR',
                            bind: {
                                hidden: '{something1}'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'BMI percentile plotted on age-growth chart',
                            name: 'ChBMIPlotted',
                            reference: 'ChBMIPlotted',
                            Width: 25,
                            bind: {
                                hidden: '{something1}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'BMI Value',
                            name: 'BMIValue',
                            reference: 'BMIValue',
                            labelWidth: 90,
                            bind: {
                                hidden: '{!something2}'
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Calculate',
                            handler: 'calculateBMI',
                            reference: 'calculateBMI',
                            bind: {
                                hidden: '{!something2}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Weight (lb)',
                            name: 'weight',
                            reference: 'weight',
                            labelWidth: 55,
                            bind: {
                                hidden: '{something3}'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Height (Inches)',
                            name: 'heightInches',
                            reference: 'heightInches',
                            labelWidth: 55,
                            bind: {
                                hidden: '{something3}'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Height (Feet and Inches - Ex: 5.9)',
                            name: 'heightFeet',
                            reference: 'heightFeet',
                            labelWidth: 35,
                            bind: {
                                hidden: '{something3}'
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'To Inches',
                            handler: 'calculateInches',
                            bind: {
                                hidden: '{something3}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Nutritional Counseling Provided',
                            reference: 'ChNutritionDate',
                            name: 'ChNutritionDate',
                            labelWidth: 75,
                            bind: {
                                hidden: '{something1}'
                            }
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Physical Activity Counseling Provided',
                            reference: 'ChPhysicalActDate',
                            name: 'ChPhysicalActDate',
                            labelWidth: 75,
                            bind: {
                                hidden: '{something1}'
                            }
                        }
                        ]
                }
            ]
        },
        {
            xtype: 'form',
            reference: 'dynamicHEDISForm',
            cls: 'card-panel'
        },
        {
            xtype: 'container',
            items: [
                {
                    xtype: 'toolbar',
                    items: ['->',
                        {
                            xtype: 'button',
                            text: 'Update HEDIS',
                            handler: 'submitHEDISUpdate'
                        },
                        {
                            xtype: 'button',
                            text: 'Clear',
                            handler: 'clearButtonClicked'
                        },'->'
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            cls: 'card-panel',
            title: 'Attention! New Requirement for HEDIS Reporting',
            items: [
                {
                    cls: 'formPanel',
                    padding: 7,
                    bind: {
                        html: '<span style="color: red">Please fax the clinical information that supports this HEDIS entry to {HEDISFaxNumber}. If clinical documentation is not faxed within 30 days this entry will not result in a HEDIS hit. Do you have an EMR? If so, contact your Meridian Health Plan Provider Network Development Representative so we can work with you to collect EMR data!</span>'
                    }
                }
            ]
        }
    ],

    initComponent: function () {
        var me = this;
        me.getViewModel().data.recipientId = me.itemConfig.recipientId;
        me.getViewModel().data.measure = me.itemConfig.measure;
        me.getViewModel().data.numerator = me.itemConfig.numerator;
        me.getViewModel().data.measureDesc = me.itemConfig.measureDesc;
        me.getViewModel().data.subMeasure = me.itemConfig.subMeasure;
        me.getViewModel().data.memberAge = me.itemConfig.memberAge;
        me.getViewModel().data.isAdult = false;
        me.getViewModel().data.isBaby = false;
        me.getViewModel().data.title = "";
        me.getViewModel().data.trn = me.itemConfig.trn;
        me.callParent();
    }

});