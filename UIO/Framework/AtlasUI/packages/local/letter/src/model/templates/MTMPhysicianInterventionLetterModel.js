Ext.define('Atlas.letter.model.templates.MTMPhysicianInterventionLetterModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.mtmphysicianinterventionlettermdl',
    fields: [
        {name: 'AIMSJobNum', type: 'string', mapping: 'AIMSJobNum' },
        {name: 'DocCount', type: 'string', mapping: 'DocCount' }
    ],
    pageSize: 50,
    proxy: {
        url: 'member/{0}/letterdetail'
    }
});