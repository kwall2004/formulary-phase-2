Ext.define('Atlas.atlasformulary.model.FormularyApprovalModel', {
  extend: 'Ext.data.Model',

  /* eslint-disable object-curly-newline, object-property-newline */
  fields: [
    { name: 'systemID', type: 'string' },
    { name: 'FormularyID', type: 'string' },
    { name: 'FormularyName', type: 'string' },
    { name: 'Stat', type: 'string' },
    { name: 'StatDesc', type: 'string' },
    { name: 'FormularyVersion', type: 'string' },
    { name: 'dataSource', type: 'string' },
    { name: 'formularyType', type: 'string' },
    { name: 'excTPARestrictionCodes', type: 'string' },
    { name: 'incTPARestrictionCodes', type: 'string' },
    { name: 'incRouteOfAdminCodes', type: 'string' },
    { name: 'excRouteOfAdminCodes', type: 'string' },
    { name: 'incExcOTC', type: 'string' },
    { name: 'incExcPresc', type: 'string' },
    { name: 'CreatedBy', type: 'string' },
    { name: 'LastUpdateBy', type: 'string' },
    { name: 'MDApprovedBy', type: 'string' },
    { name: 'PDApprovedBy', type: 'string' },
    { name: 'genMandatory', type: 'string' },
    { name: 'CreateDateTime', type: 'string' },
    { name: 'LastUpdateDateTime', type: 'string' },
    { name: 'EffectiveDate', type: 'string' },
    { name: 'TerminationDate', type: 'string' },
    { name: 'PDApprovedDate', type: 'string' },
    { name: 'MDApprovedDate', type: 'string' }
  ],
  /* eslint-enable object-curly-newline, object-property-newline */
  proxy: {
    url: 'formulary/{0}/formularies'
  }
});
