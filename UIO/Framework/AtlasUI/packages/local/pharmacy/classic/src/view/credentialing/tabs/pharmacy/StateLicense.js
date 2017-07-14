/**
 * This Class represents the State License Tab within the Pharmacy Information tab of Pharmacy Credentialing Module
 */
Ext.define('Atlas.pharmacy.view.credentialing.tabs.pharmacy.StateLicense', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pharmacy-statelicense',
    reference: 'stateLicenseRef',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'panel',
            title: 'State License Information',
            flex: 1,
            layout: 'fit',
            items: [
                {
                    xtype: 'grid',
                    reference: 'stateLicInfoGridRef',
                    bind: {
                        store: '{statelicensepbminfo}'
                    },
                    columns: [
                        {text: 'State Code', flex: 1, dataIndex: 'LicenseStateCode'},
                        {text: 'Exp. Date', flex: 1, formatter: 'date("m/d/Y")', dataIndex: 'stateLicenseExpDate'},
                        {
                            text: 'Verification Date',
                            flex: 1,
                            formatter: 'date("m/d/Y")',
                            dataIndex: 'stateLicenseVerfDate'
                        },
                        {text: 'License Number', flex: 1, dataIndex: 'stateLicenseNumber'},
                        {text: 'OIG Action', flex: 1, dataIndex: 'OIGAction'},
                        {text: 'OIG Date', flex: 1, formatter: 'date("m/d/Y")', dataIndex: 'OIGDate'},
                        {text: 'SAM Action', flex: 1, dataIndex: 'SAMAction'},
                        {text: 'SAM Date', flex: 1, formatter: 'date("m/d/Y")', dataIndex: 'SAMDate'}
                    ],
                    listeners: {
                        itemclick: 'stateLicInfoClick',
                        itemdblclick: 'stateLicInfoDblclick'
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            title: 'State License History',
            flex: 1,
            layout: 'fit',
            items: [
                {
                    xtype: 'grid',
                    reference: 'stateLicHistGridRef',
                    bind: {
                        store: '{statelicensepbmhistoryTemp}'
                    },
                    columns: [
                        {text: 'Updated On', flex: 1,renderer:function(value)
                        {
                            return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(value, 'm/d/Y')
                        }, dataIndex: 'updatedOn'},
                        {text: 'Updated By', flex: 1, dataIndex: 'updatedBy'},
                        {text: 'License State Code', flex: 1, dataIndex: 'LicenseStateCode'},
                        {text: 'License Number', flex: 1, dataIndex: 'stateLicenseNumber'},
                        {
                            text: 'Expiration Date',
                            flex: 1,
                            formatter: 'date("m/d/Y")',
                            dataIndex: 'stateLicenseExpDate'
                        },
                        {
                            text: 'Verification Date',
                            flex: 1,
                            formatter: 'date("m/d/Y")',
                            dataIndex: 'stateLicenseVerfDate'
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    text: 'NCPDP Source Data',
                    handler: 'doShowNcpdpSoueceData'
                },
                {
                    text: 'Add License',
                    handler: 'doAddStateLicense'
                },
                {
                    text: 'Delete License',
                    handler: 'doDeleteStateLicense'
                }
            ]
        }
    ]
});