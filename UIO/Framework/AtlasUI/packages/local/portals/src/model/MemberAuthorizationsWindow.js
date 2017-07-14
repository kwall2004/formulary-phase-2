Ext.define('Atlas.portals.model.MemberAuthorizationsWindow', {
  extend: 'Atlas.common.model.Base',
  fields: [
    {
      name: 'tt_AreaName',
      type: 'string'
    },
    {
      name: 'tt_Count',
      type: 'string'
    },
    {
      name: 'tt_Benefit',
      type: 'string'
    },
    {
      name: 'tt_Available',
      type: 'string'
    }

  ],
  proxy: {
    extraParams: {
      'pListName': 'TrainingProviderPortalWebEx',
      'pFields': '200000719000|01/01/2016',
      'pLobID': ''
    },
    url: 'eligibility/hp/memberservicecount'
  }
});