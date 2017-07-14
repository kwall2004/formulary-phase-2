/**
 * Developer: Jagman Bhullar
 * Description: Manufacture screen with contact information.
 * Origiin: Merlin
 * Modified by s6393 on 12/22/2016 to fix the defects from Test Track
 */
Ext.define('Atlas.rebate.view.Manufacturers', {
    extend: 'Ext.panel.Panel',
    xtype: 'rebatemanufacturers',
    viewModel: 'rebate',
    controller: 'manufacturer',
    title: 'Manufacturers',
    width: '100%',
    height: '100%',
    layout: 'vbox',
    items: [
        {
            xtype: 'form',
            name:'manufacturerForm',
            flex: 2,
            width: '100%',
            autoScroll:true,
            overFlowY : 'scroll',
            overFlowX : 'scroll',

            items: [
                {
                    xtype: 'fieldset',
                    title: 'Manufacturer Information',
                    items: [
                        {
                            xtype : 'container',
                            layout : 'hbox',
                            defaults: {
                                labelWidth: 150,
                                width: 450
                            },
                            items:[
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Manufacturer ID',
                                    name:'manufacturerID',
                                    itemId:'manufacturerID',
                                    maskRe: /[0-9]/,
                                    minLength: 5,
                                    maxLength: 5,
                                    enforceMaxLength: true,
                                    allowBlank: false,
                                    disabled:true
                                },
                                {
                                    xtype: 'container',
                                    padding: '6px, 0px, 0px, 0px',   // T L R B
                                    items: [{
                                        xtype: 'image',
                                        itemId : 'imgManufacturerID',
                                        height: 20,
                                        width: 20,
                                        src: 'resources/images/locked.png'
                                    }]
                                }
                            ]
                        },

                        {
                            xtype : 'container',
                            layout : 'hbox',
                            defaults: {
                                labelWidth: 150,
                                width: 450
                            },
                            items:[
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Manufacturer Name',
                                    name:'Name',
                                    allowBlank: false,
                                    bind: {
                                        disabled: '{!inEdit}'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    padding: '6px, 0px, 0px, 0px',   // T L R B
                                    items: [{
                                        xtype: 'image',
                                        itemId : 'imgManufacturerName',
                                        height: 20,
                                        width: 20,
                                        src: 'resources/images/locked.png'
                                    }]
                                }
                            ]
                        },

                        {
                            xtype : 'container',
                            layout : 'hbox',
                            defaults: {
                                labelWidth: 150,
                                width: 450
                            },
                            items:[
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Address 1',
                                    name:'address1',
                                    allowBlank: false,
                                    bind: {
                                        disabled: '{!inEdit}'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    padding: '6px, 0px, 0px, 0px',   // T L R B
                                    items: [{
                                        xtype: 'image',
                                        itemId : 'imgManufacturerAddress1',
                                        height: 20,
                                        width: 20,
                                        src: 'resources/images/locked.png'
                                    }]
                                }
                            ]
                        },

                        {
                            xtype : 'container',
                            layout : 'hbox',
                            defaults: {
                                labelWidth: 150,
                                width: 450
                            },
                            items:[
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Address 2',
                                    name:'address2',
                                    bind: {
                                        // value: '{manufacturerRec.address2}',
                                        disabled: '{!inEdit}'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    padding: '6px, 0px, 0px, 0px',   // T L R B
                                    items: [{
                                        xtype: 'image',
                                        itemId : 'imgManufacturerAddress2',
                                        height: 20,
                                        width: 20,
                                        src: 'resources/images/locked.png'
                                    }]
                                }
                            ]
                        },

                        {
                            xtype : 'container',
                            layout : 'hbox',
                            defaults: {
                                labelWidth: 150,
                                width: 450
                            },
                            items:[
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'City',
                                    name:'city',
                                    allowBlank: false,
                                    bind: {
                                        disabled: '{!inEdit}'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    padding: '6px, 0px, 0px, 0px',   // T L R B
                                    items: [{
                                        xtype: 'image',
                                        itemId : 'imgManufacturerCity',
                                        height: 20,
                                        width: 20,
                                        src: 'resources/images/locked.png'
                                    }]
                                }
                            ]
                        },

                        {
                            xtype : 'container',
                            layout : 'hbox',
                            defaults: {
                                labelWidth: 150,
                                width: 450
                            },
                            items:[
                                {
                                    xtype: 'combo',
                                    name:'state',
                                    itemId : 'state',
                                    fieldLabel: 'State',
                                    displayField: 'name',
                                    valueField: 'value',
                                    bind: {
                                        store: '{states}',
                                        disabled: '{!inEdit}'
                                    },
                                    publishes: 'value',
                                    queryMode: 'local',
                                    typeAhead: true,
                                    forceSelection: true,
                                    allowBlank: false,
                                    emptyText: '[Select a State]'
                                },
                                {
                                    xtype: 'container',
                                    padding: '6px, 0px, 0px, 0px',   // T L R B
                                    items: [{
                                        xtype: 'image',
                                        itemId : 'imgManufacturerState',
                                        height: 20,
                                        width: 20,
                                        src: 'resources/images/locked.png'
                                    }]
                                }
                            ]
                        },

                        {
                            xtype : 'container',
                            layout : 'hbox',
                            defaults: {
                                labelWidth: 150,
                                width: 450
                            },
                            items:[
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Zip',
                                    name:'zip',
                                    maskRe: /[0-9]/,
                                    maxLength: 10,
                                    enforceMaxLength: 10,
                                    allowBlank: false,
                                    bind: {
                                        disabled: '{!inEdit}'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    padding: '6px, 0px, 0px, 0px',   // T L R B
                                    items: [{
                                        xtype: 'image',
                                        itemId : 'imgManufacturerZip',
                                        height: 20,
                                        width: 20,
                                        src: 'resources/images/locked.png'
                                    }]
                                }
                            ]
                        },
                        {
                            xtype:'hidden',
                            name:'systemID'
                        }
                    ]
                }],
            dockedItems: [
                {
                    dock: 'top',
                    xtype: 'toolbar',
                    ui: 'footer',
                    items: [{
                        xtype: 'combobox',
                        width: '20%',
                        minWidth : 350,
                        name:'manufacturer',
                        reference:'manufacturerCombo',
                        fieldLabel: 'Manufacturer',
                        emptyText: '[Manufacturer]',
                        displayField: 'Name',
                        valueField: 'manufacturerID',
                        bind: {
                            store: '{manufacturerstore}',
                            disabled: '{!inCreate || inEdit}'
                        },
                        listeners: {
                            select: 'onSelect'
                        },
                        queryMode : 'local'
                    }]
                },
                {
                    dock: 'bottom',
                    xtype: 'toolbar',
                    itemId: 'status',
                    iconCls: 'x-fa fa-check-circle',
                   // text: ' Ready',
                    items: [

                        '->',
                        {
                            xtype: 'button',
                            iconCls: 'fa fa-plus-circle',
                            text: 'Create a Manufacturer',
                            handler: 'onCreate',
                            bind: {
                                //disabled: '{!inCreate || inDelete || inEdit}'
                                disabled: '{inEdit}'
                            }
                        },
                        {
                            xtype: 'button',
                            iconCls: 'fa fa-pencil-square-o',
                            text: 'Edit',
                            handler: 'onEdit',
                            bind: {
                                //disabled: '{!manufacturerCombo.selection || inEdit}'
                                disabled: '{!isManufacturerSelected || inEdit}'
                            }
                        },
                        {
                            xtype: 'button',
                            iconCls: 'fa fa-floppy-o',
                            text: 'Save',
                            handler: 'onSave',
                            bind: {
                                disabled: '{!inEdit}'
                            }
                        },
                        {
                            xtype: 'button',
                            iconCls: 'fa fa-times-circle-o',
                            text: 'Cancel',
                            handler: 'onCancel',
                            bind: {
                                disabled: '{!inEdit}'
                            }
                        },
                        {
                            xtype: 'button',
                            iconCls: 'fa fa-minus-circle',
                            text: 'Delete',
                            handler: 'onDelete',
                            bind: {
                                //disabled: '{!manufacturerCombo.selection || inEdit}'
                                disabled: '{!isManufacturerSelected || inEdit}'
                            }
                        }
                    ]
                }]
        },
        {
            xtype: 'grid',
            width: '100%',
            title: 'Contact Information',
            reference:'contactInfoGrid',
            flex: 3,
            bind: {
                store: '{contactstore}'
            },
            listeners: {
                rowdblclick: 'contactInfoGridRowdblClick'
            },
            columns: [
                {text: 'First Name', flex: 1, dataIndex: 'FirstName'},
                {text: 'Last Name', flex: 1, dataIndex: 'LastName'},
                {
                    text: 'Phone',
                    flex: 1,
                    dataIndex: 'Phone'//,
                    // renderer: function(value)
                    // {
                    //     return value.replace(/^(\d{3})(\d{3})(\d{4})$/, '$1-$2-$3');
                    // }

                },
                {text: 'Fax', flex: 1, dataIndex: 'Fax'//,
                    // renderer: function(value)
                    // {
                    //     return value.replace(/^(\d{3})(\d{3})(\d{4})$/, '$1-$2-$3');
                    // }
                },
                {text: 'Email', flex: 1, dataIndex: 'Email'}
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Add Contact Info',
                            iconCls: 'fa fa-plus-circle',
                            handler: 'addContact',
                            bind:
                            {
                                //disabled: '{!manufacturerCombo.selection}'
                                disabled: '{!isManufacturerSelected}'
                            }
                        },
                        {
                            text: 'Update Contact Info',
                            iconCls: 'fa fa-pencil-square-o',
                            handler: 'updateContact',
                            bind:
                            {
                                disabled: '{!contactInfoGrid.selection}'
                            }
                        },
                        {
                            text: 'Delete Contact Info',
                            iconCls: 'fa fa-minus-circle',
                            handler: 'deleteContact',
                            bind:
                            {
                                disabled: '{!contactInfoGrid.selection}'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype:'window',
            iconCls: 'fa fa-plus-circle',
            reference: 'contactWindow',
            modal: true,
            closeAction: 'hide',
            closable: true,
            scrollable: true,
            width: 500,
            items: [
                {
                    name:'contactForm',
                    xtype: 'form',
                    defaultType: 'textfield',
                    fieldDefaults: {
                        labelWidth: 100
                    },
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            fieldLabel:'First Name',
                            name:'FirstName'
                        },
                        {
                            fieldLabel:'Last Name',
                            name:'LastName'
                        },
                        {
                            fieldLabel:'Phone',
                            name:'Phone',
                            //maskRe: /[0-9]/,
                            maxLength: 14,
                            enforceMaxLength: 14,
                            minLength: 14,
                            vtype: 'phone',
                            plugins: {
                                ptype: 'phonenumberformatter'
                            }
                        },
                        {
                            fieldLabel:'Fax',
                            name:'Fax',
                            //maskRe: new RegExp(/[0-9\()\-]/),
                            vtype: 'fax',
                            minLength: 10,
                            plugins: {
                                ptype: 'faxnumberformatter'
                            }
                        },
                        {
                            fieldLabel:'Email',
                            name:'Email',
                            vtype: 'email'
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {
                            text: 'Add',
                            itemId : 'btnAddContactInfo',
                            iconCls: 'fa fa-floppy-o',
                            handler: 'SaveContactInfo'
                        },
                        {
                            text: 'Cancel',
                            iconCls: 'fa fa-times-circle-o',
                            handler: function (btn) {
                                btn.up('window').close()
                            }
                        }
                    ]
                }
            ]

        }
    ]
});