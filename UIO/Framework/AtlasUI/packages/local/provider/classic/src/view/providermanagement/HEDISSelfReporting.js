Ext.define('Atlas.provider.view.providermanagement.HEDISSelfReporting', {
    extend: 'Ext.panel.Panel',
    xtype: 'providerportal-providermanagement-hedisselfreporting',

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
        margin: 5,

        items: [{
            xtype: 'textfield'
        },{
            xtype: 'button',
            text: 'Search'
        }]
    },{
        xtype: 'providerportal-providermanagement-hedisselfreportinggrid'
    },{
        xtype: 'hboxform',
        defaults: {
            flex: 0,
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