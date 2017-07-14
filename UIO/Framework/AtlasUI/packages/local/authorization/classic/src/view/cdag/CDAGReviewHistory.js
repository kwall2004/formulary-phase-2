/**
 * Created by agupta on 9/8/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGReviewHistory',{
    extend : 'Ext.panel.Panel',
    xtype : 'cdag-reviewhistory',
    controller : 'cdagreviewhistorycontroller',
    viewModel : 'cdagreviewhistoryviewmodel',
    layout: {
        type: 'border',
        align: 'stretch'
    },
    //layout: 'border',
    defaults: {
        bodyPadding: 10
    },
    height : '100%',
    width : '100%',
    items : [
        {
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            height : '100%',
            items: [
                {
                    xtype:'grid',
                    flex : 5,
                    title : 'Status History',
                    style: {borderColor: 'gray',borderStyle: 'solid'},
                    columns:{
                        defaults: {
                            flex: 1
                        },
                        items:[
                            { text: 'Auth Status', dataIndex: 'ttAuthStatus'},
                            { text: 'Update Date/Time', dataIndex: 'ttDate', xtype: 'datecolumn',
                                renderer:function(value) {
                                    if (value)
                                        return Atlas.common.Util.setdateformatWithAMPM(value);
                                }
                            },
                            { text: 'User Name', dataIndex: 'ttUserName'}
                        ]
                    },
                    bind : '{storestatushistory}'
                },/*Status History Grid*/
                {
                    xtype:'grid',
                    itemId: 'gridCaseHistory',
                    flex : 5,
                    title : 'Case History',
                    margin: '0 0 0 10',
                    style: {borderColor: 'gray',borderStyle: 'solid'},
                    columns:{
                        defaults: {
                            flex: 1
                        },
                        items:[
                            { text: 'GroupId', dataIndex: 'GroupId', hidden : true},
                            { text: 'Determination Type', dataIndex: 'DeterminationType', hidden : true},
                            { text: 'Field Description', dataIndex: 'FieldDesc'},
                            { text: 'Field Value', dataIndex: 'FieldValue'}
                        ]
                    },
                    bind : '{storecoverageaudituniverse}',
                    features: [{
                        id: 'group',
                        name: 'caseGroup',
                        ftype: 'groupingsummary',
                        groupHeaderTpl: '{[values.rows[0].data.DeterminationType]}',
                        startCollapsed: true,
                        hideGroupedHeader: true,
                        enableGroupingMenu: true
                    }]
                }/*Case History Grid*/
            ]
        }
    ]
});
