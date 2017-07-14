/**
 * Created by s6627 on 10/6/2016.
 */
Ext.define('Atlas.formulary.model.FormularyVersionModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        {
            name: 'NDC',
            reference: {
                parent: 'FormularyIdModel',
                inverse: {
                    autoLoad: false
                }
            }
        },
        {
            name: 'FormularyId',
            reference: {
                parent: 'FormularyIdModel',
                inverse: {
                    autoLoad: false
                }
            }
        },
        {name: 'FormularyVersion', type: 'int'},
        {name: 'FormularyName', type: 'string'},
        {name: 'FormularyDrugType', type: 'string'},
        {name: 'AssociatedPlans ', type: 'string'},
        {name: 'FormularyStatus', type: 'string'},
        {name: 'FormularyType', type: 'string'},
        {name: 'EffectiveDate', type: 'string'},
        {name: 'TerminationDate', type: 'string'},
        {name: 'AlertSystemId ', type: 'string'},
        {name: 'rulelevelID', type: 'string'},
        {name: 'levelType', type: 'string'},
        {name: 'OTCInd', type: 'string'},
        {name: 'SpecialtyDrugInd', type: 'string'},
        {name: 'TierCode ', type: 'string'},
        {name: 'GenderRestriction', type: 'string'},
        {name: 'MinAge', type: 'string'},
        {name: 'MaxAge', type: 'string'},
        {name: 'AgeType', type: 'string'},
        {name: 'LimitedAccess ', type: 'string'},
        {name: 'DaysSupply', type: 'string'},
        {name: 'DaysSupplyTimePeriod', type: 'string'},
        {name: 'Fills', type: 'string'},
        {name: 'FillsTimePeriod', type: 'string'},
        {name: 'QtyLimit ', type: 'string'},
        {name: 'QtyLmtTimePeriod', type: 'string'},
        {name: 'QLNotes', type: 'string'},
        {name: 'PAInd', type: 'string'},
        {name: 'PAName', type: 'string'},
        {name: 'PAMaxAge ', type: 'string'},
        {name: 'PAMinAge', type: 'string'},
        {name: 'StepTherapyInd', type: 'string'},
        {name: 'StepTherapyName', type: 'string'},
        {name: 'Notes', type: 'string'},
        {name: 'TextMessage ', type: 'string'},
        {name: 'ResourceLink', type: 'string'},
        {name: 'MedicaidCarveOutDrug', type: 'string'},
        {name: 'MedicaidFeeScreen', type: 'string'},
        {name: 'PartDExcludedDrug', type: 'string'},
        {name: 'MedicarePAType', type: 'string'},
        {name: 'MedicareSTGrpCount', type: 'string'},
        {name: 'MedicareSTGrpDesc1 ', type: 'string'},
        {name: 'MedicareSTStepValue1', type: 'string'},
        {name: 'MedicareSTGrpDesc2', type: 'string'},
        {name: 'MedicareSTStepValue2', type: 'string'},
        {name: 'MedicareSTGrpDesc3', type: 'string'}
    ],
    proxy: {
        extraParams: {
            pMode:'NewDrugs'
        },
        url: 'formulary/{0}/formularynewdrugs',
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }
});
