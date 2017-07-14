/**
 * Created by d3973 on 10/25/2016.
 */
Ext.define('Atlas.member.model.ListItemByUser', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'name',
        type: 'string'
    }],

    proxy: {
        url: 'shared/{0}/listitembyuser'
    }
});