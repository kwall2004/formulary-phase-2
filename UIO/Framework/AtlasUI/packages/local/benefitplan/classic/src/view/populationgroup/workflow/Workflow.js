/**
 * Created by j2560 on 10/25/2016.
 */
Ext.define('Atlas.benefitplan.view.populationgroup.workflow.Workflow', {
    extend: 'Ext.panel.Panel',
    title: 'Population Group Benefit Package Workflow',
    controller: 'benefitplanworkflow',
    atlasId: 0,
    autoScroll:true,
    listeners: {
        beforeClose: 'checkForUnsavedRecords'
    },
    viewModel: {
        data: {
            isGridSelection: false,
            ApproveButtonHidden: false,
            RejectButtonHidden: false,
            ReadOnlyNotes: true,
            SaveEnabled: false

        },
        stores: {
            workflow: {
                model: 'Atlas.benefitplan.model.workflow.PGBWorkflow'
            },
            statusnotes: {
                model: 'Atlas.benefitplan.model.workflow.StatusNotes'
            }
        }
    },
    items: [
        {
            xtype:'form',
            title: 'Workflow',
            titleAlign: 'center'
        },{
        xtype: 'tabpanel',
        activeTab: 0,
        reference: 'workflowtabs',
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                text: 'Clear Filters',
                handler: 'onClearFilters'
            }, {
                xtype: 'datefield',
                text: 'From',
                reference: 'dateFromFilterField',
                listeners: {
                change: 'onDateFilterChange'
                }
            }, {
                xtype: 'datefield',
                text: 'To',
                reference: 'dateToFilterField',
                listeners: {
                    change: 'onDateFilterChange'
                }
            }, {
                text: 'Workflow History',
                handler: 'onWorkflowHistory',
                bind: {
                    disabled: '{!isGridSelection}'
                }
            }, '->', {
                text: 'Reject',
                handler: 'onReject',
                bind: {
                    disabled: '{!isGridSelection}',
                    hidden: '{RejectButtonHidden}'
                }
            }, {
                text: 'Approve',
                handler: 'onApprove',
                bind: {
                    disabled: '{!isGridSelection}',
                    hidden: '{ApproveButtonHidden}'
                }
            }]
        }],
        listeners: {
            tabchange: 'onStatusChange'
        },
        items: [{
            title: 'Pending',
            status: 2,
            xtype: 'bpWorkflowStatusGrid',
            listeners: {
                select: 'onGridSelection'
            }
        }, {
            title: 'Level 1 Approval',
            status: 3,
            xtype: 'bpWorkflowStatusGrid',
            listeners: {
                select: 'onGridSelection'
            }
        }, {
            title: 'Approved',
            status: 4,
            xtype: 'bpWorkflowStatusGrid',
            listeners: {
                select: 'onGridSelection'
            }
        }, {
            title: 'Rejected',
            status: 5,
            xtype: 'bpWorkflowStatusGrid',
            listeners: {
                select: 'onGridSelection'
            }
        }]
    }, {
        xtype: 'form',
        layout: 'hbox',
        defaults: {
            width: '50%'
        },
        items: [{
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                width: '100%'
            },
            items: [{
                xtype: 'fieldset',
                flex: 1,
                title: 'Note Subject',
                allowBlank: false,
                items: [{
                    xtype: 'textfield',
                    reference: 'noteSubject',
                    width: '100%',
                    allowBlank:false,
                    bind: {
                        disabled: '{ReadOnlyNotes}'
                    },
                    listeners: {
                        enable: 'onNoteSubjectEnabled',
                        change: 'onNoteTextChange'
                    }
                }]
            }, {
                xtype: 'fieldset',
                flex: 2,
                title: 'Note Detail',
                allowBlank: false,
                items: [{
                    xtype: 'textfield',
                    reference: 'noteDetail',
                    width: '100%',
                    allowBlank:false,
                    bind: {
                        disabled: '{ReadOnlyNotes}'
                    },
                    listeners: {
                        change: 'onNoteTextChange'
                    }
                }]
            }]
        }, {
            xtype: 'grid',
            reference: 'workflownotesgrid',
            bind: '{statusnotes}',
            listeners: {
                select: 'onNoteSelection'
            },
            viewConfig: {
                loadMask: false
            },
            columns: [{
                text: 'User',
                dataIndex: 'User',
                flex: 1
            }, {
                text: 'Subject',
                dataIndex: 'NoteSubject',
                flex: 1
            }, {
                xtype: 'datecolumn',
                format: 'n/j/Y g:i:sA',
                text: 'Date Created',
                dataIndex: 'DateCreated',
                flex: 1
            }]
        }]
    }],
    bbar: [
        {
            text: 'Add Note',
            handler: 'onAddNote',
            bind: {
                disabled: '{!isGridSelection}'
            }
        },
        '->',
        {
            text: 'Cancel',
            handler: 'onCancel',
            bind: {
                disabled: '{ReadOnlyNotes}'
            }
        }, {
            text: 'Save',
            handler: 'onSave',
            bind: {
                disabled: '{!SaveEnabled}'
            }
        }
    ]
});