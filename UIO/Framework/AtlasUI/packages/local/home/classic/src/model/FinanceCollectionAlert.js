Ext.define('Atlas.home.model.FinanceCollectionAlert', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'TotalCount', type: 'int'},
        {name: 'Description', type: 'string'}
    ]/*,

    proxy: {
        url: 'member/{0}/financecollectionalert',
        timeout: 120000
    }*/
});