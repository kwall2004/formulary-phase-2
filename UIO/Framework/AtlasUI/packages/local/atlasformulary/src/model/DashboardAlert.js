Ext.define('Atlas.atlasformulary.model.DashboardAlert', {
  extend: 'Ext.data.Model',
  alias: 'model.dashboardalert',

  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'AlertTypeDesc' },
    { name: 'AlertDesc' },
    { name: 'ActnVal' },
    {
      name: 'CreatedTS',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s.u'
    },
    {
      name: 'AcknowledgedDt',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s'
    },
    { name: 'AlertSK' }
  ]
  /* eslint-enable object-curly-newline */
});

