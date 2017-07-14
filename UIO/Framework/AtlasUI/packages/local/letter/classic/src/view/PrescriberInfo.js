Ext.define('Atlas.letter.view.PrescriberInfo', {
    extend: 'Ext.form.Panel',
    xtype: 'XTPrescriberInfo',
    controller: 'prescriberinfoctrl',
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
        {name: 'npi', fieldLabel: 'NPI:'},
        {name: 'FullName', fieldLabel: 'Name:'},
        {name: 'locphone', fieldLabel: 'Phone:', value: '',
            vtype: 'phone',
            plugins: {
                ptype: 'phonenumberformatter'
            }},
        {name: 'locfax', fieldLabel: 'Fax:', value: '',
            vtype: 'fax',
            plugins: {
                ptype: 'faxnumberformatter'
            }}
    ]
});