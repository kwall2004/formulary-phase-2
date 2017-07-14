/**
 * Created by d4662 on 11/23/2016.
 */
Ext.define('Atlas.admin.model.AllCarrierInfo', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'carrierId',type: 'string' },
        { name: 'carrierName',type: 'string' },
        { name: 'serviceLocation',type: 'string' },
        { name: 'address1',type: 'string' },
        { name: 'address2',type: 'string' },
        { name: 'city',type: 'string' },
        { name: 'state',type: 'string' },
        { name: 'zip',type: 'string' },
        { name: 'dbRowID',type: 'string' },
        { name: 'RowNum',type: 'number' }
    ],proxy: {
        url: 'plan/rx/carriers',
        timeout: 120000
    }
});