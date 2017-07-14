Ext.define('Atlas.home.view.GrievanceAlert',{
    extend: 'Ext.dashboard.Part',

    alias: 'part.grievancealert',

    viewTemplate: {
        iconCls: 'icon-grievancealert,14',
        title: '~grievance.title',
        //showHelp: true,
        collapsed: true,

        layout:'fit',
        items:{
            xclass: 'Atlas.home.xclassview.GrievanceAlert'
        },

        onHelp: function (panel) {
            console.log('onHelp: ', panel.title);
        }
    }
});