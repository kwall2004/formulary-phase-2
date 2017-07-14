/**
 * Created by d3973 on 9/29/2016.
 */
Ext.define('Atlas.admin.model.NcpdpVersion', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminncpdpversion',
    idProperty: 'systemID',
    fields: [{
        name: 'systemID',
        type: 'number'
    },{
        name: 'ListDescription',
        type: 'string'
    }, {
        name: 'ListItem',
        type: 'string'
    }],
    proxy: {
        extraParams: {
            pListName: 'NCPDPVersion'
        },
        url: 'system/{0}/listdetail'
    }
});