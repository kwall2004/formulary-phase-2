/**
 * Created by l6630 on 10/13/2016.
 */

Ext.define('Atlas.benefitplan.view.populationgroup.benefitconfiguration.BenefitPackageDetails', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.benefitpackagedetails',
    margin : '20',
    items: [
        {
            xtype: 'fieldset',
            reference: 'breadcrumbarea',
            bind : {
                hidden: '{!hasPopGrpSK}'
            },
            items: [
            ]
        },
        {
            layout: 'column',
            items: [
                {
                    xtype : 'container',
                    plugins: 'responsive',
                    responsiveConfig: {
                        'width < 1650': {
                            columnWidth: 0.5
                        },
                        'width >= 1650': {
                            columnWidth: 0.4
                        }
                    },
                    layout : {
                        type : 'vbox',
                        align : 'right'
                    },
                    padding : '10',
                    items : [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'PBP ID',
                            readOnly : true,
                            labelAlign : 'right',
                            bind: {
                                value: '{populationGroupPlanBenefitPackage.PBPID}'
                            },
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Plan Benefit Package Name',
                            readOnly : true,
                            labelAlign : 'right',
                            bind: {
                                value: '{populationGroupPlanBenefitPackage.PBPName}'
                            },
                            listeners: {
                                change: 'onItemChanged'
                            },
                            name: 'planbenefitpackagename'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Date of Service Effective Start Date',
                            labelAlign : 'right',
                            name: 'DOSProcsngStartDt',
                            itemId: 'DOSProcsngStartDt',
                            reference : 'serStartDte',
                            bind: {
                                value: '{DOSProcsngStartDt}'
                            },
                            validator: function (val) {

                                return ((new Date(val) < new Date(this.up().up().down('[itemId="DOSProcsngEndDt"]').getValue()) || this.up().up().down('[itemId="DOSProcsngEndDt"]').getValue() == null)) ? true : "Must be less than Effective End date";

                            },
                            listeners: {
                                change: 'onItemChanged'
                            },
                            format: 'n/j/Y',
                            allowBlank: false
                        }
                    ]
                },

                {
                    xtype : 'container',
                    plugins: 'responsive',
                    responsiveConfig: {
                        'width < 1650': {
                            columnWidth: 0.5
                        },
                        'width >= 1650': {
                            columnWidth: 0.3
                        }
                    },
                    layout : {
                        type : 'vbox',
                        align : 'right'
                    },
                    padding : '10',
                    items : [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Plan Program Code',
                            labelAlign : 'right',
                            maxLength:25,
                            enforceMaxLength: true,
                            name:'planpgmcode',
                            bind: {
                                value: '{populationGroupPlanBenefitPackage.PlanPgmCode}'
                            },
                            listeners: {
                                change: 'onItemChanged'
                            },
                            width: '15',
                            labelWidth: '12',
                            allowBlank: false,
                            vtype: 'atlasAlphaNumDash'
                        },


                        {
                           xtype: 'numberfield',
                            fieldLabel: 'Accumulator Restart Month',
                            labelAlign : 'right',
                            reference : 'AccumtrRestartMth',
                            bind: {
                                value: '{populationGroupPlanBenefitPackage.AccumtrRestartMth}'
                            },
                            listeners: {
                                change: 'onItemChanged'
                            },
                            name: 'AccumtrRestartMth',

                            allowBlank: true,
                            width: '15',
                            maxValue: 12,
                            minValue: 1,
                            labelWidth: '12'

                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Accumulator Restart Day',
                            labelAlign : 'right',
                            reference : 'AccumtrRestartDay',
                            bind: {
                                value: '{populationGroupPlanBenefitPackage.AccumtrRestartDay}'
                            },
                            listeners: {
                                change: 'onItemChanged'
                            },
                            name: 'AccumtrRestartDay',

                            allowBlank: true,
                            width: '15',
                            maxValue: 31,
                            minValue: 1,
                            labelWidth: '12'

                        },



                        {
                            xtype: 'datefield',
                            fieldLabel: 'Date of Service Effective End Date',
                            labelAlign : 'right',
                            itemId: 'DOSProcsngEndDt',
                            reference : 'serEndDte',
                            bind: {
                                value: '{DOSProcsngEndDt}'
                            },
                            listeners: {
                                change: 'onItemChanged'
                            },
                            name: 'reversalWindow',
                            format: 'n/j/Y',
                            validator: function (val) {

                                return ((new Date(val) > new Date(this.up().up().down('[itemId="DOSProcsngStartDt"]').getValue()) || this.up().up().down('[itemId="DOSProcsngStartDt"]').getValue() == null)) ? true : "Must be greater than Effective Start date";
                            },
                            allowBlank: false
                        }
                    ]
                }
            ]
        }
    ]
});
