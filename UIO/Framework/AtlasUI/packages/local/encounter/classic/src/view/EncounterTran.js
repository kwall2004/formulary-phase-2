/*
 Developer: Tremaine Grant
 Description: A view 3 grids that show different encounter details.

 */
Ext.define('Atlas.encounter.view.EncounterTran', {
    extend: 'Ext.panel.Panel',
    xtype: 'EncounterTran',
    title: 'Encounter Transmission',
    layout: 'border',
    defaults:{
        fullscreen:true,
        flex:1
    },
    items:[
        {
            title: 'Encounters',
            region: 'center',
            layout:'fit',
            items:[
                {
                    xtype:'grid',
                    columns: [
                        { text:'Encounter Id', dataIndex:''},
                        { text:'Task Name', dataIndex:''},
                        { text:'Batch Name', dataIndex:''},
                        { text:'Create Date Time', dataIndex:''},
                        { text:'Submission Date Time', dataIndex:''},
                        { text:'Type', dataIndex:''},
                        { text:'Total Records', dataIndex:''},
                        { text:'Extract Document', dataIndex:''}
                    ],
                    dockedItems: [{
                        dock:'bottom',
                        xtype: 'pagingtoolbar',
                        pageSize:24
                    }]
                }
            ]
        },
        {
            region:'south',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults:{
                border:true,
                xtype:'panel',
                flex:1
            },
            items:[
                {
                    title: 'Encounter Detail',
                    flex:1.0,
                    items: [{
                        xtype:'grid',
                        columns: [
                            { text:'Record Id', dataIndex:''},
                            { text:'Record Status', dataIndex:''},
                            { text:'Additional Info', dataIndex:''}
                        ],
                        dockedItems: [{
                            dock:'bottom',
                            xtype: 'pagingtoolbar',
                            pageSize:24
                        }]
                    }]
                },
                {
                    title: 'Encounter Reject',
                    flex:1.0,
                    items: [{
                        xtype:'grid',
                        columns: [
                            { text:'Reject Code', dataIndex:''},
                            { text:'Description', dataIndex:''}
                        ],
                        dockedItems: [{
                            dock:'bottom',
                            xtype: 'pagingtoolbar',
                            pageSize:24
                        }]
                    }]
                }
            ]
        }
    ]

});
