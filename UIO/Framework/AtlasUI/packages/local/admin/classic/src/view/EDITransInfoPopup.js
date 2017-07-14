/**
 * Created by s6685 on 12/2/2016.
 */

Ext.define('Atlas.pharmacy.view.EDITransactionWindow', {
    extend: 'Ext.window.Window',
    xtype: 'EDITransactionWindow',
    name : 'EDITransactionWindow',
    title: 'Transaction Details',
    controller: 'EDITransactionWindowController',
    viewModel: 'EDITransactionViewModel',
    width: 800,
    iconCls: 'fa fa-refresh',
    height: 650,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'form',
            itemId: 'formEDIDetail',
            width: '100%',
            height: '100%',
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                collapsible: true,
                xtype: 'panel',
                cls: 'card-panel',
                defaults: {
                    xtype: 'displayfield',
                    labelWidth:130,
                    width:230

                }
            },

            items: [
                {
                    layout:'column',
                    flex: 2,
                    title: 'Transaction Details',
                    iconCls: 'fa fa-refresh',
                    items: [
                        {
                            fieldLabel: 'Transaction Id:',
                            name: 'TransactionID',
                            itemId:'lblTransactionId'
                        },
                        {
                            fieldLabel: 'Source:',
                            name: 'SOURCE',
                            itemId:'lblSource'
                        },
                        {
                            fieldLabel: 'Provider Id:',
                            name: 'ProviderID',
                            itemId:'lblProviderID'
                        },
                        {
                            fieldLabel: 'Transaction Type:',
                            name: 'TranCode',
                            itemId:'lblTransactionType'
                        },
                        {
                            fieldLabel: 'Bin:',
                            name: 'Bin',
                            itemId:'lblBin'
                        },
                        {
                            fieldLabel: 'Provider ID Qual:',
                            name: 'ProviderIDQ',
                            itemId:'lblProviderIDQ'
                        },
                        {
                            fieldLabel: 'Transaction Date:',
                            name: 'TransDate',
                            itemId:'lblTransactionDate'
                        },
                        {
                            fieldLabel: 'PCN:',
                            name: 'ProcessorCntr',
                            itemId:'lblPCN'
                        },
                        {
                            fieldLabel: 'Record Version:',
                            name: 'recordVersion',
                            itemId:'lblRecordVersion'
                        },
                        {
                            fieldLabel: 'Service Date:',
                            name: 'ServiceDate',
                            itemId:'lblServiceDate'
                        },
                        {
                            fieldLabel: 'Port:',
                            name: 'Port',
                            itemId:'lblPort'
                        },
                        {
                            fieldLabel: 'NCPDP Version:',
                            name: 'NCPDPVersion',
                            itemId:'lblNCPDPVersion'
                        },
                        {
                            fieldLabel: 'Time In:',
                            itemId:'lblTimeInDate'
                        },
                        {
                            fieldLabel: 'Socket:',
                            name: 'Socket',
                            itemId:'lblSocket'
                        },
                        {
                            fieldLabel: 'A/C Year:',
                            name: 'AccYr',
                            itemId:'lblACYear'
                        },
                        {
                            fieldLabel: 'Time Out:',
                            itemId:'lblTimeOutDate'
                        },
                        {
                            fieldLabel: 'Fac Tran ID:',
                            name: 'FacTransID',
                            itemId:'lblFacTransID'
                        },
                        {
                            fieldLabel: 'Status Flag:',
                            itemId: 'lblStatusFlag'
                        },
                        {
                            fieldLabel: 'Process Time:',
                            itemId:'lblProcessTime'
                        },
                        {
                            fieldLabel: 'SW Vendor Cert:',
                            name: 'SoftVenCertID',
                            itemId:'lblSoftVenCertID'
                        },
                        {
                            fieldLabel: 'Tran Count:',
                            name: 'TransCnt',
                            itemId: 'lblTransCnt'
                        }

                    ]
                },

                {

                    title: 'Raw Data In',
                    collapsible: true,
                    collapsed: true,
                    iconCls: 'fa fa-long-arrow-down',
                    flex: 1,
                    layout: {
                        type: 'fit'
                    },
                    items: [
                        {
                            xtype: 'textarea',
                            itemId: 'lblRawDataIN',
                            name: 'RawDataIN',
                            readOnly: true,
                            anchor: '100%'
                        }
                    ]
                },

                {

                    title: 'Raw Data Out',
                    flex: 1,
                    collapsible: true,
                    collapsed: true,
                    iconCls: 'fa fa-long-arrow-up',
                    layout: {
                        type: 'fit'
                    },
                    items: [
                        {
                            xtype: 'textarea',
                            itemId: 'lblRawDataOUT',
                            name: 'RawDataOUT',
                            readOnly: true,
                            anchor: '100%'
                        }
                    ]
                }
            ]
        }
    ]
});

