/*
 Last Developer: Srujith Cheruku
 Previous Developers: [Srujith Cheruku]
 Origin: Merlin - Member
 Description: A view that allows the user to create Case.
 */
Ext.define('Atlas.member.view.CreateCase', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-createcase',

    controller: 'createCaseController',
    viewModel: 'createCaseModel',
    
    items:[{
        xtype: 'panel',
        layout: 'vbox',
        items: [{
            xtype: 'combobox',
            fieldLabel: 'Assign to:',
            name: 'assignTo',
            displayField: 'name',
            bind: {
                store: '{assignTo}'
            },
            itemId: 'assignTo',
            reference: 'assignTo',
            allowBlank: false
        },
            {
                xtype: 'datefield',
                fieldLabel: 'Follow Up Date:',
                name: 'followUpDate',
                itemId: 'followUpDate',
                reference: 'followUpDate',
                allowBlank: false
            },
            {
                xtype: 'textareafield',
                fieldLabel: 'Notes:',
                name: 'createCaseNotes',
                grow: true,
                itemId:'createCaseNotes',
                reference:'createCaseNotes',
                allowBlank: false
            }],
        bbar:[{
            xtype:'tbfill'
        },{
            xtype : 'button',
            text: 'Save',
            iconCls: 'fa fa-floppy-o',
            handler: 'onSaveClick'
        },{
            xtype: 'button',
            text: 'Cancel',
            iconCls: 'fa fa-times',
            handler: 'onCancelClick'
        }]
    }]

});