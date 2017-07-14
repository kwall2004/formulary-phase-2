Ext.define('Atlas.letter.view.AdvancedSearchViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.letter-advsearch',

    stores: {
        lettertypes: {
            model: 'Atlas.letter.model.AdvancedSearchModel',
            session: true
        },
        letterdetailsstore: {
            model: 'Atlas.letter.model.LetterDetailsModel',
            remoteSort: true,
            session: true
        }
    }
});