Ext.define('Atlas.common.model.UserListItem',{
    extend: 'Atlas.common.model.StaticBase', //change to base when layer7 URL is ready
    idProperty: 'SystemID',
    fields: [
        {name: 'SystemID',  type: 'number'},
        {name: 'userName',  type: 'string'},
        {name: 'dbRowID',  type: 'string'},
        {name: 'RowNum',  type: 'number'}
    ],
    proxy: {
        //http://mcsqa01.caidan.local/pbm/wsa1/getUserList
        // pSessionId
        // pShowActive
        url: 'resources/data/dummydata/common/UserList.json'
    }
});