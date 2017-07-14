Ext.define('Atlas.admin.view.LetterTemplate', {
    extend: 'Ext.panel.Panel',
    xtype: 'admin-lettertemplate',
    title: 'Letter Template',
    reference: 'admin-lettertemplate',
    controller: 'admin-lettertemplateController',
    viewModel: {
        stores: {
            lettertemplate: {
                model: 'Atlas.admin.model.LetterTemplate',
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
            }
        }
    },
    layout: 'border',
    items: [
        {
            title: 'Letter Template',
            xtype: 'grid',
            reference: 'mainGrid',
            region: 'center',
            flex: 2,
            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    {
                        text: 'Plan Group Hierarchy',
                        dataIndex: 'PlanGroupAccess',
                        renderer: 'getPlanGroupHierarchText'
                    },
                    {
                        text: 'Reason',
                        dataIndex: 'Reason'
                    },
                    {
                        text: 'Language',
                        dataIndex: 'LANGUAGE'
                    }
                ]
            },
            bind: {
                store: '{lettertemplate}'
            },
            dockedItems: [{
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    pageSize: 25,
                    displayInfo: 'true',
                    bind: {
                        store: '{lettertemplate}'
                    }
                }
            ]

        },
        {
            //xtype: 'panel',
            xtype:'form',
            reference:'letterForm',

            flex: 1,
            region: 'south',
            title: 'Letter Template Details',
            layout: 'hbox',
            defaults: {
                xtype: 'container',
                margin: 10,
                flex: 1,
                border: false,
                frame: false

            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    alignment: 'right',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            text: 'Create',
                            handler: 'onCreate',
                            reference:'createButton',
                            iconCls: 'fa  fa-plus-circle'
                        }, {
                            text: 'Edit',
                            reference:'editButton',
                            handler:'onEdit',
                            iconCls: 'fa fa-edit',
                            disabled:true
                        }, {
                            text: 'Save',
                            reference:'saveButton',
                            handler:'onSave',
                            iconCls: 'fa fa-save',
                                disabled:true
                        },
                        {
                            text: 'Cancel',
                            reference:'cancelButton',
                            handler: 'onCancel',
                            iconCls: 'fa fa-remove',
                            disabled:true
                        },
                        {
                            text: 'Delete',
                            reference:'deleteButton',
                            handler: 'onDelete',
                            iconCls: 'x-fa  fa-minus-circle',
                            disabled:true
                        }
                    ]
                }
            ],

            items: [
                {
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        flex: 1,
                        labelWidth: 200
                    },
                    items: [
                        // {
                        //     xtype: 'tagfield',
                        //     allowBlank: false,
                        //     forceSelection: true,
                        //     fieldLabel: 'Plan Group Hierarchy',
                        //     reference: 'pghtagfield',
                        //     disabled:true,
                        //     queryMode: 'local',
                        //     bind: {
                        //         store: '{planGroupHierarchyExt}'
                        //     },
                        //     displayField: 'PGH',
                        //     valueField: 'SystemID',
                        //     listeners: {
                        //         select: 'onSelectPGHTagField'
                        //     }
                        // },
                        {
                            xtype: 'combobox',
                            multiSelect: true,
                            queryMode: 'local',
                            reference: 'pghtagfield',
                            disabled:true,
                            fieldLabel: 'Plan Group Hierarchy',
                            listConfig: {
                                getInnerTpl: function(PGH) {
                                    return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {' + PGH + '}</div>';
                                }
                            },
                            allowBlank: false,
                            forceSelection: true,
                            autoSelect:true,
                            autoLoadOnValue: true,
                            displayField: 'PGH',
                            valueField: 'SystemID',
                            bind: {store: '{planGroupHierarchyExt}'},
                            listeners: {
                                select: 'onSelectPGHTagField'
                            }
                        },

                        {
                            fieldLabel: 'Reason',
                            allowBlank: false,
                            xtype: 'textarea',
                            reference: 'ReasonText',
                            disabled:true
                        }
                    ]
                },
                {
                    fieldLabel: 'Language',
                    allowBlank:false,
                    reference: 'LanguageText',
                    xtype: 'textarea',
                    disabled:true,
                    height : '100%'
                }


            ]
        }]
});

