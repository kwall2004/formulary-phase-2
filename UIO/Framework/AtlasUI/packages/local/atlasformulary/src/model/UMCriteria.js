Ext.define('Atlas.atlasformulary.model.UMCriteria', {
  extend: 'Atlas.atlasformulary.model.Base',

  idProperty: 'DrugCatgSK',

  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'IsOverrideGenericCheck' },
    { name: 'IsSpecialityIsSpeciality' },
    { name: 'IsRestrictToPkgSize' },
    { name: 'IsMedicaidCarveOut' },
    { name: 'IsMedicaidFeeScreen' },
    { name: 'IsMaintenanceDrug' },
    { name: 'ExtendedDaysSupply' },
    { name: 'PAInd' },
    { name: 'PAName' },
    { name: 'PAMinAge' },
    { name: 'PAMaxAge' },
    { name: 'IsSTRequired' },
    { name: 'StepTherapyName' },
    { name: 'MaxFillQty' },
    { name: 'QLFillQty' },
    {
      name: 'DaysSupplyFillQty',
      type: 'number'
    },
    { name: 'MaxFillPerPeriod' },
    { name: 'QLFillPerPeriod' },
    { name: 'DaysSupplyFillPerPeriod' },
    { name: 'MaxFillPeriodType' },
    { name: 'QLFillPeriodType' },
    { name: 'DaysSupplyPeriodType' },
    { name: 'Gender' },
    { name: 'AgeLimitMin' },
    {},
    { name: 'MaleAgeLimitMin' },
    { name: 'FemaleAgeLimitMin' },
    { name: 'AgeLimitMax' },
    { name: 'MaleAgeLimitMax' },
    { name: 'FemaleAgeLimitMax' },
    { name: 'AgeLimitType' },
    { name: 'MaleAgeLimitType' },
    { name: 'FemaleAgeLimitType' },
    { name: 'PDLStatus' },
    { name: 'PDFMessage' },
    { name: 'UserNotes' },
    { name: 'UserId' },
    { name: 'DrugCatgSK' },
    { name: 'FrmlrySK' },
    { name: 'FrmlryTierSK' },
    { name: 'DrugCatgName' },
    { name: 'TierCode' },
    { name: 'IsCovered' },
    { name: 'PAAgeLimitType' },
    { name: 'UserId' }
  ],
  /* eslint-enable object-curly-newline */
  proxy: {
    url: '/coverageproperties',
    idParam: 'drugcategorysk'
  }
});
