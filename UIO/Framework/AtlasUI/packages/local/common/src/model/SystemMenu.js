Ext.define('Atlas.common.model.SystemMenu', {
    //  extend: 'Ext.data.TreeModel',
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready
    idProperty: 'menuID',
    fields: [
        'menuID',
        {name: 'parentMenuID', type: 'integer'},
        {name: 'programName', type: 'string'},
        {name: 'menuTitle', type: 'string'},
        {name: 'iconName', type: 'string'},
        {name: 'iconCls', type: 'string', mapping: 'iconCLS'}, //, defaultValue: 'x-fa fa-home'
        {name: 'menuOrder', type: 'integer'},
        {name: 'rowNum', type: 'integer'},
        {name: 'maxRunning', type: 'integer'},
        {name: 'level', type: 'integer'},
        {name: 'defaultMenu', type: 'boolean'},
        {name: 'xType', type: 'string'},
        {name: 'route', type: 'string'},
        {name: 'leaf', type: 'boolean'},
        {name: 'allowExtAccess', type: 'boolean'}
    ],
    proxy: {
        url: 'system/{0}/usermenusrest',
        extraParams: {
            pRootMenu: 0,
            pLevels: 2
        }
        //http://mcsqa01.caidan.local/pbm/wsa1/getSystemMenus
        // pSessionId
        // pRootMenu
        // pLevels
        // url: 'resources/data/dummydata/common/SystemMenus.json'
    }
});