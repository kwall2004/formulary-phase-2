Ext.define('Atlas.letter.view.MedicationInfo', {
    extend: 'Ext.form.Panel',
    xtype: 'XTMedicationInfo',
    controller: 'medicationinfoctrl',
    viewModel: 'letter-clwviewmodel',
    defaults: {
        xtype: 'displayfield',
        labelWidth: 55
    },
    layout: {
        type: 'vbox',
        align: 'fit',
        flex: 1
    },
    items: [
        {name: 'gcnseq', fieldLabel: 'GCN:'},
        {name: '@drugLN', fieldLabel: 'Drug:'},
        {name: 'GPICode', fieldLabel: 'GPI:'}
    ],
    bind: {
        hidden:'{!showMedication}'
    }
});