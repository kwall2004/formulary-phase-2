Ext.define('Atlas.plan.view.group.AllowedPrescriberList', {
    extend: 'Ext.panel.Panel',
    xtype: 'widget.plan-group-allowedprescriberlist',
    alias: 'widget.plan-group-allowedprescriberlist',
    title: '~PlanPrescriberList',

    controller: 'plan-group-allowedprescriberlist',

    layout: 'border',
    items: [
        {
            region: 'center',
            layout: 'fit',
            flex: 3,
            alighnment: 'center',
            items: [
                {
                    xtype: 'grid',
                    reference: 'AllowedPrescriberListgrid',
                    viewModel:
                    {
                        type: 'common-shared-editgridmodel',
                        data:
                        {
                            //note: this needs to move to controller with user permissions
                            userpermissions:
                            {
                                create: true,
                                //update: true,
                                destroy: true
                            }
                        }
                    },
                    bind: {
                        store: '{allowedprescriber}'
                    },

                    columns:{
                        defaults:{
                            flex:1
                        },
                        items: [
                            //{text: 'NPI', dataIndex: ''},

                            {text: 'NPI', dataIndex: 'NPI', id:'NPIId',
                                editor: {
                                    xtype: 'prescribertypeahead', autoLoadOnValue: true, name: 'NPI',
                                    emptyText: '[e.g. Dr. Smith]',allowBlank: false,
                                    listeners: {
                                        select: 'onNPISelect'
                                    }


                                }
                            },

                            {text: 'Prescriber Name', dataIndex: 'PrescriberName',itemId:'prescriberName',
                                editor: {
                                    allowBlank: true,name:'prescriberName',readOnly:true
                                }
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
                        title: 'Plan Prescriber List'
                    },{
                        xtype:'toolbar',
                        dock:'top',

                        items:[
                            {
                                iconCls: 'x-fa fa-plus-circle',
                                handler: 'onAdd',
                                alignment: 'right',
                                //id: 'btnAdd',
                                bind:{
                                    //hidden: '{!canEdit}'
                                },


                                text: 'Add'
                            },
                            {
                                iconCls: 'x-fa fa-remove',
                                handler: 'onRemoveButtonClick',
                                alignment: 'right',
                                //id:'btnRemove',
                                bind:{
                                    //hidden: '{!isEditing}'
                                },
                                text: 'Remove'
                            }

                        ]

                    }]
                }
            ],
            // bind: {
            //     store: '{allowedprescriber}'
            // },

            dockedItems: [{
                xtype:'toolbar',
                dock:'bottom',

                items:[
                    '->',
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-edit',
                        handler: 'onAdminEditClick',
                        itemid : 'btnAdminEdit',
                        //xtype: 'button',
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
                        itemid: 'btnSave',
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
                        itemid: 'btnCancel',
                        alignment: 'right',
                        bind:{
                            disabled: '{!isEditing}'
                        },
                        text: 'Cancel'
                    }

                ]}]

        }]

});