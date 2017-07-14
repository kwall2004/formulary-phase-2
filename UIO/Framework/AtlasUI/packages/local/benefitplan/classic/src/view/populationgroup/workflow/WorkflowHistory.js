/**
 * Created by j2560 on 10/25/2016.
 */
Ext.define('Atlas.benefitplan.view.populationgroup.workflow.WorkflowHistory', {
    extend: 'Ext.panel.Panel',
    title: 'Population Group Benefit Package Workflow - History',
    xtype: 'benefitplanworkflowhistory',
    controller: 'benefitplanworkflowhistory',
    atlasId: 0,
    viewModel: {
        data: {
            isGridSelection: false,
            isDataToFilter: false,
            ReadOnlyNotes: true,
            validForm: false,
            SaveEnabled: false

        },
        stores: {
            workflowhistory: {
                model: 'Atlas.benefitplan.model.workflow.History'
            },
            workflow: {
                model: 'Atlas.benefitplan.model.workflow.PGBWorkflow'
            },
            statusnotes: {
                model: 'Atlas.benefitplan.model.workflow.StatusNotes'
            }
        }
    },
    items: [{
        xtype: 'grid',
        width: '100%',
        reference: 'workflowhistorygrid',
        bind: '{workflowhistory}',
        viewConfig: {
            loadMask: false
        },
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                text: 'Clear Filters',
                handler: 'onClearFilters',
                bind: {
                    disabled: '{!isDataToFilter}'
                }
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
                xtype: 'button',
                text: 'Back to Workflow',
                handler: 'onBack'
            }]
        }],
        columns: [{
            text: 'Action',
            dataIndex: 'Action',
            flex: 1
        }, {
            text: 'Action Date',
            dataIndex: 'ActionDate',
            renderer: Ext.util.Format.dateRenderer(),
            flex: 1
        }, {
            text: 'Submitting User',
            dataIndex: 'SubmittingUser',
            flex: 1
        }],
        listeners: {
            select: 'onHistoryItemSelection'
        }

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
            reference: 'workflowhistorynotesgrid',
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