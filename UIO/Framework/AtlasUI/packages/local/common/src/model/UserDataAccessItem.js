Ext.define('Atlas.common.model.UserDataAccessItem',{
    extend: 'Atlas.common.model.StaticBase', //change to base when layer7 URL is ready
    idProperty: 'id',
    //note: no uniqueid ???
    fields: [
        {name: 'Carrier',  type: 'string'},
        {name: 'CarrierID',  type: 'number'},
        {name: 'Account',  type: 'string'},
        {name: 'CarrierAcctNumber',  type: 'string'},
        {name: 'LOB',  type: 'string'},
        {name: 'CarrierLOBID',  type: 'number'},
        {name: 'AccessFlag',  type: 'boolean'}
    ],
    proxy: {
        //http://mcsqa01.caidan.local/pbm/wsa1/getUserDataAccess
        // pSessionId
        // pUserName
        url: 'resources/data/dummydata/common/UserDataAccess.json'
    }
});