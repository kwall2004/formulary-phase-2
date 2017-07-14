/**
 * Created by b1343 on 5/23/2016.
 */
Ext.define('Atlas.claims.view.detail.ClaimDetailStatusAuditLog', {
    extend: 'Ext.Container',
    xtype: 'claimDetailStatusAuditLog',

    items: [
        {
            xtype: 'fieldset',
            title: 'Audit Log',
            collapsible: true,
            items: [
                {
                    xtype: 'grid',
                    height: 200,
                    columns: [{
                        text: 'Log ID',
                        flex: 1
                    },{
                        text: 'Logged Item Date',
                        flex: 1
                    },{
                        text: 'Log Item Source (user, system)',
                        flex: 1
                    }],
                    dockedItems: [{
                        xtype: 'pagingtoolbar',
                        dock: 'bottom',
                        displayInfo: true
                    }]
                }
            ]
        }
    ]
});