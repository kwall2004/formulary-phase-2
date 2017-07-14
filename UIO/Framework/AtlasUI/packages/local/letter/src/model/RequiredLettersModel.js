Ext.define('Atlas.letter.model.RequiredLettersModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.requiredlettersmdl',
    fields: [
        {name: 'AIMSJobNum', type: 'string', mapping: 'AIMSJobNum' },
        {name: 'DocCount', type: 'string', mapping: 'DocCount' }
    ],
    pageSize: 50,
    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'member/{0}/requiredletterq'
    }
});