Ext.define('Atlas.plan.view.group.PlanClaimRules', {
    extend: 'Ext.panel.Panel',
    xtype: 'widget.plan-group-planclaimrules',
    alias: 'widget.plan-group-planclaimrules',
    title: '~claimrules',



    controller: 'plan-group-planclaimrules',

    layout: 'border',
    items: [
        {
            region: 'center',
            layout: 'fit',
            flex: 3,
            alighnment: 'center',
            autoScroll: true,
            items: [
                {

                    xtype: 'grid',
                    reference: 'planClaimRulesgrid',
                    bind: {
                        store: '{planclaimrules}'
                    },

                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            //{text: 'Rule Level', dataIndex: 'RuleLevel',
                            {
                                text: 'Rule Level', dataIndex: 'RuleLevel',width:80,
                                editor: {
                                    xtype: 'combobox', autoLoadOnValue: true, name: 'cmbRuleLevel',
                                    emptyText: '[Select a rule level]', allowBlank: false, forceSelection: true,
                                    queryMode:'local',store:['DAW','Drug'],
                                    displayField: 'ruleLevel', valueField: 'ruleLevel',
                                    listeners: {
                                        select: 'onRuleLevelSelect'
                                    }
                                }
                            },

                            {
                                text: 'Carrier Id', dataIndex: 'carrierId',width:200,renderer:'cmbCarriersrenderer',

                                editor: {
                                    xtype: 'combobox', autoLoadOnValue: true, name: 'cmbCarriers',
                                    emptyText: '[Select a carrier]', allowBlank: false,
                                    bind: {store: '{carriers}'},
                                    displayField: 'carrierName', valueField: 'carrierId', forceSelection: true,
                                    queryMode: 'local'
                                }
                            },

                            {
                                text: 'Carrier LOB Id', dataIndex: 'carrierLOBId',width:110,renderer:'cmbCarriersLOBIdrenderer',

                                editor: {
                                    xtype: 'combobox', autoLoadOnValue: true, name: 'cmbCarriersLOBId',
                                    emptyText: '[Select a LOB]',
                                    bind: {store: '{lobs}'},
                                    displayField: 'lobName', valueField: 'carrierLOBId', forceSelection: true,
                                    queryMode: 'local'
                                }
                            },


                            {
                                text: 'Carrier Acct Number', dataIndex: 'carrierAcctNumber',width:120,renderer:'cmbCarriersAcctrenderer',

                                editor: {
                                    xtype: 'combobox', autoLoadOnValue: true, name: 'cmbAccount',
                                    emptyText: '[Select an account]',
                                    bind: {store: '{carrieraccounts}'},
                                    //bind: {store: '{accounts}'},
                                    displayField: 'accountName', valueField: 'carrierAcctNumber', forceSelection: true,
                                    queryMode: 'local'
                                }
                            },


                            {
                                text: 'Plan Group', dataIndex: 'planGroupId',width:160,renderer:'cmbPlanGrouprenderer',

                                editor: {
                                    xtype: 'combobox', autoLoadOnValue: true, name: 'cmbPlanGroups',
                                    emptyText: '[e.g. MHP Medicare 2011]',
                                    bind: {store: '{plangroups}'},
                                    displayField: 'planGroupName', valueField: 'planGroupId', forceSelection: true,
                                    queryMode: 'local'
                                }
                            },

                            {
                                text: 'Plan Benefit', dataIndex: 'planBenefitId',width:160,renderer:'cmbPlanBenefitrenderer',

                                editor: {
                                    xtype: 'combobox', autoLoadOnValue: true, name: 'cbxPlanBenefitId',
                                    emptyText: '[e.g. MHPMCRLICS1]',
                                    bind: {store: '{planbenefitlistItem}'},
                                    displayField: 'planBenefitCode', valueField: 'planBenefitId', forceSelection: true,
                                    queryMode: 'local'
                                }
                            },


                            {
                                text: 'Drug Level', dataIndex: 'drugLevel',width:75,renderer:'cbxDrugLevelrenderer',

                                editor: {
                                    xtype: 'combobox', autoLoadOnValue: true, name: 'cbxDrugLevel',
                                    emptyText: '[Select Drug Level]',
                                    bind: {store: '{druglevel}'},
                                    displayField: 'name', valueField: 'value', forceSelection: true,
                                    queryMode: 'local'
                                }
                            },


                            {text: 'Drug Code', dataIndex: 'drugCode',width:110,
                                editor: {
                                    name: 'txtDrugCode',allowBlank: false
                                }
                            },

                            {
                                text: 'Drug Type From', dataIndex: 'drugTypeFrom',width:150,renderer:'cbxDrugTyperenderer',

                                editor: {
                                    xtype: 'combobox', autoLoadOnValue: true, name: 'cbxDrugTypeFrom',
                                    emptyText: '[Select Drug Type From]',
                                    bind: {store: '{drugtype}'},
                                    displayField: 'name', valueField: 'value', forceSelection: true,
                                    queryMode: 'local'
                                }
                            },

                            {
                                text: 'Drug Type To', dataIndex: 'drugTypeTo',width:150,renderer:'cbxDrugTyperenderer',

                                editor: {
                                    xtype: 'combobox', autoLoadOnValue: true, name: 'cbxDrugTypeTo',
                                    emptyText: '[Select Drug Type To]',
                                    bind: {store: '{drugtype}'},
                                    displayField: 'name', valueField: 'value', forceSelection: true,
                                    queryMode: 'local'
                                }
                            },


                            {
                                text: 'DAW Code', dataIndex: 'dawType',width:150,renderer:'cbxDAWCoderenderer',

                                editor: {
                                    xtype: 'combobox', autoLoadOnValue: true, name: 'cbxDAWCode',
                                    emptyText: '[Select DAW Code]',
                                    bind: {store: '{dawtype}'},
                                    displayField: 'name', valueField: 'value', forceSelection: true,
                                    queryMode: 'local'
                                }
                            },

                            {
                                text: 'Rule Type', dataIndex: 'ruleType',width:110,renderer:'cbxRuleTyperenderer',

                                editor: {
                                    xtype: 'combobox', autoLoadOnValue: true, name: 'cbxRuleType',
                                    emptyText: '[Select Rule Type]',allowBlank: false,
                                    bind: {store: '{planclaimruletype}'},
                                    displayField: 'name', valueField: 'value', forceSelection: true,
                                    queryMode: 'local'
                                }
                            },



                            {text: 'Fill Percent', dataIndex: 'fillPercent',width:110,
                                editor: {
                                    //allowBlank: true
                                }
                            },

                            {text: 'Eff Date', dataIndex: 'effDate',width:100,xtype: 'datecolumn',   format:'m/d/Y',
                                editor: {

                                    xtype: 'datefield', emptyText: 'mm/dd/yyyy',format:'m-d-Y',placeHolder:'mm/dd/yyyy',allowBlank: false
                                }
                            },

                            {text: 'Days Supply', dataIndex: 'daysSupply',width:75,
                                editor:{
                                    xtype:'numberfield',    allowDecimals:false, hideTrigger: true
                                }
                            },


                            {text: 'Active', dataIndex: 'active',width:80,xtype: 'checkcolumn',
                                editable:false,
                                editor:{
                                    xtype: 'checkbox',allowBlank: true,checked: true,inputValue: true,
                                    uncheckedValue: false
                                },
                                bind: {
                                    disabled: '{!record.isEditing}'
                                },
                                disabled: true
                            },

                            {
                                xtype: 'widgetcolumn',
                                align: 'center',
                                hideable : false,
                                widget: {
                                    xtype: 'button',
                                    width:75,
                                    text: 'Reject',
                                    iconCls: 'x-action-col-icon x-fa fa-undo',
                                    bind: {

                                        tooltip: 'Reject '
                                    },
                                    handler: 'onUndoChangeClick'

                                },
                                onWidgetAttach: function(col, widget, rec) {

                                    widget.setVisible(rec.get('isUpdated'));
                                    col.mon(col.up('gridpanel').getView(), {
                                        itemupdate: function() {
                                            widget.setVisible(rec.get('isUpdated'));
                                        }
                                    });
                                }

                            }

                        ]
                    },

                    plugins: [
                        {
                            ptype: 'rowediting',
                            reference: 'rowediting',
                            triggerEvent: 'celldblclick',
                            removeUnmodified: true,
                            pluginId: 'rowEditing',
                            //id: 'rowEdit',
                            listeners: {
                                cancelEdit: 'cancelEditButton',
                                edit: 'completeEdit',
                                beforeEdit: 'beforeEdit'
                            }
                        }
                    ],

                    dockedItems: [{
                        xtype: 'panel',
                        title: 'Plan Claim Rules'
                    },{
                        xtype: 'toolbar',
                        dock: 'top',

                        items: [
                            {
                                iconCls: 'x-fa fa-plus-circle',
                                handler: 'onAdd',
                                alignment: 'right',
                                text: 'Add'
                            },
                            {
                                iconCls: 'x-fa fa-remove',
                                handler: 'onRemoveButtonClick',
                                alignment: 'right',
                                text: 'Remove'
                            }

                        ]

                    }]


                }
            ],

            dockedItems: [{
                xtype:'toolbar',
                dock:'bottom',

                items:[
                    '->',
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-edit',
                        handler: 'onAdminEditClick',
                        alignment: 'right',
                        bind:{

                            disabled: '{!canEdit}'
                        },
                        text: 'Admin Edit'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-floppy-o',
                        handler: 'onSaveClick',
                        alignment: 'right',
                        bind:{
                            disabled: '{!isEditing}'
                        },
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-ban',
                        handler: 'onMasterCancelClick',
                        alignment: 'right',
                        bind:{
                            disabled: '{!isEditing}'
                        },
                        text: 'Cancel'
                    }

                ]}]

        }

    ]

});
