Ext.define('Atlas.common.model.shared.UserGroup',{
    extend: 'Atlas.common.model.StaticBase', //change to base when layer7 URL is ready
    idProperty: 'groupId',
    fields: [
        {name: 'groupId',  type: 'number'},
        {name: 'groupName',  type: 'string'},
        {name: 'DESCRIPTION',  type: 'string'},
        {name: 'defaultMenu',  type: 'number'},
        {name: 'UG1ROWID',  type: 'string'},
        {name: 'RowNum',  type: 'number'}
    ],
    proxy: {
        //http://mcsqa01.caidan.local/pbm/wsa1/getUserGroupList
        // pSessionId
        url: 'resources/data/dummydata/shared/UserGroups.json'
    }
});