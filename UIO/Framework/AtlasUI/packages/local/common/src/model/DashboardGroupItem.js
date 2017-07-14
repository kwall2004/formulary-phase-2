Ext.define('Atlas.common.model.DashboardGroupItem',{
    extend: 'Atlas.common.model.StaticBase', //change to base when layer7 URL is ready
    idProperty: 'dashboardId',
    fields: [
        {name: 'dashboardId',  type: 'number'},
        {name: 'dashboardName',  type: 'number'},
        {name: 'menuId',  type: 'number'}
    ],
    proxy: {
        //http://mcsqa01.caidan.local/pbm/wsa1/getDashboardItemByGroup
        // pSessionId
        // pGroupId
        url: 'resources/data/dummydata/common/DashboardGroupItems.json'
    }
});