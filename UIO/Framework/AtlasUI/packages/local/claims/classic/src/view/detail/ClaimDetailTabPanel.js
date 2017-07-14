/**
 * Created by b1343 on 5/20/2016.
 */
Ext.define('Atlas.claims.view.detail.ClaimDetailTabPanel', {
    extend: 'Ext.tab.Panel',
    requires: [
        'Atlas.claims.view.detail.ClaimDetailStatus'
    ],
    xtype: 'claimDetailTabPanel',
    items: [
        {
            xtype: 'claimDetailStatus'
        }
    ]
});