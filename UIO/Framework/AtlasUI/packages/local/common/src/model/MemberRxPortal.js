/**
 * Created by m4542 on 10/28/2016.
 */
Ext.define('Atlas.common.model.MemberRxPortal', {
    extend: 'Ext.data.TreeModel',

    fields: [],

    proxy: {
        rootProperty: 'children',
        url : 'resources/rxmember/memberrxportalworkspace.json'
    }

});