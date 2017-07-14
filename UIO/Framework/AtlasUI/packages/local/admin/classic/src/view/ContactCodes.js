/**
 * Created by S4505 on 10/20/2016.
 * Updated by S4662
 */



Ext.define('Atlas.admin.view.ContactCodes', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.grid.plugin.RowEditing'
    ],
    xtype: 'view-admincontactCodes',
    title: 'Contact Codes',
    name: 'ContactCodes',
    viewModel: 'contactCodesViewModel',
    controller: 'contactCodesController',
    selModel:{
        mode:'MULTI'
    },

    plugins: [
        {
            ptype: 'rowediting',
            removeUnmodified: true,
            autoCancel:false,
            id: 'rowEdit',
            errorSummary: false,
            listeners: {
                'canceledit': function (rowEditing, context) {
                    if (context.record.phantom) {
                        if(context.record.data.SystemID==0)
                            context.store.remove(context.record);
                    }
                },
                beforeedit: 'beforeEditing',
                edit: 'afterEditing'
            }
        },
        {
            ptype: 'gridfilters'
        }
    ],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Add',
            handler: 'onAdd',
            iconCls: 'x-fa  fa-plus-circle',
            reference: 'addButton',
            alignment: 'left'
        }, {
            text: 'Remove',
            reference: 'removeButton',
            iconCls: 'x-fa  fa-minus-circle',
            disabled: true,
            handler: 'onRemove',
            alignment: 'left'
        },
            {
                xtype: 'tbfill'
            },
            {
                text: 'Export to Excel',
                handler: 'exportContactToExcel',
                dock: 'top',
                alignment: 'right'
            }
        ]
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
                    reference: 'saveButton',
                    iconCls: 'x-fa fa-save',
                    disabled: true,
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
                    displayInfo:'true',
                    pageSize: 25,
                    bind: {
                        store: '{contactCodesStore}'
                    }
                }
            ]

        }],
    columns: [

        {
            text: 'Category',
            dataIndex: 'Category',
            renderer: 'displayCategoryFull',
            flex: 1,
            editor: {
                xtype: 'combo',
                bind: {
                    store: '{categoryCodesStore}'
                },
                displayField: 'name',
                forceSelection:true,
                queryMode: 'local',
                valueField: 'value'

            }
            //filter: {
            //    // type: 'string'
            //}
        }, {
            text: 'Reason Code',
            dataIndex: 'ReasonCode',

            flex: .5,
            editor: {
                allowBlank:false
            }
            //filter: {
            //    type: 'string'
            //}
        }, {
            text: 'Short Description',
            dataIndex: 'ShortDescription',

            flex: 1,
            editor: {
                allowBlank:false
            }
            //filter: {
            //    type: 'string'
            //}
        },
        {
            text: 'Description(filter*)',
            dataIndex: 'DESCRIPTION',

            flex: 1,
            editor: {allowBlank:false
            },
            filter: {
                type: 'string'}
        },

        // {
        //     text: 'User Group',
        //     dataIndex: 'GroupPermissions',
        //     flex: 1.5,
        //     filter: {},
        //     renderer: 'renderUserGroup',
        //     editor: {
        //         xtype: 'tagfield',
        //         reference: 'userGroupTagField',
        //         allowBlank: true,
        //         bind: {
        //             store: '{ccusergroups}'
        //         },
        //         selectOnFocus: true,
        //         displayField: 'groupName',
        //         valueField: 'groupId',
        //         queryMode: 'local',
        //         listeners: {
        //             select: 'onSelectUserGroup'
        //         }
        //     }
        //
        // },
        {
            text: 'User Group',
            dataIndex: 'GroupPermissionsData',flex: 1.5,
            editor: {
                xtype: 'combobox',
                bind: {
                    store: '{ccusergroups}'
                },
                queryMode: 'local',
                displayField: 'groupName',
                valueField: 'groupId',
                multiSelect: true,
                listConfig: {
                    getInnerTpl: function(planGroupHierFullName) {
                        return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {' + planGroupHierFullName + '}</div>';
                    }
                }
            },
             renderer: 'renderUserGroup'
        },


        {
            text: 'Active',
            dataIndex: 'ACTIVE',
            listeners: {
                beforecheckchange: function () {
                    return false;
                }
            },
            editor: {
                xtype: 'checkbox',
                inputValue: true,
                uncheckedValue: false
            },
            renderer: function (value) {
                if (value)
                    return 'Yes';
                else
                    return 'No';
            }
            //,

            //filter: {
            //    // type: 'string'
            //}
        },
        {text:'SystemID',dataIndex: 'SystemID',hidden:true},
       /* {
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
                    }
                ]
            }
        },*/
        {
            xtype: 'widgetcolumn',
            align: 'center',
            hideable : false,
            widget: {
                xtype: 'button',
                width:75,
                text: 'Reject',
                iconCls: 'x-action-col-icon x-fa fa-undo',
                bind: {

                    tooltip: 'Reject '
                },
                handler: 'onReject'

            },
            onWidgetAttach: function(col, widget, rec) {

                widget.setVisible(rec.get('isNeedUpdate'));
                col.mon(col.up('gridpanel').getView(), {
                    itemupdate: function() {
                        widget.setVisible(rec.get('isNeedUpdate'));
                    }
                });
            }

        }

    ],
    bind: {
        store: '{contactCodesStore}'
    }
})
;

