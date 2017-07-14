Ext.define('Atlas.portals.model.MyBenefitsAndCoverageModel', {
  extend: 'Atlas.common.model.Base',

  fields: [
    {
      name: 'PlanBenefitId',
      type: 'int'
    },
    {
      name: 'CarrierLOBId',
      type: 'int'
    },
    {
      name: 'CarrierName',
      type: 'string'
    },
    {
      name: 'RecipientId',
      type: 'int'
    },
    {
      name: 'PlanBenefitName',
      type: 'string'
    },
    {
      name: 'PlanGroupName',
      type: 'string'
    },
    {
      name: 'LOBName',
      type: 'string'
    },
    {
      name: 'BIN',
      type: 'string'
    },
    {
      name: 'CMSPBPId',
      type: 'string'
    },
    {
      name: 'EffDate',
      type: 'string'
    },
    {
      name: 'PlanGroupId',
      type: 'int'
    },
    {
      name: 'SystemId',
      type: 'int'
    },
    {
      name: 'CMSContractId',
      type: 'string'
    },
    {
      name: 'MemberId',
      type: 'string'
    },
    {
      name: 'CarrierId',
      type: 'int'
    },
    {
      name: 'PrimaryCarePhys',
      type: 'string'
    },
    {
      name: 'TermDate',
      type: 'string'
    },
    {
      name: 'PCN',
      type: 'string'
    }
  ],

  proxy: {
    url: 'portal/{0}/portalmembercoveragep',
    reader: {
      //Specify metadata property
      metaProperty: 'metadata',
      //Optionally specify root of the data if it's other than 'data'
      rootProperty: function (payload) {
        return payload.data;
      }
    }
  }

});