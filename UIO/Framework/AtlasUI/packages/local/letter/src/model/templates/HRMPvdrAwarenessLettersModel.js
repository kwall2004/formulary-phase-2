Ext.define('Atlas.letter.model.templates.HRMPvdrAwarenessLettersModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.hrmpvdrawarenesslettersmdl',
    fields: [
        'Freetext1', 'Freetext2', 'Freetext3', 'Freetext4'
    ],
    proxy: {
        url: 'member/{0}/letterdetail'
    }
});