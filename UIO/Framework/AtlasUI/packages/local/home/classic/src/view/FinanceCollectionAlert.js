Ext.define('Atlas.home.view.FinanceCollectionAlert',{
    extend: 'Ext.dashboard.Part',

    alias: 'part.financecollectionalert',

    viewTemplate: {
        iconCls: 'icon-finance,6',
        title: '~finance.title',
        showHelp: true,
        collapsed: true,

        layout:'fit',
        items:{
            xclass: 'Atlas.home.xclassview.FinanceCollectionAlert'
        },

        onHelp: function (panel) {
            console.log('onHelp: ', panel.title);
        }
    }
});