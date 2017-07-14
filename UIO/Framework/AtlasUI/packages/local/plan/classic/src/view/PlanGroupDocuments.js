/**
 * Created by d3973 on 11/4/2016.
 */
Ext.define('Atlas.plan.view.PlanGroupDocuments', {
    //extend: 'Ext.Container',
    extend: 'Ext.panel.Panel',
    controller: 'planplangroupdocumentscontroller',
    viewModel: 'planplangroupdocumentsviewmodel',
    itemId: 'planPlanGroupDocuments',

    layout: 'vbox',
    items: [{
        xtype: 'container',
        layout: 'hbox',
        width: '100%',
        flex: 1,
        items: [{
            title: 'Plan Group Hierarchy',
            xtype: 'gridpanel',
            flex: 1,
            height: '100%',
            listeners: {
                select: 'selectPlanGroupHierarchy'
            },
            bind: {
                store: '{planGroupHierarchy}'
            },
            dockedItems: [{
                dock: 'bottom',
                xtype: 'pagingtoolbar',
                displayInfo: true
            }],
            columns: [{
                text: 'Carrier',
                dataIndex: 'carrierName',
                flex: 1
            }, {
                text: 'Account',
                dataIndex: 'AccountName',
                flex: 1
            }, {
                text: 'LOB',
                dataIndex: 'LOBName',
                flex: 1
            }]
        }, {
            title: 'Document Setup',
            xtype: 'gridpanel',
            flex: 1,
            height: '100%',
            bind: {
                store: '{documentXRefPlanGroup}'
            },
            listeners: {
                select: 'selectDocSetup'
            },
            plugins: [{
                ptype: 'rowediting',
                triggeredEvent: 'celldblclick',
                removeUnmodified: true,
                listeners: {
                    beforeedit: 'beforeEdit',
                    edit: 'editRow',
                    canceledit: 'cancelEdit'
                }
            }],
            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                items: [{
                    xtype: 'button',
                    text: 'Add',
                    iconCls: 'x-fa fa-plus-circle',
                    disabled: true,
                    listeners: {
                        click: 'addDocSetup'
                    }
                }, {
                    xtype: 'tbseparator'
                }, {
                    xtype: 'button',
                    text: 'Remove',
                    iconCls: 'x-fa fa-minus-circle',
                    disabled: true,
                    listeners: {
                        click: 'removeDocSetup'
                    }
                },
                '->',
                {
                    xtype: 'displayfield',
                    itemId: 'lblSelectedPlanGroup'
                }]
            }, {
                dock: 'bottom',
                xtype: 'pagingtoolbar',
                displayInfo: true,
                items: [
                '->',
                {
                    xtype: 'button',
                    text: 'Save',
                    iconCls: 'x-fa fa-floppy-o',
                    disabled: true,
                    listeners: {
                        click: 'saveDocSetup'
                    }
                }]
            }],
            columns: [{
                text: 'Hierarchy System Id',
                hidden: true,
                dataIndex: 'PGHierarchySystemId',
                flex: 4
            }, {
                text: 'Member Doc ?',
                dataIndex: 'memberDoc',
                flex: 2,
                xtype: 'booleancolumn',
                trueText: 'Yes',
                falseText: 'No',
                origVal: null,
                editor: {
                    xtype: 'checkbox'
                }
            }, {
                text: 'Prescriber Doc ?',
                dataIndex: 'prescriberDoc',
                flex: 2,
                xtype: 'booleancolumn',
                trueText: 'Yes',
                falseText: 'No',
                editor: {
                    xtype: 'checkbox'
                }
            }, {
                text: 'Pharmacy Doc ?',
                dataIndex: 'pharmacyDoc',
                flex: 2,
                xtype: 'booleancolumn',
                trueText: 'Yes',
                falseText: 'No',
                editor: {
                    xtype: 'checkbox'
                }
            }, {
                text: 'Other Doc ?',
                dataIndex: 'otherDoc',
                flex: 2,
                xtype: 'booleancolumn',
                trueText: 'Yes',
                falseText: 'No',
                editor: {
                    xtype: 'checkbox'
                }
            }, {
                text: 'Active ?',
                dataIndex: 'active',
                flex: 2,
                xtype: 'booleancolumn',
                trueText: 'Yes',
                falseText: 'No',
                editor: {
                    xtype: 'checkbox'
                }
            },{
                xtype: 'widgetcolumn',
                align: 'center',
                hideable: false,
                widget: {
                    xtype: 'button',
                    width:75,
                    text: 'Reject',
                    iconCls: 'x-fa fa-refresh',
                    bind: {

                        tooltip: 'Reject '
                    },
                    handler: 'onBtnReject'

                },
                onWidgetAttach: function(col, widget, rec) {

                    widget.setVisible(rec.get('isUpdated'));
                    col.mon(col.up('gridpanel').getView(), {
                        itemupdate: function() {
                            widget.setVisible(rec.get('isUpdated'));
                        }
                    });
                }

            }]
        }]
    }, {
        xtype: 'gridpanel',
        title: 'Attachments',
        width: '100%',
        flex: 1,
        bind: {
            store: '{faxHistory}'
        },
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                text: 'Add Attachment',
                iconCls: 'x-fa fa-plus-circle',
                disabled: true,
                listeners: {
                    click: 'addAttachmentWindow'
                }
            }, {
                xtype: 'tbseparator'
            }]
        }],
        columns: [{
            text: 'View',
            flex: 5,
            xtype: 'widgetcolumn',
            widget: {
                xtype: 'button',
                iconCls: 'x-fa fa-paperclip',
                listeners: {
                    click: 'viewDocument'
                },
                maxWidth: 75
            }
        }, {
            text: 'Doc ID',
            hidden: true,
            flex: 10,
            dataIndex: 'DocumentID'
        }, {
            text: 'Description',
            flex: 20,
            dataIndex: 'DESCRIPTION'
        }, {
            text: 'Document Type',
            flex: 15,
            dataIndex: 'inOut'
        }, {
            text: 'Attachment Date',
            xtype: 'datecolumn',
            flex: 15,
            dataIndex: 'faxDate',
            format:'m-d-Y g:i:s A'
        }, {
            text: 'Fax Number',
            flex: 15,
            hidden: true,
            dataIndex: 'FaxNumber'
        }, {
            text: 'Send By',
            hidden: true,
            flex: 15,
            dataIndex: 'SubmittedBy'
        }, {
            text: 'Delete',
            flex: 5,
            xtype: 'widgetcolumn',
            widget: {
                xtype: 'button',
                iconCls: 'x-fa fa-minus-circle',
                listeners: {
                    click: 'removeAttachment'
                },
                width: 75
            }
        }]
    }]
});