Ext.define('Atlas.home.view.MTMAlert',{
    extend: 'Ext.dashboard.Part',

    alias: 'part.mtmalert',

    viewTemplate: {
        iconCls: 'icon-casemanage,10',
        title: '~mtm.title',
        //showHelp: true,
        collapsed: true,

        layout:'fit',
        items:{
            xclass: 'Atlas.home.xclassview.MTMAlert'
        },

        onHelp: function (panel) {
            console.log('onHelp: ', panel.title);
        }
    }
});