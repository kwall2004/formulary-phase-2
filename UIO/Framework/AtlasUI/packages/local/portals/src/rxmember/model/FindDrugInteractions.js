Ext.define('Atlas.portals.rxmember.model.FindDrugInteractions', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'pText',type: 'string'}
    ],

    proxy: {
        url: 'formulary/{0}/finddruginteractions'
    }
});