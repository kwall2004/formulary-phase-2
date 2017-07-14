Ext.define('Atlas.letter.view.PCPInfo', {
    extend: 'Ext.form.Panel',
    xtype: 'XTPCPInfo',
    controller: 'pcpinfoctrl',
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
        {name: 'PCPID', fieldLabel: 'NPI:'},
        {name: 'PCPName', fieldLabel: 'Name:'},
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
    ],
    bind: {
        hidden:'{!showPCP}'
    }
});