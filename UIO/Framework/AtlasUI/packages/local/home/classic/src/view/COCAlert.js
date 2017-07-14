Ext.define('Atlas.home.view.COCAlert',{
    extend: 'Ext.dashboard.Part',

    alias: 'part.cocalert',

    viewTemplate: {
        iconCls: 'icon-cocalert,21',
        title: '~coc.title',
        //showHelp: true,
        collapsed: true,

        layout:'fit',
        items:{
            xclass: 'Atlas.home.xclassview.COCAlert'
        },

        onHelp: function (panel) {
            console.log('onHelp: ', panel.title);
        }
    }
});