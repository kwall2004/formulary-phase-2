/**
 * Created by S4505 on 10/20/2016.
 */



Ext.define('Atlas.admin.view.OutreachConfiguration', {
        extend: 'Ext.grid.Panel',
        requires: [
            'Ext.grid.plugin.RowEditing'
        ],
        xtype: 'view-adminOutreachConfiguration',
        title: 'Outreach Configuration',
        controller: 'admin-outreachconfiguration',
        viewModel: 'adminOutreachConfigurationViewModel',
    selModel:{
        mode:'MULTI'
    },
        plugins: [
            {
                ptype: 'rowediting',
                triggerEvent: 'celldblclick',
                removeUnmodified: true,
                id: 'rowEdit',
                errorSummary: false
            }
        ],
        dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    text: 'Add',
                    reference: 'addButton',
                    iconCls: 'x-fa  fa-plus-circle',
                    handler: 'onAdd',
                    alignment: 'left'
                }, {
                    text: 'Remove',
                    reference: 'removeButton',
                    disabled: true,
                    iconCls: 'x-fa  fa-minus-circle',
                    handler: 'onRemove',
                    alignment: 'left'
                }]
            },
            {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    {
                        xtype: 'tbfill'
                    },
                    {
                        text: 'Save',
                        disabled: true,
                        reference: 'saveButton',
                        iconCls: 'x-fa fa-save',
                        handler: 'onSave',
                        alignment: 'right'
                    }
                ]

            },
            {
                xtype: 'toolbar',
                dock: 'bottom',
                layout:'fit',
                items: [
                    {
                        xtype: 'pagingtoolbar',

                        dock: 'bottom',
                        pageSize: 25,
                        displayInfo: 'true',
                        bind: {
                            store: '{outreachConfigurationStore}'
                        }
                    }
                ]

            }
        ],

        columns: [

            {
                text: 'Determination Type',
                dataIndex: 'DeterminationType',
                flex: 1,
                editor: {
                    xtype: 'combo',
                    allowBlank: false,
                    queryMode: 'local',
                    forceSelection: true,
                    bind: {
                        store: '{determinationTypes}'
                    },
                    displayField: 'name',
                    valueField: 'value'
                },
                renderer: 'displayDeterminationTypeDesc'
            },
            {
                text: 'Category',
                dataIndex: 'Category',
                flex: 1,
                reference: 'CategoryItem',
                editor: {
                    xtype: 'combo',
                    allowBlank: false,
                    queryMode: 'local',
                    forceSelection: true,
                    bind: {
                        store: '{outreachConfigurationCategory}'
                    },
                    displayField: 'name',
                    valueField: 'value',
                    listeners: {
                        select: 'onUpdateCategory'
                    }
                },
                renderer: 'displayCategoryDesc'
            },
            {
                text: 'Sub Category',
                dataIndex: 'SubCategory',
                flex: 1,
                editor: {
                    xtype: 'combo',
                    reference: 'SubCat',
                    allowBlank: true,
                    queryMode: 'local',
                    forceSelection: true,
                    displayField: 'name',
                    valueField: 'value'
                },
                renderer: function (value) {
                    if (value == 'A')
                        return 'Decision-Approval';
                    else if (value == 'D')
                        return 'Decision-Denial';
                    else
                        return '';
                }

            },
            {
                text: 'Contacted Entity',
                dataIndex: 'ContactedEntity',
                flex: 1,
                renderer: 'displayContactedEntityDesc',

                editor: {
                    xtype: 'combo',
                    allowBlank: false,
                    queryMode: 'local',
                    forceSelection: true,
                    bind: {
                        store: '{outreachContactedEntity}'
                    },
                    displayField: 'name',
                    valueField: 'value'
                }

            },
            {text: 'Allowed Attempts', dataIndex: 'AllowedAttempts', editor: {
                maskRe: /[0-9]/
            }},
            {
                text: 'Allowed ContactCodes',
                flex: 1,
                dataIndex: 'AllowedContactCodes',
                renderer: 'displayContactCodesFull',
                editor: {
                    xtype: 'combobox',
                    bind: {
                        store: '{outreachContactCodesPartial}'
                    },
                    matchFieldWidth: false,
                    queryMode: 'local',
                    displayField: 'DESCRIPTION',
                    valueField: 'ReasonCode',
                    forceSelection: true,
                    multiSelect: true,
                    reference: 'AllowedAttempts',
                    listConfig: {
                        getInnerTpl: function(DESCRIPTION) {
                            return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {' + DESCRIPTION + '}</div>';
                        }
                    }
                }
            },
            {
                text: 'Success ContactCodes',
                flex: 1,
                dataIndex: 'SuccessContactCodes',
                renderer: 'displayContactCodesFull',

                editor: {
                    xtype: 'combobox',
                    bind: {
                        store: '{outreachContactCodesPartial}'
                    },
                    matchFieldWidth: false,
                    queryMode: 'local',
                    displayField: 'DESCRIPTION',
                    valueField: 'ReasonCode',
                    forceSelection: true,
                    multiSelect: true,
                    reference: 'SuccessCodes',
                    listConfig: {
                        getInnerTpl: function(DESCRIPTION) {
                            return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {' + DESCRIPTION + '}</div>';
                        }
                    }
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

                            /*,
                             callback: function (owner, tool, e) {
                             var vm = this.getViewModel(),
                             rec = vm.get('record');
                             owner.up('admin-options').getController().onRuleReject(rec);
                             }*/
                        }
                    ]
                }
            }

        ],
        bind: {
            store: '{outreachConfigurationStore}'
        }
    }
);