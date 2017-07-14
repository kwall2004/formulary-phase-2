/**
 * Created by d3973 on 9/26/2016.
 */
Ext.define('Atlas.admin.view.ClaimsRuleDefinition', {
    extend: 'Ext.panel.Panel',
    xtype: 'admin-ClaimsRuleDefinition',

    title: 'Claims Rule Definition',

    controller: 'claimsruledefinitioncontroller',
    viewModel: 'adminclaimsruledefinition',
    layout: 'vbox',
    align: 'stretch',
    items: [
        {
            xtype: 'form',
            title: 'Claim Rules',
            iconCls: 'x-fa fa-calculator',
            flex: 1,
            width: '100%',
            height: '100%',
            layout: 'vbox',
            align: 'stretch',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        xtype: 'button',
                        text: 'Add Rule',
                        iconCls: 'fa fa-plus-circle',
                        handler: 'onAdd'
                    }, {
                        xtype: 'button',
                        text: 'Disable',
                        iconCls: 'fa fa-minus-circle',
                        bind: {
                            disabled: '{!rulesgrid.selection}'
                        },
                        handler: 'onDisable'
                    }, {
                        xtype: 'combobox',
                        fieldLabel: 'NCPDP Version',
                        // forceSelection: true,
                        name: 'ncpdpVersion',
                        displayField: 'ListDescription',
                        valueField: 'ListItem',
                        value: 'D0', //hardcoded to start
                        listeners: {
                            select: 'onNCPDPSelect'
                        },
                        bind: {
                            store: '{ncpdpVersion}'
                        }
                    },
                         {
                            xtype: 'tbfill'
                        }, {
                            xtype: 'button',
                            text: 'Save',
                            handler: 'onSave',
                            iconCls: 'fa fa-save',
                            alignment: 'right'
                            //width: 110
                        }
                    ]
                }
                /*,
                 {
                 xtype: 'pagingtoolbar',
                 dock: 'bottom',
                 displayInfo: 'true',
                 pageSize: 25,
                 bind: {
                 store: '{rulesDefinitions}'
                 }
                 }*/
            ],
            items: [
                {
                    //region: 'center',
                    //layout: 'fit',
                    flex: 3,
                    width: '100%',
                    height: '100%',
                    layout: 'vbox',
                    align: 'stretch',
                    items: [
                        {
                            xtype: 'grid',
                            flex: 1,
                            width: '100%',
                            height: '100%',
                            reference: 'rulesgrid',
                            listeners: {
                                beforeedit: 'onBeforeRuleEdit',
                                canceledit: 'onCancelRuleEdit',
                                edit: 'onRuleEdit',
                                select: 'onRuleSelect',
                                beforeselect: 'onRuleBeforeSelect'
                            },
                            headercontainer: {
                                items: [
                                    {
                                        text: 'ID',
                                        flex: 1
                                    }, {
                                        text: 'ID',
                                        flex: 1
                                    }
                                ]
                            },
                            columns: {
                                defaults: {
                                    //filter: {type: 'string'}
                                },
                                items: [
                                    {
                                        text: 'ID',
                                        dataIndex: 'ttRuleID'
                                    }, {
                                        text: 'Active',
                                        dataIndex: 'ttActive',
                                        width: 90,
                                        dirtyText: 'Name has been edited',
                                        items: [{
                                            xtype: 'combo',
                                            width: 80,
                                            store: {
                                                autoLoad: true,
                                                fields: ['value', 'name'],
                                                data: [
                                                    {"value": true, "name": "Yes"},
                                                    {"value": false, "name": "No"}
                                                ]
                                            },
                                            queryMode : 'local',
                                            forceSelection:true,
                                            displayField: 'name',
                                            valueField: 'value',
                                            listeners: {
                                                change: function (fld, newValue, oldValue) {
                                                    var grid = fld.up('grid'),
                                                        column = fld.up('gridcolumn'),
                                                        store = grid.getStore();
                                                    if (Ext.isEmpty(newValue)) {
                                                        store.removeFilter(column.dataIndex);
                                                    } else {
                                                        fld.up('admin-ClaimsRuleDefinition').getViewModel().set('isFilterApplied',true);
                                                        fld.up('admin-ClaimsRuleDefinition').getReferences().conditions.removeAll();
                                                        store.addFilter({
                                                            operator: '==',
                                                            id: 'ttActive',
                                                            property: 'ttActive',
                                                            value: newValue
                                                        });
                                                    }
                                                }
                                            }
                                        }],
                                        editor: {
                                            xtype: 'checkbox',
                                            listeners: {
                                                change: 'onActiveChange'
                                            }
                                        }, renderer: function (value) {
                                            if (value)
                                                return 'Yes';
                                            else
                                                return 'No';
                                        }
                                    }, {
                                        text: 'Alert',
                                        dataIndex: 'ttAlert',
                                        width: 90,
                                        items: [{
                                            xtype: 'combo',
                                            queryMode : 'local',
                                            forceSelection:true,
                                            width: 80,
                                            store: {
                                                autoLoad: true,
                                                fields: ['value', 'name'],
                                                data: [
                                                    {"value": true, "name": "Yes"},
                                                    {"value": false, "name": "No"}
                                                ]
                                            },
                                            displayField: 'name',
                                            valueField: 'value',
                                            listeners: {
                                                change: function (fld, newValue, oldValue) {
                                                    var grid = fld.up('grid'),
                                                        column = fld.up('gridcolumn'),
                                                        store = grid.getStore();

                                                    if (Ext.isEmpty(newValue)) {
                                                        store.removeFilter(column.dataIndex);
                                                    } else {
                                                        fld.up('admin-ClaimsRuleDefinition').getViewModel().set('isFilterApplied',true);
                                                        fld.up('admin-ClaimsRuleDefinition').getReferences().conditions.removeAll();
                                                        store.addFilter({
                                                            operator: '==',
                                                            id: 'ttAlert',
                                                            property: 'ttAlert',
                                                            value: newValue
                                                        });
                                                    }
                                                }
                                            }
                                        }],
                                        editor: {
                                            xtype: 'checkbox'
                                        },
                                        renderer: function (value) {
                                            if (value)
                                                return 'Yes';
                                            else
                                                return 'No';
                                        }
                                    }, {
                                        text: 'Rule Name',
                                        dataIndex: 'ttRuleName',
                                        width: 200,
                                        items: [{
                                            xtype: 'textfield',
                                            width: 190,
                                            emptyText: '[Type text to filter...]',
                                            enableKeyEvents: true,
                                            listeners: {
                                                keyup: function (fld, newValue, oldValue, abc, a) {
                                                    var grid = fld.up('grid'),
                                                        column = fld.up('gridcolumn'),
                                                        store = grid.getStore();

                                                    if (Ext.isEmpty(newValue.target.value)) {
                                                        store.removeFilter(column.dataIndex);
                                                    } else {
                                                        fld.up('admin-ClaimsRuleDefinition').getViewModel().set('isFilterApplied',true);
                                                        fld.up('admin-ClaimsRuleDefinition').getReferences().conditions.removeAll();
                                                        store.addFilter({
                                                            operator: 'like',
                                                            id: 'ttRuleName',
                                                            property: 'ttRuleName',
                                                            value: newValue.target.value
                                                        });
                                                    }
                                                }
                                            }
                                        }],
                                        editor: {
                                            xtype: 'textfield'
                                        }
                                    }, {
                                        text: 'Rule Level',
                                        dataIndex: 'ttRuleLevel',
                                        width: 90,
                                        renderer: function (value) {
                                            return 'Level ' + parseInt(value);
                                        },
                                        items: [{
                                            xtype: 'combo',
                                            width: 80,
                                            queryMode : 'local',
                                            forceSelection:true,
                                            bind: {
                                                store: '{RuleLevelStore}'
                                            },
                                            displayField: 'ListDescription',
                                            valueField: 'ListItem',
                                            listeners: {
                                                change: function (fld, newValue, oldValue) {
                                                    var grid = fld.up('grid'),
                                                        column = fld.up('gridcolumn'),
                                                        store = grid.getStore();

                                                    if (Ext.isEmpty(newValue)) {
                                                        store.removeFilter(column.dataIndex);
                                                    } else {
                                                        fld.up('admin-ClaimsRuleDefinition').getViewModel().set('isFilterApplied',true);
                                                        fld.up('admin-ClaimsRuleDefinition').getReferences().conditions.removeAll();
                                                        store.addFilter({
                                                            operator: '==',
                                                            id: 'ttRuleLevel',
                                                            property: 'ttRuleLevel',
                                                            value: newValue
                                                        });
                                                    }
                                                }
                                            }
                                        }],
                                        editor: {
                                            xtype: 'combobox',
                                            forceSelection: true,
                                            queryMode: 'local',
                                            allowBlank: false,
                                            bind: {
                                                store: '{RuleLevelStore}'
                                            },
                                            displayField: 'ListDescription',
                                            valueField: 'ListItem'
                                        }
                                    }, {
                                        text: 'Rule Sequence',
                                        width: 120,
                                        dataIndex: 'ttRuleSeq'/*,
                                         filter: {
                                         type: 'list',
                                         store: {
                                         autoLoad: true,
                                         model: 'Atlas.admin.model.claimdef.RuleSequence'
                                         },
                                         idField: 'ListDescription',
                                         labelField: 'ListItem'
                                         }*/,
                                        editor: {
                                            xtype: 'combobox',
                                            forceSelection: true,
                                            queryMode: 'local',
                                            allowBlank: false,
                                            bind: {
                                                store: '{RuleSeqStore}'
                                            },
                                            displayField: 'ListDescription',
                                            valueField: 'ListItem'
                                        }
                                    }, {
                                        text: 'Segment Name',
                                        dataIndex: 'ttSegmentID',
                                        width: 230,
                                        renderer: 'segmentRenderer',
                                        items: [{
                                            xtype: 'combo',
                                            width: 220,
                                            bind: {
                                                store: '{SegmentStore}'
                                            },
                                            queryMode : 'local',
                                            forceSelection:true,
                                            displayField: 'ListDescription',
                                            valueField: 'ListItem',
                                            listeners: {
                                                change: function (fld, newValue, oldValue) {
                                                    var grid = fld.up('grid'),
                                                        column = fld.up('gridcolumn'),
                                                        store = grid.getStore();

                                                    if (Ext.isEmpty(newValue)) {
                                                        store.removeFilter(column.dataIndex);
                                                    } else {
                                                        fld.up('admin-ClaimsRuleDefinition').getViewModel().set('isFilterApplied',true);
                                                        fld.up('admin-ClaimsRuleDefinition').getReferences().conditions.removeAll();
                                                        store.addFilter({
                                                            operator: '==',
                                                            id: 'ttSegmentID',
                                                            property: 'ttSegmentID',
                                                            value: newValue
                                                        });
                                                    }
                                                }
                                            }
                                        }],
                                        editor: {
                                            xtype: 'combobox',
                                            forceSelection: true,
                                            queryMode: 'local',
                                            matchFieldWidth: false,
                                            bind: {
                                                store: '{SegmentStore}'
                                            },
                                            displayField: 'ListDescription',
                                            valueField: 'ListItem'
                                        }
                                    }, {
                                        text: 'Drug Data Source',
                                        dataIndex: 'ttdataSource',
                                        width: 150,
                                        renderer: 'drugDataSourceRenderer',
                                        items: [{
                                            xtype: 'combo',
                                            queryMode : 'local',
                                            forceSelection:true,
                                            width: 140,
                                            bind: {
                                                store: '{ClaimDataSourceStore}'
                                            },
                                            displayField: 'ListDescription',
                                            valueField: 'ListItem',
                                            listeners: {
                                                change: function (fld, newValue, oldValue) {
                                                    var grid = fld.up('grid'),
                                                        column = fld.up('gridcolumn'),
                                                        store = grid.getStore();

                                                    if (Ext.isEmpty(newValue)) {
                                                        store.removeFilter(column.dataIndex);
                                                    } else {
                                                        fld.up('admin-ClaimsRuleDefinition').getViewModel().set('isFilterApplied',true);
                                                        fld.up('admin-ClaimsRuleDefinition').getReferences().conditions.removeAll();
                                                        store.addFilter({
                                                            operator: 'in',
                                                            id: 'ttdataSource',
                                                            property: 'ttdataSource',
                                                            value: [newValue]
                                                        });
                                                    }
                                                }
                                            }
                                        }],
                                        editor: {
                                            xtype: 'combobox',
                                            queryMode: 'local',
                                            forceSelection: true,
                                            allowBlank: false,
                                            bind: {
                                                store: '{ClaimDataSourceStore}'
                                            },
                                            displayField: 'ListDescription',
                                            valueField: 'ListItem'
                                        }
                                    }, {
                                        text: 'Trans Type',
                                        width: 90,
                                        dataIndex: 'ttTransactionType',
                                        items: [{
                                            xtype: 'combo',
                                            queryMode : 'local',
                                            forceSelection:true,
                                            width: 80,
                                            bind: {
                                                store: '{TransTypeStore}'
                                            },
                                            displayField: 'ListDescription',
                                            valueField: 'ListDescription',
                                            listeners: {
                                                change: function (fld, newValue, oldValue) {
                                                    var grid = fld.up('grid'),
                                                        column = fld.up('gridcolumn'),
                                                        store = grid.getStore();

                                                    if (Ext.isEmpty(newValue)) {
                                                        store.removeFilter(column.dataIndex);
                                                    } else {
                                                        fld.up('admin-ClaimsRuleDefinition').getViewModel().set('isFilterApplied',true);
                                                        fld.up('admin-ClaimsRuleDefinition').getReferences().conditions.removeAll();
                                                        store.addFilter({
                                                            operator: '==',
                                                            id: 'ttTransactionType',
                                                            property: 'ttTransactionType',
                                                            value: newValue
                                                        });
                                                    }
                                                }
                                            }
                                        }],
                                        editor: {
                                            xtype: 'combobox',
                                            queryMode: 'local',
                                            forceSelection: true,
                                            allowBlank: false,
                                            bind: {
                                                store: '{TransTypeStore}'
                                            },
                                            displayField: 'ListDescription',
                                            valueField: 'ListDescription'
                                        }
                                    }, {
                                        text: 'If True',
                                        width: 90,
                                        dataIndex: 'ttIfTrueDoWhat',
                                        renderer: 'ifTrueDoWhatRenderer',
                                        sortType: 'ifTrueDoWhatRenderer',
                                        items: [{
                                            xtype: 'combo',
                                            queryMode : 'local',
                                            forceSelection:true,
                                            width: 80,
                                            bind: {
                                                store: '{IfTrueStore}'
                                            },
                                            displayField: 'ListDescription',
                                            valueField: 'ListItem',
                                            listeners: {
                                                change: function (fld, newValue, oldValue) {
                                                    var grid = fld.up('grid'),
                                                        column = fld.up('gridcolumn'),
                                                        store = grid.getStore();

                                                    if (Ext.isEmpty(newValue)) {
                                                        store.removeFilter(column.dataIndex);
                                                    } else {
                                                        fld.up('admin-ClaimsRuleDefinition').getViewModel().set('isFilterApplied',true);
                                                        fld.up('admin-ClaimsRuleDefinition').getReferences().conditions.removeAll();
                                                        store.addFilter({
                                                            operator: '==',
                                                            id: 'ttIfTrueDoWhat',
                                                            property: 'ttIfTrueDoWhat',
                                                            value: newValue
                                                        });
                                                    }
                                                }
                                            }
                                        }],
                                        editor: {
                                            xtype: 'combobox',
                                            queryMode: 'local',
                                            forceSelection: true,
                                            allowBlank: false,
                                            bind: {
                                                store: '{IfTrueStore}'
                                            },
                                            displayField: 'ListDescription',
                                            valueField: 'ListItem'
                                        }
                                    }, {
                                        text: 'Primary NCPDP Error',
                                        dataIndex: 'ttNCPDPerrCd',
                                        width: 250,
                                        items: [{
                                            xtype: 'combo',
                                            queryMode : 'local',
                                            forceSelection:true,
                                            width: 240,
                                            itemDefaults: {
                                                cls: 'menuFilter'
                                            },
                                            bind: {
                                                store: '{NCPDPErrorCodes}'
                                            },
                                            displayField: 'combo',
                                            valueField: 'id',
                                            listeners: {
                                                change: function (fld, newValue, oldValue) {
                                                    var grid = fld.up('grid'),
                                                        column = fld.up('gridcolumn'),
                                                        store = grid.getStore();

                                                    if (Ext.isEmpty(newValue)) {
                                                        store.removeFilter(column.dataIndex);
                                                    } else {
                                                        fld.up('admin-ClaimsRuleDefinition').getViewModel().set('isFilterApplied',true);
                                                        fld.up('admin-ClaimsRuleDefinition').getReferences().conditions.removeAll();
                                                        store.addFilter({
                                                            operator: '==',
                                                            id: 'ttNCPDPerrCd',
                                                            property: 'ttNCPDPerrCd',
                                                            value: newValue
                                                        });
                                                    }
                                                }
                                            }
                                        }],
                                        editor: {
                                            xtype: 'combobox',
                                            forceSelection: true,
                                            allowBlank: false,
                                            queryMode: 'local',
                                            listWidth: 200,
                                            /* listConfig: {
                                             getInnerTpl: function () {
                                             var tpl = '<div>{id} - {value}</div>';
                                             return tpl;
                                             }
                                             },*/
                                            bind: {
                                                store: '{NCPDPErrorCodes}'
                                            },
                                            displayField: 'combo',
                                            valueField: 'id'
                                        }
                                    }, {
                                        text: 'Secondary NCPDP Error',
                                        width: 250,
                                        dataIndex: 'ttsecNCPDPerrC',
                                        items: [{
                                            xtype: 'combo',
                                            queryMode : 'local',
                                            forceSelection:true,
                                            width: 240,
                                            itemDefaults: {
                                                cls: 'menuFilter'
                                            },
                                            bind: {
                                                store: '{NCPDPErrorCodes}'
                                            },
                                            displayField: 'combo',
                                            valueField: 'id',
                                            listeners: {
                                                change: function (fld, newValue, oldValue) {
                                                    var grid = fld.up('grid'),
                                                        column = fld.up('gridcolumn'),
                                                        store = grid.getStore();

                                                    if (Ext.isEmpty(newValue)) {
                                                        store.removeFilter(column.dataIndex);
                                                    } else {
                                                        fld.up('admin-ClaimsRuleDefinition').getViewModel().set('isFilterApplied',true);
                                                        fld.up('admin-ClaimsRuleDefinition').getReferences().conditions.removeAll();
                                                        store.addFilter({
                                                            operator: '==',
                                                            id: 'ttsecNCPDPerrC',
                                                            property: 'ttsecNCPDPerrC',
                                                            value: newValue
                                                        });
                                                    }
                                                }
                                            }
                                        }],
                                        editor: {
                                            xtype: 'combobox',
                                            forceSelection: true,
                                            queryMode: 'local',
                                            /*listConfig: {
                                             getInnerTpl: function () {
                                             var tpl = '<div>{id} - {value}</div>';
                                             return tpl;
                                             }
                                             },*/
                                            bind: {
                                                store: '{NCPDPErrorCodes}'
                                            },
                                            displayField: 'combo',
                                            valueField: 'id'

                                        }
                                    }, {
                                        text: 'Pharmacy Err. Desc.',
                                        width: 200,
                                        dataIndex: 'ttErrintDesc',
                                        editor: {
                                            xtype: 'textfield'
                                        },
                                        items: [{
                                            xtype: 'textfield',
                                            emptyText: '[Type text to filter...]',
                                            width: 190,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keyup: function (fld, newValue, oldValue, abc, a) {
                                                    var grid = fld.up('grid'),
                                                        column = fld.up('gridcolumn'),
                                                        store = grid.getStore();

                                                    if (Ext.isEmpty(newValue.target.value)) {
                                                        store.removeFilter(column.dataIndex);
                                                    } else {
                                                        fld.up('admin-ClaimsRuleDefinition').getViewModel().set('isFilterApplied',true);
                                                        fld.up('admin-ClaimsRuleDefinition').getReferences().conditions.removeAll();
                                                        store.addFilter({
                                                            operator: 'like',
                                                            id: 'ttErrintDesc',
                                                            property: 'ttErrintDesc',
                                                            value: newValue.target.value
                                                        });
                                                    }
                                                }
                                            }
                                        }]
                                    },
                                    {
                                        text: 'DUR Reason Code',
                                        //renderer: 'DURReasonRenderer',
                                        dataIndex: 'ttDURRsnCode',
                                        width: 250,
                                        items: [{
                                            xtype: 'combo',
                                            queryMode : 'local',
                                            forceSelection:true,
                                            width: 240,
                                            bind: {
                                                store: '{DURRsnCodes}'
                                            },
                                            displayField: 'ListDescription',
                                            valueField: 'ListItem',
                                            listeners: {
                                                change: function (fld, newValue, oldValue) {
                                                    var grid = fld.up('grid'),
                                                        column = fld.up('gridcolumn'),
                                                        store = grid.getStore();

                                                    if (Ext.isEmpty(newValue)) {
                                                        store.removeFilter(column.dataIndex);
                                                    } else {
                                                        fld.up('admin-ClaimsRuleDefinition').getViewModel().set('isFilterApplied',true);
                                                        fld.up('admin-ClaimsRuleDefinition').getReferences().conditions.removeAll();
                                                        store.addFilter({
                                                            operator: '==',
                                                            id: 'ttDURRsnCode',
                                                            property: 'ttDURRsnCode',
                                                            value: newValue
                                                        });
                                                    }
                                                }
                                            }
                                        }],
                                        editor: {
                                            xtype: 'combobox',
                                            queryMode: 'local',
                                            forceSelection: true,
                                            matchFieldWidth: false,
                                            bind: {
                                                store: '{DURRsnCodes}'
                                            },
                                            displayField: 'ListDescription',
                                            valueField: 'ListItem'
                                        }
                                    }, {
                                        xtype: 'datecolumn',
                                        text: 'Eff. Date',
                                        dataIndex: 'ttEffdate',
                                        formatter: 'date("m/d/Y")',
                                        //filter: {type: 'date'},
                                        editor: {
                                            xtype: 'datefield'
                                        }
                                    }, {
                                        text: 'Term Date',
                                        xtype: 'datecolumn',
                                        type: 'date',
                                        sortable: true,
                                        dataIndex: 'ttTermDate',
                                        //renderer:'handleNull',
                                        //sortType:'handleNull',
                                        formatter: 'date("m/d/Y")',
                                        //filter: {type: 'date'},
                                        editor: {
                                            xtype: 'datefield'
                                        }
                                    },
                                    {
                                        xtype: 'widgetcolumn',
                                        align: 'center',
                                        width: 100,
                                        hideable: false,
                                        items: [{
                                            xtype: 'button',
                                            text: 'Clear Filters',
                                            bind: {
                                                disabled: '{!isFilterApplied}'
                                            },
                                            handler: 'onClearFilters',
                                            iconCls: 'fa fa-remove'
                                        }],
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
                                                    iconCls: 'x-action-col-icon x-fa fa-undo',

                                                    //iconCls: 'x-action-col-icon x-fa fa-undo',
                                                    bind: {
                                                        hidden: '{!record.isNeedUpdate}',
                                                        tooltip: 'Reject {record.ttRuleID}'
                                                    },
                                                    handler: 'onReject'
                                                }
                                            ]
                                        }
                                    }
                                ]
                            },

                            plugins: [
                                {
                                    ptype: 'rowediting',
                                    clicksToMoveEditor: 1,
                                    errorSummary: false,
                                    autoCancel: false
                                },
                                {
                                    ptype: 'gridfilters'
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    displayInfo: 'true',
                                    pageSize: 10,
                                    bind: {
                                        store: '{rulesDefinitions}'
                                    }
                                }],
                            bind: {
                                store: '{rulesDefinitions}'
                            }
                        }
                    ]
                }, {
                    //region: 'south',
                    flex: 2,
                    width: '100%',
                    height: '100%',
                    layout: 'card',
                    reference: 'conditions',
                    split: true,
                    items: []
                }
            ]
        }
    ]
});
