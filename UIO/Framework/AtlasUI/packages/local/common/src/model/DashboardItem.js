Ext.define('Atlas.common.model.DashboardItem',{
    extend: 'Atlas.common.model.StaticBase', //change to base when layer7 URL is ready
    idProperty: 'dashboardId',
    fields: [
        {name: 'dashboardId',  type: 'number'},
        {name: 'dashboardName',  type: 'number'},
        {name: 'dashboardProgramName',  type: 'string'},
        {name: 'dashboardIcon',  type: 'string'},
        {name: 'dashboardHeight',  type: 'number'},
        {name: 'dashboardSortOrder',  type: 'number'},
        {name: 'isDefault',  type: 'boolean'},
        {name: 'menuId',  type: 'number'},
        {name: 'FavFlag',  type: 'boolean'}
    ],
    proxy: {
        //http://mcsqa01.caidan.local/pbm/wsa1/getUsersByGroup
        // pSessionId
        // pGroupId
        url: 'resources/data/dummydata/common/GroupUsers.json'
    }
});