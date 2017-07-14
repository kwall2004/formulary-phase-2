Ext.define('Atlas.common.model.UserAccessPlanGroup', {
    extend: 'Atlas.common.model.StaticBase', //change to base when layer7 URL is ready
    idProperty: 'id',
    //note: no uniqueid ???
    fields: [
        {name: 'pPlanGroupID', type: 'string'},
        {name: 'pPCN', type: 'number'}

    ],
    proxy: {
        //http://mcsqa01.caidan.local/pbm/wsa1/getUserAccessPlanGroup
        // pSessionId
        // pWhere
        url: 'resources/data/dummydata/common/UserAccessPlanGroup.json'
    }
});