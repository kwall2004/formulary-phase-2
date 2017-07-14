Ext.define('Atlas.portals.model.MemberDeductiblesModel', {
  extend: 'Atlas.common.model.Base',

  fields: [
    {
      name: 'DeductibleAmt',
      type: 'string'
    },
    {
      name: 'RemDeductAmt',
      type: 'string'
    },
    {
      name: 'CurrentTroopAmt',
      type: 'string'
    },
    {
      name: 'MaxTroopAmt',
      type: 'string'
    }
  ],

  proxy: {
    url: 'portal/{0}/memberdeductiblesp'
  }

});