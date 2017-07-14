/**
 * Created by agupta on 9/8/2016.
 */
Ext.define('Atlas.authohrization.view.cdag.CDAGMainSearchWindow', {
    xtype: 'authorization-cdagmainsearchwindow',

    extend: 'Ext.window.Window',
    title: 'Prior Authorization Search Tool',
    controller: 'cdagmainsearchwindowcontroller',
    width: 800,
    height: 500,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            itemId: 'fpSearch',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        labelWidth: 80,
                        width: 350
                    },
                    items: [
                        {
                            xtype: 'membertypeahead',
                            itemId: 'winCbxMember',
                            fieldLabel: 'Member',
                            matchFieldWidth: false,
                            emptyText: '[e.g. John]',
                            forceSelection: true,
                            listeners: {
                                select: 'member_select'
                            }
                        },
                        {
                            xtype: 'prescribertypeahead',
                            itemId: 'winCbxPrescriber',
                            fieldLabel: 'Prescriber',
                            displayField: 'fullname',
                            forceSelection: true,
                            valueField: 'npi',
                            matchFieldWidth: false,
                            emptyText: '[e.g. Dr. Smith]',
                            listeners: {
                                select: 'prescriber_select'
                            }
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 80
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    itemId: 'winDtFrom',
                                    fieldLabel: 'Date Range',
                                    listeners: {
                                        select: 'validateDateRange',
                                        focusleave: 'validateDateRange'
                                    },
                                    maxText: "The Date in this Field must be on or before {0}",
                                    format: 'm/d/Y',
                                    altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                                    width: 210
                                },
                                {
                                    xtype: 'datefield',
                                    itemId: 'winDtTo',
                                    format: 'm/d/Y',
                                    altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                                    listeners: {
                                        select: 'validateDateRange',
                                        focusleave: 'validateDateRange'
                                    },
                                    minText: "The Date in this Field must be on or after {0}",
                                    width: 135
                                }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'winCbxAuthStatus',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            fieldLabel: 'Auth Status',
                            bind: {
                                store: '{storeauthstatus}'
                            },
                            emptyText: '[Select a status...]'
                        }

                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        labelWidth: 120,
                        width: 350
                    },
                    items: [
                        {
                            xtype: 'drugtypeahead',
                            itemId: 'winCbxNDC',
                            fieldLabel: 'NDC/Medication',
                            matchFieldWidth: false,
                            displayField: 'LN',
                            valueField: 'NDC',
                            emptyText: '[e.g. Nexium]',
                            listeners: {
                                select: 'NDC_select'
                            }
                        },
                        {
                            xtype: 'drugtypeahead',
                            itemId: 'winCbxGCN',
                            fieldLabel: 'GCN',
                            matchFieldWidth: false,
                            displayField: 'GCN_SEQNO',
                            valueField: 'GCN_SEQNO',
                            emptyText: '[e.g. Nexium]',
                            listeners: {
                                select: 'GCN_select'
                            }
                        },
                        {
                            xtype: 'drugtypeahead',
                            itemId: 'winCbxHICL',
                            matchFieldWidth: false,
                            fieldLabel: 'HICL SEQ No',
                            displayField: 'HICL_SEQNO',
                            valueField: 'HICL_SEQNO',
                            emptyText: '[e.g. Nexium]',
                            listeners: {
                                select: 'HICL_select'
                            }
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'winCbxDeterminationType',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            fieldLabel: 'Determination Type',
                            bind: {
                                store: '{storedeterminationtype}'
                            }
                        },
                        {
                            xtype: 'container',
                            margin: '10 150 10 0',
                            layout: {
                                type: 'hbox',
                                align: 'center',
                                pack: 'center',
                                defaultMargins: 5
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Search',
                                    iconCls: 'fa fa-search',
                                    handler: 'winBtnSearchClick'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Reset',
                                    iconCls: 'fa fa-undo',
                                    handler: 'winBtnResetClick'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'grid',
            itemId : 'gpSearch',
            flex: 1,
            columns: [
                {text: 'Auth ID', dataIndex: 'authID'},
                {text: 'Determination Type', dataIndex: 'DeterminationType'},
                {text: 'Member ID', dataIndex: 'recipientID'},
                {text: 'Name', dataIndex: 'memberName'},
                {text: 'DOB', dataIndex: 'memberDOB', xtype: 'datecolumn', format: 'm/d/Y', filter: {type: 'date'}},
                {text: 'Status', dataIndex: 'authStatus'},
                {
                    text: 'HrsToFill', dataIndex: 'HrsToProcess', tooltip: 'Hours Remaining To Process PA',
                    renderer: function (value, metaData, record) {
                        var hrs = value.substr(0, value.indexOf(':')),
                            hrsIndicator;
                        
                        if (hrs > 0) {
                            hrsIndicator = '<span style="color:green;">' + value + '</span>';
                        } else if (hrs < 0) {
                            hrsIndicator = '<span style="color:red;">' + value + '</span>';
                        } else {
                            hrsIndicator = '<span style="color:orange;">' + value + '</span>';
                        }

                        return hrsIndicator;
                    }
                },
                {text: 'Due Date', dataIndex: 'dueDate', xtype: 'datecolumn', format: 'm/d/Y', filter: {type: 'date'}},
                {text: 'Medication', dataIndex: 'LN'},
                {text: 'Source', dataIndex: 'source'},
                {text: 'Carrier Name', dataIndex: 'carrierName'},
                {text: 'Account', dataIndex: 'AccountName'},
                {text: 'LOB', dataIndex: 'LOBName'},
                {text: 'Effective Date', dataIndex: 'EffectiveDateTime', xtype: 'datecolumn', format: 'm/d/Y', filter: {type: 'date'}},
                {text: 'Term Date', dataIndex: 'TermDateTime', xtype: 'datecolumn', format: 'm/d/Y', filter: {type: 'date'}},
                {text: 'Approved By', dataIndex: 'ApprovedBy'},
                {text: 'Approved Date', dataIndex: 'ApprovedDateTime', xtype: 'datecolumn', format: 'm/d/Y', filter: {type: 'date'}}
            ],
            listeners: {
                itemdblclick: 'gpSearch_ItemDblClick'
            },
            bind: '{storeexistingpa}',
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    itemId: 'searchGridPagingToolbar',
                    pageSize: 25,
                    bind: '{storeexistingpa}',
                    listeners: {
                        afterrender: function() {
                            this.getComponent('refresh').on('click', 'winBtnSearchClick');
                        }
                    },
                    doRefresh: function() {
                    },
                    displayInfo: true,
                    dock: 'bottom'
                }
            ]
        }
    ]
});