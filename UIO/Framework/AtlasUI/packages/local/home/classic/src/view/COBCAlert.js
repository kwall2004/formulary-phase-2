Ext.define('Atlas.home.view.COBCAlert',{
    extend: 'Ext.dashboard.Part',

    alias: 'part.cobcalert',

    viewTemplate: {
        iconCls: 'icon-cocalert,21',
        title: '~cobc.title',
        //showHelp: true,
        collapsed: true,

        layout:'fit',
        items:{
            xclass: 'Atlas.home.xclassview.COBCAlert'
        },

        onHelp: function (panel) {
            console.log('onHelp: ', panel.title);
        }
    }
});