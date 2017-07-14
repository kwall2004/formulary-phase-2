
/**
 * This is an example of using the grid with a RowExpander plugin that adds the ability
 * to have a column in a grid which enables a second row body which expands/contracts.
 *
 * The expand/contract behavior is configurable to react on clicking of the column, double
 * click of the row, and/or hitting enter while a row is selected.
 */
Ext.define('Atlas.admin.view.manageaccounts.ManageAccounts', {
    extend: 'Ext.form.Panel',
    xtype: 'ManageAccounts',
    items: [{
		xtype:'fieldset',
		title: 'New User Request',
		layout: 'column',
        items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Number of user(s)'
        },
        {
            xtype: 'button',
            text: 'Create Additional Users'
        }]
    }, {
		xtype:'fieldset',
		title: 'Existing User Request',
		layout: 'column',
        items: []
    }, {
		xtype:'fieldset',
		title: 'Never User/Active/Terminated User(s)',
		layout: 'column',
        html: '<p>Currently there are 23 user(s) in this group. The user(s) range from (abc001-abc023)</p>'
    }, {
		xtype:'fieldset',
		title: 'User Information',
		items: [
        {
            xtype: 'textfield',
            fieldLabel: 'User Name'
        },
		{
            xtype: 'textfield',
            fieldLabel: 'First Name'
        },
		{
            xtype: 'textfield',
            fieldLabel: 'Last Name'
        },
		{
            xtype: 'textfield',
            fieldLabel: 'Address 1'
        },
		{
            xtype: 'textfield',
            fieldLabel: 'Address 2'
        },
		{
            xtype: 'textfield',
            fieldLabel: 'City'
        },
		{
            xtype: 'combobox',
            fieldLabel: 'State'
         
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Zip'
        }]
    }, {
		xtype:'fieldset',
		title: 'Contact Information',
		layout: 'column',
        items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Extension'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Home'  
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Cell'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Direct'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Fax'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Email'
        }]
    }]
});
