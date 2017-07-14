Ext.define('Atlas.member.view.requestidcard.RequestIdCardForm', {
    extend: 'Ext.form.Panel',
    xtype: 'member-requestidcard-requestidcardform',

    defaultType: 'textfield',
    items: [
        {
            xtype: 'combo',
            queryMode: 'local',
            value: 'joe meridian',
            triggerAction: 'all',
            forceSelection: true,
            editable: false,
            fieldLabel: 'Family:',
            name: 'family',
            displayField: 'name',
            valueField: 'value',
            store: {
                fields: ['name', 'value'],
                data: [
                    {name : 'Susan Meridian 987654321', value: 'susan meridian'},
                    {name : 'Joe Meridian 123456789', value: 'joe meridian'}
                ]
            }
        },
        {
            xtype: 'combo',
            queryMode: 'local',
            value: 'medicaid',
            triggerAction: 'all',
            forceSelection: true,
            editable: false,
            fieldLabel: 'LOB:',
            name: 'lineOfBusiness',
            displayField: 'name',
            valueField: 'value',
            disabled: true,
            store: {
                fields: ['name', 'value'],
                data: [
                    {name : 'Meidcaid', value: 'medicaid'}
                ]
            }
        },
        {
            fieldLabel: 'Member ID:',
            name: 'memberId',
            disabled: true,
            value: '9876543210'
        },
        {
            fieldLabel: 'Last Name:',
            name: 'lastName',
            disabled: true,
            value: 'Meridian'
        },
        {
            fieldLabel: 'First Name:',
            name: 'firstName',
            disabled: true,
            value: 'Joe'
        }
    ]
});
