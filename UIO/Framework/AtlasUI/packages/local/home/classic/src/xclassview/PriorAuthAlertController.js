Ext.define('Atlas.home.xclassview.PriorAuthAlertController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xclasspriorauthalert',
    onActionItemClick: function (view, rowIndex, colIndex, item, e, record, row) {
        var alertType = record.data.AlertType;
        var authStatusCode = record.data.authStatusCode;
        var authStatusDesc = record.data.authStatusDesc;
        var tabName = '';
        var menuId ;
        switch (alertType) {
            case 'PriorAuthStatus':
                tabName = 'MyPAQueue';
                menuId =  Atlas.common.Util.menuIdFromRoute('merlin/authorization/MyPAQueue');
                break;
            case 'UrgencyType':
                tabName = 'MyPAQueue';
                menuId =  Atlas.common.Util.menuIdFromRoute('merlin/authorization/MyPAQueue');
                break;
            case 'IRE':
                tabName = 'MyPAQueue';
                menuId =  Atlas.common.Util.menuIdFromRoute('merlin/authorization/MyPAQueue');
                break;
            case 'FaxQ':
                tabName = 'cdag_CDAGMain';
                menuId =  Atlas.common.Util.menuIdFromRoute('merlin/authorization/cdag_CDAGMain');
                break;
            case 'CoC':
                tabName = 'MyPAQueue';
                menuId =  Atlas.common.Util.menuIdFromRoute('merlin/authorization/MyPAQueue');
                break;
        }
        if (tabName == 'cdag_CDAGMain') {
            this.fireEvent('openView', 'merlin', 'authorization', tabName, {
                menuId: menuId,
                alertType: alertType,
                atlasId: authStatusDesc,
                StatusCode: authStatusCode,
                StatusDesc: authStatusDesc
            });
        }
        else {
            this.fireEvent('openView', 'merlin', 'authorization', tabName, {
                menuId: menuId,
                alertType: alertType,
                StatusCode: authStatusCode,
                StatusDesc: authStatusDesc
            });
        }
        // console.log('Link Clicked: ' + record.data.authStatusDesc);
    }
});