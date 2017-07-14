Ext.define('Atlas.portals.hpmember.model.ProviderHedisData', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'rowNum',
        'Measure',
        'measureDesc',
        'Members',
        'PaidYTD',
        'possibleBonus'
    ],

    proxy: {
        url: 'provider/hp/providerhedisdata'
    }
});