Ext.define('Atlas.home.view.DALetterAlert',{
    extend: 'Ext.dashboard.Part',

    alias: 'part.denialappealletteralert',

    viewTemplate: {
        iconCls: 'icon-denialappeal,2',
        title: '~dal.title',
        //showHelp: true,
        collapsed: true,

        layout:'fit',
        items:{
            xclass: 'Atlas.home.xclassview.DALetterAlert'
        },

        onHelp: function (panel) {
            console.log('onHelp: ', panel.title);
        }
    }
});