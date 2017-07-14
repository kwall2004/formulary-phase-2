/**
 * Created by s6393 on 9/22/2016.
 */
Ext.define('Atlas.benefitplan.model.Benefit', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.benefit',
    fields: [
        {name: 'BnftSK', type: 'number'},
        {name: 'BenefitName', type: 'string'},
        {name: 'BnftCode', type: 'string'},
        {name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'CurrentUser', type: 'string'},
        {name: 'BnftOrder', type: 'string'},
        {name: 'LastPblshTs', type: 'date', persist:false},
        {name: 'LastSubmtdForTestingTs', type: 'date', persist:false},
        {name: 'StatDesc', type: 'string'},
        {name: 'ServiceTypes'}
    ],
     proxy: {
     url: '/BenefitDetail'
     }
});
