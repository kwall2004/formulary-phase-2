Ext.define('Atlas.common.model.PortalMemberExt', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'dbRowID',
        'rowNum',
        { name: 'recipientID', mapping: 'trecipientID'},
        { name: 'memberID', mapping: 'tmemberID'},
        { name: 'firstName', mapping: 'tfirstName'},
        { name: 'accountName', mapping: 'tAccountName'},
        { name: 'lastName', mapping: 'tlastName'},
        { name: 'middleName', mapping: 'tmiddleName'},
        { name: 'dob', mapping: 'tbirthDate'},
        { name: 'lobName', mapping: 'tLOBName'},
        { name: 'memStatus', mapping: 'tMemStatus'},
        { name: 'planGrpName', mapping: 'tPlanGrpName'},
        { name: 'carrierID', mapping: 'tCarrierID'},
        { name: 'carrierName', mapping: 'tcarrierName'},
        { name: 'deathDate', mapping: 'tdeathDate'},
        { name: 'gender', mapping: 'tgender'},
        { name: 'hedisMessage', mapping: 'thedisMessage'},
        { name: 'langCode', mapping: 'tlangCode'},
        { name: 'race', mapping: 'trace'},
        { name: 'langCode', mapping: 'tlangCode'},
        { name: 'ssn', mapping: 'tsocSecNum'},
        { name: 'suffix', mapping: 'tsuffix'},
        { name: 'wrdIDx', mapping: 'twrdIDx'},
        { name: 'MemberName', calculate: function(obj){
            var firstName = "",
                middleName = "",
                lastName = "";

            if(obj.firstName != null && obj.firstName != 'undefined') {
                firstName = obj.firstName;
            }

            if(obj.middleName != null && obj.middleName != 'undefined') {
                middleName = obj.middleName;
            }

            if(obj.lastName != null && obj.lastName != 'undefined'){
                lastName = obj.lastName;
            }

            return firstName + " " + middleName + " " + lastName
        }}
    ],

    proxy: {
        url: 'portal/{0}/portalmemberext'
    }

});
