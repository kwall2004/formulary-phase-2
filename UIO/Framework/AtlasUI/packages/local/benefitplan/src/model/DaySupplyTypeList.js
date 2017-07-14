/**
 * Created by n6570 on 10/14/2016.
 */
Ext.define('Atlas.benefitplan.model.DaySupplyTypeList', {
extend: 'Atlas.benefitplan.model.Base',
    proxy: {
        type: 'memory'
    },
    fields: [
        {name: 'BnftPlanPharmTypeDaySuplSK', type: 'int'},
        {name: 'DaySuplTypeSK', type: 'int'},
        {name: 'MaximumCost', convert: function (value) {
            return Ext.Number.from(value,0).toFixed(2).toString();  }},
        {name: 'DaySuplTypeCode', type: 'string'},
        {name: 'DaySuplTypeDesc', type: 'string'},
        {name: 'IsDeleted', type: 'bool'}
],
    validators: {
        BnftPlanPharmTypeDaySuplSK: 'presence',
        DaySuplTypeSK: 'presence',
        IsDeleted: 'presence',
        MaximumCost: {type: 'format', matcher: /^\$*[0-9]+\.*[0-9]{0,2}$/i, message: 'Maximum Cost  must be a valid currency amount ($100.00)'}
    }
});