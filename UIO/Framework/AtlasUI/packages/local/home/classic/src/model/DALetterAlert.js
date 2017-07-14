Ext.define('Atlas.home.model.DALetterAlert', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'tTotalCount', type: 'int'},
        {name: 'tDescription', type: 'string'}
    ],
    proxy: {
        url: 'claims/{0}/denialappealalert',
        timeout: 120000
    }
});