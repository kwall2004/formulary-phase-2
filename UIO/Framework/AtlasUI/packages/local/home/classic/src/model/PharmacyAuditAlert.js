Ext.define('Atlas.home.model.PharmacyAuditAlert', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'TotalCount', type: 'int'},
        {name: 'Description', type: 'string'}
    ],

    proxy: {
        url: 'pharmacy/{0}/pharmacyauditalert',
        timeout: 120000
    }
});