Ext.define('Atlas.letter.model.templates.DrugRecallLetterModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.drugrecalllettermdl',
    fields: [
        'Freetext1',
        'Freetext2',
        'Freetext3',
        'Freetext4',
        'Freetext5',
        'Freetext6',
        'Freetext7'
    ],
    pageSize: 50,
    proxy: {
        url: 'member/{0}/letterdetail'
    }
    
});