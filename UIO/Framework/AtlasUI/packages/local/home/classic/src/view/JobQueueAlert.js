Ext.define('Atlas.home.view.JobQueueAlert',{
    extend: 'Ext.dashboard.Part',

    alias: 'part.jobqueue',

    viewTemplate: {
        iconCls: 'icon-jobqueue,3',
        title: '~job.title',
        showHelp: true,
        collapsed: true,

        layout:'fit',
        items:{
            xclass: 'Atlas.home.xclassview.JobQueueAlert'
        },

        onHelp: function (panel) {
            console.log('onHelp: ', panel.title);
        }
    }
});