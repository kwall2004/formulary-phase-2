/**
 * Created by s6393 on 10/28/2016.
 */
Ext.define('Atlas.benefitplan.model.CopayCoinsuranceLogicType', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'CopayCoinsuranceLogicTypeSK', type: 'int'},
        {name: 'CopayCoinsuranceLogicTypeCode', type: 'string'},
        {name: 'CopayCoinsuranceLogicTypeDesc', type: 'string'}
    ],
    proxy: {
        url: '/CopayCoinsuranceLogicType'
    }
});
