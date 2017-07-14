/**
 * Created by m4542 on 10/12/2016.
 */
Ext.define('Atlas.portals.prescriber.model.PortalMemberDetailsP', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'recipientID',     type: 'int' },
        { name: 'firstname',      type: 'string' },
        { name: 'middlename',    type: 'string' },
        { name: 'lastname',   type: 'string' },
        { name: 'suffix', type: 'string' },
        { name: 'gender', type: 'string' },
        { name: 'birthdate', type: 'string' },
        { name: 'socSecNum', type: 'string' },
        { name: 'languageDescription', type: 'string' },
        { name: 'race', type: 'string' },
        { name: 'deathDate', type: 'string' },
        { name: 'homeAddress1', type: 'string' },
        { name: 'homeAddress2',    type: 'string'},
        { name: 'homeCity',    type: 'string'},
        { name: 'homezipCode',    type: 'string'},
        { name: 'homeState',    type: 'string'},
        { name: 'countyDescription',    type: 'string'},
        { name: 'homephoneContactInfo',    type: 'string'},
        { name: 'workphoneContactInfo',    type: 'string'},
        { name: 'cellContactInfo',    type: 'string'},
        { name: 'emailContactInfo',    type: 'string'},
        { name: 'alerts',    type: 'string'},
        { name: 'hedisMessage',    type: 'string'},
        { name: 'enrollmentStatus',    type: 'string'},
        { name: 'respFirstName',    type: 'string'},
        { name: 'respMiddleName',    type: 'string'},
        { name: 'respLaStName',    type: 'string'},
        { name: 'respaddress1',    type: 'string'},
        { name: 'respaddress2',    type: 'string'},
        { name: 'respstate',    type: 'string'},
        { name: 'respcity',    type: 'string'},
        { name: 'respZipCode',    type: 'string'},
        { name: 'respHomePhoneContactInfo',    type: 'string'},
        { name: 'respWorkPhoneContactInfo',    type: 'string'},
        { name: 'complianceAlert',    type: 'string'},
        { name: 'carrierName',    type: 'string'},
        { name: 'accountName',    type: 'string'},
        { name: 'coCMember',    type: 'string'},
        { name: 'primRecipientId',    type: 'string'},
        { name: 'mcsProgGroupCode',    type: 'string'},
        { name: 'medicarePlanGroupId',    type: 'string'},
        { name: 'plangroupName',    type: 'string'},
        { name: 'pcpNPI',    type: 'string'},
        {name: 'fullname', calculate: function(obj){
            return obj.firstname + " " + obj.lastname;
        }},
        {name: 'age', calculate: function(obj){
            var today = new Date();
            var birthDate = new Date(obj.birthdate);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }},
        {name: 'socSecMasked', calculate: function(obj){
            var socString = obj.socSecNum;
            var lastFour = socString.substr(socString.length - 4);
            return "XXX-XX-" + lastFour;
        }}
    ],

    proxy: {
        url: 'portal/{0}/portalmemberdetailsp',
        extraParams: {
            pagination: true
        },
        reader: {
            metaProperty: 'metadata',
            rootProperty: function(payload) {
                return payload.data;
            }
        }
    }
});