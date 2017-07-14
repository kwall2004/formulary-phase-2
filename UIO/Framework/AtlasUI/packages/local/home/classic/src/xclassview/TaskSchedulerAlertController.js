Ext.define('Atlas.home.xclassview.TaskSchedulerAlertController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xclasstaskscheduleralert',

    init: function() {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            taskSchedStore = vm.getStore('taskscheduleralert'),
            proxy = taskSchedStore.getProxy(),
            dateFrom = Atlas.common.utility.Utilities.getLocalDateTime(),
            dateTo = Atlas.common.utility.Utilities.getLocalDateTime();

        dateFrom.setDate(dateFrom.getDate() - 30);
        dateTo.setDate(dateTo.getDate() + 30);

        proxy.setExtraParam('pDateFrom', dateFrom.toISOString());
        proxy.setExtraParam('pDateTo', dateTo.toISOString());

        taskSchedStore.load();
    },

    onViewTasksClick: function(button, e, eOpts) {
        //console.log('View All Tasks Clicked');
        this.routeToTaskScheduler();
    },

    onItemDblClick: function(dataview, record, item, index, e, eOpts) {
        //console.log('Edit Task Clicked: ' + record.data.systemID);
    },
    routeToTaskScheduler: function (alertType) {
        this.routeTo(alertType, 'merlin/plan/Tasks');
    },
    routeTo: function (atlasId, route) {
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute(route),
            viewRoute = route.split('/'),
            atlasId = atlasId;

        me.fireEvent('openView', viewRoute[0], viewRoute[1], viewRoute[2], {
            menuId: menuId,
            atlasId: atlasId
        });
    },
    localizeDateTime: function(value, record)
    {
        return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(value,record.column.format);
    }


});