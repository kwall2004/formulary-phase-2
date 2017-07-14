Ext.define('Atlas.home.model.GrievanceAlert', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'stat', type: 'string'},
        {name: 'StatusDescription', type: 'string'},
        {name: 'totalCount', type: 'int'}
    ],

    proxy: {
        url: 'shared/{0}/grievancestatussummary',
        timeout: 120000
    }
});