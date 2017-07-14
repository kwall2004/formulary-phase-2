/*
 * Last Developer: Srujith Cheruku
 * Date: 12-8-2016
 * Previous Developers: []
 * Origin: Provider - Authorization Request Confirmation
 * Description: Gives users a place to view the Auth Request Confirmation
 */
Ext.define('Atlas.portals.view.provider.AuthRequestConfirmation', {
    extend: 'Ext.panel.Panel',
    xtype: 'authrequestconfirmation',

    controller: 'authrequestconfirmationcontroller',

    items: [
        {
            xtype: 'displayfield',
            padding: 7,
            reference: 'authRequestConfirmationLbl',
            value: ''
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    reference: 'attachClinicalDocBtn',
                    text: 'Attach Clinical Document',
                    listeners: {
                        click: 'onAttachClinicalDocBtnClick'
                    }
                },
                {
                    xtype: 'button',
                    reference: 'anotherNewRequestBtn',
                    text: 'Create Another Request',
                    listeners: {
                        click: 'onAnotherNewRequestBtnClick'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Close',
                    handler: function () {
                        this.up('window').close();
                    }
                }
            ]
        }
    ]

});