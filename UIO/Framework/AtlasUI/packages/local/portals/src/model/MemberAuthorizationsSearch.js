Ext.define('Atlas.portals.model.MemberAuthorizationsSearch', {
  extend: 'Atlas.common.model.Base',
  fields: [
    {
      name: 'requestID',
      type: 'string'
    },
    {
      name: 'procedureCategoryDesc',
      type: 'string'
    },
    {
      name: 'startDate',
      type: 'string'
    },
    {
      name: 'endDate',
      type: 'string'
    },
    {
      name: 'requestStatus',
      type: 'string'
    },
    {
      name: 'servicingProvider',
      type: 'string'
    },
    {
      name: 'servicingFacility',
      type: 'string'
    }

  ],
  proxy: {
    url: 'caremanagement/hp/memberodcdmasterapi'
  }
});