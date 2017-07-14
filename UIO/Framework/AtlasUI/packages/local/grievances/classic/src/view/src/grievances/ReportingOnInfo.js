Ext.define('Atlas.grievances.view.grievances.ReportingOnInfo',{
    extend: 'Ext.panel.Panel',
    xtype: 'ReportingOnInfo',
    items: [
        {
            xtype: 'fieldcontainer',
            defaultType: 'radiofield',
            defaults: {
                flex: 1
            },
            layout: 'hbox',
            items:[
                {
                    boxLabel  : 'Prescriber',
                    name      : 'reportOnType',
                    inputValue: 'member',
                    id        : 'radio4'
                },{
                    xtype: 'textfield',
                    emptyText:'[MemberID Name SSN MeridianRxID]'
                },{
                    boxLabel  : 'Pharmacy',
                    name      : 'reportOnType',
                    inputValue: 'prescriber',
                    id        : 'radio5'
                },{
                    xtype: 'textfield',
                    emptyText:'[NPI DEA PrescriberName Address]'
                },{
                    boxLabel  : 'PBM',
                    name      : 'reportOnType',
                    inputValue: 'pharmacy',
                    id        : 'radio6'
                },{
                    xtype: 'textfield',
                    emptyText:'[NCPDP NPI PharmacyName]'
                }
            ]
        },{
            layout: 'hbox',
            items:[
                {
                    items: [
                        {
                            xtype: 'label',
                            text: 'First Name:'
                        },{
                            xtype: 'label',
                            text:'value'
                        }
                    ]
                },{
                    items: [
                        {
                            xtype: 'label',
                            text: 'Last Name:'
                        },{
                            xtype: 'label',
                            text:'value'
                        }
                    ] 
                }
            ]
        },{
            layout: 'hbox',
            items: [
                {
                    items:[
                        {
                            xtype: 'label',
                            text: 'Address:'
                        },{
                            xtype: 'label',
                            text:'value'
                        }
                    ]
                },{
                    items:[
                        {
                            xtype: 'label',
                            text: 'Pharmacy Name:'
                        },{
                            xtype: 'label',
                            text:'value'
                        }
                    ]   
                }
            ]
        }
    ]

});