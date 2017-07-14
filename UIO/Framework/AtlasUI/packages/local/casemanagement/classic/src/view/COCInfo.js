/**
 * Created by mkorivi on 11/9/2016.
 */

Ext.define('Atlas.casemanagement.view.COCInfo', {
    /*extend: 'Ext.tab.Panel',*/
    extend: 'Ext.tab.Panel',
    xtype: 'COCInfo',
    scrollable: true,
    layout: 'fit',
    controller: 'cocdetailscontroller',
    viewModel: 'cocdetailsviewmodel',
    defaults: {
        closable: true
    },
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    text: 'Advanced Search',
                    //      handler: 'btAdvancedSearch',
                    itemId: 'btAdvancedSearch',
                    iconCls: 'x-fa fa-search',
                    handler: 'btAdvancedSearchClick'
                }, '|',
                {
                    xtype: 'button',
                    text: 'Member Id',
                    handler: 'btnGoToMember',
                    itemId: 'btnMrxId',
                    tooltip: 'View Member'
                    //  iconCls: 'fa fa-plus-circle'
                }, '|',
                {
                    xtype: 'displayfield',
                    itemId: 'lblSeqNo',
                    labelWidth:50,
                    fieldLabel: 'Seq No'

                }, '|',
                {
                    xtype: 'displayfield',
                    itemId: 'lblState',
                    labelWidth:50,
                    userCls: 'm-red-color-displayfield',
                    fieldLabel: '<span class="m-red-color">State</span>'
                },
                '->',
                {
                    xtype: 'button',
                    reference: 'menu',
                    text: 'Menu',
                    iconCls: 'x-fa fa-bars',
                    menu: {
                        plain: true,
                        listeners: {
                            click: 'onMenuClick'
                        }
                    }
                }

            ]
        },
        {
            dock: 'left',
            xtype: 'panel',
            title: 'Info',
            width: 250,
            split: true,
            collapsible: true,
            autoScroll:true,
            collapseDirection: 'left',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'fieldset',
                    collapsible: true,
                    autoScroll:true,
                    title: 'Member',
                    defaults: {
                        xtype: 'displayfield'
                    },
                    items: [
                        {fieldLabel: 'MeridianRx ID', bind: {value: '{PBMRecipientId}'}, itemId: 'lblRID'},
                        {fieldLabel: 'Member ID', bind: {value: '{MemberId}'}},
                        {fieldLabel: 'First Name', bind: {value: '{memberInfoMasterData.firstname}'}},
                        {fieldLabel: 'Last Name', bind: {value: '{memberInfoMasterData.lastname}'}},
                        {fieldLabel: 'LOB', bind: {value: '{memberCoverageHistoryData.tCarrierLOBName}'}},
                        {fieldLabel: 'Phone', bind: {value: '{memberInfoMasterData.homePhone}'}},
                        {fieldLabel: 'DOB', renderer: Ext.util.Format.dateRenderer('m/d/Y'), bind: {value: '{memberInfoMasterData.birthDate}'}},
                        {fieldLabel: 'Gender', bind: {value: '{memberInfoMasterData.gender}'}},
                        {xtype:'container',layout: 'hbox',items:[
                            {xtype:'displayfield',fieldLabel: 'Status', bind: {value: '{memberInfoMasterData.enrollmentStatus}'}},
                            {
                                xtype:'displayfield',
                                userCls: 'fa fa-flag m-red-color'
                            }
                        ]
                        }


                    ]/*,
                 bind: {
                 hidden:'{!showMember}'
                 }*/
                },
                {
                    xtype: 'fieldset',
                    collapsible: true,
                    autoScroll:true,
                    title: 'PCP',
                    defaults: {
                        xtype: 'displayfield'
                    },
                    items: [
                        {fieldLabel: 'NPI', bind: {value: '{memberPCPData.npi}'}},
                        {fieldLabel: 'Name', bind: {value: '{memberCoverageHistoryData.tPrimaryCarePhys}'}},
                        {fieldLabel: 'Phone', bind: {value: '{memberPCPData.locphone}'}},
                        {fieldLabel: 'Fax', bind: {value: '{memberPCPData.locfax}'}}
                    ]/*,
                 bind: {
                 hidden:'{!showPCP}'
                 }*/
                }],
            dockedItems: [
                {
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'fa fa-user',
                            handler: 'btnGoToMember',
                            text: 'Member',
                            itemId: 'btnGoToMember',
                            tooltip: 'View Member'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'fa fa-user',
                            handler: 'btnGoToPrescriber',
                            itemId: 'btnGoToPrescriber',
                            text: 'PCP',
                            tooltip: 'View PCP'
                        }
                    ]
                }]
        }
    ]
});