/**
 * Created by b1343 on 5/23/2016.
 */
Ext.define('Atlas.claims.view.detail.ClaimDetailStatusPharmacyInfo', {
    extend: 'Ext.Container',
    xtype: 'claimDetailStatusPharmacyInfo',
    itemId: 'claimDetailStatusPharmacyInfoID',

    items: [
        {
            xtype: 'fieldset',
            title: 'Pharmacy',
            collapsible: true,
            items: [{
                xtype: 'fieldcontainer',
                defaults: {
                    labelWidth: 140
                },
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Provider Name',
                    margin: '0 0 0 0',
                    bind: {
                        value: '<b>{pharmacyrecord.name}</b>'
                    }
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Provider Address',
                    margin: '0 0 0 0',
                    bind: {
                        value: '{pharmacyrecord.locAddress1}'
                    }
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'State/City',
                    margin: '0 0 0 0',
                    bind: {
                        value: '{pharmacyrecord.locCity}, {pharmacyrecord.locState} {pharmacyrecord.zip}'
                    }
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Phone',
                    margin: '0 0 0 0',
                    bind: {
                        value: '{pharmacyrecord.phone}'
                    }
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Fax',
                    margin: '0 0 0 0',
                    bind: {
                        value: '{pharmacyrecord.fax}'
                    }
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Service Type',
                    width: '100%',
                    margin: '0 0 0 0',
                    bind: {
                        value: '{masterrecord.PharmacyServType}'
                    }
                }]
            }]
        }
    ]
});