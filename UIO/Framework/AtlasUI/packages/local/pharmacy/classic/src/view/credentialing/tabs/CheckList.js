/**
 * This Class representh the Check List Tab of the Pharmacy Credentialing Module
 */
Ext.define('Atlas.pharmacy.view.credentialing.tabs.CheckList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pharmacy-checklist',
    layout: 'fit',
    items: [
        {
            xtype: 'panel',
            title: 'Credential CheckList',
            flex: 1,
            layout: 'fit',
            items: [
                {
                    xtype: 'grid',
                    itemId:'gdchecklist',
                    margin: 20,
                    bind: {
                        store: '{pharmcredchecklist}'
                    },
                    plugins : [
                        {
                            ptype : 'rowediting',
                            clicksToEdit : 2,
                            listeners: {
                                'edit': 'gdchecklist_afteredit'
                            }
                        }
                        ],
                    listeners: {
                        beforeedit: 'gdchecklist_beforeedit',
                        edit : 'onEdit'
                    },
                    columns: [
                        {
                            text: 'Sub Task', flex: 1, dataIndex: 'SubTaskDesc',
                            renderer: 'columnsubtaskrender'
                        },
                        {
                            text: 'Completed Status', flex: 1, dataIndex: 'CompleteStatus', flex: 1,
                            editor : {
                            xtype : 'combo',
                                displayField : 'name',
                                valueField : 'value',
                                allowBlank:false,
                                bind : {
                                    store : '{yesnona}'
                                }
                            },
                            renderer: 'columnsubtaskrender'
                        },
                        {
                            text: 'Completed Date', flex: 1, dataIndex: 'CompleteDate', flex: 1, renderer : Ext.util.Format.dateRenderer('m/d/Y'),
                            editor :{
                                xtype : 'datefield', format:'m/d/Y'
                            },
                            renderer: 'columnsubtaskdatetimerender'
                        },
                        {
                            text: 'Completed By', flex: 1, dataIndex: 'UserName',
                            renderer: 'columnsubtaskrender'
                        },
                        {
                            xtype: 'widgetcolumn',
                            align: 'center',
                            width: 100,
                            hideable : false,
                            flex:0,
                            widget: {
                                xtype: 'container',
                                bind: true,
                                defaults: {
                                    xtype: 'tool',
                                    viewModel: true
                                },
                                items: [
                                    // reject tool
                                    {
                                        xtype: 'button',
                                        text: 'Reject',
                                        width: 75,
                                        iconCls: 'x-action-col-icon x-fa fa-undo',
                                        bind: {
                                            hidden: '{!record.isNeedUpdate}',
                                            tooltip: 'Reject '
                                        },
                                        handler: 'onUndoChangeClick'
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    text: 'Send Missing Information Letter',
                    itemId:"btnchecklistSendMissingLetter",
                    handler: 'doSendMissingLetter',
                    bind: {
                        disabled: '{!canSendMissingLetter}'
                    }
                },
                '->',
                {
                    text: 'Save',
                    itemId:"btnchecklistsave",
                    disabled:true,
                    handler: 'doSaveChecklist'
                }
            ]
        }
    ]
});