/**
 * Created by s6393 on 9/20/2016.
 */
Ext.define('Atlas.benefitplan.model.CriteriaConditionType', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'CrtriaCondTypeSK', type: 'number'},
        {name: 'CrtriaCondTypeCode', type: 'string'}
    ],
    proxy: {
        url: '/CriteriaConditionType'
    }
});