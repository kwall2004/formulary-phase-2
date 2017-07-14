Ext.define('Atlas.letter.model.templates.HRMMbrAwarenessLettersModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.hrmmbrawarenesslettersmdl',
    fields: [
        'Freetext1', 'Freetext2', 'Freetext3', 'Freetext4'
    ],
    pageSize: 50,
    proxy: {
        url: 'member/{0}/letterdetail'
    }
});