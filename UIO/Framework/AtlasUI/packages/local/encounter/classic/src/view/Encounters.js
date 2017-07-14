/*
 Developer: Tremaine Grant
 Description: A view 3 grids that show different encounter details.
 */
Ext.define('Atlas.encounter.view.Encounters', {
    extend: 'Ext.panel.Panel',
    xtype: 'view-encountersencounters',
    title: 'Encounters',
    height: '100%',
    layout: 'border',
    controller: 'encountersencounterscontroller',
    viewModel: 'encountersencountersviewmodel',
    id: 'view-encountersencounters',
    defaults:{
        fullscreen:true
    },
    items:[{
        title: 'Encounters',
        region: 'center',
        height: '60%',
        layout:'fit',
        items:[{
            xtype:'gridpanel',
            id: 'encGrid',
            bind: '{encountersGrid}',
            plugins: [
                'gridfilters'
            ],
            listeners: {
                select: 'selectEncounter'
            },
            columns: [{
                text:'Encounter Id',
                dataIndex:'EncounterId',
                filter: {
                    type: 'number'
                },
                flex: 1
            }, {
                text: 'Task Config ID',
                dataIndex: 'TaskConfigId',
                hidden: true,
                filter: {
                    type: 'number'
                },
                flex: 1
            }, {
                text:'Task Name',
                dataIndex:'TaskName',
                filter: {
                    type: 'string'
                },
                flex: 1
            }, {
                text:'Batch Num',
                dataIndex:'BatchNum',
                filter: {
                    type: 'string'
                },
                flex: 1
            }, {
                xtype: 'datecolumn',
                format: 'm/d/Y H:i:s',
                text:'Create Date Time',
                dataIndex:'CreateDateTime',
                filter: {
                    type: 'date'
                },
                flex: 1
            }, {
                xtype: 'datecolumn',
                format: 'm/d/Y H:i:s',
                text:'Submission Date Time',
                dataIndex:'SubmissionDateTime',
                filter: {
                    type: 'date'
                },
                flex: 1
            }, {
                text:'Type',
                dataIndex:'Type',
                filter: {
                    type: 'string'
                },
                flex: 1
            }, {
                text:'Total Records',
                dataIndex:'TotalRecords',
                filter: {
                    type: 'number'
                },
                id: 'totalRecs',
                flex: 1
            }, {
                text:'Extract Document',
                flex: 4,
                align: 'center',
                xtype: 'actioncolumn',
                hideable: false,
                items: [
                    {
                    xtype: 'button',
                    iconCls: 'x-fa fa-long-arrow-right',
                    handler: 'extractDoc'

                }]
            }],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                itemId:'encountersGridPG',
                dock: 'bottom',
                pageSize: 25,
                hideRefresh: true,
                displayInfo: 'true',
                displayMsg: 'Displaying Rules {0} - {1} of {2}',
                bind: '{encountersGrid}'
            }]
        }]
    },{
        region:'south',
        height: '40%',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        defaults:{
            border:true,
            xtype:'panel'
        },
        items:[{
            xtype:'gridpanel',
            title: 'Encounter Detail',
            flex: 2,
            layout: 'fit',
            bind: {
                store: '{encountersDetailGrid}'
            },
            scrollable: true,
            listeners: {
                select: 'selectEncounterDetail'
            },
            columns: [{
                text: 'Encounter Id',
                dataIndex: 'EncounterID',
                hidden: true,
                flex: 5
            }, {
                text:'Record Id',
                dataIndex:'RecordId',
                flex: 5
            }, {
                text:'Record Status',
                dataIndex:'RecordStatus',
                flex: 5
            },{
                text:'Additional Info',
                dataIndex:'AdditionalInfo',
                flex: 20
            }, {
                text: 'Rec Pointer',
                dataIndex: 'RecPointer',
                hidden: true,
                flex: 6
            }, {
                text: 'SystemID',
                dataIndex: 'SystemID',
                hidden: true,
                flex: 5
            }],
            dockedItems: [{
                dock: 'bottom',
                itemId: 'toolbarEncounterDetail',
                xtype: 'pagingtoolbar',
                displayInfo: true,
                hideRefresh: true,
                listeners: {
                    beforeChange: 'getSelectedPageData'
                }
            }]
        },{
            title: 'Encounter Reject',
            flex: 1,
            items: [{
                xtype:'gridpanel',
                scrollable: true,
                plugins: [
                    'gridfilters'
                ],
                bind: {
                    store: '{encountersRejectGrid}'
                },
                columns: [{
                    text:'Reject Code',
                    dataIndex:'RejectCode',
                    filter: {
                        type: 'string'
                    },
                    flex: 0.20
                }, {
                    text:'Description',
                    dataIndex:'RejectDesc',
                    filter: {
                        type: 'string'
                    },
                    flex: 1
                }]
            }],
            dockedItems: [{
                dock:'bottom',
                xtype: 'pagingtoolbar',
                id: 'toolbarRejectDetail',
                hideRefresh: true,
                displayInfo: true,
                split: true,
                bind: '{encountersRejectGrid}'
            }]
        }]
    }]
});
