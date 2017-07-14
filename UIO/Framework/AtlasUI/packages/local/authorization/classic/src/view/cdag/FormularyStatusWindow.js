/**
 * Created by agupta on 9/20/2016.
 */
Ext.define('Atlas.authohrization.view.cdag.FormularyStatusWindow', {
    extend: 'Ext.window.Window',
    xtype: 'authorization-formularystatuswindow',
    name : 'formularystatuswindow',
    //itemId : 'formularystatuswindow',
    title: 'Formulary Status',
    viewModel: 'formularystatuswindowmodel',
    controller: 'formularystatuswindowcontroller',
    width: 1000,
    height: 450,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'grid',
            itemId : 'gpFormularyStatus',
            flex: 10,
            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    {text: 'NDC', dataIndex: 'NDC'},
                    {text: 'GCN_SEQNO', dataIndex: 'GCN_SEQNO'},
                    {text: 'GPI Code', dataIndex: 'GPICode'},
                    {text: 'Drug Type', dataIndex: 'DrugType'},
                    {text: 'Covered', dataIndex: 'CoveredYesNo'},
                    {text: 'PAInd', dataIndex: 'PAIndYesNo'},
                    {text: 'STInd', dataIndex: 'STIndYesNo'},
                    {text: 'QLInd', dataIndex: 'QLIndYesNo'}
                ]
            },
            bind: '{storeformularystatus}',
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    bind: '{storeformularystatus}',
                    pageSize: 10,
                    displayInfo: true,
                    dock: 'bottom'
                }
            ]
        }
    ]
});