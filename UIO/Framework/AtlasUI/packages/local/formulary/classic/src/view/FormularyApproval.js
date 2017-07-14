/**
 * Last Developer: Kevin Tabasan
 * Previous Developer: Kevin Tabasan
 * Last Worked On: 8/11/2016
 * Origin: MERLIN - Formulary
 * Description: Main page for Formulary Approval
 **/

Ext.define('Atlas.formulary.view.FormularyApproval', {
    extend: 'Ext.grid.Panel',
    xtype: 'formulary-formularyapproval',
    title: 'Formulary Approval',
    controller: 'formularyapprovalviewcontroller',
    viewModel: 'formularyapprovalviewmodel',


    plugins: [
        'gridfilters'
    ],

    bind: {
        store: '{formularyinfodata}'
    },
    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            bind: '{formularyinfodata}',
            pageSize: 25,
            displayInfo: true,
            dock: 'bottom'
        }
    ],

        columns: {
            defaults: {
                flex: 1
            },
            items: [{
                dataIndex: 'FormularyID',
                hidden: true,
                text: 'Formulary ID'

            }, {
                dataIndex: 'Stat',
                hidden: true,
                hideable: false
            }, {
                text: 'Name',
                columnWidth: '300',
                width: 350,
                dataIndex: 'FormularyName',
                filter: {
                    type: 'string'
                 }
            }, {
                text: 'Version',
                width: 50,
                dataIndex: 'FormularyVersion'
            }, {
                text: 'Status',
                dataIndex: 'StatDesc',
                filter: {
                    type: 'string'
                }
            }, {
                text: 'Effective Date',
                dataIndex: 'EffectiveDate',
                width: 100,
                xtype: 'datecolumn',
                format:'m/d/Y'

            }, {
                text: 'Termination Date',
                dataIndex: 'TerminationDate',
                xtype: 'datecolumn',
                width: 100,
                format:'m/d/Y'
            }, {
                text: 'Last Updated By',
                dataIndex: 'LastUpdateBy'
            }, {
                text: 'Last Updated On',
                dataIndex: 'LastUpdateDateTime',
                xtype: 'datecolumn',
                format:'m/d/Y'
            }, {
                xtype: 'actioncolumn',
                width: 100,
                text: 'View Changes',
                hideable: false,
                items: [{
                    // Use a URL in the icon config
                    iconCls: 'x-fa fa-arrow-circle-right',
                    hideable: false,
                    align: 'center',
                    // Use a URL in the icon config
                    tooltip: 'View Changes',
                    handler: 'onViewChangesButtonCLick'

                }]

            }]
        }


});

