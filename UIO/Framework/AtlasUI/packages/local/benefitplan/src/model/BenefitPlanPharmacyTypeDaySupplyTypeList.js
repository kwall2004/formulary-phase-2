/**
 * Created by n6570 on 10/6/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitPlanPharmacyTypeDaySupplyTypeList', {
    extend: 'Atlas.benefitplan.model.Base',
    //hasMany: {model: 'DaySupplyTypeList', name: 'DaySupplyTypeList', associationKey: 'DaySupplyTypeList'},
    fields: [
        {name: 'BnftPlanPharmTypeDaySuplSK', type: 'int'},
        {name: 'BnftPlanSK', type: 'int'},
        {name: 'PharmTypeSK', type: 'int'},
        {name: 'PharmTypeCode', type: 'string'},
        {name: 'EarlyRefillPct', convert: function (value) {
            return Ext.Number.from(value,0).toFixed(2).toString();  }},
        {name: 'MaxDaySuplMntncMedications', type: 'int'},
        {name: 'MaxDaySuplNonMntncMedications', type: 'int'},
        {name: 'MaxCostPerRx', convert: function (value) {
            return Ext.Number.from(value,0).toFixed(2).toString();  }},
        {name: 'IsDeleted', mapping:'DaySupplyTypeList[0].MaximumCost', type: 'bool'},

        //{name: 'DaySupplyTypeList'},

        //For 1 Month
        {name: 'BnftPlanPharmTypeDaySuplSK30', mapping:'DaySupplyTypeList[0].BnftPlanPharmTypeDaySuplSK', type: 'int'},
        {name: 'DaySuplTypeSK30', mapping:'DaySupplyTypeList[0].DaySuplTypeSK', type: 'int'},
        {name: 'MaximumCost30', mapping:'DaySupplyTypeList[0].MaximumCost', type: 'int'},
        {name: 'DaySuplTypeCode30', mapping:'DaySupplyTypeList[0].DaySuplTypeCode', type: 'string'},
        {name: 'DaySuplTypeDesc30', mapping:'DaySupplyTypeList[0].DaySuplTypeDesc', type: 'string'},
        {name: 'IsDeleted30', mapping:'DaySupplyTypeList[0].IsDeleted', type: 'bool'},

        //For 60 Days
        {name: 'BnftPlanPharmTypeDaySuplSK60', mapping:'DaySupplyTypeList[1].BnftPlanPharmTypeDaySuplSK', type: 'int'},
        {name: 'DaySuplTypeSK60', mapping:'DaySupplyTypeList[1].DaySuplTypeSK', type: 'int'},
        {name: 'MaximumCost60', mapping:'DaySupplyTypeList[1].MaximumCost', type: 'int'},
        {name: 'DaySuplTypeCode60', mapping:'DaySupplyTypeList[1].DaySuplTypeCode', type: 'string'},
        {name: 'DaySuplTypeDesc60', mapping:'DaySupplyTypeList[1].DaySuplTypeDesc', type: 'string'},
        {name: 'IsDeleted60', mapping:'DaySupplyTypeList[1].IsDeleted', type: 'bool'},

        //For 90 Days
        {name: 'BnftPlanPharmTypeDaySuplSK90', mapping:'DaySupplyTypeList[2].BnftPlanPharmTypeDaySuplSK', type: 'int'},
        {name: 'DaySuplTypeSK90', mapping:'DaySupplyTypeList[2].DaySuplTypeSK', type: 'int'},
        {name: 'MaximumCost90', mapping:'DaySupplyTypeList[2].MaximumCost', type: 'int'},
        {name: 'DaySuplTypeCode90', mapping:'DaySupplyTypeList[2].DaySuplTypeCode', type: 'string'},
        {name: 'DaySuplTypeDesc90', mapping:'DaySupplyTypeList[2].DaySuplTypeDesc', type: 'string'},
        {name: 'IsDeleted90', mapping:'DaySupplyTypeList[2].IsDeleted', type: 'bool'},

        {name: 'CurrentUser', type: 'string'}
    ],
    validators: {
        BnftPlanPharmTypeDaySuplSK: 'presence',
        BnftPlanSK: 'presence',
        PharmTypeSK: 'presence',
        IsDeleted: 'presence',
        EarlyRefillPct: {type: 'format', matcher: /^\$*[0-9]+\.*[0-9]{0,2}$/i, message: 'Early Refill Percentage  be a valid currency amount ($100.00)'},
        MaxCostPerRx: {type: 'format', matcher: /^\$*[0-9]+\.*[0-9]{0,2}$/i, message: 'Maximum Cost  must be a valid currency amount ($100.00)'}
    },
    proxy: {
        url: '/benefitPlanPharmacyType'
    }
});