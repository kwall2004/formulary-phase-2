Ext.define('Atlas.portals.view.rxmember.Formulary', {
    extend: 'Ext.panel.Panel',
    xtype: 'portalsrxmemberformulary',
    title: 'Formulary',
    layout: 'fit',

    items: [{
        xtype: 'grid',
        title: 'Formulary',
        controller: 'ViewFormulary',
        cls: 'card-panel',

        viewModel: {
            stores: {
                Formularystore: {
                    model: 'Atlas.portals.model.Formulary'
                }
            }
        },

        bind: '{Formularystore}',

        columns: [
            {
                text: 'Document',
                dataIndex: 'planGroupId',
                flex: 1,
                xtype: 'actioncolumn',
                menuDisabled: true,
                sortable: false,
                align: 'center',
                items: [{
                    xtype: 'button',
                    handler: 'onBtnClick',
                    iconCls: 'x-fa fa-paperclip'
                }]
            },        {
                text: 'Plan',
                dataIndex: 'planGroupName',
                flex: 1
            }
        ]
    }]
});