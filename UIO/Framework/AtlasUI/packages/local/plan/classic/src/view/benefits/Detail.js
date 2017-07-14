/**
 * Created by a6686 on 11/16/2016.
 */

Ext.define('Atlas.plan.view.benefits.Detail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.plan-benefits-detail',
    title: 'Plan Benefit Details',
    layout: 'accordion',
    //reference:'benefitsDetailTopLevelContainer',

    requires: [
        'Ext.layout.container.Accordion',
        'Ext.ux.statusbar.StatusBar',
        'Ext.grid.*',
        'Atlas.Plan.view.PlanErrorMessageWindow'
    ],
    // xtype:'benefits.Plan-Benefit-Detail',
    viewModel: 'plan-benefits-detail',
    controller: 'plan-benefit-detail',

    defaults: {
        collapsible: true,
        fill:false,
        split: true,
        enforceMaxLength:true,
        bodyPadding: 0
    },

    items: [

        {
            xtype: 'form',
            itemId: 'formDetails',
            title: 'Plan Benefit Details'
            ,
            layout: {

                type: 'hbox',
                align: 'stretch',
                pack: 'start'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'displayfield',
                            name: 'carrierName',
                            itemId: 'lblCarrier',
                            labelWidth: 90,
                            fieldLabel: 'Carrier'
                        },
                        '->',
                        {
                            xtype: 'displayfield',
                            name: 'Status',
                            itemId: 'lblStatus',
                            labelWidth: 90,
                            fieldLabel: 'Status'
                        }
                    ]
                }
            ],
            items: [{
                xtype: 'form', layout: 'vbox', flex: 0.5,
                itemId: 'form1',
                defaults: {
                    labelWidth: 300,
                    // width:650,
                    enforceMaxLength:true,
                    labelAlign : 'left'

                },
                cls: 'card-panel',
                autoScroll: true,
                frame: true,
                items: [
                    {
                        xtype: 'plangrouptypeahead',
                        emptyText: '[e.g. MHP Medicare 2011]',
                        itemId: 'cbxPlanGroupCode',
                        fieldLabel: 'Plan Group',
                        displayField: 'planGroupName',
                        valueField: 'planGroupId',
                        name: 'planGroupName',
                        allowBlank: false,
                        hideLabel: false,
                        readOnly:true,
                        matchFieldWidth:false,


                        listeners: {
                            select: 'onPlangroupSelect'
                            //change:
                        }
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Plan Benefit Code',
                        allowBlank: false,
                        //validateOnChange:true,
                        emptyText: 'Benefit Code is required',
                        /*validator: function(val){
                            //debugger;

                          return val.replace(/[\W_]+/g,"");
                        },*/
                        maskRe: /[A-Za-z0-9]/,
                        itemId: 'txtPlanBenefitCode'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Plan Benefit Name',
                        allowBlank: false,
                        emptyText: 'Benefit Name is required',
                        itemId: 'txtPlanBenefitName'

                    },
                    {
                        xtype: 'checkbox',
                        fieldLabel: 'LICS Subsidy',
                        itemId: 'chkLICSSubsidy',
                        labelWidth: 310
                    },
                    {
                        xtype: 'checkbox',
                        fieldLabel: 'Pass Through Pricing',
                        itemId: 'chkPassThruPricing',
                        disabled: true,
                        labelWidth: 310

                    },
                    {
                        xtype: 'checkbox',
                        fieldLabel: 'Traditional Pricing',
                        itemId: 'chkTraditional',
                        labelWidth: 310

                    },
                    {
                        xtype: 'checkbox',
                        fieldLabel: 'Copay Required',
                        itemId: 'chkCopayRequired',
                        labelWidth: 310

                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Part B Copay Percentage',
                        itemId: 'txtPartBCopayPercentage',
                        enforceMaxLength:true,
                        validator : function(value)
                        {
                            if (value>100)
                            {
                                return 'Percentage must be less than 100';
                            }
                            else
                                return true;
                        },
                        //maxValue: '100',
                        maxLength: '5',
                        // maskRe:
                        maskRe: /[\d\.]/,
                        regex: /^\d+(\.\d{1,2})?$/
                        //maskRe:/^\d+(\.\d{1,2})/,
                        //allowNegative: false,
                        //minValue: 0

                    },
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Days Allowed Online',
                        allowBlank: false,
                        emptyText: '',
                        bind: {store: '{dayallowedonline}'},
                        displayField: 'name',
                        valueField: 'value',
                        itemId: 'cbxDaysAllowedOnline',
                        forceSelection: true

                    },
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Days Allowed Reversal',
                        allowBlank: false,
                        blankText: 'Effective Date is Required',
                        forceSelection: true,
                        emptyText: '',
                        bind: {store: '{dayallowedreversal}'},
                        displayField: 'name',
                        valueField: 'value',
                        itemId: 'cbxDaysAllowedReversal'

                    },
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Days Allowed Paper',
                        allowBlank: false,
                        blankText: 'Effective Date is Required',
                        forceSelection: true,
                        emptyText: '',
                        bind: {store: '{dayallowedpaper}'},
                        displayField: 'name',
                        valueField: 'value',
                        itemId: 'cbxDaysAllowedPaper'

                    },
                    /*{
                        xtype: 'tagfield',
                        flex: 1,
                        fieldLabel: 'Preferred Network Formulary Tier Exclusion',
                        forceSelection: true,
                        maxHeight: 20,
                        multiSelect: true,
                        emptyText: '[Select Tier]',
                        itemId: 'mcbApplicableCovePhase',
                        multiSelect: true,
                        bind: {store: '{plandeductibleexcludedtiercodes}'},
                        displayField: 'TierDesc',
                        valueField: 'TierCode',
                        allowblank: true,
                        //triggerAction: 'all',
                        itemId: 'cbxprefPharmExclTierCodes',

                    },*/

                    {

                        xtype: 'combobox',
                        flex: 1,
                        // labelAlign: 'top',

                        // displayField: 'name',
                        fieldLabel: 'Preferred Network Formulary Tier Exclusion',
                        forceSelection: true,
                        maxHeight: 20,
                        multiSelect: true,
                        emptyText: '[Select Tier]',
                        //renderTo: Ext.getBody(),
                        bind: {store: '{plandeductibleexcludedtiercodes}'},
                        displayField: 'TierDesc',
                        valueField: 'TierCode',
                        allowblank: true,
                        itemId: 'cbxprefPharmExclTierCodes',
                        /*tpl: new Ext.XTemplate('<tpl for=".">'

                            + '<tpl if="this.checkStatus(values) == true">'
                            + '<div class="x-boundlist-item x-boundlist-selected" >'
                            + '<input type="checkbox" class=" x-form-checkbox x-form-field" checked value="{TierCode}">{TierDesc}'
                            + '</tpl>'
                            + '<tpl if="this.checkStatus(values) == false">'
                            + '<div class="x-boundlist-item" >'
                            + '<input type="checkbox" class=" x-form-checkbox x-form-field">{TierDesc}'
                            + '</tpl>'
                            + '</div></tpl>',
                            {
                                checkStatus: function(values){
                                    //debugger;
                                    var f = this.field.up();
                                    var f1 = f.up();
                                    var f2 = f1.up();
                                    //var f3 = f2.up();
                                    //var f4 = f3.up();
                                    var vm = f2.getViewModel();
                                    var store=vm.get('masterRecord');
                                    var vc = values.TierCode;
                                    //console.log('store '+ store.data.prefPharmExclTierCodes);
                                    //console.log('vc ' + vc);
                                    var ret = (store.data.prefPharmExclTierCodes.indexOf(vc) != -1 ? true : false);
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
                            change:'oncbxprefPharmExclTierCodesChange'
                        }


                    },
                    {

                        xtype: 'combobox',
                        flex: 1,
                        // labelAlign: 'top',

                        // displayField: 'name',
                        fieldLabel: 'Plan Deductible Excluded Tier Codes',
                        forceSelection: true,
                        maxHeight: 20,
                        multiSelect: true,
                        emptyText: '[Select Tier]',
                        //renderTo: Ext.getBody(),
                        bind: {store: '{plandeductibleexcludedtiercodes}'},
                        displayField: 'TierDesc',
                        valueField: 'TierCode',
                        allowblank: true,
                        itemId: 'cbxPlanDedExclTierCodes',
                        /*tpl: new Ext.XTemplate('<tpl for=".">'

                            + '<tpl if="this.checkStatus(values) == true">'
                            + '<div class="x-boundlist-item x-boundlist-selected" >'
                            + '<input type="checkbox" class=" x-form-checkbox x-form-field" checked >{TierDesc}'
                            + '</tpl>'
                            + '<tpl if="this.checkStatus(values) == false">'
                            + '<div class="x-boundlist-item" >'
                            + '<input type="checkbox" class=" x-form-checkbox x-form-field">{TierDesc}'
                            + '</tpl>'
                            + '</div></tpl>',
                            {
                                checkStatus: function(values){
                                    //debugger;
                                    var f = this.field.up();
                                    var f1 = f.up();
                                    var f2 = f1.up();
                                    var f3 = f2.up();
                                    var f4 = f3.up();
                                    var vm = f2.getViewModel();
                                    var store=vm.get('masterRecord');
                                    var vc = values.TierCode;
                                    //console.log('store '+ store.data.planDedExclTierCodes);
                                    //console.log('vc ' + vc);
                                    var ret = (store.data.planDedExclTierCodes.indexOf(vc) != -1 ? true : false);
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
                            change:'oncbxPlanDedExclTierCodesChange'
                        }


                    }

                    /*{

                        //xtype: 'combobox',
                        flex: 1,
                        xtype: 'tagfield',
                        fieldLabel: 'Plan Deductible Excluded Tier Codes',
                        forceSelection: true,
                        maxHeight: 20,
                        itemId: 'cbxPlanDedExclTierCodes',
                        multiSelect: true,
                        emptyText: '[Select Tier]',
                        allowBlank: 'true',
                        displayField: 'TierDesc',
                        valueField: 'TierCode',
                        bind: {store: '{plandeductibleexcludedtiercodes}'}/*,


                    }*/


                ]
            },
                {
                    xtype: 'panel', layout: 'vbox',
                    //collapseDirection: 'left',
                    cls: 'card-panel', flex: 0.5,
                    defaults: {
                        labelWidth: 300
                    },
                    autoScroll: true,
                    frame: true,
                    items: [{
                        xtype: 'combobox',
                        itemId: 'cbxnonprefPharmExclTierCodes',
                        fieldLabel: 'Non-Preferred Network Formulary Tier Exclusion',
                        maxHeight: 20,
                        multiSelect: true,
                        allowBlank: true,
                        emptyText: '[Select Tier]',
                        displayField: 'TierDesc',
                        valueField: 'TierCode',
                        forceSelection: true,
                        filterPickList:true,
                        triggerAction:'all',
                        bind: {store: '{plandeductibleexcludedtiercodes}'},
                        queryMode: 'local',
                        listConfig: {
                            getInnerTpl: function (displayfield) {
                                return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {' + displayfield + '} </div>';
                            }
                        },/*,
                        value: ['1', '2'],*/
                        /*tpl: new Ext.XTemplate('<tpl for=".">'

                            + '<tpl if="this.checkStatus(values) == true">'
                            + '<div class="x-boundlist-item x-boundlist-selected"  >'
                            + '<input type="checkbox" class=" x-form-checkbox x-form-field"  checked >{TierDesc}'
                            + '</tpl>'
                            + '<tpl if="this.checkStatus(values) == false">'
                            + '<div class="x-boundlist-item" >'
                            + '<input type="checkbox" class=" x-form-checkbox x-form-field">{TierDesc}'
                            + '</tpl>'
                            + '</div></tpl>',
                            {
                                checkStatus: function(values){
                                    var f = this.field.up();
                                    var f1 = f.up();
                                    var f2 = f1.up();
                                   // var f3 = f2.up();
                                    //var f4 = f3.up();
                                    var vm = f2.getViewModel();
                                    var store=vm.get('masterRecord');
                                    var vc = values.TierCode;
                                    //console.log('store '+ store.data.nonPrefPharmExclTierCodes);
                                    //console.log('vc ' + vc);
                                    var ret = (store.data.nonPrefPharmExclTierCodes.indexOf(vc) != -1 ? true : false);
                                    return ret;


                                },
                                checkValue:function () {
                                    if (this.field.checked)
                                        console.log("checked");
                                }
                            }
                        ),*/
                        listeners: {
                            change:'oncbxnonprefPharmExclTierCodesChange'
                        }

                        /*listConfig: {
                            getInnerTpl: function () {
                                return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {TierDesc} </div>';
                            }
                        }*/

                    },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Effective Date',
                            allowBlank: false,
                            itemId: 'txtEffDate',
                            format: 'm/d/Y',
                            listeners: {
                                select: 'onEffectiveDateSelect'
                                //change:
                            }
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Termination Date',
                            allowBlank: true,
                            itemId: 'txtTermDate',
                            format: 'm/d/Y'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Renewal Date',
                            allowBlank: true,
                            itemId: 'txtRenewalDate',
                            format: 'm/d/Y'
                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: 'Process Out of Network Claims',
                            itemId: 'chkOutOfNetwork',
                            labelWidth: 310
                        },

                        {
                            xtype: 'checkbox',
                            fieldLabel: 'Allow Transition Refill',
                            itemId: 'chkTransitionRefill',
                            labelWidth: 310
                        },

                        {
                            xtype: 'checkbox',
                            fieldLabel: 'Allow Emergency Fill',
                            itemId: 'chkEmergencyFill',
                            labelWidth: 310
                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: 'Specialty Drug At Specialty Pharmacy',
                            itemId: 'chkSpecDrugAtSpecPharm',
                            labelWidth: 310
                        },
                        {
                            xtype: 'hidden', itemId: 'hdnPlanGroupId'
                        },
                        {
                            xtype: 'hidden', itemId: 'hdnPlanBenefitId'
                        },
                        {
                            xtype: 'hidden', itemId: 'hdnSystemId'
                        },
                        {
                            xtype: 'hidden', itemId: 'hdnBenefitStatus'
                        }
                    ]

                }

            ]
        },

        {
            xtype: 'plan-benefits-benefitlimits',
            autoScroll:true,
            overFlowY : 'scroll',
            title: 'Plan Benefit Limits',
            bodyPadding: 0,
            region: 'south',
            collapsed: true
        },

        {
            xtype: 'plan-benefits-pharmalimits',
            title: 'Plan Pharma Limits',
            bodyPadding: 0,
            region: 'south',
            collapsed: true
        }

    ],
    bbar: {
        xtype: 'statusbar',
        itemId: 'FormStatusBar',

        defaultIconCls: 'default-icon',
        iconCls: 'x-status-valid',
        items: [

            {
                xtype: 'button',
                iconCls: 'x-fa fa-edit',
                handler: 'onAdminEditClick',
                itemId: 'btnAdminEdit',
                alignment: 'right',
                text: 'Admin Edit'
            },
            {
                xtype: 'button',
                iconCls: 'x-fa fa-floppy-o',
                handler: 'UpdatePlanBenefitStatus',
                itemId: 'btnActivate',
                alignment: 'right',
                text: 'Activate'
            },
            {
                xtype: 'button',
                iconCls: 'x-fa fa-floppy-o',
                iconCls: 'x-fa fa-floppy-o',
                handler: 'onSaveClick',
                itemId: 'btnSave',
                alignment: 'right',
                text: 'Save'
            },
            {
                xtype: 'button',
                iconCls: 'x-fa fa-ban',
                handler: 'onCancelClick',
                itemId: 'btnCancel',
                alignment: 'right',
                text: 'Cancel'
            }

        ]
    }

});
