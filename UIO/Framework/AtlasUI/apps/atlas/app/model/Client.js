Ext.define('Atlas.model.Client',{
    extend: 'Atlas.common.model.StaticBase',
    //idProperty: 'CarrierID',
    fields: [
        {name: 'Carrier' , type: 'string'},
        {name: 'CarrierID' , type: 'string'},
        {name: 'Account' , type: 'string' },
        {name: 'CarrierAcctNumber' , type: 'string' },
        {name: 'LOB' , type: 'string' },
        {name: 'CarrierLOBID' , type: 'number' },
        {name: 'PlanGroupName' , type: 'string' },
        {name: 'PlanGroupId' , type: 'number' },
        {name: 'benefitName' , type: 'string' },
        {name: 'planBenefitId' , type: 'number' },
        {name: 'AccessFlag' , type: 'boolean' }
    ],

    proxy: {
        url: 'resources/data/dummydata/common/UserDataAccessPB.json'
    }
});