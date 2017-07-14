/**
 * Created by rsalekin on 12/29/2016.
 */
Ext.define('Atlas.pharmacy.view.NotesGrid', {
    extend: 'Ext.panel.Panel',
    xtype: 'pharmacy.notes',
    controller: 'pharmacynotes',
    itemId: 'pharmacyNotesGrid',
    viewModel: {
        stores: {
            storePharmacyContractsNotes: {
                model: 'Atlas.common.model.Notes'

            }
        },
        data: {
            parentSystemId: null,
            selectedNoteRecord: {}
        }
    },

    layout: {
        type: 'fit',
        align: 'stretch'
    },

    items: [{
        xtype: 'grid',
        flex: 1,
        width: '100%',
        itemId: 'gpNotes',
        sortable: true,
        listeners: {
            itemDblClick: 'onUpdateNotes'
        },
        selModel: {
            selType: 'rowmodel',
            mode: 'SINGLE',
            listeners: {
                select: 'onGridRowSelect'
            }
        },
        columns: {
            items: [
                {text: 'Subject', flex: 1, dataIndex: 'Subject'},
                {text: 'Note', flex: 1, dataIndex: 'Note'},
                {text: 'Create Date', flex: 1, dataIndex: 'CreateDate', xtype: 'datecolumn', format: 'm/d/Y'},
                {text: 'Create By', flex: 1, dataIndex: 'CreateUser'},
                {text: 'System ID', flex: 1, dataIndex: 'SystemID', hidden: true}
            ]
        },
        bind: {
            store: '{storePharmacyContractsNotes}'
        },
        dockedItems: [
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'btnAddNotes',
                        text: 'Add',
                        handler: 'onAddNotes'
                    },
                    '-',
                    {
                        xtype: 'button',
                        itemId: 'btnUpdateNotes',
                        text: 'Update',
                        disabled: true,
                        handler: 'onUpdateNotes'
                    },
                    '-',
                    {
                        xtype: 'button',
                        itemId: 'btnDeleteNotes',
                        text: 'Delete',
                        disabled: true,
                        handler: 'onDeleteNotes'
                    }
                ]
            }
        ]
    }]
})
