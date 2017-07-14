/*
 Last Developer: Paul Glinski
 Previous Developers: []
 Origin: Merlin - Member
 Date: 7/14/2016
 Description: The demographic tab shows general information about the Member as well as information about there coverage and HEDIS.
 */
Ext.define('Atlas.pharmacy.view.general.PharmacyGeneralPhysicalLocation', {
    extend: 'Ext.form.Panel',
    xtype: 'pharmacy-general-pharmgenphysloc',
    items: [
        {
            xtype: 'fieldset',
            layout: 'vbox',
            title: 'Physical Location Information',
            collapsible: true,
            defaultType: 'displayfield',
            defaults: {
                labelWidth: 150,
                labelAlign: 'left',
                fieldWidth: 300
            },
            items: [
                {
                    fieldLabel: 'Store Close Date',
                    name: 'store_close_date',
                    value: '11/03/11'
                },
                {
                    fieldLabel: 'Dispenser Class',
                    name: 'disp_class',
                    value: 'Independent'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'NCPDP ID',
                    name: 'ncpdp',
                    value: '2311974'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'NPI',
                    name: 'npi',
                    value: '15089996935'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'DEA',
                    name: 'dea',
                    value: 'AP7705099'
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Address',
                    name: 'notes',
                    width: 500,
                    value: '5865 Reinwood Dr.\n\nToledo, OH  43613'
                },{
                    xtype: 'textareafield',
                    fieldLabel: 'Cross Street',
                    name: 'crossStreet',
                    width: 500,
                    value: 'Cross Street: BET LIVERNOIS AND GRAND BLVD'
                },{
                    xtype: 'displayfield',
                    fieldLabel: 'Fax',
                    value: '(313)896-6734'
                },{
                    xtype: 'displayfield',
                    fieldLabel: 'Phone',
                    value: '(313)896-6734'
                }, {
                    xtype: 'checkbox',
                    fieldLabel: 'Contract Sent',
                    name: 'contractSent'
                },{
                    xtype: 'displayfield',
                    fieldLabel: 'Contract Sent Date:',
                    name: 'contractSentDate',
                    value: '10/12/2016'
                },{
                    xtype: 'checkbox',
                    fieldLabel: 'FWA Pharmacy Lock',
                    name: 'fwaPharmLock'
                }, {
                    xtype: 'textareafield',
                    fieldLabel: 'Notes',
                    name: 'notes',
                    width: 500,
                    value: 'epsiloremtest goes here because its kind of long'
                }]
        }]
});