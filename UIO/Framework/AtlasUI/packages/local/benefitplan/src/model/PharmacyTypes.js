/**
 * Created by s6635 on 11/1/2016.
 */

Ext.define('Atlas.benefitplan.model.PharmacyTypes',{
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'PharmTypeSK',type: 'int'},
        {name: 'PharmTypeCode',type: 'string'}
    ],
proxy: {
    url: '/PharmacyTypes'
}
});

