/**
 * Created by d4662 on 11/29/2016.
 */
Ext.define('Atlas.admin.model.planGroupHierarchyExt', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminplanGroupHierarchyExt',

    fields: [
        { name: 'carrierName',     type: 'string' },
        { name: 'LOBName',     type: 'string' },
        { name: 'dbRowID',     type: 'number' },
        { name: 'carrierLOBId',     type: 'number' },
        { name: 'rowNum',     type: 'string' },
        { name: 'carrierAcctNumber',     type: 'string' },
        { name: 'SystemID',     type: 'number' },
        { name: 'lastModified',     type: 'string' },
        { name: 'carrierId',     type: 'number' },
        { name: 'AccountName',     type: 'string' }
    ],
    proxy: {
        url: 'plan/rx/plangrouphierarchyext',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function (payload) {
                payload.data.forEach(function (item, index) {
                    item. planGroupHierFullName= item.carrierName + ' - ' +  item.AccountName + ' - ' +  item.LOBName + ' - ' +  item.carrierAcctNumber;
                });

                return payload.data;
            }
        },
        timeout: 120000
    }


});