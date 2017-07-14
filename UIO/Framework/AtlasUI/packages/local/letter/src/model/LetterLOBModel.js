Ext.define('Atlas.letter.model.LetterLOBModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.letterlobmdl',
    fields: [
        'Active', 'ListDescription','ListItem','charString'
    ],
    pageSize: 50,
    proxy: {
        url: 'system/{0}/listdetail'
    }
});