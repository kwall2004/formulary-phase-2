Ext.define('Atlas.admin.view.Signatures', {
    extend: 'Ext.grid.Panel',
    xtype: 'admin-signatures',
    title: 'Signatures',
    controller: 'admin-signatures',
    reference: 'admin-signatures',
    viewModel: 'adminSignaturesViewModel',
    selModel:{
        mode:'MULTI'
    },
    plugins: [
        {
            ptype: 'rowediting',
            //triggerEvent: 'celldblclick',
            clicksToEdit: 2,
            errorSummary: false,
            removeUnmodified: true,
            id: 'rowEdit',
            autoCancel:false,
            listeners: {
               // edit: 'afterEditing',
                beforeEdit: 'beforeEdit'//,
                //canceledit: 'cancelEditing'
            }
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                text: 'Add',
                reference:'addButton',
                iconCls: 'x-fa  fa-plus-circle',
                handler: 'onAdd',
                alignment: 'left'
            }, {
                text: 'Remove',
                disabled:true,
                reference:'removeButton',
                iconCls: 'x-fa  fa-minus-circle',
                handler: 'onRemove',
                alignment: 'left'
            }

            ]
        },
        {
            xtype:'toolbar',
            dock:'bottom',
            items:[
                {
                    xtype: 'tbfill'
                },
                {
                    text: 'Save',
                    reference:'saveButton',
                    iconCls: 'x-fa fa-save',
                    disabled:true,
                    handler: 'onSave',
                    alignment: 'right'
                }
            ]
        },

        {
            xtype: 'toolbar',
            dock: 'bottom',
            layout:'fit',
            items:[
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    hideRefresh:true,
                    displayInfo: 'true',
                    pageSize: 25,
                    bind: {
                        store: '{signaturesStore}'
                    }
                }
            ]

        }    ],
    columns: {
       /* defaults: {
            flex: 1,
            editor: {}
        },*/
        items: [
            {text:'Signature Id',dataIndex: 'signatureId',flex:1,editor:{
                allowBlank:false
            }},
            {text:'Signature Group',dataIndex: 'signatureGroup',flex:1,editor:{allowBlank:false}},
            {text:'Person Title',dataIndex: 'personTitle',flex:1,editor:{}},
            {text:'First Name',dataIndex: 'firstName',flex:1,editor:{allowBlank:false}},
            {text:'Last Name',dataIndex: 'lastName',flex:1,editor:{allowBlank:false}},
            {text:'Suffix',dataIndex: 'suffix',flex:1,editor:{}},
            {text:'Credentials',dataIndex: 'credentials',flex:1,editor:{}},
            {text:'systemID',dataIndex: 'systemID',flex:1,hidden:true},
            {
                text:'Post Script FileName',dataIndex: 'postscriptFilename',
                editor: {
                    xtype:'combo',
                    bind:{
                        store:'{postscriptnamesStore}'
                    },
                    selectOnFocus:true,
                    displayField: 'PSName',
                    valueField: 'PSName',
                    forceSelection:true,
                    queryMode: 'local',
                    allowBlank:false

                },
                flex:1
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
                            handler:'onReject'

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


        ]
    },
    bind: {
        store: '{signaturesStore}'
    }
});