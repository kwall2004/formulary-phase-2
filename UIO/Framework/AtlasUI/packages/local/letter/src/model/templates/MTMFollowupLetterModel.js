Ext.define('Atlas.letter.model.templates.MTMFollowupLetterModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.mtmfollowuplettermdl',
    fields: [
        {name: 'AIMSJobNum', type: 'string', mapping: 'AIMSJobNum' },
        {name: 'DocCount', type: 'string', mapping: 'DocCount' }
    ],
    pageSize: 50,
    proxy: {
        url: 'member/{0}/letterdetail'
    }
});