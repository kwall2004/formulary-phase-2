Ext.define('Atlas.home.model.DMRAlert', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'Stat', type: 'string'},
        {name: 'StatusDescription', type: 'string'},
        {name: 'totalCount', type: 'int'}
    ],

    proxy: {
        url: 'member/{0}/dmralert',
        timeout: 120000
    }
});