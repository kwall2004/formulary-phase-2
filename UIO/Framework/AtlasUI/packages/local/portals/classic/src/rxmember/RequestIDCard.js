/**
 * Created by m4542 on 10/26/2016.
 */
Ext.define('Atlas.portals.view.rxmember.RequestIDCard', {
    extend: 'Ext.panel.Panel',
    title: 'Request ID Card',
    controller: 'requestidcardcontroller',
    viewModel: 'requestidcardmodel',
    layout: 'border',
    xtype: 'requestidcard',
    items: [{
        xtype: 'form',
        cls: 'card-panel',
        bind: {
            title: 'Member: {memberUsername}'
        },
        region: 'center',
        reference: 'requestform',
        items: [{
            xtype: 'fieldset',
            width: 535,
            reference: 'requestfields',
            title: 'Request ID Card',
            layout: {
                type: 'vbox'
            },
            defaults: {
                xtype: 'textfield',
                allowBlank: false
            },
            items: [
                {
                    xtype: 'container',
                    width: 500,
                    html: '<p>Please complete this form for a new MeridianRx Card. Your new card should arrive ' +
                    'within two weeks. If you need services before your card arrives, call MeridianRx ' +
                    'Customer Service to verify information. Please note, Member card will be sent to ' +
                    'the address on record.</p>'
                },

                {
                    fieldLabel: 'First Name',
                    name: 'txtFirstName',
                    reference: 'txtFirstName'
                },

                {
                    fieldLabel: 'Last Name',
                    name: 'txtLastName',
                    reference: 'txtLastName'
                },
                {
                    xtype: 'checkbox',
                    hideEmptyLabel: false,
                    fieldLabel: 'Select Plan',
                    boxLabel: 'Medicaid',
                    name: 'chkMedicaid',
                    reference: 'chkMedicaid',
                    checked: false,
                    uncheckedValue: '0',
                    labelWidth: 106,
                    hidden: true
                }, {
                    xtype: 'checkbox',
                    hideEmptyLabel: false,
                    name: 'chkMedicare',
                    boxLabel: 'Medicare',
                    reference: 'chkMedicare',
                    checked: false,
                    uncheckedValue: '0',
                    labelWidth: 106,
                    hidden: true
                }, {
                    xtype: 'checkbox',
                    hideEmptyLabel: false,
                    boxLabel: 'Commercial',
                    name: 'chkCommercial',
                    reference: 'chkCommercial',
                    checked: false,
                    uncheckedValue: '0',
                    labelWidth: 106,
                    hidden: true
                }, {
                    xtype: 'checkbox',
                    hideEmptyLabel: false,
                    boxLabel: 'THP Medicaid',
                    name: 'chkTHPMedicaid',
                    reference: 'chkTHPMedicaid',
                    checked: false,
                    uncheckedValue: '0',
                    labelWidth: 106,
                    hidden: true
                },

                {
                    fieldLabel: 'Address',
                    name: 'txtAddress',
                    reference: 'txtAddress'
                },

                {
                    fieldLabel: 'State',
                    xtype: 'combobox',
                    name: 'cbxState',
                    reference: 'cbxState'
                },

                {
                    fieldLabel: 'City',
                    name: 'txtCity',
                    reference: 'txtCity'
                },

                {
                    fieldLabel: 'Zip Code',
                    name: 'txtZip',
                    reference: 'txtZip'
                },

                {
                    fieldLabel: 'Home Phone',
                    name: 'txtHomePhone',
                    reference: 'txtHomePhone'
                },

                {
                    fieldLabel: 'Comments',
                    xtype: 'textareafield',
                    name: 'txtComments',
                    allowBlank: true,
                    reference: 'txtComments',
                    style: {
                        marginBottom: '8px'
                    }
                },

                {
                    xtype: 'container',
                    width: '100%',
                    layout: {
                        pack: 'center',
                        align: 'center',
                        type: 'hbox'
                    },
                    items: {
                        xtype: 'button',
                        text: 'Send Request',
                        iconCls: 'x-fa fa-share-square-o',
                        handler: 'sendRequest',
                        align: 'center',
                        width: 110
                    }
                }
            ]
        }]
    }]
});