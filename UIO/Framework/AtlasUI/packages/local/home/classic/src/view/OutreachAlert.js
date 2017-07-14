Ext.define('Atlas.home.view.OutreachAlert',{
    extend: 'Ext.dashboard.Part',

    alias: 'part.outreachalert',

    viewTemplate: {
        iconCls: 'icon-outreachalert,5',
        title: '~outreach.title',
        //showHelp: true,
        collapsed: true,

        layout:'fit',
        items:{
            xclass: 'Atlas.home.xclassview.OutreachAlert'
        },

        onHelp: function (panel) {
            console.log('onHelp: ', panel.title);
        }
    }
});