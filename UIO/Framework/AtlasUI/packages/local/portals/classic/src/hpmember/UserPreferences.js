// k3279 - Kevin Tabasan - 12/28/2016

Ext.define('Atlas.portals.view.hpmember.UserPreferences', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.userhpmember',
    viewModel: 'userhpmember',
    controller: 'userhpmember',

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',

        defaults: {
            xtype: 'button'
        },

        items: ['->',{
            text: 'Change Password',
            handler: 'onChangePasswordClick'
        },{
            text: 'Cancel',
            handler: 'onCancelClick'
        },'->']
    }],

    items: [{
        xtype: 'panel',
        title: 'General Information',
        cls: 'card-panel',
        
        defaults: {
            xtype: 'displayfield'
        },

        items: [{
            fieldLabel: 'First Name',
            bind: '{userPrefs.firstName}'
        },{
            fieldLabel: 'Last Name',
            bind: '{userPrefs.lastName}'
        },{
            fieldLabel: 'Address',
            bind: '{userPrefs.address1}'
        },{
            fieldLabel: 'City',
            bind: '{userPrefs.city}'
        },{
            fieldLabel: 'State',
            bind: '{userPrefs.state}'
        }]
    }]
});