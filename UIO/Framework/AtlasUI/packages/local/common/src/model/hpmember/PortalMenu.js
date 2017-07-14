/**
 * Created by m4542 on 11/21/2016.
 */
Ext.define('Atlas.common.model.hpmember.PortalMenu', {
    extend: 'Atlas.common.model.Base',
    idProperty: 'menuID',

    fields: [
        'menuOrder',
        'route',
        'parentMenuID',
        'menuTitle',
        'menuID',
        'leaf',
        'iconCls'
    ],

    proxy: {
        url : 'member/hp/portalmenu',
        rootProperty: 'children'
    }

});
