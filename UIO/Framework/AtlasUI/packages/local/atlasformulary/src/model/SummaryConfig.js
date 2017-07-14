Ext.define('Atlas.atlasformulary.model.SummaryConfig', {
  extend: 'Atlas.atlasformulary.model.Base',

  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'SumRptCfgSK' },
    { name: 'SumRptCfgName' },
    { name: 'SumRptCfgDesc' },
    { name: 'FileFmtSK' },
    { name: 'FontSizeSK' },
    { name: 'InclNotCvrdInd', type: 'boolean' },
    { name: 'InclUMInd', type: 'boolean' },
    { name: 'LangSK' },
    { name: 'TierDisplSK' },
    { name: 'SectionSortOrderList' }
  ],
  /* eslint-ensable object-curly-newline */
  proxy: {
    type: 'formulary',
    url: '/summaryconfig',
    idParam: 'SumRptCfgSK',
    skParam: '',
    pageParam: '',
    limitParam: '',
    startParam: '',
    pagination: true
  }
});
