/**
 * This Class represents the Communication Tab of the Pharmacy Credentialing Module
 */
Ext.define('Atlas.pharmacy.view.credentialing.tabs.Communication', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pharmacy-communication',
    //  controller: 'pharmacy-communication',
    reference: 'communicationRef',
    scrollable: true,
    layout: {
        type: 'table',
        columns: 2
    },
    items: [],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                // {
                //     text: 'Add',
                //     handler: 'doCommunicationAdd'
                // },
                {
                    text: 'Save',
                    handler: 'doCommunicationSave',
                    name:'btnSave'
                }
                // {
                //     text: 'Cancel',
                //     handler: 'doCommunicationCancel'
                // }
            ]
        }
    ],

  /*  dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    text: 'Save',
                    bind:{ disabled: '{!(hasNCPDPID || hasRID)}'},
                    handler: 'doCommunicationSave'
                }
            ]
        }
    ],*/

    initComponent: function () {
        var me = this,
            commItems = [],
            contractingObj = me.getAddressFields('Contracting', 'contactType1'),
            credentialingObj = me.getAddressFields('Credentialing', 'contactType2'),
            remittanceObj = me.getAddressFields('Remittance', 'contactType3'),
            planCommunicationObj = me.getAddressFields('Plan Communication', 'contactType4'),
            auditsObj = me.getAddressFields('Audits', 'contactType5');

        commItems.push(contractingObj);
        commItems.push(credentialingObj);
        commItems.push(remittanceObj);
        commItems.push(planCommunicationObj);
        commItems.push(auditsObj);

        me.items = commItems;

        this.callParent();
    },

    /**
     * @param fldTitle
     * @returns {Ext.form.FieldSet}
     */
    getAddressFields: function (fldTitle, refStr) {
        return Ext.create('Ext.form.FieldSet', {
            title: fldTitle,
            width: 550,
            //  height : 400,
            layout: 'fit',
            items: [
                {
                    xtype: 'form',
                    reference: refStr,
                    layout: 'vbox',
                    defaults: {
                        width: 500,
                        labelWidth: 80,
                        padding: 5
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    labelWidth: 80,
                                    width: 269,
                                    fieldLabel: 'First Name',
                                    name: 'firstName'
                                },
                                {
                                    xtype: 'textfield',
                                    width: 225,
                                    labelWidth: 70,
                                    fieldLabel: 'Last Name',
                                    name: 'lastName'
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Title',
                            name: 'contactTitle'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Address',
                            name: 'address'
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    labelWidth: 80,
                                    width: 229,
                                    fieldLabel: 'City',
                                    name: 'city'
                                },
                                {
                                    xtype: 'combo',
                                    width: 145,
                                    labelWidth: 30,
                                    fieldLabel: 'State',
                                    name: 'state',
                                    bind: {
                                        store: '{stateslist}'
                                    },
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'value'
                                },
                                {
                                    xtype: 'textfield',
                                    width: 110,
                                    labelWidth: 25,
                                    fieldLabel: 'Zip',
                                    name: 'zip'
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Email',
                            name: 'email',
                            regex: /^([\w\-\’\-]+)(\.[\w\-\’\-]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    labelWidth: 80,
                                    width: 269,
                                    fieldLabel: 'Phone',
                                    name: 'phone',
                                    emptyText: '(xxx)xxx xxxx',
                                    maskRe: /[0-9]/,
                                    maxLength: 14,
                                    enableKeyEvents: true,
                                    listeners: {
                                        'keypress': {
                                            fn: 'formatPhoneNumber'
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    width: 225,
                                    labelWidth: 25,
                                    fieldLabel: 'Fax',
                                    name: 'fax',
                                    emptyText: '(xxx)xxx xxxx',
                                    maskRe: /[0-9]/,
                                    maxLength: 14,
                                    enableKeyEvents: true,
                                    listeners: {
                                        'keypress': {
                                            fn: 'formatPhoneNumber'
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }]


        })
    }
});