Ext.define('Atlas.letter.model.templates.TransitionLetterModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.transitionlettermdl',
    fields: [
        'AIMSJobNum',
        'DocCount',
        'Freetext1',
        'Freetext2',
        'Freetext3',
        'Freetext4',
        'Freetext5'
    ],
    pageSize: 50,
    proxy: {
        url: 'member/{0}/letterdetail'
    }
});