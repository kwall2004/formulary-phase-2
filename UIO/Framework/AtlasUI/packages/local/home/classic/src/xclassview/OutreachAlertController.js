Ext.define('Atlas.home.xclassview.OutreachAlertController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xclassoutreachalert',

    onActionItemClick: function (view, rowIndex, colIndex, item, e, record, row) {
        //console.log('Link Clicked: ' + record.data.AlertDescription);
        this.routeToOutreachQueue(record.data.AlertDescription);
    },

    onItemDblClick: function (dataview, record, item, index, e, eOpts) {
        //console.log('Item Double Clicked: ' + record.data.AlertDescription);
    },
    routeToOutreachQueue: function (alertType) {
        this.routeTo(alertType, 'merlin/authorization/OutreachQueue');
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
    }
});