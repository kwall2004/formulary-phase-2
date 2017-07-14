/**
 * Created by l6630 on 10/14/2016.
 */


Ext.define('Atlas.benefitplan.model.ProviderNetworkTiers', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.providernetworktiers',
    fields: [
        {name: 'NtwrkNtwrkTierSK', type: 'number'},
        {name: 'PopGrpBnftPlanSK', type: 'number'},
        {name: 'BnftPlanSK', type: 'number'},
        {name: 'NtwrkTierSK', type: 'number'},
        {name: 'NtwrkSK', type: 'number'},
        {name: 'MACListSK', type: 'string'},
        {name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'NtwrkTierName', type: 'string'},
        {name: 'Deleted', type: 'string'},
        {name: 'CurrentUser', type: 'string'}
    ]
});



