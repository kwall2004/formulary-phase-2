Ext.define('Atlas.atlasformulary.model.StepNames', {
  extend: 'Atlas.common.model.Base',
  fields: [
    'ProgressFuncName',
    'RuleCriteria',
    'RuleName',
    'RuleActive',
    'RuleType',
    'systemID'
  ],
  proxy: {
    url: 'shared/{0}/pbmrules',
    extraParams: {
      pruletype: 'Medicare Step Therapies'
    },
    reader: {}
  }
});
