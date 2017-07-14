Ext.define('Atlas.atlasformulary.model.FormularyReviewModel', {
  extend: 'Ext.data.Model',

  /* eslint-disable object-curly-newline, object-property-newline */
  fields: [
    { name: 'status', type: 'string' },
    { name: 'formularyName', type: 'string' },
    { name: 'lineOfBusiness', type: 'string' },
    { name: 'dataSource', type: 'string' },
    { name: 'daysActive', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'effectiveDate', type: 'string' },
    { name: 'planType', type: 'string' },
    { name: 'defaultTherapy', type: 'string' },
    { name: 'drugType', type: 'string' },
    { name: 'Description', type: 'string' }
  ]
  /* eslint-enable object-curly-newline */
});