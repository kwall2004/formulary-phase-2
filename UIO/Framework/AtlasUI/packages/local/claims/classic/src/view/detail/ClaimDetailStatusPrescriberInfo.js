/**
 * Created by b1343 on 5/23/2016.
 */
Ext.define('Atlas.claims.view.detail.ClaimDetailStatusPrescriberInfo', {
    extend: 'Ext.Container',
    xtype: 'claimDetailStatusPrescriberInfo',
    itemId: 'claimDetailStatusPrescriberInfoID',
    viewModel: 'claims-claimstoolbar',

    items: [{
        xtype: 'fieldset',
        title: 'Prescriber Info',
        collapsible: true,
        items: [{
            xtype: 'fieldcontainer',
            defaults: {
                labelWidth: 140
            },
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'Prescriber Name',
                margin: '0 0 0 0',
                bind: {
                    value: '<b>{prescriberrecord.fullname}</b>'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Address',
                margin: '0 0 0 0',
                bind: {
                    value: '{prescriberrecord.locaddr1}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'State/City',
                margin: '0 0 0 0',
                bind: {
                    value: '{prescriberrecord.citystatezip}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Phone',
                margin: '0 0 0 0',
                bind: {
                    value: '{prescriberrecord.locphone}'
                }
            }]
        }]
    }]
});