/**
 * Created by s4505 on 10/13/2016.
 * Updated by s4662
 */

Ext.define('Atlas.admin.model.Options', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminoptions',
    fields: [

        { name: 'keyName',     type: 'string',defaultValue:'' },
        { name: 'keyValue',      type: 'string',defaultValue:'' },
        { name: 'keyDescription',   type: 'string',defaultValue:''},
        { name: 'isNeedUpdate',   type: 'boolean', defaultValue:false}
    ],
    proxy: {
        url: 'system/rx/options',
        extraParams: {
            pagination: true
        }
    }

});