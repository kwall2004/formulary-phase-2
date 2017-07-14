/**
 * Created by akumar on 11/30/2016.
 */
Ext.define('Atlas.common.view.sharedviews.AuditTrail', {
    xtype: 'sharedviews-AuditTrail',

    extend: 'Ext.window.Window',
    viewModel: 'AuditTrailModel',
    controller: 'AuditTrailController',
    iconCls: 'icon-contactlog,8',
    width: 550,
    height: 450,
    modal: true,
    layout: {
        type: 'fit',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'panel',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            flex: 1,
            items: [
                {
                    xtype: 'grid',
                    itemId: 'auditMasterGrid',
                    flex: 5,
                    title: 'Change History',
                    bind: {
                        store: '{AuditMaster}'
                    },
                    listeners: {
                        itemclick: 'refreshAuditChange'
                    },
                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                text: 'Action',
                                dataIndex: 'action'
                            },
                            {
                                xtype: 'datecolumn',
                                text: 'Audit Date',
                                dataIndex: 'auditDate',
                                format: 'm/d/Y'
                            },
                            {
                                text: 'Modified By',
                                dataIndex: 'userName'
                            },
                            {
                                text: 'Source',
                                dataIndex: 'src'
                            },
                            {
                                text: 'AuditGUID',
                                dataIndex: 'AuditGUID',
                                hidden: true
                            },
                            {
                                text: 'SystemID',
                                dataIndex: 'systemId',
                                hidden: true
                            }
                        ]
                    }
                },
                {
                    xtype: 'grid',
                    itemId: 'auditChangeGrid',
                    flex: 5,
                    title: 'Fields Changed',
                    bind: {
                        store: '{AuditChange}'
                    },
                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                text: 'Field Name',
                                dataIndex: 'fieldName'
                            },
                            {
                                text: 'Old Value',
                                dataIndex: 'oldValue'
                            },
                            {
                                text: 'New Value',
                                dataIndex: 'newValue'
                            }
                        ]
                    }

                }
            ]
        }
    ]

});