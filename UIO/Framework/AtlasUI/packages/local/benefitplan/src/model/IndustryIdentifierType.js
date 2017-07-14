/**
 * Created by s6393 on 9/30/2016.
 */
Ext.define('Atlas.benefitplan.model.IndustryIdentifierType', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.industryIdentifierType',
    fields: [
        {name: 'Value', type: 'number'},
        {name: 'Text', type: 'string'}
    ],
    proxy: {
        url: '/IndustryIdentifierType'
    }
});