Ext.define('Atlas.letter.view.CLWPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'XTPharmacyInfo',
    controller: 'pharmacyinfoctrl',
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
        {name: 'ncpdpid', fieldLabel: 'NCPDP:'},
        {name: 'name', fieldLabel: 'Name:'},
        {name: 'locPhone', fieldLabel: 'Phone:', value: '',
            vtype: 'phone',
            plugins: {
                ptype: 'phonenumberformatter'
            }},
        {name: 'locFax', fieldLabel: 'Fax:', value: '',
            vtype: 'fax',
            plugins: {
                ptype: 'faxnumberformatter'
            }}
    ],
    bind: {
        hidden:'{!showPharmacy}'
    }
});