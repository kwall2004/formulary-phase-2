/**
 * Created by d4662 on 11/23/2016.
 */
Ext.define('Atlas.admin.model.ListDetail', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'ListItem',type: 'string' },
        { name: 'ListDescription',type: 'string' },
        { name: 'Active',type: 'boolean' },
        { name: 'charString',type: 'string' },
        { name: 'planGroupAccess',type: 'string' },
        { name: 'systemID',type: 'string' },
        { name: 'dbRowID',type: 'string' },
        { name: 'RowNum',type: 'number' }
    ],


    proxy: {
        url : 'portal/rx/listdetail',
        timeout: 120000
    }
});