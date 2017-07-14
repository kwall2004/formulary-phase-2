Ext.define('Atlas.common.view.users.General', {
    extend: 'Ext.form.Panel',
    xtype: 'userGeneral',
    layout: 'vbox',
    items:[{
        allowBlank: false,
        fieldLabel: 'First Name',
        xtype: 'textfield',
        name: 'firstname',
        bind: '{user.firstname}',  //from main app model
        emptyText: 'First Name'
    },{
        xtype: 'button',
        text: 'Inbox On',
        enableToggle: true,
        bind:{
            pressed:'{user.inboxEnabled}'
        }
        ,
        listeners: {
            click: function() {
                this.up('usermain').getViewModel().set('user.inboxEnabled',this.pressed)
            }
        }
    },{
        xtype: 'button',
        text: 'Split Mode',
        enableToggle: true,
        bind:{
            pressed:'{user.splitPanelEnabled}'
        },
        listeners: {
            click: function() {
                this.up('usermain').getViewModel().set('user.splitPanelEnabled',this.pressed)
            }
        }
    }]
});