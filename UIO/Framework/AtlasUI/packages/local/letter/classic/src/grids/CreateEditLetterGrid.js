Ext.define('Atlas.letter.grids.CreateEditLetterGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'CreateEditLetterGrid',
    controller: 'createeditletterctrl',
    viewModel: 'createeditlettervm',
    bind: {
        store: '{letterstatusdata}'
    },
    columns: [
        {xtype: 'datecolumn', text: 'Create Date', dataIndex: 'CreateDate', format:'m/d/Y H:i:s'},
        {text: 'Create By', dataIndex: 'CreateBy'},
        {xtype: 'datecolumn',text: 'Approve Date',dataIndex: 'ApproveDate', format:'m/d/Y H:i:s'},
        {text: 'Approve By',dataIndex: 'ApprovedBy'},
        {xtype: 'datecolumn',text: 'SentDate', dataIndex: 'SentDate', format:'m/d/Y H:i:s'},
        {xtype: 'datecolumn',text: 'AIMS Date', dataIndex: '', format: 'd/m/Y'},
        {xtype: 'datecolumn',text: 'PO Box Drop Date', dataIndex: 'POBoxDropDate', format:'m/d/Y H:i:s'},
        {text: 'Sent By', dataIndex: 'SentBy'},
        {xtype: 'datecolumn',text: 'Due Date', dataIndex: 'DueDate',
            renderer:function(value)
            {
                if(value)
                    Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(value, 'm/d/Y H:i:s');
            }},
        {text: 'Hour Remaining', dataIndex: 'HoursRemaining',
            renderer:function(value)
            {
                if(value)
                    parseFloat(value);
            }}
        ]
});