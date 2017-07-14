Ext.define('Atlas.member.view.memberprofile.MemberPortalUsersPopUp', {
    extend: 'Ext.window.Window',
    xtype: 'member-memberprofile-memberportaluserspopup',
    title: 'Member Portal Users',
    layout: {
        type: 'vbox',
        padding: '15 10 15 10',
        align: 'center'
    },
    initComponent: function() {
        var me = this;
        me.items = [{
            xtype: 'label',
            padding: '0 0 20 0',
            text: this.itemConfig.tgtLabel
        }, {
            xtype: 'button',
            text: 'Close',
            itemId: 'btnClose',
            //handler: 'onCloseClick'
            listeners: {
                click: function (btn, e, eOpts) {
                    //this.destroy();
                    btn.up('window').destroy();
                }
            }
        }];
        me.callParent();
    }
});