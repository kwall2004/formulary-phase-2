/**
 * Created by n6570 on 10/26/2016.
 */
Ext.define('Atlas.benefitplan.model.FormularyTier', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'FormularyTier',
    proxy: {
        url: '/FormularyTier'
    },
    fields: [
        {name: 'FrmlryTierSK', type: 'number'},
        {name: 'BnftPlanSK', type: 'number'},
        {name: 'FrmlryTierNbr', type: 'number'},
        {name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'}
    ]
});
