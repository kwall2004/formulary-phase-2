Ext.define('Atlas.letter.view.MemberInfo', {
    extend: 'Ext.form.Panel',
    xtype: 'XTMemberInfo',
    controller: 'memberinfoctrl',
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
        {
            xtype : 'container',
            layout: {
                type: 'hbox',
                align: 'stretch',
                flex: 1
            },
            defaults: {
                xtype: 'displayfield',
                labelWidth: 55
            },
            items : [
                { name: '@enrollmentStatus', fieldLabel: 'Status', flex : 1},
                { itemId : 'enrollStatus', userCls:'fa fa-flag' , flex : 1}
            ]
        },
        {name: 'recipientID', fieldLabel: 'ID:', itemId : 'rid'},
        {name: 'FullName', fieldLabel: 'Name:' },
        {name: 'LOBName', fieldLabel: 'LOB:'},
        {name: 'homephone.ContactInfo', fieldLabel: 'Phone:', value: '',
            vtype: 'phone',
            plugins: {
                ptype: 'phonenumberformatter'
            }},
        {name: 'birthDate', fieldLabel: 'DOB:'},
        {name: 'gender', fieldLabel: 'Gender:'}
    ],
    bind: {
        hidden: '{!showMember}'
    }
});