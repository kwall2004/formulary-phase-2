/**
 * Created by d4662 on 11/23/2016.
 */
Ext.define('Atlas.admin.model.EDIPartners', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'partnerId',type: 'string' },
        { name: 'partnerName',type: 'string' },
        { name: 'ein',type: 'string' },
        { name: 'ediPath',type: 'string' },
        { name: 'ipAddress',type: 'string' },
        { name: 'SystemID',type: 'number' },
        { name: 'idQualifier',type: 'string' },
        { name: 'planIdQualifier',type: 'string' },
        { name: 'inputDir',type: 'string' },
        { name: 'exportDir',type: 'string' },
        { name: 'pgpkeyname',type: 'string' },
        { name: 'planSubmitterId',type: 'string' },
        { name: 'sendIndividualFile',type: 'string' },
        { name: 'sendSecureEmail',type: 'string' },
        { name: 'sendDownloadConf',type: 'string' }
    ],proxy: {
        url: 'system/rx/edipartnersall',
        timeout: 120000
    }
});