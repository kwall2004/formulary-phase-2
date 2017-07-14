Ext.define('Atlas.plan.view.group.AddressForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.plan-group-addressform',
    controller: 'plan-group-addressform',
    viewModel: 'plan-group-addressform',
    defaults: {
        margin: 10
    },
    items: [
        {
            xtype: 'container',
            region: 'center',
            padding: 50,
            //flex: 3,
            layout: {
                type : 'hbox',
                align :'stretch',
                pack:'center'

            },
            collapsible: false,
            items: [
                // start top content section ------------------------------------------------------------
                {
                    xtype: 'container',
                    // margin: 100,
                    reference:'planAddressContainer1',
                    flex: 1,
                    defaults: {
                        labelWidth: 100,
                        flex: 1,
                        xtype: 'textfield',
                        minWidth: 400

                    },
                    items: [
                        {
                            fieldLabel: 'Address Type',
                            name: 'AddressType',
                            //dataIndex:'AddressType',
                            allowBlank: false,
                            reference:'addressType'
                        }, {
                            fieldLabel: 'Address1',
                            name: 'Address1',
                            //dataIndex:'Address1',
                            emptyText: '',
                            allowBlank: false
                        }, {
                            fieldLabel: 'Address2',
                            name: 'Address2',
                            //dataIndex:'Address2',
                            emptyText: '',
                            allowBlank: true
                        }, {
                            fieldLabel: 'City',
                            name: 'City',
                            //dataIndex:'City',
                            emptyText: '',
                            allowBlank: false
                        },
                        {
                            xtype: 'combobox',
                            autoLoadOnValue: true,
                            name: 'State',
                            //dataIndex:'State',
                            fieldLabel: 'State',
                            emptyText: 'Select an state',
                            allowBlank: false,
                            bind: {store: '{states}'},
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local'
                        }
                        , {
                            fieldLabel: 'Zip Code',
                            name: 'ZipCode',
                            //dataIndex:'ZipCode',
                            xtype:'textfield',
                            maskRe:/\d/,
                            emptyText: '',
                            allowBlank: false,
                            enforceMaxLength:true,
                            maxLength: 5,
                            minLength:5
                        }
                    ]
                },

                {
                    xtype:'container',
                    reference:'planAddressContainer2',
                    flex: 1,
                    defaults: {
                        labelWidth: 100,
                        flex: 1,
                        xtype: 'textfield',
                        minWidth: 400
                    },
                    items: [
                        {
                            fieldLabel: 'Phone',
                            name: 'PlanPhone',
                            //dataIndex:'PlanPhone',
                            vtype: 'phone',
                            plugins: {
                                ptype: 'phonenumberformatter'
                            },
                            enforceMaxLength:true,
                            maxLength:14,
                            allowBlank: false
                        }, {
                            fieldLabel: 'Extension',
                            name: 'PhoneExt',
                            //dataIndex:'PhoneExt',
                            enforceMaxLength:true,
                            emptyText: '',
                            maxLength: 5,
                            allowBlank: true
                        }, {
                            fieldLabel: 'Web Address',
                            name: 'WebAddress',
                            //dataIndex:'WebAddress',
                            emptyText: '',
                            allowBlank: true
                        }, {
                            fieldLabel: 'Fax',
                            name: 'Fax',
                            vtype: 'phone',
                            plugins: {
                                ptype: 'phonenumberformatter'
                            },
                            emptyText: '',
                            enforceMaxLength:true,
                            maxLength: 14,
                            minLength:14,
                            allowBlank: true
                        }, {
                            fieldLabel: 'Email',
                            name: 'Email',
                            vtype: 'email',
                            emptyText: '',
                            allowBlank: true
                        },
                        {
                            xtype: 'checkbox',
                            name: 'ShowOnPortal',
                            fieldLabel: 'Portal Address'
                        }

                    ]
                }
            ]

        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',

        items: [
            '->',

            {
                xtype: 'button',
                iconCls: 'x-fa fa-edit',
                handler: 'onCreateAddressClick',
                reference: 'btnCreate',
                alignment: 'right',
                bind: {
                    disabled: '{!canEdit}'
                },
                text: 'Create Address'
            },
            {
                xtype: 'button',
                iconCls: 'x-fa fa-edit',
                handler: 'onEditClick',
                reference: 'btnEdit',
                alignment: 'right',
                bind: {
                    disabled: '{!canEdit}'
                },
                text: 'Edit Address'
            },
            {
                xtype: 'button',
                iconCls: 'x-fa fa-floppy-o',
                handler: 'onSaveClick',
                reference: 'btnSave',
                alignment: 'right',
                bind: {
                    disabled: '{!isEditing}'
                },
                text: 'Save'
            },
            {
                xtype: 'button',
                iconCls: 'x-fa fa-ban',
                handler: 'onCancelClick',
                reference: 'btnCancel',
                alignment: 'right',
                bind: {
                    disabled: '{!isEditing}'
                },
                text: 'Cancel'
            },
            {
                xtype: 'button',
                iconCls: 'x-fa fa-ban',
                handler: 'onDeleteClick',
                reference: 'btnDelete',
                bind: {
                    disabled: '{!canEdit}'
                },
                alignment: 'right',
                text: 'Delete'
            }
        ]
    }]
});