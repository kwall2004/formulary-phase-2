/**
 * Created by Sheeloo Sachan on 12/7/2016.
 */

Ext.define('Atlas.admin.view.AuditHistory', {
    extend: 'Ext.panel.Panel',
    xtype: 'AuditHistory',
    title: 'Audit History',
    region: 'center',
    controller: 'AuditHistoryController',
    viewModel: 'AuditHistoryViewModel',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'panel',
            collapsible: true,
            title : 'Audit History',
            collapseToolText: 'Search',
            items: [
                {
                    xtype: 'form',
                    itemId: 'frmSet',
                    items: [
                        {
                            xtype: 'fieldset',
                            iconCls: 'x-fa fa-search',
                            title: 'Filter Criteria',
                            defaults: {
                                margin: 10
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cbxTables',
                                            fieldLabel: 'Select Table',
                                            emptyText: 'Select Table',
                                            bind: {
                                                store: '{TableStore}'
                                            },
                                            displayField: 'TableName',
                                            valueField: 'TableName',
                                            queryMode: 'local',
                                            flex: 1,
                                            listeners: {
                                                select: 'OnChangeTable'
                                            }

                                        },

                                        {

                                            height: 200,
                                            xtype: 'multiselect',
                                            flex: 1,
                                            msgTarget: 'side',
                                            fieldLabel: 'Select Columns',
                                            itemId: 'msColumns',
                                            valueField: 'FieldName',
                                            displayField: 'FieldName',
                                            bind: {store: '{ColumnStore}'}

                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            fieldLabel: 'Where',
                                            name: 'Where',
                                            xtype: 'textfield',
                                            itemId: 'txtWhere',
                                            allowBlank : false,
                                            flex: 1
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Get Result',
                                            iconCls: 'x-fa fa-search',
                                            scale: 'small',
                                            align: 'right',
                                            listeners: {
                                                click: 'SearchOnClick'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype : 'displayfield',
                                    fieldLabel: '',
                                    itemId : 'lblMessage',
                                    userCls: 'm-red-color-displayfield'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'grid',
            flex: 1,
            title : 'Details',
            extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
            itemId: 'grdAuditHistory',
            viewModel: {
                type: 'common-shared-editgridmodel'
            },
            bind: {
                store: '{AuditHistoryStore}'
            },
            dockedItems: [],
            listeners: {
                rowclick: 'grdHistoryRowClick'
            }
        }
    ]
});

