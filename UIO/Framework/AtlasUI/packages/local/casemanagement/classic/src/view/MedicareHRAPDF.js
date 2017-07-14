/**
 * Created by mkorivi on 11/11/2016.
 */
Ext.define('Atlas.casemanagement.view.MedicareHRAPDF', {
    extend: 'Ext.panel.Panel',
    xtype: 'medicarehrapdf',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype:'grid',
            title: 'Member HRA',
            frame: true,
            scrollable: true,
            height: 900,
            columns:{
                items:[
                    { text: 'Seq. No', dataIndex: 'seqNum', flex:1 },
                    { text: 'Type', dataIndex: 'hraType', flex:1 },
                    { text: 'Created By', dataIndex: 'createUser', flex:1 },
                    { text: 'Create Date', dataIndex: 'dispCreateDateTime', flex:1 },
                    { text: 'Completed By', dataIndex: 'completeUser' },
                    { text: 'Date Completed' ,dataIndex: 'dispCompletedDateTime', flex:1 },
                    {
                        text: '',
                        xtype: 'actioncolumn',
                        hideable : false,
                        flex: 1,
                        items: [{
                            iconCls: 'x-fa fa-paperclip',
                            tooltip: 'View',
                            text:'View',
                            handler: 'onViewClick'
                        }]
                    }
                ]
            },

            bind: '{StoreMedicareHRAPDF}',
            dockedItems: [{
                dock:'bottom',
                xtype: 'pagingtoolbar',
                bind:{
                    store: '{StoreMedicareHRAPDF}'
                },
                pageSize:24
            }]
        }
    ]
});
