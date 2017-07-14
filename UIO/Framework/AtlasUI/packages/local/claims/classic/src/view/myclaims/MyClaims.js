/*
 Last Developer: Paul Glinski
 Previous Developers: [Paul Glinski]
 Description: A view that shows the user information about there claims.
 Each dropdown contains a paging grid with more information.
 */
Ext.define('Atlas.claims.view.myclaims.MyClaims', {
    extend: 'Ext.grid.Panel',
    viewModel: 'myclaimsmodel',
    xtype: 'claims-myclaims-myclaims',
    bind: {
        store: '{MyClaimsStore}'
    },
    columns: [
        {
            text: "Date", flex: 1,
            dataIndex: 'month',
            renderer: function (v) {
                return Ext.Date.monthNames[v];
            }
        },
        {text: "Amount You Paid", flex: 1, formatter: 'usMoney', dataIndex: 'amountYouPaid'}
    ],

    width: 1300,
    height: 700,
    dockedItems: [
        {
            html: '<h2>Selection</h2>',
            padding: '0, 0, 0, 20'
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            title: 'Selection',
            padding: '0, 0, 20, 20',
            items: [{
                xtype: 'combobox',
                fieldLabel: 'Year:',
                align: 'left',
                fieldStyle: 'text-align: right;'
            },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Group By:',
                    align: 'left',
                    anchor: '-100'
                },
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    text: 'Reset'
                },
                {
                    xtype: 'button',
                    text: 'Search'
                }]
        }],

    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl: ['<div id="MoreClaimsData-{id}" ></div>']
    }],

    viewConfig: {
        listeners: {
            expandbody: function (rowNode, record, expandbody) {
                var targetId = 'MoreClaimsData-' + record.get('id');
                if (Ext.getCmp(targetId + "_grid") == null) {
                    var pagingGrid = Ext.create('Atlas.claims.view.myclaims.MyClaimsPagingGrid', {
                        renderTo: targetId,
                        id: targetId + "_grid"
                    });
                    rowNode.grid = pagingGrid;
                    pagingGrid.getEl().swallowEvent(['mouseover', 'mousedown', 'click', 'dblclick', 'onRowFocus']);
                    pagingGrid.fireEvent("bind", pagingGrid, {ClientSessionId: +record.get('id')});
                }
            }
        }
    }


});
