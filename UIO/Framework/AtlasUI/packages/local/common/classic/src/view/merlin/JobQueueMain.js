/**
 * Job Queue popup
 * Created by g2304 on 11/4/2016.
 */
Ext.define('Atlas.common.view.merlin.JobQueueMain', {
    extend: 'Ext.window.Window',
    controller: 'jobqueuemain',
    viewModel: 'jobqueuemain',
    title: 'Job Queue',
    itemId : 'jobqueuemain',
    iconCls: 'x-fa fa-print',
    width: 900,
    height: 600,
    maximizable: true,
    collapsible: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    modal: false,
    autoShow: false,
    xtype: 'merlin-jobqueuemain',

    bbar: [
        {
            xtype: 'pagingtoolbar', displayInfo: true, bind: {store: '{jobQueueList}'}
        }
    ],

    items: [
        {
            xtype: 'fieldset',
            title: 'Fill the form and click on search button',
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combobox',
                            labelWidth: 80,
                            fieldLabel: 'Job Status',
                            bind: {store: '{jobStatus}', value: '{jobStatusValue}'},
                            displayField: 'name',
                            valueField: 'name',
                            queryMode: 'local'
                        },
                        {
                            xtype: 'datefield',
                            labelWidth: 120,
                            fieldLabel: 'Submit Date From',
                            bind: {value: '{submitDateFrom}'},
                            maxValue: new Date(),
                            format: 'm/d/Y',
                            altFormats: 'm/d/Y',
                            listeners: {
                                focusleave: 'onLeaveDateRange'
                            }
                        },
                        {
                            xtype: 'combobox',
                            labelWidth: 90,
                            fieldLabel: 'Submitted by',
                            displayField: 'userName',
                            valueField: 'userName',
                            queryMode: 'local',
                            itemId: 'submittedBy',
                            forceSelection:true,
                            allowBlank:false,
                            listeners:{
                                blur:function(combo){
                                    // debugger;
                                    var vm = combo.up('window').getViewModel();
                                    if(!combo.selection && combo.lastSelectedRecords)
                                    {                                        // debugger;
                                        combo.setSelection(combo.lastSelectedRecords[0]);
                                        vm.selectedUser = combo.lastSelectedRecords[0];
                                    }
                                    else if(!combo.selection && !combo.lastSelectedRecords && vm.selectedUser)
                                    {
                                        combo.setSelection(vm.selectedUser[0]);
                                    }
                                }
                            },
                            bind: {store: '{userList}', value: '{userName}'}
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combobox',
                            labelWidth: 80,
                            fieldLabel: 'Fax Type',
                            store: ['All', 'In', 'Out'],
                            bind: {value: '{faxType}'}
                        },
                        {
                            xtype: 'datefield',
                            labelWidth: 120,
                            fieldLabel: 'Submit Date To',
                            bind: {value: '{submitDateTo}'},
                            format: 'm/d/Y',
                            altFormats: 'm/d/Y',
                            listeners: {
                                focusleave: 'onLeaveDateRange'
                            }
                        },
                        {
                            xtype: 'textfield',
                            labelWidth: 90,
                            fieldLabel: 'Description',
                            emptyText: '*Description/Report Name/Fax Number',
                            bind: {value: '{description}'}
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'radiogroup',
                            fieldLabel: 'Show',
                            labelWidth: 80,
                            items: [
                                {
                                    xtype: 'radio',
                                    name: 'qShow',
                                    itemId: 'showAll',
                                    boxLabel: 'All',
                                    checked: true,
                                    handler: 'onShowAllChecked'
                                },
                                {
                                    xtype: 'radio',
                                    name: 'qShow',
                                    itemId: 'showReport',
                                    boxLabel: 'Report',
                                    handler: 'onShowReportChecked'
                                },
                                {
                                    xtype: 'radio',
                                    name: 'qShow',
                                    itemId: 'showFax',
                                    boxLabel: 'Fax',
                                    handler: 'onShowFaxChecked'
                                }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Sort',
                            labelAlign: 'right',
                            labelWidth: 118,
                            displayField: 'text',
                            valueField: 'value',
                            queryMode: 'local',
                            bind: {value: '{sortBy}', store: '{jobSortBy}'}
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            text: 'Search',
                            handler: 'onSearchJobQueue'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'grid',
            itemId: 'jobQueueGrid',
            bind: {store: '{jobQueueList}'},
            flex: 1, defaults: {width: 70},
            columns: [
                {
                    xtype: 'widgetcolumn', width: 70, hideable: false,
                    widget: {
                        xtype: 'button',
                        text:'Print',
                        iconCls: 'x-fa fa-print',
                        handler: 'onPrintClick'
                    },
                    onWidgetAttach: function(col, widget, rec) {
                        widget.setDisabled(rec.get('documentID') == 0);
                    }
                },
                {
                    xtype: 'widgetcolumn', width: 80, hideable: false,
                    widget: {
                        xtype: 'button',
                        text: 'Resend fax',
                        iconCls: 'x-fa fa-fax ',
                        handler: 'onFaxClick'
                    },
                    //Correct way of setting widget status
                    onWidgetAttach: function(col, widget, rec) {
                        widget.setDisabled(rec.get('jobType') != 'Fax' || rec.get('documentID') == 0);
                    }
                },
                {
                    xtype: 'widgetcolumn', width: 70, hideable: false,
                    widget: {
                        xtype: 'button',
                        text: 'Delete',
                        iconCls: 'x-fa fa-eraser ',
                        handler:'onDeleteClick'
                    }
                },
                {text: 'Job #', dataIndex: 'jobNum', hidden: true, sortable: false},
                {text: 'Description', dataIndex: 'description', width:260, sortable: false},
                {text: 'Program', dataIndex: 'programName', hidden: true, sortable: false},
                {text: 'Status', dataIndex: 'jobStatus', sortable: false},
                {text: 'Status Desc', dataIndex: 'statusDescription', sortable: false},
                {text: 'Job Type', dataIndex: 'jobType', sortable: false},
                {text: 'Doc ID', dataIndex: 'documentID', hidden: true, sortable: false},
                {text: 'Fax Number', dataIndex: 'faxNumber', sortable: false},
                {
                    xtype: 'datecolumn', format: 'm/d/Y h:i:s A',
                    text: 'Submit Time', dataIndex: 'submitDateTime', sortable: false,
                    renderer:'localizeDateTime'
                },
                {
                    xtype: 'datecolumn', format: 'm/d/Y h:i:s A',
                    text: 'Start Time', dataIndex: 'startDateTime', sortable: false,
                    renderer:'localizeDateTime'
                },
                {
                    xtype: 'datecolumn', format: 'm/d/Y h:i:s A',
                    text: 'End Time', dataIndex: 'endDateTime', sortable: false,
                    renderer:'localizeDateTime'
                },
                {text: 'Submitted By', dataIndex: 'submittedBy', hidden: true, sortable: false},
                {
                    xtype: 'datecolumn', format: 'm/d/Y H:i:s', sortable: false,
                    text: 'Scheduled Time', dataIndex: 'schedStartDate', hidden: true
                }
            ]
        }

    ]

});