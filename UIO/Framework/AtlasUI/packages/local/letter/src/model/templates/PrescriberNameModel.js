Ext.define('Atlas.letter.model.templates.PrescriberNameModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.prescribernamemdl',
    fields: [
        {name: 'AIMSJobNum', type: 'string', mapping: 'AIMSJobNum' },
        {name: 'DocCount', type: 'string', mapping: 'DocCount' }
    ],
    pageSize: 50,
    proxy: {
        url: 'member/{0}/letterdetail'
    }
});