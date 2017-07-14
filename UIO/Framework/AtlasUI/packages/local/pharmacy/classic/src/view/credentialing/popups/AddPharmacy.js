/**
 * Created by rsalekin on 12/21/2016.
 */
Ext.define('Atlas.pharmacy.view.credentialing.popups.AddPharmacy', {
    extend: 'Ext.window.Window',
    xtype: 'pharmacy-addpharmacy-win',
    controller: 'addpharmacycontroller',
    width: 500,
    height: 400,
    modal: true,
    title: 'Add Pharmacy',
    layout: {
        type: 'fit'
    },
    viewModel: {
        stores: {
            storeNewPharmacy: {
                fields: [
                    {name: 'NCPDPID'},
                    {name: 'PharmacyName'}
                ]
            }
        }
    },
    items: [
        {
            xtype: 'grid',
            itemId: 'grdNewPharmacy',
            plugins: [
                {
                    ptype: 'rowediting',
                    triggerEvent: 'celldblclick',
                    removeUnmodified: true,
                    id: 'rowEdit'
                }
            ],

            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        text: 'Add',
                        reference: 'addButton',
                        handler: 'onAdd',
                        alignment: 'left'
                    }, {
                        text: 'Remove',
                        reference: 'removeButton',
                        handler: 'onRemove',
                        alignment: 'left'
                    }]
                }
            ],

            columns: [
                {
                    text: 'Pharmacy ID',
                    dataIndex: 'NCPDPID',
                    flex: 1,
                    editor: {
                        xtype: 'providertypeahead',
                        reference: 'pharmaSrchboxRef',
                        itemId: 'cbxPhar',
                        displayField: 'Name',
                        allowBlank: false,
                        valueField: 'ncpdpId',
                        forceSelection: true,
                        emptyText: '[e.g. Target Pharmacy MI 48188]',
                        listeners:{
                            select: 'providertypeahead_Select'
                        }
                    }
                },
                {
                    text: 'Pharmacy Name',
                    dataIndex: 'PharmacyName',
                    flex: 1,
                    editor: {
                        itemId: 'txtPharmacyName'
                    }
                }
            ],
            bind: {
                store: '{storeNewPharmacy}'
            }
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    text: 'Save',
                    itemId: 'saveButton',
                    disabled: true,
                    handler: 'onSave',
                    alignment: 'right'
                },
                {
                    text: 'Cancel',
                    itemId: 'btnFaxCancel',
                    handler : function(btn){
                        btn.up('window').close()
                    }
                }
            ]
        }
    ]
});