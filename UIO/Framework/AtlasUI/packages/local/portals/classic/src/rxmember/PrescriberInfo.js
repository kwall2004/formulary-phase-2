/*
 * Last Developer: Srujith Cheruku
 * Date: 09-26-2016
 * Previous Developers: []
 * Origin: RxMember - Claims Search - Pharmacy Info
 * Description: Gives users a place to view their pharmacy Info
 */

Ext.define('Atlas.portals.view.rxmember.PrescriberInfo', {
    extend: 'Ext.form.Panel',
    xtype: 'portalsrxmemberprescriberinfo',
    title: 'Prescriber Information',
    controller: 'prescriberInfoController',
    items: [{
        defaults: {
            xtype: 'displayfield'
        },
        items: [
            {
                fieldLabel: 'Name',
                fieldName: 'firstname',
                bind: {
                    value: '{modalRecord.firstname}&nbsp;{modalRecord.lastname}'
                }
            }, {
                fieldLabel: 'Address',
                fieldName: 'locaddr1',
                listeners: {
                    afterrender: 'modifyAddress'
                }
            }, {
                fieldLabel: 'Phone',
                fieldName: 'locphone',
                listeners: {
                    afterrender: 'modifyPhoneNum'
                }
            }, {
                fieldLabel: 'Fax',
                fieldName: 'locfax',
                listeners: {
                    afterrender: 'modifyFax'
                }
            }, {
                fieldLabel: 'Speciality',
                fieldName: 'specialty',
                bind: {
                    value: '{modalRecord.specialty}'
                }
            }],
        bbar: [{
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
