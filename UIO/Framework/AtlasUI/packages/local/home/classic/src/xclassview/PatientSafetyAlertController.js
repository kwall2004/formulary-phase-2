Ext.define('Atlas.home.xclassview.PatientSafetyAlertController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xclasspatientsafetyalert',

    onActionItemClick: function (view, rowIndex, colIndex, item, e, record, row) {
        //console.log('Link Clicked: ' + record.data.alertTypeName);
        this.routeToPatientSafety(record.data.alertTypeName);
    },

    onItemDblClick: function (dataview, record, item, index, e, eOpts) {
        //console.log('Item Double Clicked: ' + record.data.alertTypeName);
    },
    routeToPatientSafety: function (alertType) {
        this.routeTo(alertType, 'merlin/member/PatientSafety');
    },
    routeTo: function (atlasId, route) {
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute(route),
            viewRoute = route.split('/'),
            atlasId = atlasId;

        me.fireEvent('openView', viewRoute[0], viewRoute[1], viewRoute[2], {
            menuId: menuId,
            atlasId: atlasId,
            openView: true
        });
    }
});