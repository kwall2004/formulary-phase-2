/**
 * Created by d4662 on 11/23/2016.
 */
Ext.define('Atlas.admin.model.CarrierLOBExt', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'lobName',type: 'string' },
        { name: 'SystemID',type: 'number' },
        { name: 'carrierId',type: 'number' },
        { name: 'carrierLOBId',type: 'number' },
        { name: 'lastModified',type: 'string' },
        { name: 'dbRowID',type: 'string' },
        { name: 'rowNum',type: 'number' }
    ],

        proxy: {
            url: 'plan/rx/carrierlobsext',
            timeout: 120000
        }
});