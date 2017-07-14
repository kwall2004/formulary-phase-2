Ext.define('Atlas.provider.view.prescriberhome.PrescriberHome', {
    extend: 'Ext.panel.Panel',
    xtype: 'prescriberportal-prescriberhome-prescriberhome',
    store: 'store.memberInfoStore',

    title: 'Home - Dashboard',

    items: [{
        xtype: 'container',
        layout: 'hbox',
        
        defaults: {
            flex: 1
        },
        
        items: [{
            xtype: 'container',
            
            items: [{
                xtype: 'panel',
                collapsible: true,
                frame: true,
                title: 'Claims (Last 30 Days)',
                margin: 10,
                padding: 10,
                
                items: [{
                    xtype: 'hboxform',
                    frame: false,
                    
                    items: [{
                        xtype: 'combo',
                        editable: false,
                        fieldLabel: 'Status'
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Member',
                        name: 'memberInput',
                        itemId: 'memberInput',
                        allowBlank: false
                    }]
                },{
                    xtype: 'prescriberportal-prescriberhome-claims',
                    padding: 10
                }]
            },{
                xtype: 'panel',
                collapsible: true,
                frame: true,
                title: 'HEDIS',
                margin: 10,

                items: [{
                    xtype: 'prescriberportal-prescriberhome-hedis'
                }]
            }]
        },{
            xtype: 'container',
            
            items: [{
                xtype: 'panel',
                collapsible: true,
                frame: true,
                title: 'Formulary Drug Search',
                margin: 10,
                padding: 10,
                
                items: [{
                    xtype: 'hboxform',
                    
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Plan',
                        name: 'planInput',
                        itemId: 'planInput',
                        allowBlank: false
                    },{
                        xtype: 'combo',
                        editable: false,
                        fieldLabel: 'Medication',
                        labelWidth: 70
                    }]
                },{
                    xtype: 'prescriberportal-prescriberhome-formularydrugsearch',
                    padding: 10
                }]
            },{
                xtype: 'panel',
                collapsible: true,
                frame: true,
                title: 'Prior Authorizations (Last 30 Days)',
                margin: 10,
                padding: 10,

                items: [{
                    xtype: 'hboxform',
                    
                    items: [{
                        xtype: 'combo',
                        editable: false,
                        fieldLabel: 'Auth Status',
                        labelWidth: 80,
                        flex: 4
                    },{
                        xtype: 'button',
                        text: 'Export'
                    }]
                },{
                    xtype: 'prescriberportal-prescriberhome-formularydrugsearch',
                    padding: 10
                }]
            },{
                xtype: 'panel',
                collapsible: true,
                frame: true,
                title: 'Communications',
                margin: 10,
                
                items: [{
                    xtype: 'prescriberportal-prescriberhome-communications'
                }]
            }]
        }]
    }]
});
