Ext.define('Atlas.letter.model.templates.FormularyChangeLetterModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.formularychangelettermdl',
    fields: [
        'Freetext1',
        'Freetext2',
        'Freetext3',
        'Freetext4',
        'Freetext5',
        'Freetext6',
        'Freetext7',
        'Freetext8',
        'Freetext9',
        'Freetext10'
    ],
    pageSize: 50,
    proxy: {
        url: 'member/{0}/letterdetail'
    }
});