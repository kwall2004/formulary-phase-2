/**
 * Developer: Tremaine Grant
 * Description: This view used for the grid in the member locks section.
 */
Ext.define('Atlas.letter.grids.ApprovedLettersGrid', {
    xtype: 'letter.ApprovedLettersGrid',
    extend: 'Ext.grid.Panel',
    bind: {
        store: '{approvedlettersdata}'
    },
    columns: [
        {
            xtype: 'actioncolumn',
            text: '',
            align: 'center',
            width: 50,
            hideable: false,
            items: [{
                iconCls: 'x-fa fa-long-arrow-right',
                tooltip: 'Click to view details',
                handler: 'onRouteClick'
            }]
        },
        {
            text: 'Assign To', dataIndex: 'AssignTo',
            editor: {
                xtype: 'combobox',
                allowBlank: false,
                displayField: 'userName',
                valueField: 'userName',
                bind: {
                    store: '{AssignToUserStore}'
                },
                listeners: {
                    select: 'assignToSelect'
                }

            }
        },
        {text: 'Letter ID', dataIndex: 'LetterID', hidden: true},
        {text: 'Letter Name', dataIndex: 'LetterName'},
        {text: 'MeridianRx Id', dataIndex: 'RID'},
        {text: 'Member Name', dataIndex: 'MemberName'},
        {text: 'Carrier', dataIndex: 'Carrier'},
        {text: 'Account', dataIndex: 'Account'},
        {text: 'LOB', dataIndex: 'LOB'},
        {text: 'Created By', dataIndex: 'CreatedBy'},
        {text: 'Created Date', dataIndex: 'CreatedDate', xtype: 'datecolumn'},
        {text: 'Approved By', dataIndex: 'ApprovedBy'},
        {text: 'Approved Date', dataIndex: 'ApprovedDate', xtype: 'datecolumn'},
        {text: 'Due Date', dataIndex: 'DueDate', xtype: 'datecolumn'},
        {
            text: 'Hrs Remaining',
            dataIndex: 'HourRemaining',
            renderer: function (value, metaData, record, row, col, store, gridView) {
                var item = record.data.HourRemaining;
                //item = (item == '') ? '' : item;
                if (item.indexOf('-') > -1) {
                    var cDisplay =Math.round(item);
                    return '<SPAN style="COLOR: red">' + cDisplay + '</SPAN>'
                }
                else {
                    return '<SPAN style="COLOR: green">' + item + '</SPAN>';
                }
            }
        }
    ],
    dockedItems: [{
        dock: 'bottom',
        xtype: 'pagingtoolbar',
        bind: {
            store: '{approvedlettersdata}'
        },
        displayInfo: true
    }],
    plugins: [
    {
        ptype: 'cellediting',
        clicksToEdit: 2,
        autoCancel: false
    }
]
});
