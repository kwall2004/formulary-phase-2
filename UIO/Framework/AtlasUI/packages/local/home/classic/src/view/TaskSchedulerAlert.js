Ext.define('Atlas.home.view.TaskSchedulerAlert',{
    extend: 'Ext.dashboard.Part',

    alias: 'part.merlintask',

    viewTemplate: {
        iconCls: 'icon-taskscheduler,5',
        title: '~merlinTask.title',
        //showHelp: true,
        collapsed: true,

        layout:'fit',
        items:{
            xclass: 'Atlas.home.xclassview.TaskSchedulerAlert'
        },

        onHelp: function (panel) {
            console.log('onHelp: ', panel.title);
        }
    }
});