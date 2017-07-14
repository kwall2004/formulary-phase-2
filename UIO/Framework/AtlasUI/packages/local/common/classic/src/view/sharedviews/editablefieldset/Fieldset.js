Ext.define('Atlas.common.view.sharedviews.editablefieldset.Fieldset', {
    extend: 'Ext.panel.Panel',
    xtype: 'common-shared-editablefieldset',
    controller: 'common-shared-editablefieldset',
    //viewModel: 'common-shared-editablefieldsetmodel',

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',

        defaults: {
            xtype: 'button'
        },

        items: [{
            text: 'Create',
            itemId: 'createFieldset',
            iconCls: 'x-fa fa-plus-circle',
            handler: 'onAdd'
        },{
            text: 'Edit',
            itemId: 'editFieldset',
            iconCls: 'x-fa fa-pencil',
            handler: 'onEdit',
            disabled: true
        },{
            text: 'Delete',
            itemId: 'deleteFieldset',
            iconCls: 'x-fa fa-minus-circle',
            disabled: true
        }]
    }]
});