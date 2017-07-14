Ext.define('Atlas.portals.view.hpmember.PlanSelectionWindow', {
    extend: 'Ext.window.Window',
    xtype: 'portalshpmemberplanselectionwindow',
    title: 'Plan Selection',

    controller: 'planselectionwindow',
    viewModel: {
        stores: {
            planstore: {
                proxy: {
                    type: 'memory'
                }
            }
        }
    },

    modal: true,

    items: [
        {
            xtype: 'container',
            padding: 10,
            reference: 'planSelection',
            items: [
                {
                    xtype: 'combo',
                    reference: 'stateCombo',
                    fieldLabel: 'State',
                    store: {
                        fields: ['name'],
                        data: [
                            {name: 'IL'},
                            {name: 'MI'}
                        ]
                    },
                    displayField: 'name',
                    valueField: 'name',
                    name: 'stateCombo',
                    listeners: {
                        change: 'hidePlanSelect'
                    }
                },
                {
                    xtype: 'combo',
                    reference: 'planCombo',
                    fieldLabel: 'Plan',
                    hidden: true,
                    bind: {
                        store: '{planstore}'
                    },
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'value',
                    name: 'planCombo',
                    listeners: {
                        afterrender: 'getPlanNames',
                        select: 'showPlanCard'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            padding: 10,
            reference: 'cardContainerRef',
            hidden: true
        },
        {
            xtype: 'container',
            padding: 10,
            reference: 'servicesNumContainer'
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype: 'button',
                    text: 'Cancel',
                    reference: 'cancelButton',
                    handler: 'onCancel'
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Continue',
                    reference: 'continue',
                    handler: 'loginUser'
                }
            ]
        }
    ]
});