/**
 * Created by agupta on 11/30/2016.
 */

Ext.define('Atlas.admin.view.EDIPartnerWindow', {
    xtype: 'admin-edipartnerwindow',

    extend: 'Ext.window.Window',
    title: 'Select partner',
    viewModel: 'edipartnerwinviewmodel',
    controller: 'edipartnerwincontroller',
    width: 800,
    height: 500,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'grid',
            itemId : 'grdEDIPartnerInfo',
            title : 'EDI Partner Info',
            flex: 1,
            columns: [
                {text: 'Partner ID', dataIndex: 'partnerId'},
                {text: 'Partner Name', dataIndex: 'partnerName', width : 250},
                {text: 'EDI Path', dataIndex: 'ediPath', width : 170},
                {text: 'IP Address', dataIndex: 'ipAddress', width : 150},
                {text: 'EIN', dataIndex: 'ein'}
            ],
            listeners: {
                itemclick: 'grdEDIPartnerInfo_ItemClick'
            },
            bind: '{storePartnerList}',
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    bind: '{storePartnerList}',
                    displayInfo: false,
                    dock: 'bottom'
                }
            ]
        }
    ]
});
