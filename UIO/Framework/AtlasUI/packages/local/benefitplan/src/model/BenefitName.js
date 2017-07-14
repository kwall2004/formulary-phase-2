/**
 * Created by s6393 on 9/22/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitName', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.benefitnames',
    fields: [
        {name: 'BnftSK', type: 'number'},
        {name: 'BenefitName', type: 'string'}
    ],
    proxy: {
        url: '/Benefit'
    }
});






