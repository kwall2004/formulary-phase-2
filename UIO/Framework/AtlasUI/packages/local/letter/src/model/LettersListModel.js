Ext.define('Atlas.letter.model.LettersListModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.letterslistmodel',
    fields: [
        {name: 'LetterName', type: 'string', mapping: 'LetterName' },
        {name: 'LetterNameID', type: 'string', mapping: 'LetterNameID' }
    ],
    pageSize: 50,
    proxy: {
        url: 'shared/{0}/letterslist'
    }
});