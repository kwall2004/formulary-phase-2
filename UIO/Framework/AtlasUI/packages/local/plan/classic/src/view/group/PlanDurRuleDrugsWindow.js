/**
 * Created by S4505 on 11/16/2016.
 */

Ext.define('Atlas.plan.view.group.PlanDurRuleDrugsWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.plan-group-plandurruledrugswindow',
    //layout: 'border',
    controller: 'plan-group-plandurruledrugswindow',
    viewModel: 'plan-group-rulesetup',
    //xtype: 'widget.layout-vertical-box',
    title: 'Add Drug Details',
    height: 530,
    width: 500,
    modal: true,
    //layout: 'fit',
    iconCls:'x-fa fa-plus-circle',
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
                    title: 'Drug Level',

                    items: [

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
                                    reference:'planRuleXDrugsultimateChildETCID',
                                    listeners: {

                                        change: 'onChkETCChange'
                                    }

                                },
                                {
                                    xtype: 'combo',
                                    labelWidth: 125,
                                    width: 200,

                                    emptyText: '[e.g. Analgesics]',
                                    minChars: 3,
                                    bind: {
                                        store: '{ultimatechildetcid}'
                                    },
                                    listeners: {
                                        beforequery: function(queryPlan){
                                            //debugger
                                            var StoreUltimateChildEtc = this.up('window').getViewModel().getStore('ultimatechildetcid');
                                            StoreUltimateChildEtc.getProxy().setExtraParam('pUChild', 1);

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
                                    reference: 'cmbDrugultimateChildETCID',
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
                                    reference:'planRuleXDrugsGCN_SEQ',
                                    listeners: {

                                        change: 'onChkGCNChange'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    labelWidth: 125,
                                    width: 200,

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
                                        select: 'onDrugGCNSEQNOSelect'
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
                                    reference: 'cmbDrugGCNSeqNo',
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
                                    fieldLabel: '<b>NDC</b>   ',
                                    name: 'plan-Drugs',
                                    inputValue: 'NDC',
                                    anchor: '100%',
                                    hideEmptyLabel: false,
                                    labelWidth: 195,
                                    margin: '0 0 10 0',
                                    minWidth: 240,
                                    reference: 'planRuleXDrugsNDC',
                                    listeners: {

                                        change: 'onChkNDCCahnge'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    labelWidth: 125,
                                    width: 200,


                                    emptyText: '[e.g. 00247008500 or ACETAMINOPHEN]',
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
                                        select: 'onDrugNDCSelect'
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
                                    reference: 'cmbDrugNdc',
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
                                    reference:'planRuleXDrugsGPICode',
                                    listeners: {

                                        change: 'onChkGPIChange'
                                    }
                                },
                                {

                                    xtype: 'combo',
                                    labelWidth: 125,
                                    width: 200,


                                    emptyText: '[e.g. Cycloserine]',
                                    minChars: 3,
                                    bind: {
                                        store: '{plangpicodes}'
                                    },
                                    listeners: {
                                        beforequery: function(queryPlan){
                                            //alert(queryPlan.query.length);
                                            var StorePlanGcnSeqNo = this.up('window').getViewModel().getStore('plangpicodes');
                                            queryPlan.query = 'wrdIdx CONTAINS "' + queryPlan.query + '"*"';

                                        },
                                        select: 'onDrugGpiCodeSelect'
                                    },
                                    listConfig: {
                                        getInnerTpl: function () {
                                            // here you place the images in your combo
                                            var tpl = '<div>' +
                                                '<b>{GPINAME}</b><br/>' +
                                                'GPI-{GPICode}' +
                                                'NDC-{NDC}<br/>' +
                                                '</div>';
                                            return tpl;
                                        }
                                    },
                                    reference: 'cmbDrugGpiCode',
                                    forceSelection: true,
                                    queryMode: 'remote',
                                    name: 'GPICode',
                                    displayField: 'GPICode',
                                    valueField: 'GPICode',
                                    queryParam: 'pWhere',
                                    hideTrigger:true


                                }
                            ]

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
                    title: 'Selected Drug Level',
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: '<b>Drug level</b>    ',
                            name: 'drugLevelDesc',
                            reference:'planRuleXDrugLevelDesc'

                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: '<b>Description</b>',
                            name: 'drugDesc',
                            reference:'planRuleXDrugDesc'

                        }
                    ]

                }
            ],
            bbar:[
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

