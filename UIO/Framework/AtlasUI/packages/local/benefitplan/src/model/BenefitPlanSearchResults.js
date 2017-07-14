/**
 * Created by s6393 on 9/28/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitPlanSearchResults', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'BnftPlanSK', type: 'number'},
        {name: 'BnftPlanID', type: 'string'},
        {name: 'BnftPlanName', type: 'string'},
        {name: 'BnftPlanTypeCode', type: 'string'},
        {name: 'LOBName', type: 'string'},
        {name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'TmpltInd', type: 'bool'}
    ],
    proxy: {
        url: '/BenefitPlanSearch'
    }
});