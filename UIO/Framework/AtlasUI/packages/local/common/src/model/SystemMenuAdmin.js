Ext.define('Atlas.common.model.SystemMenuAdmin', {
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
        {name: 'maxRunning', type: 'integer', defaultValue: 1},
        {name: 'level', type: 'integer'},
        {name: 'defaultMenu', type: 'boolean'},
        {name: 'xType', type: 'string'},
        {name: 'route', type: 'string'},
        {name: 'leaf', type: 'boolean'},
        {name: 'allowExtAccessYesNo', type: 'boolean', mapping: 'allowExtAccess'},
        {name: 'allowExtAccess', type: 'boolean',
            calculate: function (data) {
                return (data.allowExtAccessYesNo == true ? 'yes' : 'no');
            }
        }
    ],
    proxy: {
        url: 'system/{0}/systemmenus',
        extraParams: {
            pRootMenu: 0,
            pLevels: 3
        }
    }
});
