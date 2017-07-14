Ext.define('Atlas.finance.view.collection.AdvancedSearch', {
    extend: 'Ext.Window',
    controller: 'finance-collection-advsearch',

    viewModel: {
        type: 'finance-collection-advsearch'
    },

    title: 'Search Collection/Credit by',
    iconCls: 'x-fa fa-search',
    width: 900,
    height: 550,
    modal: true,
    layout: 'border',

    items: [
        {
            region: 'north',
            xtype: 'form',

            layout: 'column',
            defaultButton: 'search',
            defaults: {
                xtype: 'container',
                layout: 'anchor',
                margin: 5
            },

            items: [
                {
                    xtype:'membertypeahead',
                    fieldLabel: 'Member:',
                    itemId:'itemIdmembertypeaheadbox',
                    emptyText:"[e.g. John]",
                    name: 'member',
                    width: 300,
                    labelWidth: 52,
                    listeners: {
                        change: 'membertypeaheadboxselect'
                    },
                    forceSelection: true
                },
                {
                    xtype: 'combo',
                    name: 'lettertype',
                    fieldLabel: 'Type',
                    displayField: 'LetterName',
                    valueField: 'LetterNameID',
                    bind: {
                        store: '{letterslist}'
                    },
                    itemId:'itemidlettertype',

                    queryMode: 'local',
                    forceSelection: true,
                    selectOnFocus: false,
                    width: 210,
                    labelWidth: 30
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Create Date:',
                    name: 'dateFrom',
                    itemId: 'dateFrom',
                    reference: 'datefrom',
                    format: 'm/d/Y',
                    width: 200,
                    labelWidth: 75,
                    listeners: {
                        focusleave: 'onLeaveDate'
                    }
                },
                {
                    xtype: 'datefield',
                    name: 'dateTo',
                    itemId: 'dateTo',
                    reference: 'dateto',
                    format: 'm/d/Y',
                    width: 120,
                    listeners: {
                        focusleave: 'onLeaveDate'
                    }
                }
            ],
            buttons: [
                '->',
                {
                    text: 'Search',
                    reference: 'search',
                    iconCls: 'x-fa fa-search',
                    handler: 'onSearch'
                },
                {
                    text: 'Reset',
                    iconCls: 'x-fa fa-rotate-left',
                    handler: 'onReset'
                }
            ]
        },
        {
            region: 'center',
            xtype: 'grid',
            itemId: 'gpAdvanceSearch',
            bind: '{storeCollectioncreditmasterext}',
            listeners: {
                itemclick: 'gpAdvanceSearch_itemclick'
            },
            columns: {
                items:[
                    {
                        text: 'Collection Credit ID',
                        dataIndex: 'collectionCreditID'
                    },
                    {
                        text: 'Letter Type ID',
                        dataIndex: 'LetterNameID',
                        hidden:true
                    },
                    {
                        text: 'MeridianRx ID',
                        dataIndex: 'recipientID'
                    },
                    {
                        text: 'Member Name',
                        dataIndex: 'MemberName'
                    },
                    {
                        text: 'Create Date',
                        dataIndex: 'createDate',
                        renderer: 'changeDateFormatCreateDate'
                    },
                    {
                        text: 'Create By',
                        dataIndex: 'createBy'
                    },
                    {
                        xtype: 'datecolumn',
                        format: 'm/d/Y H:i:s',
                        text: 'Letter Create Date',
                        dataIndex: 'LetterCreatedDate'
                    },
                    {
                        text: 'Letter Create By',
                        dataIndex: 'LetterCreatedBy'
                    },
                    {
                        text: 'Approve Date',
                        dataIndex: 'LetterApproveDate',
                        renderer: 'changeddateformat'
                    },
                    {
                        text: 'Approve By',
                        dataIndex: 'LetterApproveBy'
                    },
                    {
                        text: 'Sent Date',
                        dataIndex: 'LetterSentDate',
                        renderer: 'changeddateformat'
                    },
                    {
                        text: 'Sent By',
                        dataIndex: 'LetterSentBy'
                    }
                ]
            },
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    bind: '{storeCollectioncreditmasterext}',
                    displayInfo: true,
                    dock: 'bottom',
                    pageSize: 10
                }
            ]
        }
    ]
});
