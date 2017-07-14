Ext.define('Atlas.atlasformulary.model.FormularyChangesModel', {
  extend: 'Ext.data.Model',

  /* eslint-disable object-curly-newline, object-property-newline */
  fields: [
    { name: 'RecordType', type: 'string' },
    { name: 'FormularyID', type: 'string' },
    { name: 'FormularyVersion', type: 'string' },
    { name: 'FormularyName', type: 'string' },
    { name: 'LevelType', type: 'string' },
    { name: 'RuleLevelID', type: 'string' },
    { name: 'Descr', type: 'string' },
    { name: 'OTCind', type: 'string' },
    { name: 'Covered', type: 'string' },
    { name: 'ovrGenericCheck', type: 'string' },
    { name: 'PartDExcludedDrug', type: 'string' },
    { name: 'MedicaidCarveOutDrug', type: 'string' },
    { name: 'MedicaidFeeScreen', type: 'string' },
    { name: 'SpecialtyDrugInd', type: 'string' },
    { name: 'DaysSupplyTimePeriod', type: 'string' },
    { name: 'PAInd', type: 'string' },
    { name: 'PAName', type: 'string' },
    { name: 'PAMinAge', type: 'string' },
    { name: 'PAMaxAge', type: 'string' },
    { name: 'StepTherapyName', type: 'string' },
    { name: 'TierCode', type: 'string' },
    { name: 'MinAge', type: 'string' },
    { name: 'MaxAge', type: 'string' },
    { name: 'QtyLimit', type: 'string' },
    { name: 'QtyLmtTimePeriod', type: 'string' },
    { name: 'DaysSupply', type: 'string' },
    { name: 'DaysSupplyTimePeriod', type: 'string' },
    { name: 'Fills', type: 'string' },
    { name: 'FillsTimePeriod', type: 'string' },
    { name: 'systemID', type: 'string' },
    { name: 'Changes', type: 'string' },
    { name: 'MedicarePAType', type: 'string' }
  ],
  /* eslint-enable object-curly-newline, object-property-newline */
  proxy: {
    url: 'formulary/{0}/formrulechanges'
  }
});