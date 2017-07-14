/**
 * Created by p3946 on 9/7/2016.
 */
Ext.define('Atlas.member.view.AllContactLog', {
    extend: 'Ext.window.Window',

    xtype: 'member-allcontactlog',
    title: 'All Contact Log',

    items: [
        {
            xtype: 'displayfield',
            fieldLabel: 'Member Name:',
            value: 'Member Name'
        },
        {
            xtype: 'textareafield',
            fieldLabel: 'Contact Log'
        }
    ],

    dockedItems: [
        {
            dock: 'bottom',
            xtype: 'toolbar',
            items: [
                '->',
                {
                    xtype: 'button',
                    text: 'Cancel',
                    iconCls: 'fa fa-times-circle',
                    handler: function(){
                        this.up('window').close();
                    }
                }
            ]
        }
    ]
});