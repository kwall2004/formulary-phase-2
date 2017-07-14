/**
 * Last Developer: Kevin Tabasan
 * Previous Developer: Kevin Tabasan
 * Last Worked On: 8/12/2016
 * Origin: MERLIN - Formulary
 * Description: Notes window for Formulary Approval
 **/

Ext.define('Atlas.formulary.view.FormularyNotes', {
    extend: 'Ext.Container',
    xtype: 'formulary-formularynotes',

    items: [{
        xtype: 'container',
        layout: 'hbox',

        items: [{
            xtype: 'displayfield',
            iconCls: 'fa fa-plus',
            fieldLabel: "Date"
        },{
            xtype: 'displayfield',
            iconCls: 'fa fa-minus',
            fieldLabel: "Name"
        }]
    }]

});