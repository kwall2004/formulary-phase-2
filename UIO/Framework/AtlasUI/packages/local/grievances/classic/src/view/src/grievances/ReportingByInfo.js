Ext.define('Atlas.grievances.view.grievances.ReportingByInfo',{
    extend: 'Ext.panel.Panel',
    xtype: 'ReportingByInfo',
    items: [{
        xtype: 'fieldcontainer',
        defaultType: 'radiofield',
        defaults: {
            flex: 1
        },
        layout: 'hbox',
        items: [{
                boxLabel  : 'Member',
                name      : 'reportByType',
                inputValue: 'member',
                id        : 'radio1'
            },{
                xtype: 'textfield',
                emptyText:'[MemberID Name SSN MeridianRxID]'
            },{
                boxLabel  : 'Prescriber',
                name      : 'reportByType',
                inputValue: 'prescriber',
                id        : 'radio2'
            },{
                xtype: 'textfield',
                emptyText:'[NPI DEA PrescriberName Address]'
            }, {
                boxLabel  : 'Pharmacy',
                name      : 'reportByType',
                inputValue: 'pharmacy',
                id        : 'radio3'
            },{
                xtype: 'textfield',
                emptyText:'[NCPDP NPI PharmacyName]'
            }]
        },{
            layout: 'hbox',
            items:[{
                items: [{
                    text: 'First Name:'
                },{
                    text:'value'
                }]
            },{
                items: [{
                    text: 'Last Name:'
                },{
                    text:'value'
                }]
            },{
                items: [{
                    text: 'DOB:'
                },{
                    text:'value'
                }]
            },{
                items: [{
                        text: 'Gender:'
                    },{
                        text:'value'
                    }]
                }]            
            },{
                layout: 'hbox',
                items: [{
                    items:[{
                        text: 'Address:'
                    },{
                        text:'value'
                    }]
                },{
                    items:[{
                        text: 'Pharmacy Name:'
                    },{
                        text:'value'
                    }]
                }]

            }]
});