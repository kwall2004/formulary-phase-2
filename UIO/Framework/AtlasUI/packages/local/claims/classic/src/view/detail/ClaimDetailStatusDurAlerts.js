Ext.define('Atlas.claims.view.detail.ClaimDetailStatusDurAlerts', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.grid.Panel'
    ],
    xtype: 'ClaimDetailStatusDurAlerts',
    itemId: 'ClaimDetailStatusDurAlertsID',

    items: [
        {
            xtype: 'fieldset',
            title: 'DUR Alerts',
            collapsible: true,
            items: [
                {
                    xtype: 'grid',
                    height: 200,
                    columns: [{
                        text: 'Significance',
                        flex: 1
                    },{
                        text: 'Reason',
                        flex: 1
                    },{
                        text: 'Description',
                        flex: 1
                    }
                    ]
                }
            ]
        }
    ]
});