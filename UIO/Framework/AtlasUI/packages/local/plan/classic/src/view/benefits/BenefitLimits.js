/**
 * Created by a6686 on 11/11/2016.
 */

Ext.define('Atlas.plan.view.benefits.BenefitLimits', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.plan-benefits-benefitlimits',
    title: 'Benefit Limits',
    items: [
        {
            xtype: 'panel',
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'left',
                pack: 'start'
            },
            items: [
                {
                    xtype: 'panel', layout: 'vbox', flex: 0.5,
                    cls: 'card-panel',
                    //frame: true,
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Deductible',
                            defaults: {
                                labelWidth: 230,
                                flex: 1,
                                enforceMaxLength:true
                            },
                            items: [
                                {
                                    xtype: 'checkbox',
                                    fieldLabel: 'Embedded Deductible',
                                    itemId: 'chkEmbeddedDeductible'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Individual',
                                    allowNegative: false,
                                    maskRe: /[0-9]/,
                                    itemId: 'txtDeductIndividual',
                                    maxLength:6

                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Family',
                                    allowNegative: false,
                                    itemId: 'txtDeductFamily',
                                    maskRe: /[0-9]/,
                                    maxLength:6
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Coverage Limits',
                            hidden:true,
                            defaults: {
                                flex: 1,
                                enforceMaxLength:true
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Maximum Copay',
                                    allowNegative: false,
                                    maxLength:7,
                                     itemId: 'txtCLMaxCopay'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'DMR Processed By',
                                    itemId: 'txtCLDMRProcessedBy'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Co-Insurance',
                            defaults: {
                                labelWidth: 230,
                                //minWidth: 450,
                                flex: 1,
                                enforceMaxLength:true
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Co-Insurance Start Amt',
                                    maskRe: /[0-9]/,
                                    itemId: 'txtcoinsuranceStartAmt',
                                    allowNegative:'false',
                                    maxLength:7,
                                    format:'$0,0.00'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Maximum Co-Insurance Individual',
                                    maskRe: /[0-9]/,
                                    itemId: 'txtMaxCoInsuranceIndiv',
                                    maxLength:7,
                                    allowNegative:'false'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Maximum Co-Insurance Family',
                                    itemId: 'txtMaxCoInsuranceFamily',
                                    maxLength:7,
                                    allowNegative:'false'
                                }, // find out if this should restrict to letters only
                                /*{
                                    xtype: 'tagfield',
                                    fieldLabel: 'Applicable Coverage Phase',
                                    itemId: 'mcbApplicableCovePhase',
                                    multiSelect: true,
                                    displayField: 'coveragePhaseName',
                                    valueField: 'coverageCode',
                                    forceSelection:true,
                                    bind: {
                                        store: '{StoreCoveragePhase}',
                                    }
                                }*/
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Applicable Coverage Phase',
                                    autoLoadOnValue: true,
                                    itemId: 'mcbApplicableCovePhase',
                                    forceSelection: true,
                                    multiSelect: true,
                                    displayField: 'coveragePhaseName',
                                    valueField: 'coverageCode',
                                    bind: {store: '{StoreCoveragePhase}', hidden: '{!isIntervention}'},
                                    /*tpl: new Ext.XTemplate('<tpl for=".">'

                                        + '<tpl if="this.checkStatus(values) == true">'
                                        + '<div class="x-boundlist-item x-boundlist-selected" >'
                                        + '<input type="checkbox" class=" x-form-checkbox x-form-field" checked value="{coverageCode}">{coveragePhaseName}'
                                        + '</tpl>'
                                        + '<tpl if="this.checkStatus(values) == false">'
                                        + '<div class="x-boundlist-item" >'
                                        + '<input type="checkbox" class=" x-form-checkbox x-form-field">{coveragePhaseName}'
                                        + '</tpl>'
                                        + '</div></tpl>',
                                        {
                                            checkStatus: function(values){
                                                debugger;
                                                var f = this.field.up();
                                                var f1 = f.up();
                                                var f2 = f1.up();
                                                var f3 = f2.up();
                                                var f4 = f3.up();
                                                var vm = f4.getViewModel();
                                                var store=vm.get('masterRecord');
                                                var vc = values.coverageCode;
                                                console.log('store '+ store.data.applicableCoveragePhases);
                                                console.log('vc ' + vc);
                                                var ret = (store.data.applicableCoveragePhases.indexOf(vc) != -1 ? true : false);
                                                return ret;


                                            }
                                        }
                                    ),*/
                                    queryMode: 'local',
                                    listConfig: {
                                        getInnerTpl: function (displayfield) {
                                            return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {' + displayfield + '} </div>';
                                        }
                                    },
                                    listeners: {
                                        change:'onApplicableCoveragePhaseChange'
                                    }


                                }
                            ]
                        }

                    ]
                },
                {
                    xtype: 'panel', layout: 'vbox', flex: 0.5,
                    cls: 'card-panel',
                    items: [


                        {
                            xtype: 'fieldset',
                            title: 'Out of Pocket',
                            defaults: {
                                labelWidth: 230,
                                flex: 1,
                                enforceMaxLength:true
                            },


                            items: [
                                {
                                    xtype: 'checkbox',
                                    fieldLabel: 'Accumulate DAW Penalty In OOP',
                                    itemId:'cbAccDAWPenalty',
                                    checked:true

                                },


                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Individual',
                                    maskRe: /[0-9]/,
                                    itemId: 'txtOOPIndividual',
                                    maxLength:7
                                },
                                {xtype: 'textfield', fieldLabel: 'Family', maskRe: /[0-9]/, itemId: 'txtOOPFamily', maxLength:7}
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Maximum Benefit',
                            defaults: {
                                labelWidth: 230,
                                flex: 1,
                                enforceMaxLength:true
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Individual',
                                    maskRe: /[0-9]/,
                                    itemId: 'txtMAXIndividual',
                                    maxLength:7
                                },
                                {xtype: 'textfield', fieldLabel: 'Family', maskRe: /[0-9]/, itemId: 'txtMAXFamily', maxLength:7}
                            ]
                        }
                    ]

                }
            ]
        }
    ]
});
