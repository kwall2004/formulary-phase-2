/**
 * Created by s6393 on 9/28/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitSearchResults', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'BnftSK', type: 'number'},
        {name: 'BenefitName', type: 'string'},
        {name:'BnftCode',type:'string'},
        {name:'StatDesc', type:'string'},
        {name: 'IndustryStandardName', type: 'string'},
        {name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'}
    ],
    proxy: {
        url: '/BenefitDefinitionSearch'
    }
});