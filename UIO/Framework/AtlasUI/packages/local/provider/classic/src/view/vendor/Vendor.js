Ext.define('Atlas.provider.view.vendor.Vendor', {
    extend: 'Ext.panel.Panel',
    xtype: 'providerportal-vendor-vendor',

    title: 'Vendor',
    frame: true,
    defaultType: 'textfield',

    items: [{
        xtype: 'panel',
        title: 'Vendor',
        frame: true,
        
        header: {
            items: [{
                xtype: 'button',
                iconCls: 'fa fa-cog'
            }]
        },
        
        items: [{
            xtype: 'hboxform',
              
            items: [{
                xtype: 'combo',
                editable: false,
                fieldLabel: 'Vendor:'
            },{
                xtype: 'combo',
                editable: false,
                fieldLabel: 'LOB:'
            },{
                xtype: 'datefield',
                fieldLabel: 'Check Date From:',
                labelWidth: 100,
                name: 'startDate'
            },{
                xtype: 'datefield',
                fieldLabel: 'To:',
                name: 'endDate'
            },{
                xtype: 'button',
                text: 'Search',
                flex: 0
            }]
        },{
            xtype: 'form',
            title: 'Chk Details/Ledger',
            frame: true,

            style: {
                'margin-bottom': '20px'
            },

            fieldDefaults: {
                msgTarget: 'side',
                autoFitErrors: false
            },

            items: [{
                xtype: 'providerportal-vendor-vendorgrid'
            }]
        },{
            xtype: 'panel',
            
            layout: {
                type: 'hbox'
            },

            items: [{
                xtype: 'panel',
                
                layout: {
                    type: 'hbox'
                },
                
                items: [{
                    xtype: 'button',
                    text: 'Print'
                },{
                    xtype: 'button',
                    text: 'Clear'
                }]
            }]
        }]
    }]
});
