Ext.define('Atlas.atlasformulary.model.SummaryReportHeaderFooter', {
  extend: 'Atlas.atlasformulary.model.Base',
  fields: [
    { name: 'summaryReportConfigSectionSK' },
    { name: 'FormularyEffectiveDateFooter', type: 'boolean' },
    { name: 'FormularyEffectiveDateHeader', type: 'boolean' },
    { name: 'FormularyEndDateFooter', type: 'boolean' },
    { name: 'FormularyEndDateHeader', type: 'boolean' },
    { name: 'FormularyIdFooter', type: 'boolean' },
    { name: 'FormularyIdHeader', type: 'boolean' },
    { name: 'FormularyNameFooter', type: 'boolean' },
    { name: 'FormularyNameHeader', type: 'boolean' },
    { name: 'FormularyOwnerFooter', type: 'boolean' },
    { name: 'FormularyOwnerHeader', type: 'boolean' },
    { name: 'FormularyVersionFooter', type: 'boolean' },
    { name: 'FormularyVersionHeader', type: 'boolean' }
  ],
  /* eslint-enable object-curly-newline */
  proxy: {
    url: '/SummaryConfigHeaderFooter',
    summaryReportConfigSectionSK: 'formularySK'
  }
});
