Ext.define('Atlas.home.view.LocksAlert',{
    extend: 'Ext.dashboard.Part',

    alias: 'part.locksalert',

    viewTemplate: {
        iconCls: 'icon-locksalert,11',
        title: '~locks.title',
        //showHelp: true,
        collapsed: true,

        layout:'fit',
        items:{
            xclass: 'Atlas.home.xclassview.LocksAlert'
        },

        onHelp: function (panel) {
            console.log('onHelp: ', panel.title);
        }
    }
});