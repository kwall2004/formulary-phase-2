Ext.define('Atlas.provider.view.providermanagement.Enrollment', {
    extend: 'Ext.panel.Panel',
    xtype: 'providerportal-providermanagement-enrollment',
    
    viewModel:{
        data: {
            claimsstatusinfo:{
                claimscount: '0',
                claimsstatus: 'No Claims Found'
            }
        }
    },
    
    items: [{
        xtype: 'container',
        layout: 'hbox',
        
        defaults: {
            style: {
                'margin':'10px'
            }
        },
        
        items: [{
            xtype: 'combo',
            fieldLabel: 'Locations:',
            labelWidth: 70
        },{
            xtype: 'textfield'
        },{
            xtype: 'button',
            text: 'Search'
        }]
    },{
        xtype: 'providerportal-providermanagement-enrollmentgrid'
    },{
        xtype: 'container',
        layout: 'hbox',
        
        defaults: {
            style: {
                'margin':'10px'
            }
        },
        
        items: [{
            xtype: 'button',
            text: 'Print'
        },{
            xtype: 'button',
            text: 'Print All Providers'
        },{
            xtype: 'button',
            text: 'Export All Providers'
        },{
            xtype: 'button',
            text: 'Print HEDIS'
        },{
            xtype: 'button',
            text: 'Export HEDIS'
        }]
    }]
});
