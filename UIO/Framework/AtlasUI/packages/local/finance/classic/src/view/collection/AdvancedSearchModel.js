Ext.define('Atlas.finance.view.collection.AdvancedSearchModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.finance-collection-advsearch',

    stores: {
        collectioncreditsearch: {

        },

        letterslist: {
            model: 'Atlas.finance.model.LettersList',
            autoLoad: true,
            listeners: {
                load: 'onLettersListLoad'
            }
        },

        storeCollectioncreditmasterext: {
            model: 'Atlas.finance.model.Collectioncreditmasterext',
            autoLoad: false,
            pageSize:25
        }
    }
});
