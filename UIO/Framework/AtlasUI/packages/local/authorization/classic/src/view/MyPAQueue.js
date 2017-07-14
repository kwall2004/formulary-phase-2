/*
 * Last Developer: Sheeloo Sachan
 * Date: 2016-11-17
 * Previous Developers: []
 * Origin: Merlin - Authorization
 * Description: Gives users a place to view their prior authorizatoin queue
 */
Ext.define('Atlas.authorization.view.MyPAQueue', {
    extend: 'Ext.panel.Panel',
    xtype: 'authorization-mypaqueue',
    region: 'center',
    controller: 'MyPAQueueController',
    viewModel: 'MyPAQueueViewModel',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    title: 'My PA Queue',
    items: [
        {
            xtype: 'form',
            itemId: 'frmSet',
            items: [
                {
                    xtype: 'fieldset',
                    iconCls: 'fa fa-search',
                    title: 'Advanced Filter',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combobox',
                                    itemId: 'cbxPAstatus',
                                    name: 'AppealType',
                                    fieldLabel: 'My Auth Queue',
                                    emptyText: 'Select a status...',
                                    displayField: 'ListDescription',
                                    valueField: 'ListItem',
                                    forceSelection: true,
                                    queryMode: 'local',
                                    labelWidth: 150,
                                    multiSelect: true,
                                    width: 400,
                                    listConfig: {
                                        getInnerTpl: function (displayField) {
                                            return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {ListDescription} </div>';
                                        }

                                    }
                                    ,bind: {
                                    store: '{ListMaintenanceModelStore}'
                                }
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cbxUrgencyType',
                                    name: 'UrgencyType',
                                    fieldLabel: 'Urgency Type',
                                    emptyText: 'Select Urgency Type',
                                    displayField: 'ListDescription',
                                    valueField: 'ListItem',
                                    forceSelection: true,
                                    queryMode: 'local',
                                    multiSelect: true,
                                    listConfig: {
                                        getInnerTpl: function (displayField) {
                                            return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {ListDescription} </div>';
                                        }
                                    },
                                    bind: {
                                        store: '{UrgencyListDetailStore}'
                                    },
                                    labelWidth: 150,
                                    width: 400
                                }, {
                                    xtype: 'button',
                                    text: 'Search',
                                    style: {
                                        margin: '0px 0px 0px 20px! important'
                                    },
                                    iconCls: 'fa fa-search',
                                    scale: 'small',
                                    width: 90,
                                    listeners: {
                                        click: 'SearchOnClick'
                                    }
                                }]


                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combobox',
                                    itemId: 'cbxHrsWaiting',
                                    fieldLabel: 'Hours Waiting Process:',
                                    emptyText: 'Select Hrs.',
                                    name: 'hoursWaitingProcess',
                                    displayField: 'ListDescription',
                                    valueField: 'ListItem',
                                    forceSelection: true,
                                    queryMode: 'local',
                                    bind: {
                                        store: '{PriorAuthHoursDetailStore}'
                                    },
                                    labelWidth: 150,
                                    width: 400
                                }
                                , {

                                    xtype: 'combobox',
                                    itemId: 'cbxDeterminationType',
                                    fieldLabel: 'Determination Type:',
                                    emptyText: 'Select Determination Type',
                                    name: 'determinationType',
                                    displayField: 'ListDescription',
                                    valueField: 'ListItem',
                                    forceSelection: true,
                                    queryMode: 'local',
                                    bind: {
                                        store: '{DeterminListDetailStore}'
                                    },
                                    labelWidth: 150,
                                    width: 400

                                },
                                {
                                    xtype: 'button',
                                    text: 'Reset  ',
                                    style: {
                                        margin: '0px 0px 0px 20px! important'
                                    },
                                    iconCls: 'x-fa  fa-refresh',
                                    scale: 'small',
                                    width: 90,
                                    listeners: {
                                        click: 'ResetOnClick'
                                    }
                                },
                                {   xtype: 'button',
                                    text: 'Export to Excel',
                                    iconCls: 'x-fa fa-file-excel-o',
                                    handler:'btnExportToExcel',
                                    style: {
                                        margin: '0px 0px 0px 20px! important'
                                    }
                                }
                            ]
                        }

                    ]
                }
            ]
        },
        {
            xtype: 'grid',
            flex: 8,
            title: 'My Prior Auth Queue',
            extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
            itemId: 'grdPriorAuthItems',
            viewModel: {
                type: 'common-shared-editgridmodel'

            },
            listeners:{
                itemmouseenter: function(view, record, item, index, e, options)
                {
                    if (record.getData().Notes != '') {
                        Ext.fly(item).set({'data-qtip': Ext.Date.format(record.getData().NoteDate, 'm/d/Y') + ' - ' + record.getData().Notes});
                    }
                }
            },
            bind: {
                store: '{PriorAuthInMyQueueStore}'
            },
            dockedItems: [ {
                dock: 'bottom',
                xtype: 'pagingtoolbar',
                displayInfo: true,
                pageSize: 18
            }],
            plugins: [
                {
                    ptype: 'gridexporter'
                },
                {
                    ptype: 'cellediting',
                    clicksToEdit: 2,
                    autoCancel: false
                }
            ],
            columns: [
                {
                    xtype: 'widgetcolumn',
                    width:40,
                    hideable : false,
                    widget: {
                        xtype: 'button',
                        text: '',
                        iconCls: 'fa fa-long-arrow-right',
                        handler: 'onClick'
                    }
                },
                {
                    text: 'Assign To', dataIndex: 'AssignTo', flex : 1,
                    editor: {
                        xtype: 'combobox',
                        allowBlank: false,
                        displayField: 'userName',
                        valueField: 'userName',
                        bind: {
                            store: '{AssignToUserStore}'
                        },
                        listeners: {
                            select: 'assignToSelect'
                        }

                    }
                },
                {
                    text: 'Auth ID', dataIndex: 'authID', flex : 1
                },
                {
                    text: 'Determination Type', dataIndex: 'DeterminationType', flex : 1
                },
                {
                    text: 'Source', dataIndex: 'SOURCE', flex : 1
                },
                {
                    text: 'MeridianRx ID', dataIndex: 'recipientID', flex : 1
                },
                {
                    text: 'PH Consult', dataIndex: 'PHConsult', flex : 1
                },
                {
                    text: 'Name', dataIndex: 'memberName', flex : 1
                },
                {
                    text: 'Carrier', dataIndex: 'CarrierName', flex : 1
                },
                {
                    text: 'Account', dataIndex: 'AccountName', flex : 1
                },
                {
                    text: 'LOB', dataIndex: 'LOBName', flex : 1
                },
                {
                    text: 'Medication', dataIndex: 'LN', flex : 1
                },
                {
                    text: 'Status', dataIndex: 'authStatus', flex : 1
                },
                {
                    text: 'Attempts', dataIndex: 'SSOutreachAttempts', flex : 1
                },

                {
                    text: 'HrsToFill', flex : 1,
                    dataIndex: 'HrsToProcess',
                    renderer: function (value, metaData, record, row, col, store, gridView) {
                        var item = record.data.HrsToProcess;

                        item = (item == '') ? '' : item;
                        if (item.indexOf('-') > -1) {
                            var cDisplay = item.indexOf('.') > -1 ? item.replace(".", ":") : item;
                            return '<SPAN style="COLOR: red">' + cDisplay + '</SPAN>'
                        }
                        else if (item.indexOf('Error') > -1){
                            return '';
                        }
                        else {
                            if (item.indexOf('AOR') > -1){item='999.00'}
                            return '<SPAN style="COLOR: green">' + item + '</SPAN>';
                        }
                    }
                },

                {
                    text: 'Urgency Type', dataIndex: 'UrgencyTypeDesc', flex : 1
                },
                {
                    xtype: 'datecolumn',
                    text: 'Due Date',
                    dataIndex: 'dueDate',
                    format: 'm/d/Y', flex : 1
                },
                {
                    text: 'Effective',
                    dataIndex: 'EffectiveDateTime', flex : 1
                },
                {
                    text: 'Term Date',
                    dataIndex: 'TermDateTime', flex : 1
                },
                {
                    xtype: 'datecolumn',
                    text: 'Note Date',
                    dataIndex: 'NoteDate',
                    format: 'm/d/Y', flex : 1
                },
                {
                    text: 'Notes', dataIndex: 'Notes', width:120
                }
            ]
        }
    ]
});