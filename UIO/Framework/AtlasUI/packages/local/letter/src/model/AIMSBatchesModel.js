Ext.define('Atlas.letter.model.AIMSBatchesModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.aimsbatchesmdl',
    fields: [
        {name: 'batchSelect', type: 'boolean', defaultValue: false},
        {name: 'AIMSJobNumber', type: 'string', mapping: 'AIMSJobNum' },
        {name: 'SentDate', type: 'string', mapping: 'SentDate'},
        {name: 'DocCount', type: 'string', mapping: 'DocCount' }
    ],
    proxy: {
        url: 'member/{0}/aimsbatches',
        extraParams: {
            pagination: true
        }
    }
});