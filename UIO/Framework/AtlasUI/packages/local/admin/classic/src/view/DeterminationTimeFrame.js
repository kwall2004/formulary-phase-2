/**
 * Created by d3973 on 10/3/2016.
 */
Ext.define('Atlas.admin.view.DeterminationTimeFrame', {
    extend: 'Ext.grid.Panel',
    xtype: 'admin-determinationtimeframe',
    title: 'Determination Time Frame',
    controller: 'determinationtimeframe',
    viewModel: {
        stores: {
            determinationtimeframe: {
                model: 'Atlas.admin.model.DeterminationTimeFrame',
                remoteSort: true,
                remoteFilter: true,
                autoLoad: false
            },
            planGroupHierarchyExt: {
                model: 'Atlas.admin.model.planGroupHierarchyExt',
                remoteSort: true,
                remoteFilter: true,
                autoLoad: false,
                listeners: {
                    load: function (store, recordInfo, successful, operation, eOpts) {
                        for (var i = 0; i < recordInfo.length; i++) {
                            var text = recordInfo[i].get('carrierName') + ' - ' + recordInfo[i].get('AccountName') + ' - ' + recordInfo[i].get('LOBName') + ' - ' + recordInfo[i].get('carrierAcctNumber');
                            recordInfo[i].set('PGH', text);
                        }
                    }
                }
            },
            determinationTypes: {
                type: 'admin-determinationTypes'
            },
            appealTypes: {
                type: 'admin-appealTypes'
            },
            determinationCategoryCD: {
                type: 'clonestore',
                storeId: 'urgencyTypeCD',
                model: 'Atlas.common.model.shared.ListModel',
                autoLoad: true,
                proxy: {
                    extraParams: {
                        pListName: 'DeterminationCategory'
                    },
                    url: 'shared/{0}/listitems'
                }
            },
            determinationCategoryRD: {
                fields: ['value', 'name'],
                data: [
                    ['All', 'All']
                ]
            },
            urgencyTypeCD: {
                type: 'clonestore',
                storeId: 'urgencyTypeCD',
                model: 'Atlas.common.model.shared.ListModel',
                autoLoad: true,
                proxy: {
                    extraParams: {
                        pListName: 'UrgencyType'
                    },
                    url: 'shared/{0}/listitems'
                }
            },
            urgencyTypeDMR: {
                fields: ['value', 'name']
            },
            urgencyTypeRD: {
                type: 'clonestore',
                storeId: 'urgencyTypeRD',
                model: 'Atlas.common.model.shared.ListModel',
                autoLoad: true,
                proxy: {
                    extraParams: {
                        pListName: 'UrgencyTypeRD'
                    },
                    url: 'shared/{0}/listitems'
                }
            }
        }
    },
    reference: 'admin-determinationtimeframe',
    multiSelect: true,
    columns: {
        defaults: {
            flex: 1
        },
        items: [
            {
                text: 'Coverage Type',
                dataIndex: 'coverageType',
                renderer: 'getCoveragetypeDesc',
                editor: {
                    xtype: 'combo',
                    reference: 'coverageTypeCombo',
                    queryMode: 'local',
                    forceSelection: true,
                    allowBlank: false,
                    bind: {
                        store: '{determinationTypes}'
                    },
                    selectOnFocus: true,
                    displayField: 'name',
                    valueField: 'value',
                    listeners: {
                        select: 'loadConditionalListsCombo'
                    }

                }
            },
            {
                text: 'RD Type',
                dataIndex: 'RDType',
                renderer: 'getRDTypeDesc',
                editor: {
                    xtype: 'combo',
                    reference: 'rdCombo',
                    queryMode: 'local',
                    forceSelection: true,
                    bind: {
                        store: '{appealTypes}'
                    },
                    selectOnFocus: true,
                    displayField: 'name',
                    valueField: 'value',
                    listeners: {
                        select: 'loadConditionalListsCombo'
                    }
                }
            },
            {
                text: 'Determination Category',
                dataIndex: 'determinationCategory',
                renderer: 'getCategoryDetermimationDesc',
                editor: {
                    xtype: 'combo',
                    reference: 'determinationCategoryCombo',
                    allowBlank: false,
                    queryMode: 'local',
                    forceSelection: true,
                    selectOnFocus: true,
                    displayField: 'name',
                    valueField: 'value'

                }
            },
            {
                text: 'Urgency',
                dataIndex: 'urgency',
                renderer: 'getUrgencyDesc',
                editor: {
                    xtype: 'combo',
                    reference: 'urgencyCombo',
                    queryMode: 'local',
                    forceSelection: true,
                    selectOnFocus: true,
                    displayField: 'name',
                    valueField: 'value'
                }
            },
            {
                text: 'Plan Group Hierachy',
                dataIndex: 'pgHierachySystemID',
                renderer: 'getPlanGroupHierarchText',
                editor: {
                    xtype: 'combo',
                    reference: 'pghCombo',
                    queryMode: 'local',
                    forceSelection: true,
                    matchFieldWidth: false,
                    bind: {
                        store: '{planGroupHierarchyExt}'
                    },
                    selectOnFocus: true,
                    displayField: 'PGH',
                    valueField: 'SystemID'

                }
            },
            {
                text: 'Rule Value',
                dataIndex: 'ruleValue',
                editor: {
                    xtype: 'numberfield',
                    itemId: 'userMac',
                    maskRe: /[0-9]/,
                    minValue: 1,
                    allowDecimals: false,
                    allowBlank: false,
                    hideTrigger: true
                }
            },
            {
                text: 'Toll Indicator',
                dataIndex: 'tollIndicator',
                listeners: {
                    beforecheckchange: function () {
                        return false;
                    }
                },
                editor: {
                    xtype: 'checkbox',
                    reference: 'cbTollIndicator',
                    inputValue: true,
                    uncheckedValue: false

                },
                renderer: function (value) {
                    if (value)
                        return 'Yes';
                    else
                        return 'No';
                }

            },
            {
                text: 'Active',
                dataIndex: 'Active',
                listeners: {
                    beforecheckchange: function () {
                        return false;
                    }
                },
                editor: {
                    xtype: 'checkbox',
                    reference: 'cbActive',
                    inputValue: true,
                    uncheckedValue: false

                },
                renderer: function (value) {
                    if (value)
                        return 'Yes';
                    else
                        return 'No';
                }
            },
            {
                xtype: 'widgetcolumn',
                align: 'center',
                flex: 0,
                width: 100,
                hideable : false,
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
                            handler: 'onReject'
                        }
                    ]
                }
            }


        ]
    },
    bind: {
        store: '{determinationtimeframe}'
    },
    plugins: [{
        ptype: 'rowediting',
        clicksToMoveEditor: 1,
        autoCancel: false,
        id: 'rowEdit'
    }],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Add',
                    iconCls: 'x-fa  fa-plus-circle',
                    reference: 'addButton',
                    listeners: {
                        click: 'onAdd'
                    }
                }, {
                    xtype: 'button',
                    disabled:true,
                    text: 'Remove',
                    iconCls: 'x-fa  fa-minus-circle',
                    reference: 'removeButton',
                    listeners: {
                        click: 'onRemove'
                    }
                }
            ]
        }, {
            xtype: 'toolbar',
            dock: 'bottom',
            items:[
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    text: 'Save',
                    reference: 'saveButton',
                    iconCls: 'x-fa fa-save',
                    disabled:true,
                    listeners: {
                        click: 'onSave'
                    }
                }
            ]

        },
        {
            xtype: 'toolbar',
            dock: 'bottom',
            layout:'fit',
            items:[{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                pageSize: 25,
                displayInfo: 'true',
                bind: {
                    store: '{determinationtimeframe}'
                }
            }
            ]

        }
    ]


});