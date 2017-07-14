Ext.define('Atlas.portals.hpmember.model.HedisDetail', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'PaidYTD',
        'rowNum',
        'possibleBonus',
        'priorYear',
        'YTDHits',
        'Members',
        'measureDesc',
        {
            name: 'Percent',
            calculate: function(data) {
                return (data.priorYear + data.YTDHits) / data.Members;
            }
        }
    ],

    proxy: {
        url: 'provider/hp/hedisdetail'
    }
});