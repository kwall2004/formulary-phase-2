Ext.define('Atlas.atlasformulary.model.StepTherapyHeader', {
  extend: 'Atlas.atlasformulary.model.Base',
  fields: [
    'CvrgPrptyPgmSK',
    'StepThrpyPgmSK',
    'Status',
    'UserGrpSK',
    'UserGrpName',
    'CvrgPrptyPgmName',
    'DrugRefDbSK',
    'StepCnt',
    'ClaimsMsgCode',
    'ClaimsMsgText'
  ],
  proxy: {
    type: 'formulary',
    url: '/StepTherapyHeader',
    idParam: 'coveragePropertyProgramSK'
  }
});
