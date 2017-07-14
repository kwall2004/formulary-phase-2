Ext.define('Atlas.home.view.DMRAlert',{
    extend: 'Ext.dashboard.Part',

    alias: 'part.dmralert',

    viewTemplate: {
        iconCls: 'icon-dmralert,10',
        title: '~dmr.title',
        //showHelp: true,
        collapsed: true,

        layout:'fit',
        items:{
            xclass: 'Atlas.home.xclassview.DMRAlert'
        },

        onHelp: function (panel) {
            console.log('onHelp: ', panel.title);
        }
    }
});