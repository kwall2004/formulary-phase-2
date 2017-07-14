Ext.define('Atlas.provider.view.providermanagement.HospitalReports', {
    extend: 'Ext.panel.Panel',
    xtype: 'providerportal-providermanagement-hospitalreports',
    
    viewModel: {
        data: {
            hospitalreportinfo: {
                patientcount: '0',
                record: 'No Records Found'
            }
        }
    },

    items: [{
        xtype: 'hboxform',
        
        items: [{
            xtype: 'combo',
            fieldLabel: 'Report',
            flex: 3
        },{
            xtype: 'datefield',
            fieldLabel: 'Start Date',
            labelWidth: 60
        },{
            xtype: 'datefield',
            fieldLabel: 'End Date',
            labelWidth: 60
        },{
            xtype: 'button',
            text: 'Preview Report',
            flex: 0
        }]
    },{
        xtype: 'providerportal-providermanagement-hospitalreportsgrid'
    },{
        xtype: 'hboxform',

        defaults: {
            margin: 10
        },
        
        items: [{
            xtype: 'button',
            text: 'Export Report'
        },{
            xtype: 'displayfield',
            fieldLabel: 'Claims Count',
            labelWidth: 100,
            
            bind: {
                value: '{hospitalreportinfo.patientcount}'
            }
        },{
            xtype: 'button',
            iconCls: 'fa fa-angle-double-left',
            flex: 0
        },{
            xtype: 'displayfield',
            
            bind: {
                value: '{hospitalreportinfo.record}'
            }
        },{
            xtype: 'button',
            iconCls: 'fa fa-angle-double-right',
            flex: 0
        }]
    }]
});