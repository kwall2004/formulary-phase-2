Ext.define('Atlas.prescriber.model.PrescriberUser',{
    extend: 'Atlas.common.model.Base',
    idProperty: 'systemID',
    fields: [
        { name: "NPI" , type: "string"},
        { name: "DEA" , type: "string"},
        { name: "UserName" , type: "string"},
        { name: "Active",  type: "string"},
        { name: "AdminAcceptTerms" , type: "string"},
        { name: "Answer1" , type: "string"},
        { name: "Answer2" , type: "string"},
        { name: "CreateDateTime",  type: "string"},
        { name: "PasswordChangeDate",  type: "string"},
        { name: "QuestionID1",  type: "string"},
        { name: "QuestionID2" , type: "string"},
        { name: "lastLogin",  type: "string"},
        { name: "lastLoginFormat", calculate: function(obj){
            //debugger;
            return '';
        }},
        { name: "registrationStatus" , type: "string"},
        { name: "processedDate" , type: "string"},
        { name: "systemID",  type: "string"},
        { name: "lastModified",  type: "string"},
        { name: "rowNum",  type: "string"},
        { name: "dbRowID" , type: "string"}
    ],
    proxy: {
        url: 'prescriber/{0}/prescriberusermasterext'
    }
});


