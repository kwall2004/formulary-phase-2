/**
 * Created by S4505 on 11/16/2016.
 */

Ext.define('Atlas.plan.view.group.PlanDurRuleWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.plan-group-plandurrulewindow',
    //layout: 'border',
    controller: 'plan-group-plandurrulewindow',
    viewModel: 'plan-group-rulesetup',
    //xtype: 'widget.layout-vertical-box',
    iconCls:'x-fa fa-plus-circle',
    title: 'Add DUR Rule',
    height: 840,
    width: 800,
    modal: true,
    //layout: 'fit',
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 10,

    items: [
        {
            xtype:'form',
            defaults: {
                frame: true,
                bodyPadding: 10,
                margin:10
            },

            tbar:[

                {
                    xtype: 'displayfield',
                    fieldLabel: '<span class="x-fa fa-file-o"></span><b> Rule ID</b>',
                    name: 'planDURRuleID'
                },
                {
                    xtype: 'displayfield',
                    name: 'currentDate',
                    listeners : {
                        render: function(c) {
                            c.setRawValue(Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y'));
                        }
                    }

                },

                {
                    xtype: 'displayfield',
                    name: 'Time',
                    listeners : {
                        render: function(c) {
                            c.setRawValue(Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y'));
                        }
                    }
                }

            ],

            items:[
                {
                    xtype: 'panel',
                    defaults: {
                        labelWidth: 195,
                        flex: 1,
                        margin: '0 0 10 0',
                        minWidth: 400

                    },
                    items: [

                        // leftpanel content ---------------------------------------------------- //
                        {xtype: 'textfield', name:'planDURRuleName',  fieldLabel: '<b>Rule Name</b>:', allowBlank: false},
                        {xtype: 'combobox', autoLoadOnValue: true, name:'DURType',reference:'DURType', fieldLabel: '<b>DUR Type</b>:', allowBlank: false,
                            bind: {store: '{durtypes}', hidden: '{!isDUR}'}, displayField:'name', valueField:'value',
                            listeners: {
                                select:'onDurTypeSelect'
                            }},
                        {xtype: 'combobox', autoLoadOnValue: true, name:'DURCondition',reference:'DURCondition', fieldLabel: '<b>DUR Condition</b>:', allowBlank: false,
                            bind: {store: '{durcondition}', hidden: '{!isDUR}'}, displayField:'name', valueField:'value',
                            listeners: {
                                select:'onDurConditionSelect'
                            }
                        },{
                            xtype:'container',
                            layout:'hbox',
                            items:[
                                {xtype: 'numberfield', name:'priorDays', fieldLabel: 'Prior Days:', allowBlank: false,  maxLength: 3,
                                    dataType: 'int',minValue: 0,maxValue: 999,hideTrigger: true,labelWidth: 195
                                },{
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-exclamation-circle',
                                    tooltip: 'How many days in the past from the date of service'
                                }
                            ]

                        }, {xtype: 'combobox', autoLoadOnValue: true, name:'RejectionCodes',reference:'rejectionCodes', fieldLabel: '<b>Rejection Codes</b>:', allowBlank: false,
                            bind: {store: '{rejectioncodes}', hidden: '{!isIntervention}'}, displayField:'name', valueField:'value', multiSelect: true,
                            editable:true,forceSelection:true,itemId: 'cbxRejectionCodeList',
                            queryMode: 'local',
                            listConfig: {
                                getInnerTpl: function (displayfield) {
                                    return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {' + displayfield + '} </div>';
                                }
                            },
                            /*tpl: new Ext.XTemplate('<tpl for=".">'
                                + '<div class="x-boundlist-item" >'
                                + '<tpl if="this.checkStatus(values) == true">'
                                + '<input type="checkbox" class=" x-form-checkbox x-form-field" checked="true" >&nbsp;{name}'
                                + '</tpl>'
                                + '<tpl if="this.checkStatus(values) == false">'
                                + '<input type="checkbox" class=" x-form-checkbox x-form-field" >&nbsp;{name}'
                                + '</tpl>'
                                + '</div></tpl>',
                                {
                                    checkStatus: function(values){
                                        //debugger;
                                        if(this.field.up().up().up().record !=null && this.field.up().up().up().record.data !=null
                                            && this.field.up().up().up().record.data.RejectionCodes!=null) {
                                            var storeRejectionCodes = this.field.up().up().up().record.data.RejectionCodes;
                                            // var rejectionCodeList = [];
                                            // rejectionCodeList = storeRejectionCodes.split(',');
                                            return (storeRejectionCodes.indexOf(values.value) != -1 ? true : false);
                                        }
                                        return false;
                                    }
                                }
                            )*/

                            listeners: {
                                change:'onRejectionCodeChange'
                            }

                        },
                        {xtype: 'numberfield', name:'MonitorHrs', fieldLabel: '<b>Monitor Hrs</b>:', allowBlank: false, reference: 'MonitorHrs', bind:{hidden: '{!isIntervention}'}, maxLength: 3,
                            dataType: 'int',minValue: 0,maxValue: 999,hideTrigger: true},
                        {xtype: 'combobox', autoLoadOnValue: true, name:'measureCode',reference:'measureCode', fieldLabel: '<b>Hedis Measure</b>:', allowBlank: true, bind: {store: '{hedismeasures}', hidden: '{!isIntervention}'}, displayField:'name', valueField:'value'}
                    ]

                },
                {
                    xtype: 'panel',
                    flex: 1,
                    defaultType: 'radio', // each item will be a radio button
                    layout:{
                        type:'vbox' ,
                        align:'left'
                    } ,

                    defaults: {
                        anchor: '100%',
                        hideEmptyLabel: false,
                        labelWidth: 195,
                        flex: 1,
                        margin: '0 0 10 0',
                        minWidth: 400
                    },
                    //padding: 10,
                    items: [

                        {
                            fieldLabel: '<b>All Drugs</b>',
                            name: 'plan-Drugs',
                            inputValue: 'allLevels',
                            listeners: {
                                change:'onChkPlanDurRuleAllLevelChange'
                            },
                            reference:'chkPlanDurRuleAllLevel'
                        },

                        {
                            xtype:'container',
                            layout:'hbox',
                            items:[
                                {
                                    xtype:'radio',
                                    fieldLabel: '<b>UltimateChild ETC</b>',
                                    name: 'plan-Drugs',
                                    inputValue: 'ultimateChildETCID',
                                    anchor: '100%',
                                    hideEmptyLabel: false,
                                    labelWidth: 195,
                                    margin: '0 0 10 0',
                                    minWidth: 240,
                                    reference:'chkPlanDurRuleChildETC',
                                    listeners: {
                                        change:'onPlanDurRuleChildETCChange'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    labelWidth: 125,
                                    width: 200,
                                    reference: 'cmbRuleultimateChildETCID',

                                    emptyText: '[e.g. Analgesics]',
                                    minChars: 3,
                                    bind: {
                                        store: '{ultimatechildetcid}'
                                    },
                                    listeners: {
                                        beforequery: function(queryPlan){
                                            var StoreUltimateChildEtc = this.up('window').getViewModel().getStore('ultimatechildetcid');
                                            StoreUltimateChildEtc.getProxy().setExtraParam('pUChild', 1);
                                            //queryPlan.query = queryPlan.query;

                                        },
                                        select: 'onUltimateChildETCIDSelect'
                                    },
                                    listConfig: {
                                        getInnerTpl: function () {
                                            // here you place the images in your combo
                                            var tpl = '<div>' +
                                                '<b>ETC Id: </b>{ETC_ID}<br>'+
                                                '<b>Name: </b>{ETC_NAME}</div>';
                                            return tpl;
                                        }
                                    },
                                    forceSelection: true,
                                    queryMode: 'remote',
                                    name: 'ultimateChildETCID',
                                    displayField: 'ETC_ID',
                                    valueField: 'ETC_ID',
                                    queryParam: 'pcLookup',
                                    hideTrigger:true
                                }
                            ]

                        },

                        {
                            xtype:'container',
                            layout:'hbox',

                            items:[
                                {
                                    xtype:'radio',
                                    fieldLabel: '<b>GCN SEQ</b>          ',
                                    name: 'plan-Drugs',
                                    inputValue: 'GCN_SEQNO',
                                    anchor: '100%',
                                    hideEmptyLabel: false,
                                    labelWidth: 195,
                                    margin: '0 0 10 0',
                                    minWidth: 240,
                                    reference:'chkPlanDurRuleGCNSEQNO',
                                    listeners: {
                                        change:'onChkPlanDurRuleGCNSEQNOChange'
                                    }


                                },
                                {
                                    xtype: 'combo',
                                    labelWidth: 125,
                                    width: 200,
                                    reference: 'cmbRuleGCNSeqNo',

                                    emptyText: '[e.g. Nexium]',
                                    minChars: 3,
                                    bind: {
                                        store: '{plangcnseqno}'
                                    },
                                    listeners: {

                                        beforequery: function(queryPlan){

                                            var StorePlanGcnSeqNo = this.up('window').getViewModel().getStore('plangcnseqno');
                                            StorePlanGcnSeqNo.getProxy().setExtraParam('iplExcludeObsDrug',false);
                                            StorePlanGcnSeqNo.getProxy().setExtraParam('pFilter','');
                                            queryPlan.query = 'wrdIdx CONTAINS "' + queryPlan.query + '"*"';

                                        },
                                        select: 'onGCNSEQNOSelect'
                                    },
                                    listConfig: {
                                        getInnerTpl: function () {
                                            // here you place the images in your combo
                                            var tpl = '<div>' +
                                                '<b>{LN}</b>' +
                                                '--{LBLRID}<br/>' +
                                                'NDC-{NDC}' +
                                                'GCN-{GCN_SEQNO}</div>';
                                            return tpl;
                                        }
                                    },
                                    forceSelection: true,
                                    queryMode: 'remote',
                                    name: 'GCN_SEQNO',
                                    displayField: 'GCN_SEQNO',
                                    valueField: 'GCN_SEQNO',
                                    queryParam: 'pWhere',
                                    hideTrigger:true
                                }
                            ]

                        },

                        {
                            xtype:'container',
                            layout:'hbox',

                            items:[
                                {
                                    xtype:'radio',
                                    fieldLabel: '<b>GPI</b>   ',
                                    name: 'plan-Drugs',
                                    inputValue: 'GPICode',
                                    anchor: '100%',
                                    hideEmptyLabel: false,
                                    labelWidth: 195,
                                    margin: '0 0 10 0',
                                    minWidth: 240,
                                    reference:'chkPlanDurRuleGPICode',
                                    listeners: {
                                        change:'onChkPlanDurRuleGPICodeChange'
                                    }

                                },
                                {
                                    xtype: 'combo',
                                    labelWidth: 125,
                                    width: 200,
                                    emptyText: '[e.g. Cycloserine]',
                                    minChars: 4,
                                    bind: {
                                        store: '{plangpicodes}'
                                    },
                                    listeners: {
                                        beforequery: function(queryPlan){

                                            var StorePlanGcnSeqNo = this.up('window').getViewModel().getStore('plangpicodes');
                                            queryPlan.query = 'wrdIdx CONTAINS "' + queryPlan.query + '"*"';

                                        },
                                        select: 'onRuleGpiCodeSelect'
                                    },
                                    listConfig: {
                                        getInnerTpl: function () {
                                            // here you place the images in your combo
                                            var tpl = '<div>' +
                                                '<b>{GPINAME}</b><br/>' +
                                                'GPI-{GPICODE}' +
                                                'NDC-{NDC}<br/>' +
                                                '</div>';
                                            return tpl;
                                        }
                                    },
                                    reference: 'cmbRuleGpiCode',
                                    forceSelection: true,
                                    queryMode: 'remote',
                                    name: 'GPICode',
                                    displayField: 'GPICode',
                                    valueField: 'GPICode',
                                    queryParam: 'pWhere',
                                    hideTrigger:true
                                }
                            ]

                        },

                        {
                            xtype:'container',
                            layout:'hbox',
                            items:[
                                {
                                    xtype:'radio',
                                    fieldLabel: '<b>NDC</b>   ',
                                    name: 'plan-Drugs',
                                    inputValue: 'NDC',
                                    anchor: '100%',
                                    hideEmptyLabel: false,
                                    labelWidth: 195,
                                    margin: '0 0 10 0',
                                    minWidth: 240,
                                    reference:'chkPlanDurRuleNDC',
                                    listeners: {
                                        change:'onChkPlanDurRuleNDCChange'
                                    }




                                },
                                {
                                    xtype: 'combo',
                                    labelWidth: 125,
                                    width: 200,
                                    emptyText: '[e.g. 00247008500 or ACETAMINOPHEN]',
                                    minChars: 4,
                                    bind: {
                                        store: '{plangcnseqno}'
                                    },
                                    listeners: {
                                        beforequery: function(queryPlan){

                                            var StorePlanGcnSeqNo = this.up('window').getViewModel().getStore('plangcnseqno');
                                            StorePlanGcnSeqNo.getProxy().setExtraParam('iplExcludeObsDrug',false);
                                            StorePlanGcnSeqNo.getProxy().setExtraParam('pFilter','');
                                            queryPlan.query = 'wrdIdx CONTAINS "' + queryPlan.query + '"*"';

                                        },
                                        select: 'onNDCSelect'
                                    },
                                    listConfig: {
                                        getInnerTpl: function () {
                                            // here you place the images in your combo
                                            var tpl = '<div>' +
                                                '<b>NDC: </b>{NDC}<br>' +
                                                '<b>Label: </b>{LN}<br>' +
                                                '<b>Brand: </b>{BN}<br>' +
                                                '<b>GCN: </b>{GCN_SEQNO}';
                                            return tpl;
                                        }
                                    },
                                    reference: 'cmbRuleNdc',
                                    forceSelection: true,
                                    queryMode: 'remote',
                                    name: 'NDC',
                                    displayField: 'NDC',
                                    valueField: 'NDC',
                                    queryParam: 'pWhere',
                                    hideTrigger:true

                                }
                            ]

                        },

                        {
                            xtype: 'displayfield',
                            fieldLabel: '<b>Drug level</b>    ',
                            name: 'druglevel',
                            reference:'planRuleDrugLevel'

                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: '<b>Description</b>',
                            name: 'drugDesc',
                            reference:'planRuleDrugDescription'
                        }



                    ]

                },
                {
                    xtype: 'panel',
                    defaults: {
                        labelWidth: 195,
                        flex: 1,
                        margin: '0 0 10 0',
                        minWidth: 400

                    },
                    items: [
                        {xtype: 'checkbox', name:'ACTIVE',  fieldLabel: '<b>Active</b>:', allowBlank: true},
                        {xtype: 'datefield', name: 'effDate', emptyText: 'mm/dd/yyyy', fieldLabel: '<b>Effective Date</b>',format:'m/d/Y',placeHolder:'mm/dd/yyyy',allowBlank: false},
                        {xtype: 'datefield', name: 'termDate', emptyText: 'mm/dd/yyyy', fieldLabel: '<b>Termination Date</b>',format:'m/d/Y',placeHolder:'mm/dd/yyyy'},
                        {xtype: 'checkbox', name:'LetterRequired',  fieldLabel: '<b>Letter Required</b>:', allowBlank: true},
                        {xtype: 'checkbox', name:'AlertRequired',  fieldLabel: '<b>Alert Required</b>:', allowBlank: true}
                    ]

                }
            ],
            bbar:[
                {
                    xtype: 'displayfield',
                    fieldLabel: '<span class="x-fa fa-user"> </span><b>Modified by</b>',
                    name: 'lastModifiedby'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '<span class="x-fa fa-calendar"></span><b>on</b>',
                    name: 'lastModified'
                },

                '->',
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-floppy-o',
                    handler: 'onSaveClick',
                    text: 'Save'
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-ban',
                    handler: 'onCancelClick',
                    text: 'Cancel'
                }

            ]
        }
    ]
});
