/**
 * Created by T3852 on 9/30/2016.
 */
Ext.define('Atlas.portals.model.MemberCoverageCopayModel', {
  extend: 'Atlas.common.model.Base',

  fields: [
    {
      name: 'formularyTierName',
      type: 'string'
    },
    {
      name: 'memberResponsibilityAmt',
      type: 'int'
    }
  ],
  proxy: {
    url: 'portal/{0}/memberdrugscopay'
  }
});