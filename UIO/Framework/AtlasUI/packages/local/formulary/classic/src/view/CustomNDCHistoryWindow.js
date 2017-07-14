/**
 * Created by s6627 on 10/4/2016.
 */
Ext.define('Atlas.formulary.view.CustomNDCHistoryWindow', {
    extend: 'Ext.window.Window',
    xtype: 'formulary-customndchistorywindow',
    //itemId : 'compoundgcnwindow',
    title: 'NDC History',
    viewModel: 'customndchistorywindowviewmodel',
    controller: 'customndchistorywindowcontroller',
    width: 600,
    height: 400,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items:[
        {
            xtype: 'grid',
            height: 350,
            itemId: 'gpNDCHistory',
            columns: [
                {
                    text: 'NDC', dataIndex: 'NDC', width: 150
                },
                {
                    text: 'Price Type', dataIndex: 'NPT_TYPE', width: 150
                },
                {
                    text: 'Price Date', dataIndex: 'NPT_DATEC', width: 150,
                    xtype: 'datecolumn',
                    format:'m/d/Y'
                },
                {
                    text: 'Unit Price', dataIndex: 'NPT_PRICEX', width: 150, xtype: 'numbercolumn', format: '$0,0.00000'
                }
            ],
            bind: '{storecustomndchistory}',
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    bind: '{storecustomndchistory}',
                    displayInfo: true,
                    dock: 'bottom'
                }

            ]
        }]
});
