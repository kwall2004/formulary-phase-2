Ext.define('Atlas.letter.grids.LetterStatusGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'ltrLetterStatusGrid',
    bind: {
        store: '{letterstatusdata}'
    },
    columns: [
        {
            text: 'Create Date', dataIndex: 'CreateDate', flex: 1,
            renderer: function (value) {
                if (value)
                    return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(value, 'm/d/Y H:i:s');
            }
        },
        {text: 'Create By', dataIndex: 'CreateBy', flex: 1},
        {
            text: 'Approve Date', dataIndex: 'ApproveDate', flex: 1,
            renderer: function (value) {
                if (value)
                    return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(value, 'm/d/Y H:i:s');
            }
        },
        {text: 'Approve By', dataIndex: 'ApprovedBy', flex: 1},
        {
            xtype: 'datecolumn', text: 'SentDate', dataIndex: 'SentDate', flex: 1,
            renderer: function (value) {
                if (value)
                    return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(value, 'm/d/Y H:i:s');
            }
        },
        {
            text: 'AIMS Date', dataIndex: 'POBoxDropDate', flex: 1,
            renderer: function (value) {
                if (value)
                    return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(value, 'd/m/Y');
            }
        },
        {
            text: 'PO Box Drop Date', dataIndex: 'POBoxDropDate02', flex: 1,
            renderer: function (value) {
                if (value)
                    return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(value, 'm/d/Y H:i:s');
            }
        },
        {text: 'Sent By', dataIndex: 'SentBy', flex: 1},
        {
            text: 'Due Date', dataIndex: 'DueDate', flex: 1,
            renderer: function (value) {
                var returnValue = '';
                if (value) {
                    returnValue = Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(value, 'm/d/Y H:i:s');
                }
                return returnValue;
            }
        },
        {
            text: 'Hour Remaining', dataIndex: 'HoursRemaining', flex: 1,
            renderer: function (value) {
                var spanStyle = ((value < 0) ? '<span style="color:red;">' : '<span style="color:green;">');
                var returnValue = spanStyle + Ext.util.Format.number(value, '000000') + '</span>';
                return returnValue;
            }
        }
    ]
});