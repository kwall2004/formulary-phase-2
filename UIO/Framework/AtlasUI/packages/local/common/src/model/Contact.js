Ext.define('Atlas.common.model.Contact',{
    extend: 'Atlas.common.model.StaticBase', //change to base when layer7 URL is ready
    idProperty: 'SystemID',
    fields: [
        {name: 'systemID',  type: 'number'},
        {name: 'ParentSystemID',  type: 'string'},
        {name: 'LastName',  type: 'string'},
        {name: 'FirstName',  type: 'string'},
        {name: 'Phone',  type: 'string'},
        {name: 'Email',  type: 'string'}
    ],
    proxy: {
        //http://mcsqa01.caidan.local/pbm/wsa1/getContactInfo
        // pSessionId
        // pParentSystemID
        url: 'resources/data/dummydata/common/options.json'
    }
});