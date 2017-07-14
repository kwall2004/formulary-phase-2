Ext.define('Atlas.portals.view.prescriber.PrescriberFormulary', {
    extend: 'Ext.panel.Panel',
    xtype: 'portalsrxprescriberformulary',
    title: 'Formulary',

    viewModel: 'prescriberformularyviewmodel',
    controller: 'prescriberformularycontroller',

    items: [
        {
            xtype: 'panel',
            cls: 'card-panel',
            title: 'Plan Selection',
            flex: 1,
            items: [{
                xtype: 'toolbar',

                items: [                {
                    xtype: 'combo',
                    fieldLabel: 'Plan',
                    editable: false,
                    selectOnFocus: false,
                    bind: {
                        store: '{formularyPlanGroups}',
                        value: '{fields.planGroupName}'
                    },
                    displayField: 'planGroupName',
                    valueField: 'planGroupName',
                    width: '500px',
                    listeners: {
                        select: 'showDocument'
                    }
                }
                ]
            }
            ]
        },
        {
            xtype: 'tabpanel',
            cls: 'card-panel',
            itemId: 'formularyTabPanel',
            title: 'Documents',
            height: 800
        }
    ]
});