Ext.define('Atlas.letter.model.templates.ClaimInterventionLetterModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.claiminterventionlettermdl',
    fields: [
        {name: 'AIMSJobNum', type: 'string', mapping: 'AIMSJobNum' },
        {name: 'DocCount', type: 'string', mapping: 'DocCount' }
    ],
    pageSize: 50,
    proxy: {
        url: 'member/{0}/letterdetail'
    }
});