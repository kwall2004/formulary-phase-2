Ext.define('Atlas.common.model.PrescriberList',{
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: "npi" , type: "string"},
        { name: "lastname" , type: "string"},
        { name: "firstame" , type: "string"},
        { name: "middlename",  type: "string"},
        { name: "fullname", type:"string"},
        { name: "degree" , type: "string"},
        { name: "specialty" , type: "string"},
        { name: "taxonomy" , type: "string"},
        { name: "licnum",  type: "string"},
        { name: "licstate",  type: "string"},
        { name: "caidid",  type: "string"},
        { name: "caidstate" , type: "string"},
        { name: "careid",  type: "string"},
        { name: "upin" , type: "string"},
        { name: "taxid" , type: "string"},
        { name: "locname",  type: "string"},
        { name: "locaddr1",  type: "string"},
        { name: "locaddr2",  type: "string"},
        { name: "loccity" , type: "string"},
        { name: "locstate",  type: "string"},
        { name: "loczip",  type: "string"},
        { name: "npisource",  type: "string"},
        { name: "wrdidx" , type: "string"},
        { name: "fullname",  type: "string"},
        { name: "birthdate" , type: "date"},
        { name: "entityType" , type: "string"},
        { name: "locphone",  type: "string"},
        { name: "locfax",  type: "string"},
        { name: "enumDate",  type: "date"},
        { name: "dbRowID",  type: "string"},
        { name: "RowNum",  type: "int"}
    ],
    proxy: {

        extraParams: {
            pRowid: '0',
            pRowNum: '0',
            pBatchSize: '50',
            pSort: '',
            pagination:true
        },

        url: 'prescriber/{0}/prescriberlocationdetail'
    }
});