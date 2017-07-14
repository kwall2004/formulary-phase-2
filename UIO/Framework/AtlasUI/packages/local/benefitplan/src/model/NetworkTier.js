/**
 * Created by n6570 on 10/26/2016.
 */
Ext.define('Atlas.benefitplan.model.NetworkTier', {
    extend: 'Atlas.benefitplan.model.Base',
    proxy: {
        url: '/NetworkTier'
    },
    fields: [
        {name: 'NtwrkTierSK', type: 'number'},
        {name: 'BnftPlanSK', type: 'number'},
        {name: 'NtwrkTierNbr', type: 'number'},
        {name: 'NtwrkTierName', type: 'string'},
        {name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'}
    ]
});
