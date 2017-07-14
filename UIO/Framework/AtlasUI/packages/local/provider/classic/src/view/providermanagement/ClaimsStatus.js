Ext.define('Atlas.provider.view.providermanagement.ClaimsStatus', {
    extend: 'Ext.panel.Panel',
    xtype: 'providerportal-providermanagement-claimsstatus',

    viewModel:{
        data: {
            claimsstatusinfo:{
                claimscount: '0',
                claimsstatus: 'No Claims Found'
            }
        }
    },
    
    items: [{
        xtype: 'hboxform',
        
        items: [{
            xtype: 'combo',
            fieldLabel: 'Type:'
        },{
            xtype: 'datefield',
            fieldLabel: 'Start Date:',
            labelWidth: 70
        },{
            xtype: 'datefield',
            fieldLabel: 'End Date:',
            labelWidth: 70
        },{
            xtype: 'combo',
            fieldLabel: 'Status:'
        }]
    },{
        xtype: 'hboxform',
        
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Member ID',
            labelWidth: 70
        },{
            xtype: 'button',
            iconCls: 'fa fa-search',
            flex: 0
        },{
            xtype: 'textfield',
            fieldLabel: 'Patient Acc #',
            labelWidth: 80
        },{
            xtype: 'button',
            text: 'Search',
            flex: 0
        }]
    },{
        xtype: 'providerportal-providermanagement-claimsstatusgrid'
    },{
        xtype: 'container',
        
        layout: {
            type: 'hbox',
            pack: 'middle'
        },
        
        defaults: {
            style: {
                'margin':'10px'
            }
        },
        
        items: [{
            xtype: 'displayfield',
            fieldLabel: 'Claims Count',
            labelWidth: 100,
            
            bind: {
                value: '{claimsstatusinfo.claimscount}'
            }
        },{
            xtype: 'button',
            iconCls: 'fa fa-angle-double-left',
            flex: 0
        },{
            xtype: 'displayfield',
            
            bind: {
                value: '{claimsstatusinfo.claimsstatus}'
            }
        },{
            xtype: 'button',
            iconCls: 'fa fa-angle-double-right',
            flex: 0
        }]
    }]
});
