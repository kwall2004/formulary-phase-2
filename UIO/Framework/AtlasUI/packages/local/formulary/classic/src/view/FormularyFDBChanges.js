/**
 * Created by mkorivi on 10/5/2016.
 */
Ext.define('Atlas.formulary.view.FormularyFDBChanges', {
    xtype: 'formularyfdbchanges',
    extend: 'Ext.grid.Panel',
    controller:'formularyfdbchanges',
    title: 'Formulary FDB Changes',
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',
            style: {borderColor: 'black', borderStyle: 'solid'},
            items: [
                {xtype: 'displayfield', fieldLabel: 'Formulary'}
                , '->'
                ,{
                    xtype: 'buttongroup',
                    items: [
                        {xtype: 'combobox', fieldLabel: 'Change Type'},
                        {xtype: 'button', text: 'Show'}


                    ]
                }
                , '-'
                , {xtype: 'button', text: 'Export FDB Changes to Excel', handler: 'btnExportFDBChanges_Click'}
            ]
        },
        {
            dock: 'bottom',
            xtype: 'toolbar',
            style: {borderColor: 'black', borderStyle: 'solid'},
            items: [
                , '->'
                , {xtype: 'button', text: 'Apply FDB Changes', handler: 'btnExportFDBChanges_Click'}
            ]
        }
    ],
    columns: [{
        dataIndex: 'DrugCode',
        text: 'NDC'
    }, {
        dataIndex: 'LabelName',
        text: 'Label Name'
    }, {
        dataIndex: 'BrandName',
        text: 'Brand Nam'
    }, {
        dataIndex: 'GNN',
        text: 'GNN',
        hidden: true
    }, {
        dataIndex: 'GCNCode',
        text: 'GCN'
    }, {
        dataIndex: 'GPICode',
        text: 'GPI'
    }, {
        dataIndex: 'ETCName',
        text: 'ETC Name'
    }, {
        dataIndex: 'OTCIndicator',
        text: 'OTC'
    }, {
        dataIndex: 'FDBChangeDate',
        text: 'Change Date'
    }, {
        dataIndex: 'RuleLevel',
        text: 'Rule Level'
    }, {
        dataIndex: 'RuleLevelID',
        text: 'Rule Level ID'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        pageSize: 25,
        bind: '{formularyreviews}'
    }]

});