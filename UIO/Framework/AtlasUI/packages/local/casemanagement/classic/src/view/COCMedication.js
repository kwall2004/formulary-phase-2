/**
 * Created by mkorivi on 11/9/2016.
 */
Ext.define('Atlas.casemanagement.view.COCMedication', {
    extend: 'Ext.form.Panel',
    xtype: 'COCMedication',
    itemId: 'COCMedication',
    title: 'Medication Profile',
    controller: 'cocmedicationController',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                {
                    xtype: 'button',
                    text: 'Export To Excel',
                    handler: 'btnExportClick'

                }
            ]
        }
    ],
    items: [{
        xtype: 'form',
        region: 'center',
        layout:'fit',
        autoscroll: true,
        flex: 1,
        items: [{
            xtype: 'gridpanel',
            itemId:'grdCOCMedication',
            listeners: {
                rowdblclick: 'onRecordSelect'
            },
            bind: '{StoreMedications}',
            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    //{text: 'Seq Num', dataIndex: 'seqNum', width: 200},
                    {text: 'seq Num', dataIndex: 'seqNum', hidden: true},
                    {text: 'Src', dataIndex: 'dataSource'},
                    {text: 'Type', dataIndex: 'medType'},
                    //{text: 'medType', dataIndex: 'medType'},
                    {text: 'Med Name', dataIndex: 'medName'},
                    {text: 'Dosage', dataIndex: 'medDosage'},
                    //{text: 'medType', dataIndex: 'medType'},
                    {text: 'Start Date', dataIndex: 'startDate', xtype: 'datecolumn', format: 'm/d/Y'},
                    {text: 'End Date', dataIndex: 'endDate', xtype: 'datecolumn', format: 'm/d/Y'},
                    {text: 'Med Filled', dataIndex: 'medFilled'},
                    {text: 'Know Name', dataIndex: 'knowName'},
                    {text: 'Know Frequency', dataIndex: 'knowFrequency'},
                    {text: 'Know Reason', dataIndex: 'knowReason'},
                    {text: 'Continue', dataIndex: 'cont'},
                    {text: 'Samples', dataIndex: 'samples', hidden: true},
                    {text: 'Med Area', dataIndex: 'medArea', hidden: true}

                ]
            },
            bbar: [
                {
                    xtype: 'pagingtoolbar',
                    pageSize: 25,
                    bind: '{StoreMedications}'
                },
                '->',
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-paper-plane-o',
                    text: 'Add Medication',
                    itemId: 'btnAddMedication',
                    disabled: true,
                    handler: 'btnAddMedicationClick'
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-trash',
                    text: 'Add from Claim History',
                    itemId: 'AddFromClaimHistory',
                    disabled: true,
                    handler: 'btnAddFromClaimHistoryClick'
                }]
        }]
    }]
});
