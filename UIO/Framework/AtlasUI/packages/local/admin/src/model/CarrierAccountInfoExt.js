/**
 * Created by d4662 on 11/23/2016.
 */
Ext.define('Atlas.admin.model.CarrierAccountInfoExt', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'accountName',type: 'string' },
        { name: 'SystemID', type: 'number' },
        { name: 'carrierId',type: 'number' },
        { name: 'carrierAcctNumber',type: 'string' },
        { name: 'lastModified',type: 'string' },
        { name: 'dbRowID',type: 'string' },
        { name: 'rowNum',type: 'string' }
    ],


    proxy: {
        url: 'plan/rx/carrieraccountext',
        timeout: 120000
    }
});