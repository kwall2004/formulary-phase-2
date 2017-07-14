Ext.define('Atlas.provider.view.providermanagement.Provider', {
    extend: 'Ext.panel.Panel',
    xtype: 'providerportal-providermanagement-provider',

    title: 'Provider Management',

    items: [{
        xtype: 'panel',
        title: 'Provider Management',
        frame: true,

        items: [{
            xtype: 'hboxform',
            items: [{
                xtype: 'combo',
                fieldLabel: 'Provider'
            },{
                xtype: 'combo',
                fieldLabel: 'LOB'
            },{
                xtype: 'textfield',
                fieldLabel: 'Specialty'
            }]
        },{
            xtype: 'form',
            layout: 'hbox',
            
            defaults: {
                xtype: 'checkbox',
                flex: 1
            },
            
            items: [{
                fieldLabel: 'In-Plan',
                labelWidth: 50
            },{
                fieldLabel: 'PCP',
                labelWidth: 30
            },{
                fieldLabel: 'Accepting New Members',
                labelWidth: 160
            },{
                fieldLabel: 'Provider Open'
            }]
        },{
            xtype: 'tabpanel',
            frame: true,
            
            style: {
                'margin':'10px'
            },
            
            items: [{
                title: 'Enrollment',

                items: [{
                    xtype: 'providerportal-providermanagement-enrollment'
                }]
            },{
                title: 'HEDIS',

                items: [{
                    xtype: 'providerportal-providermanagement-hedis'
                }]
            },{
                title: 'Claims Status',

                items: [{
                    xtype: 'providerportal-providermanagement-claimsstatus'
                }]
            },{
                title: 'HEDIS Self Reporting',
                
                items: [{
                    xtype: 'providerportal-providermanagement-hedisselfreporting'
                }]
            },{
                title: 'Hospital Reports',
                
                items: [{
                    xtype: 'providerportal-providermanagement-hospitalreports'
                }]
            }]
        }]
    }]
});
