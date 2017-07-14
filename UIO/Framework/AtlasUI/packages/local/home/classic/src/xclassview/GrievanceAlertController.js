Ext.define('Atlas.home.xclassview.GrievanceAlertController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xclassgrievancealert',

    onActionItemClick: function (view, rowIndex, colIndex, item, e, record, row) {
        var stat = record.get('stat');
        this.routeToGrievance(stat);
        //console.log('Link Clicked: ' + record.data.StatusDescription);
    },

    onItemDblClick: function (dataview, record, item, index, e, eOpts) {
        //console.log('Item Double Clicked: ' + record.data.StatusDescription);
    },
    routeToGrievance: function (stat) {
        this.routeTo(stat, 'merlin/grievances/grievances_Grievances');
    },
    routeTo: function (atlasId, route) {
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute(route),
            viewRoute = route.split('/'),
            atlasId = atlasId;

        me.fireEvent('openView', viewRoute[0], viewRoute[1], viewRoute[2], {
            menuId: menuId,
            atlasId: atlasId,
            isredirect:true
        });
    }
});