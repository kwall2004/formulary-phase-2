/**
 * Created by s6393 on 10/31/2016.
 */

Ext.define('Atlas.benefitplan.model.DeductibleExclusionQualifierType', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [

        {name: 'DeducblExclQulfrTypeSK', type: 'int'},
        {name: 'DeducblExclQulfrTypeCode', type: 'string'},
        {name: 'DeducblExclQulfrTypeDesc', type: 'string'}
    ],

    proxy: {
        url: '/DeductibleExclusionQualifierType'
    }
});
