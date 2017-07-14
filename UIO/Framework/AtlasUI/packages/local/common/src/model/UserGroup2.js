/**
 * Created by d4662 on 11/18/2016.
 */
Ext.define('Atlas.common.model.UserGroup2', {
    extend: 'Atlas.common.model.Base',
    //idProperty: 'groupId',
    fields: [
        {name: 'groupId',  type: 'string'},
        {name: 'groupName',  type: 'string'},
        {name: 'DESCRIPTION',  type: 'string'},
        {name: 'defaultMenu',  type: 'number'},
        {name: 'UG1ROWID',  type: 'string'},
        {name: 'RowNum',  type: 'number'}
    ],
    proxy: {
        url: 'system/{0}/usergroups',
        pagination: true
    }
});

Ext.define('Atlas.common.model.UserGroupWithAll', {
    extend: 'Atlas.common.model.Base',
    //idProperty: 'groupId',
    fields: [
        {name: 'groupId',  type: 'string'},
        {name: 'groupName',  type: 'string'},
        {name: 'DESCRIPTION',  type: 'string'},
        {name: 'defaultMenu',  type: 'number'},
        {name: 'UG1ROWID',  type: 'string'},
        {name: 'RowNum',  type: 'number'}
    ],
    proxy: {
        url: 'system/{0}/usergroups',
        pagination: true,
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function (payload) {
                var objall =  [];
                objall.push({groupName: 'All',groupId:0});
                payload.data.forEach(function (item, index) {
                    objall.push(item);
                });
                return objall;
            }
        }
    }
});