Ext.define('Atlas.letter.view.AdvancedSearch', {
    extend: 'Ext.Window',
    controller: 'letter-advsearch',

    //Use object notation. This is needed because at the creation time we specify viewmodel config with parent
    //This way the content will be merged, rather than overwritten
    viewModel: {
        type: 'letter-advsearch'
    },

    title: 'Advanced Search',
    iconCls: 'x-fa fa-search',

    width: 1000,
    height: 550,
    modal: true,
    layout: 'border',
    resizable : false,

    items: [
        {
            region: 'north',
            xtype: 'form',

            layout: 'column',

            defaults: {
                xtype: 'container',
                layout: 'anchor',
                columnWidth: 0.5,
                margin: 5,
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%',
                    labelWidth: 110
                }
            },

            items: [
                {
                    items: [
                        {
                            xtype:'membertypeahead',
                            fieldLabel: 'Member',
                            name: 'advMemberName'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Sent Date From',
                            name: 'advSentFromDate',
                            format : 'm/d/Y',
                            listeners: {
                                focusleave: 'onLeaveDate'
                            }
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: 'combo',
                            fieldLabel: 'Letter Type',
                            name: 'advLetterType',
                            itemId: 'advLetterType',
                            displayField: 'LetterName',
                            valueField: 'LetterNameID',
                            bind: {
                                store: '{lettertypes}'
                            },
                            publishes: 'value',
                            queryMode: 'local',

                            typeAhead: true,
                            forceSelection: true,
                            emptyText: '[Letter Type]',
                            listeners: {
                                change: 'onStateChange'
                            }
                        },
                        {
                            xtype: 'datefield',
                            name: 'advSentToDate',
                            fieldLabel: 'Sent Date To',
                            format : 'm/d/Y',
                            listeners: {
                                focusleave: 'onLeaveDate'
                            }
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Search',
                    handler: 'onAdvSearch',
                    iconCls: 'x-fa fa-search'
                },
                {
                    text: 'Reset',
                    handler: 'onReset',
                    iconCls: 'x-fa fa-reply'
                }
            ]
        },
        {
            region: 'center',
            xtype: 'grid',
            itemId : 'gdLetterSearch',
            bind: '{letterdetailsstore}',
            listeners: {
                rowclick: 'onRecordSelect'
            },
            columns: [
                {text: 'Letter ID',  width: 80, dataIndex: 'LetterID'},
                {text: 'Letter Type',width: 100,dataIndex: 'LetterName'},
                {text: 'Letter Type ID',width: 100,dataIndex: 'LetterNameID', hidden : true},
                {text: 'MeridianRx ID',dataIndex: 'RecipientID'},
                {text: 'Member Name',width: 130,dataIndex: 'MemberName'},
                {text: 'Carrier',width: 130,dataIndex: 'CarrierName'},
                {text: 'Account',width: 130,dataIndex: 'AccountName'},
                {text: 'LOB',width: 80,dataIndex: 'LOBName'},
                {xtype: 'datecolumn', text: 'Create Date',width: 130,dataIndex: 'CreateDate', format:'m/d/Y H:i:s'},
                {text: 'Create By',width: 80,dataIndex: 'CreateBy'},
                {xtype: 'datecolumn',text: 'Approve Date',width: 130,dataIndex: 'ApproveDate', format:'m/d/Y H:i:s'},
                {text: 'Approve By',width: 80,dataIndex: 'ApproveBy'},
                {xtype: 'datecolumn',text: 'Sent Date',width: 130,dataIndex: 'SentDate',format:'m/d/Y H:i:s'},
                {text: 'Sent By',width: 80,dataIndex: 'SentBy'}

            ],
            bbar: {
                xtype: 'pagingtoolbar',
                itemId : 'gdLetterSearch_PagingToolBar',
                //bind: '{pharmaciesPaged}',
                displayInfo: true,
                hideRefresh: true
            }
        }
    ]
});
