Ext.define('Atlas.provider.view.providermanagement.HEDIS', {
    extend: 'Ext.panel.Panel',
    xtype: 'providerportal-providermanagement-hedis',
    
    viewModel:{
        data: {
            hedisSelfReportingInfo:{
                membercount: '10',
                membersshown: '1'
            }
        }
    },
    
    items: [{
        xtype: 'container',
        layout: 'hbox',
        
        defaults: {
            flex: 1
        },
        
        items: [{
            xtype: 'panel',
            frame: true,
            title: 'Measure',
            flex: 3,
            items: [{
                xtype: 'x-layout-accordion'
            }]
        },{
            xtype: 'panel',
            frame: true,
            title: 'Members'
        },{
            xtype: 'panel',
            frame: true,
            title: 'Bonus Paid YTD'
        },{
            xtype: 'panel',
            frame: true,
            title: 'Possible Bouns'
        }]
    },{
        xtype: 'container',
        
        layout: {
            type: 'hbox'
        },
        
        defaults: {
            margin: 10
        },
        
        items: [{
            xtype: 'button',
            text: 'Print HEDIS'
        },{
            xtype: 'displayfield',
            fieldLabel: 'Member Count Due for HEDIS',
            labelWidth: 200,
            
            bind: {
                value: '{hedisSelfReportingInfo.membercount}'
            }
        },{
            xtype: 'button',
            iconCls: 'fa fa-angle-double-left',
            flex: 0
        },{
            xtype: 'displayfield',
            fieldLabel: 'Showing',
            labelWidth: 50,
            
            bind: {
                value: '{hedisSelfReportingInfo.membersshown}'
            }
        },{
            xtype: 'displayfield',
            fieldLabel: 'to',
            labelWidth: 30,
            
            bind: {
                value: '{hedisSelfReportingInfo.membercount}'
            }
        },{
            xtype: 'displayfield',
            fieldLabel: 'members',
            labelWidth: 45
        },{
            xtype: 'button',
            iconCls: 'fa fa-angle-double-right',
            flex: 0
        }]
    }]
});
