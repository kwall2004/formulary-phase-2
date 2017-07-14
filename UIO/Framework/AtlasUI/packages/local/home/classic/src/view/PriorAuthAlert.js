Ext.define('Atlas.home.view.PriorAuthAlert', {
    extend: 'Ext.dashboard.Part',

    alias: 'part.priorauthalert',

    viewTemplate: {
        iconCls: 'icon-priorauthalert,14',
        title: '~priorAuth.title',
        //showHelp: true,
        collapsed: true,

        layout: 'fit',
        items: {
            xclass: 'Atlas.home.xclassview.PriorAuthAlert'
        },

        onHelp: function (panel) {
            console.log('onHelp: ', panel.title);
        }
    }

});