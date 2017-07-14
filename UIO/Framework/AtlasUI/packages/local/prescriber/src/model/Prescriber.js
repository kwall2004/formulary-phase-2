Ext.define('Atlas.prescriber.model.Prescriber',{
    extend: 'Ext.data.Model',

    fields: [
        { name: "npi" , type: "string"},
        { name: "firstName" , type: "string"},
        { name: "lastname" , type: "string"},
        { name: "degree" , type: "string"},
        { name: "deaNum" , type: "string"},
        { name: "licstate" , type: "string"},
        { name: "locaddr1" , type: "string"},
        { name: "locaddr2" , type: "string"},
        { name: "loccity" , type: "string"},
        { name: "locfax" , type: "string"},
        { name: "locname" , type: "string"},
        { name: "lockphone" , type: "string"},
        { name: "locstate" , type: "string"},
        { name: "loczip" , type: "string"},
        { name: "specialty" , type: "string"},
        { name: "AuthFax.ContactInfo" , type: "string"},
        { name: "FWAPrescriberLockFlag" , type: "string"},
        { name: "prescriberLockNote" , type: "string"},
        { name: "FWAPrescriberLockLOB" , type: "string"}
    ]
});