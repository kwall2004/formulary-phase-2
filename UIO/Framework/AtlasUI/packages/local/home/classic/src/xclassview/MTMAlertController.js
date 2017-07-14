Ext.define('Atlas.home.xclassview.MTMAlertController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xclassmtmalert',

    onActionItemClick: function (view, rowIndex, colIndex, item, e, record, row) {
        //console.log('Link Clicked: ' + record.data.Description);
        this.routeToMTM(record.data.Description);
    },

    onItemDblClick: function (dataview, record, item, index, e, eOpts) {
        // console.log('Item Double Clicked: ' + record.data.Description);
    },
    routeToMTM: function (title) {
        var vm = this.getViewModel();
        var id = title.replace(/ /g, '');
        this.routeTo(id, 'merlin/casemanagement/CaseQueues');
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