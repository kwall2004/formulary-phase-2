/**
 * This is an example of using the grid with a RowExpander plugin that adds the ability
 * to have a column in a grid which enables a second row body which expands/contracts.
 *
 * The expand/contract behavior is configurable to react on clicking of the column, double
 * click of the row, and/or hitting enter while a row is selected.
 */
Ext.define('Atlas.admin.view.changepassword.ChangePassword', {
    extend: 'Ext.grid.Panel',
    viewModel:'changepasswordmodel',
    xtype: 'ChangePassword',
    bind:{
        store: '{ChangePasswordStore}'
    },
    columns: [
        { text: "Date", flex: 1,
        dataIndex: 'month',
        renderer: function(v){
            return Ext.Date.monthNames[v];
        }
      },
        { text: "Amount You Paid", flex: 1, formatter: 'usMoney', dataIndex: 'amountYouPaid'}
    ],

    width: 1300,
    height: 700,

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        title: 'Selection',
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
        rowBodyTpl : ['<div id="MoreClaimsData-{id}" ></div>']
    }],

    viewConfig: {
      listeners: {
        expandbody : function(rowNode,record, expandbody) {
        var targetId = 'MoreClaimsData-' + record.get('id');
        if (Ext.getCmp(targetId + "_grid") == null) {
            var pagingGrid = Ext.create('MemberPortal.view.myClaims.Paging', {
                renderTo: targetId,
                id: targetId + "_grid"
            });
            rowNode.grid = pagingGrid;
            pagingGrid.getEl().swallowEvent(['mouseover', 'mousedown', 'click', 'dblclick', 'onRowFocus']);
            pagingGrid.fireEvent("bind", pagingGrid, { ClientSessionId: + record.get('id')});
        }
      }
      }
    }


});
