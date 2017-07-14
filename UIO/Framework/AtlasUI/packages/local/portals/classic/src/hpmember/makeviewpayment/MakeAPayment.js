/**
 * Created by t3852 on 10/19/2016.
 */
Ext.define('Atlas.portals.view.hpmember.makeviewpayment.MakeAPayment', {
    extend: 'Ext.panel.Panel',
    xtype: 'portalshpmembermakeapayment',
    title: 'Make A Payment',

    controller: 'makeapayment',
    viewModel: {
        stores: {
            memberPremiumWeb: {
                model: 'Atlas.portals.hpmember.model.MemberPremiumWeb'
            },
            documentList: {
                model: 'Atlas.portals.hpmember.model.DocumentList'
            }
        },
        data: {
        }
    },
    items: [
        {
            defaults: {
                xtype: 'displayfield',
                labelWidth: 155,
                labelPadding: 2
            },
            cls: 'card-panel',
            title: 'Payment Information',
            bodyPadding: 5,
            width: 680,
            items: [
                {
                    fieldLabel: 'Account Number',
                    bind: '{userRecord.accountNumber}'
                },
                {
                    fieldLabel: 'Date Due',
                    bind: '{premiumRecord.paymentDueDate}'
                },
                {
                    fieldLabel: 'Monthly Premium',
                    bind: '{premiumRecord.premiumAmount}',
                    renderer: function (value, meta, record) {
                        return '$   ' + value;
                    }
                },
                {
                    fieldLabel: 'Total Amount Due',
                    bind: '{premiumRecord.paymentAmountDue}',
                    renderer: function (value, meta, record) {
                        return '$   ' + value;
                    }
                },
                {
                    xtype: 'component',
                    html: '<p>The Total Amount Due includes any payments made since your last billing statement.</p>',
                    padding: '0 0 0 5px'
                },
                {
                    xtype: 'button',
                    text: 'Pay Now',
                    bind: {
                        disabled: '{!canPayNow}'
                    },
                    margin: '0 0 0 5px',
                    handler: 'payBill'
                },
                {
                    xtype: 'component',
                    html: '<p>Please make sure you have disabled your popup blocker for the "Pay Now" button to work properly.</p>',
                    padding: '0 0 0 5px'
                },
                {
                    xtype: 'component',
                    html: '<p>Click below to view your billing statement.</p>',
                    padding: '0 0 0 5px'
                },
                {
                    xtype: 'button',
                    text: 'View Bill',
                    handler: 'viewBill',
                    margin: '0 0 5 5px'
                }
            ]
        },
        {
            xtype: 'form',
            cls: 'formPanel',
            reference: 'billingForm',
            standardSubmit: true,
            method: 'POST',
            defaults: {
                xtype: 'textfield'
            }
        }
    ]
});