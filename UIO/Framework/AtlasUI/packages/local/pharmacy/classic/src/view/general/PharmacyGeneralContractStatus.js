/*
 Last Developer: Paul Glinski
 Previous Developers: []
 Origin: Merlin - Member
 Date: 7/14/2016
 Description: The demographic tab shows general information about the Member as well as information about there coverage and HEDIS.
 */
Ext.define('Atlas.pharmacy.view.general.PharmacyGeneralContractStatus', {
    extend: 'Ext.form.Panel',
    xtype: 'pharmacy-general-pharmgencontractstatus',
    items: [
        {
            xtype: 'fieldset',
            title: 'Contract Status',
            collapsible: true,
            defaults: {
                labelWidth: 200,
                labelAlign: 'left'
            },
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Contract Status',
                    name: 'ctct_status',
                    value: 'No Active Contract'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Effective Date',
                    name: 'eff_date',
                    value: '08/08/2014'
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Term Date',
                    name: 'term_date',
                    value: '12/31/2016'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Contracts',
                    name: 'ctcts',
                    value: 'Aetna, BC&BS'
                },
                {
                    xtype: 'displayfield',
                    value: 'Birth Date:'
                }]
        }]
});