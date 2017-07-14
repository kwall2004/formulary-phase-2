/**
 * Created by n6570 on 1/19/2017.
 */
Ext.define('Atlas.benefitplan.model.CriteriaSetType', {
    extend: 'Atlas.benefitplan.model.Base',
    proxy: {
        type: 'memory'
    },
    fields: [
        {name: 'CrtriaSetTypeSK', type: 'string'},
        {name: 'CrtriaSetTypeCode', type: 'string'},
        {name: 'CrtriaSetTypeDesc', type: 'number'}
    ],

    proxy: {
        url: '/CriteriaSetType'
    }


});
