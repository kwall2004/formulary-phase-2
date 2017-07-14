/*
 Developer: Paul
 Description: master member model
 Origin: Merlin
 8/15/16

 */
Ext.define('Atlas.common.model.MemberMasterExt', {
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
        { name: 'dob', mapping: 'tbirthDate', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'dobFormat', calculate: function(obj) {
            var birthday = "";

            if (obj.dob != null && obj.dob != 'undefined') {
                birthday = Ext.Date.format(new Date(obj.dob), 'm/d/Y');
            }
            return birthday;
        }},
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
        }},
        {
            name: 'MemberInfo', calculate: function(obj){
            var firstName = "",
                middleName = "",
                lastName = "",
                recipientID = "";

            if(obj.firstName != null && obj.firstName != 'undefined') {
                firstName = obj.firstName;
            }

            if(obj.middleName != null && obj.middleName != 'undefined') {
                middleName = obj.middleName;
            }

            if(obj.lastName != null && obj.lastName != 'undefined'){
                lastName = obj.lastName;
            }

            return obj.memberID + " " + firstName + " " + middleName + " " + lastName
        }
        }
    ],

    proxy: {
        url: 'member/{0}/membermasterext',
        extraParams:{
            pagination:true
        }
    }

});
