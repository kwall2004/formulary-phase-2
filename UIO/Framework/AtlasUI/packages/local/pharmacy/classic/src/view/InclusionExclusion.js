/**
 * Created by rsalekin on 11/22/2016.
 */
Ext.define('Atlas.pharmacy.view.InclusionExclusion', {
    extend: 'Ext.panel.Panel',
    xtype: 'pharmacy-inclusionexclusion',
    controller: 'inclusionexclusion',
    viewModel: 'inclusionexclusion',
    title: 'Pharmacy Contracts',
    width: '100%',
    height: '100%',
    layout: 'hbox',
    items: [
        {

            xtype: 'grid',
            itemId: 'gridIncluded',
            flex: 4.9,
            width: '100%',
            height: '100%',
            overflowY: true,
            title: 'Included Pharmacies',
            tbar: [
                {
                    xtype: 'button',
                    text: 'Export to Excel',
                    iconCls: 'fa fa-file-excel-o',
                    handler: 'exportToExcel',
                    params: {
                        storeToExport: 'storeInclude',
                        excludedColumns: 'address2,contractID,rowNum,ExclReason'
                    }
                }
            ],
            columns: [
                {text: 'NCPDP', dataIndex: 'ncpdpId', flex: 1, filter: {type: 'string'}},
                {text: 'Pharmacy Name', dataIndex: 'PharmacyName', flex: 1, filter: {type: 'string'}},
                {text: 'Address', dataIndex: 'Address', flex: 1, filter: {type: 'string'}},
                {text: 'City', dataIndex: 'city', flex: 1, filter: {type: 'string'}},
                {text: 'State', dataIndex: 'state', flex: 1, filter: {type: 'string'}},
                {text: 'Zip', dataIndex: 'zip', flex: 1, filter: {type: 'string'}}
            ],
            bind: '{storeInclude}',
            selModel: {
                mode: 'MULTI'
            },
            dockedItems: [{
                dock: 'bottom',
                xtype: 'pagingtoolbar',
                displayInfo: true
            }],
            plugins: [
                {
                    ptype: 'gridfilters'
                },
                {
                    ptype: 'gridexporter'
                }
            ]
        },
        {
            xtype: 'form',
            flex: 0.2,
            width: '100%',
            height: '100%',
            layout: 'vbox',
            items: [
                {
                    xtype: 'panel',
                    flex: 4.5,
                    width: '100%',
                    height: '100%'
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'btnExclusion',
                            text: '',
                            flex: 1,
                            width: '100%',
                            height: '100%',
                            iconCls: 'fa fa-arrow-right',
                            handler: 'reasonForExclusion',
                            tooltip: 'Exclude Selected Pharmacy'
                        }, {
                            xtype: 'button',
                            itemId: 'btnInclusion',
                            text: '',
                            flex: 1,
                            width: '100%',
                            height: '100%',
                            iconCls: 'fa fa-arrow-left',
                            handler: 'btnInclusion_Click',
                            tooltip: 'Include Selected Pharmacy'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    flex: 4.5,
                    width: '100%',
                    height: '100%'
                }
            ]
        },
        {
            xtype: 'grid',
            itemId: 'gridExcluded',
            flex: 4.9,
            width: '100%',
            height: '100%',
            title: 'Excluded Pharmacies',
            tbar: [
                {
                    xtype: 'button',
                    text: 'Export to Excel',
                    iconCls: 'fa fa-file-excel-o',
                    handler: 'exportToExcel',
                    params: {
                        storeToExport: 'storeExclude',
                        excludedColumns: 'address2,contractID,rowNum'
                    }
                },
                '->',
                {
                    xtype: 'button',
                    itemId: 'btnPharmacyExclusionRules',
                    text: 'Pharmacy Exclusion Rules',
                    handler: 'btnPharmacyExclusionRules_Click'
                }
            ],
            columns: [
                {text: 'NCPDP', dataIndex: 'ncpdpId', flex: 1, filter: {type: 'string'}},
                {text: 'Pharmacy Name', dataIndex: 'PharmacyName', flex: 1, filter: {type: 'string'}},
                {text: 'Address', dataIndex: 'Address', flex: 1, filter: {type: 'string'}},
                {text: 'City', dataIndex: 'city', flex: 1, filter: {type: 'string'}},
                {text: 'State', dataIndex: 'state', flex: 1, filter: {type: 'string'}},
                {text: 'Zip', dataIndex: 'zip', flex: 1, filter: {type: 'string'}},
                {text: 'Reason For Exclusion', dataIndex: 'ExclReason', flex: 1}
            ],
            selModel: {
                mode: 'MULTI'
            },
            bind: '{storeExclude}',
            dockedItems: [{
                dock: 'bottom',
                xtype: 'pagingtoolbar',
                displayInfo: true
            }],
            plugins: [
                {
                    ptype: 'gridfilters'
                },
                {
                    ptype: 'gridexporter'
                }
            ]
        }
    ]
});
