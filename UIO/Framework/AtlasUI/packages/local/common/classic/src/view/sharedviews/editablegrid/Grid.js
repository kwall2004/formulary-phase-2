/*
 Developer: Tremaine Grant
 Last Developer: Tremaine Grant
 Description: A base component for EditableGridBaseComponent with the initialization of the rowediting plugin included along with editablegrid controller.
 Origin: Merlin
 7/21/2016

 */
Ext.define('Atlas.common.view.sharedviews.editablegrid.Grid', {
    extend: 'Ext.grid.Panel',
    // some may use filters so better to put the requires in here once than all others
    //
    requires:[
        'Ext.grid.filters.Filters'
    ],
    plugins: 'gridfilters',
    xtype: 'common-shared-editablegrid',
    controller: 'common-shared-editablegrid',
    viewModel: 'common-shared-editgridmodel',
    reference: 'editgrid',  //publishes selection for toolbar bindings
    // session: true,
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        ui: 'footer',
        items: [
            {
                text: 'Add',
                bind: {
                    hidden: '{!canCreate}',
                    disabled: '{!isCreatable}'
                },
                handler: 'onAdd'
            },
            {
                text: 'Edit',
                bind: {
                    hidden: '{!canEdit}',
                    disabled: '{!isEditable}'
                },
                handler: 'onEdit'

            },
            {
                text: 'Remove',
                bind: {
                    hidden: '{!canDestroy}',
                    disabled: '{!isDestroyable}'
                },
                handler: 'onRemoveButtonClick'
            },
            {
                text: 'Save',
                bind: {
                    hidden: '{!canSave}',
                    disabled: '{!dirty}'
                },
                handler: 'flushToServer'
            },
            '->',
            {
                text: 'Activate',
                bind: {
                    hidden: '{!canActivate}',
                    disabled: '{!isActivatable}'
                },
                handler: 'onActivateClick'
            },
            {
                text: 'Deactivate',
                bind: {
                    hidden: '{!canDeactivate}',
                    disabled: '{!isDeactivatable}'
                },
                handler: 'onActivateClick'
            },
            {
                text: 'Export',
                bind: {
                    hidden: '{!canExport}',
                    disabled: '{!isExportable}'
                },
                handler: 'onExportClick'
            },
            {
                text: 'Save PDF',
                bind: {
                    hidden: '{!canPDF}',
                    disabled: '{!isPDFable}'
                },
                handler: 'onPDFClick'
            }
        ]
    }]
});