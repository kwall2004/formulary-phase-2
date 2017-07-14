Ext.define('Atlas.finance.view.audit.AuditQueue', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.finance-auditqueue',

    requires: [
        'Ext.layout.container.Accordion'
    ],

    controller: 'finance-auditqueue',
    viewModel: 'finance-auditqueue',

    title: 'Audit Takebacks Queue',

    layout: 'accordion',

    items: [{
        xtype: 'grid',
        reference: 'takebacksrequiredgrid',

        //hiding since there is only one grid
        hideCollapseTool: true,
        tools: [{
            type: 'refresh',
            handler: 'refreshPage'
        }],

        bind: {
            store: '{audittakebacksrequired}'
        },
        columns: {
            defaults: {
                width: 150
            },
            items: [{
                xtype: 'actioncolumn',
                iconCls: 'x-fa fa-arrow-circle-right',
                width: 40,
                hideable: false,
                handler: 'onActionItemClick'
            },{
                text: 'Audit ID',
                dataIndex: 'auditID'
            },{
                text: 'Audit Type',
                dataIndex: 'auditType',
                flex: 2
            },{
                xtype: 'datecolumn',
                text: 'Audit Complete Date',
                dataIndex: 'auditCompleteDate',
                format: 'm/d/Y'
            },{
                text: 'NCPDPID',
                dataIndex: 'ncpdpid'
            },{
                text: 'Pharmacy Name',
                dataIndex: 'pharmacyname',
                flex: 2
            },{
                xtype: 'datecolumn',
                text: 'Letter Sent Date',
                dataIndex: 'LetterSentDate',
                format: 'm/d/Y'
            },{
                text: 'Days Remaining',
                dataIndex: 'daysElapsed',
                renderer: function (v) {
                    return '<span class="m-red-color">' + v + '</span>';
                }
            }]
        },
        listeners: {
            rowdblclick: 'onRecordSelect'
        },
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: 'true',
            pageSize: 25,
            bind: {
                store: '{audittakebacksrequired}'
            }
        }]
    }]
});