/**
 * Created by s6393 on 10/31/2016.
 */
Ext.define('Atlas.benefitplan.model.DrugClassType', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [

        {name: 'DrugClsTypeSK', type: 'int'},
        {name: 'DrugClsTypeCode', type: 'string'},
        {name: 'DrugClsTypeDescrpition', type: 'string'}
    ],

    proxy: {
        url: '/DrugClassType'
    }
});
