Ext.define('Atlas.home.model.PatientSafetyAlert', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'totalCount', type: 'int'},
        {name: 'alertTypeName', type: 'string'}
    ],

    proxy: {
        url: 'member/{0}/patsafetysummary',
        extraParams: {
            pQueID: 23 //queDescription.Description = 'Patient Safety'
        },
        timeout: 120000
    }
});