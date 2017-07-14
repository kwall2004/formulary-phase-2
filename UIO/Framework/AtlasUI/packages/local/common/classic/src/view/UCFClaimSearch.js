/**
 * Created by T4317 on 11/4/2016.
 */
Ext.define('Atlas.common.view.UCFClaimSearch', {
    extend: 'Ext.panel.Panel',
    xtype:'common-ucfclaimsearch',
    controller:'ucfclaimsearch',
    viewModel:{
        stores:{
            ucfclaims:{
                model:'Atlas.common.model.UCFClaims',
                pageSize: 25,
                remoteSort: true,
                remoteFilter: true
            }
        }
    },
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 5,
    defaults: {
        frame: true,
        bodyPadding: 5
    },
    items: [
        {
            height: 155,
            margin: '0 0 5 0',
            xtype: 'form',
            layout: 'column',
            defaultButton: 'search',
            defaults: {
                xtype: 'container',
                layout: 'anchor',
                columnWidth: 0.5,
                margin: 5,
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%',
                    labelWidth: 110
                }
            },
            items: [
                {
                    items: [

                        {
                            xtype: 'membertypeahead',
                            fieldLabel: 'Member:',
                            emptyText: '[e.g. John]',
                            reference:'recipientId',
                            bind:{
                                disabled: '{!memberTypeAheadIsEnabled}'
                            },
                            valueField:'trecipientID',
                            width:350,
                            itemId:'memtypeahead'
                        },{
                            xtype: 'prescribertypeahead',
                            fieldLabel: 'Prescriber:',
                            reference:'prescId',
                            emptyText:'[e.g. Dr. Smith]',
                            displayField:'fullname',
                            valueField:'npi',
                            width:350,
                            bind:{
                                disabled: '{!prescriberTypeAheadIsEnabled}',
                                emptyText:'{masterrecord.fullname}'
                            }

                        },{
                            xtype: 'drugtypeahead',
                            fieldLabel: 'NDC:',
                            emptyText: '[e.g. Nexium]',
                            reference:'gcnseq',
                            width:350,
                            bind:{
                                disabled: '{!drugTypeAheadIsEnabled}'
                            },
                            valueField:'GCN_SEQNO'

                        },{
                            xtype: 'textfield',
                            width:350,
                            reference:'rxNum',
                            fieldLabel: 'Rx Number:'
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Service Date',
                            combineErrors: true,
                            msgTarget : 'side',
                            layout: 'hbox',
                            defaults: {
                                flex: 1,
                                hideLabel: true
                            },
                            items: [
                                {
                                    xtype:'datefield',
                                    format: 'n/j/Y',
                                    reference: 'startDate'
                                },{
                                    xtype:'datefield',
                                    format: 'n/j/Y',
                                    reference: 'endDate'
                                }
                                ]
                        },
                        {
                            xtype: 'pharmacytypeahead',
                            fieldLabel: 'Pharmacy:',
                            emptyText: '[e.g. Target Pharmacy MI 48188]',
                            displayField:'pharmacyLabel',
                            width:350,
                            reference:'pharmId',
                            bind:{
                                disabled: '{!pharmacyTypeAheadIsEnabled}'
                            }
                        },
                        {
                            xtype: 'drugtypeahead',
                            fieldLabel: 'GCN:',
                            emptyText: '[e.g. 6818]',
                            reference:'gcndirect',
                            valueField:'GCN_SEQNO',
                            bind:{
                                disabled:'{!gcnTypeAheadIsEnabled}'
                            },
                            width:350
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Search',
                    iconCls: 'x-fa fa-search',
                    handler:'onClaimSearch'
                },
                {
                    text: 'Reset',
                    iconCls: 'x-fa fa-repeat',
                    handler: 'onClaimReset'
                }
            ]
        },
        {
            flex : 15,
            xtype: 'grid',
            margin: '0 0 5 0',
            name:'Claims',
            reference: 'claimsTable',
            bind: {
                store: '{ucfclaims}'
            },
            listeners: {
                itemdblclick:'routeToClaimsDbClick'
            },
            dockedItems: [{
                xtype: 'toolbar',
                ui: 'footer',
                dock: 'top',
                items: [
                    {
                        //xtype:'exporttoexcelbutton',
                        xtype : 'button',
                        text : 'Export To Excel',
                        handler : 'exportToExcelClick',
                        iconCls:'fa fa-file-excel-o',
                        reference : 'refExportToExcel'
                    }
                ]
            }],
            bbar: {
                xtype: 'pagingtoolbar',
                bind: '{ucfclaims}',
                displayInfo: true,
                hideRefresh: true,
                reference: 'refPagingToolbar'
            },
            columns: {
                defaults: {
                    filter: {type: 'string'}
                },
                items: [
                    {text: '#', dataIndex: '', hidden: true,hideable : false},
                    {text: 'Transaction ID', dataIndex: 'transactionID', hidden: true},
                    {text: 'Claim #', dataIndex: 'ClaimRefNum', ignoreExport:false, width: 110, xtype: 'widgetcolumn', onWidgetAttach: 'widgetAttach', widget:{xtype: 'button', width: 95, iconCls: 'x-fa fa-folder', handler: 'routeToClaims'}},
                    {text: 'Recipient ID', dataIndex: 'recipientID', hidden: true},
                    {text: 'Member Name', dataIndex: 'MemberName', ignoreExport:false, xtype: 'widgetcolumn', widget:{xtype: 'button', flex: 140, iconCls: 'x-fa fa-user', handler: 'routeToMember'}},
                    {text: 'Carrier', dataIndex: 'Carrier'},
                    {text: 'Account', dataIndex: 'Account', flex:1},
                    {text: 'LOB', dataIndex: 'LOB', flex:1},
                    {text: 'NDC', dataIndex: 'ProductID', flex:1},
                    {text: 'Medication', dataIndex: 'LN'},
                    {text: 'Service Date', dataIndex: 'ServiceDate',
                        xtype: 'datecolumn', formatter: 'date("n/j/Y")', filter: {type: 'date'}},
                    {text: 'Status', dataIndex: 'status'},
                    {text: 'NCPDPID', dataIndex: 'NCPDPID', hidden: true},
                    {text: 'Rx Num', dataIndex: 'RxNumber', flex:1},
                    {text: 'Pharmacy Name', dataIndex: 'PharmacyName', ignoreExport:false, xtype: 'widgetcolumn', onWidgetAttach: 'widgetAttach', widget:{xtype: 'button', flex: 1, iconCls: 'x-fa fa-home', handler: 'routeToPharmacy'}},
                    {text: 'Prescriber NPI', dataIndex: 'NPI', hidden: true},
                    {text: 'Prescriber Name', dataIndex: 'PrescriberName', ignoreExport:false, flex: 1, xtype: 'widgetcolumn', onWidgetAttach: 'widgetAttach', widget:{xtype: 'button', flex: 1, iconCls: 'x-fa fa-user', handler: 'routeToPrescriber'}}
                ]
            }
        }
    ]
});