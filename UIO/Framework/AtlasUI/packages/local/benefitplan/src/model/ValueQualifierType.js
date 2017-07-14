/**
 * Created by s6393 on 9/20/2016.
 */
Ext.define('Atlas.benefitplan.model.ValueQualifierType', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'ValQulfrTypeSK', type: 'number'},
        {name: 'ValQulfrDesc', type: 'string'},
        {name: 'ValQulfrCode', type: 'string'}
    ],
    proxy: {
        url: '/ValueQualifierType'
    }
});