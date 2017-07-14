/**
 * Created by S4505 on 10/20/2016.
 */

Ext.define('Atlas.admin.model.EDIFileInfo', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminedifileinfo',

    fields: [

        { name: 'filePattern',     type: 'string',defaultValue:'' },
        { name: 'carrierLOBId',      type: 'number', defaultValue:0 },
        { name: 'carrierAcctNumber',   type: 'string',defaultValue:''},
        { name: 'carrierId',     type: 'number', defaultValue:0 },
        { name: 'partnerId',      type: 'string',defaultValue:'' },
        { name: 'fileType',   type: 'string',defaultValue:''},
        { name: 'programName',   type: 'string',defaultValue:''},
       { name: 'carrierName',   type: 'string',defaultValue:''},
        { name: 'carrierAcctName',   type: 'string',defaultValue:''},
        { name: 'carrierLOBName',   type: 'string',defaultValue:''},
        { name: 'partnerName',   type: 'string',defaultValue:''},
       { name: 'carrierAcctName',   type: 'string',defaultValue:''},
        { name: 'systemID',   type: 'number',defaultValue:0},
        { name: 'isNeedUpdate',   type: 'boolean', defaultValue:false}

    ],
    proxy: {
        url: 'system/rx/edifileinfo', extraParams: {
            pagination: true
        },
        timeout: 120000
    }

});
