Ext.define('Atlas.letter.model.templates.ExcludedProviderLetterModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.excludedproviderletteremdl',
    fields: [
        'name', 'id'
    ],
    proxy: {
        url: 'member/{0}/letterdetail'
    }
});