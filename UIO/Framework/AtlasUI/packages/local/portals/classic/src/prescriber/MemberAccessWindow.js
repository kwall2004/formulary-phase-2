Ext.define('Atlas.portals.prescriber.MemberAccessWindow', {
    extend: 'Ext.Container',

    xtype: 'portalsprescribermemberaccesswindow',

    controller: 'portalsprescribermemberaccesswindowcontroller',

    items: {
        xtype: 'panel',

        title: 'Request Member Access',

        bbar: {
            xtype: 'toolbar',

            items: [
                '->',
                {
                    xtype: 'button',

                    iconCls: 'x-fa fa-plus-circle',

                    text: 'Submit',

                    handler: 'submitMemberAccess'
                },
                {
                    xtype: 'button',

                    iconCls: 'x-fa fa-refresh',

                    text: 'Reset',

                    handler: 'resetMemberAccess'
                }
            ]
        },

        items: {
            xtype: 'form',

            reference: 'memberAccessForm',

            defaults: {
                flex: 1,

                labelWidth: 100
            },

            items: [
                {
                    xtype: 'textfield',

                    fieldLabel: 'Member ID',

                    reference: 'memberId',

                    name: 'memberId',

                    msgTarget: 'side',

                    emptyText: 'Please enter member id',

                    blankText: 'Please enter member id',

                    allowBlank: false
                },
                {
                    xtype: 'textfield',

                    fieldLabel: 'First Name',

                    reference: 'firstName',

                    name: 'firstName',

                    msgTarget: 'side',

                    emptyText: 'Please enter first name',

                    blankText: 'Please enter first name',

                    allowBlank: false
                },
                {
                    xtype: 'textfield',

                    fieldLabel: 'Last Name',

                    reference: 'lastName',

                    name: 'lastName',

                    msgTarget: 'side',

                    emptyText: 'Please enter last name',

                    blankText: 'Please enter last name',

                    allowBlank: false
                },
                {
                    xtype: 'combo',

                    reference: 'Gender',

                    name: 'Gender',

                    fieldLabel: 'Gender',

                    emptyText: 'Select Gender',

                    displayField: 'text',

                    valueField: 'value'
                },
                {
                    xtype: 'datefield',

                    fieldLabel: 'DOB',

                    reference: 'DOB',

                    name: 'DOB',

                    format: 'Y/m/d',

                    msgTarget: 'side',

                    emptyText: 'Please select dob'
                },
                {
                    xtype: 'textfield',

                    fieldLabel: 'SSN',

                    reference: 'SSN',

                    name: 'SSN',

                    maxLength: 4,

                    msgTarget: 'side',

                    emptyText: 'SSN (Last 4 digits)'
                }
            ]
        }
    }
});