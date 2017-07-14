/*
 * Last Developer: Srujith Cheruku
 * Date: 09-26-2016
 * Previous Developers: []
 * Origin: RxMember - Claims Search - Pharmacy Info
 * Description: Gives users a place to view their pharmacy Info
 */

Ext.define('Atlas.portals.view.rxmember.PharmacyInfo', {
    extend: 'Ext.form.Panel',
    xtype: 'portalsrxmemberpharmacyinfo',
    title: 'Pharmacy Details',
    controller: 'pharmacyInfoController',
    items: [{
        defaults: {
            xtype: 'displayfield',
            flex: 1
        },
        items: [{
            fieldLabel: 'Pharmacy Name',
            bind: {
                value: '{modalRecord.name}'
            }
        }, {
            fieldLabel: 'Address',
            listeners: {
                afterrender: 'modifyAddress'
            }
        }, {
            fieldLabel: 'Phone',
            reference: 'phoneNum',
            listeners: {
                afterrender: 'modifyPhoneNum'
            }
        }, {
            fieldLabel: 'Fax',
            listeners: {
                afterrender: 'modifyFax'
            }
        }, {
            fieldLabel: 'Email'
        }],
        bbar: [{
            xtype: 'button',
            text: 'Get Directions',
            handler: 'onDirectionsClick'

        }, {
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            text: 'Close',
            iconCls: 'fa fa-times',
            handler: function () {
                this.up('window').close();
            }
        }]

    }]
});
