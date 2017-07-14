Ext.define('Atlas.home.view.ContactLogAlert', {
    extend: 'Ext.dashboard.Part',

    alias: 'part.contactlogalert',
    viewTemplate: {
        iconCls: 'icon-contactlog,8',
        title: '~openIssues.title',
        itemId:'plncontactlogalert',
        showHelp: true,
        collapsed: false,

        layout:'fit',
        items:{
            xclass: 'Atlas.home.xclassview.ContactLogAlert'
        },

        onHelp: function (panel) {
            console.log('onHelp: ', panel.title);
        }
    }

});