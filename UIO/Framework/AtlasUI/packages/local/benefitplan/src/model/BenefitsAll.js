/**
 * Created by n6570 on 10/6/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitsAll', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'BnftSK',type:'number'},
        {name: 'BnftCode', type:'number'},
        {name: 'BnftName', type: 'string'}

    ],
    proxy: {
        url: '/Benefit'
    }
});
