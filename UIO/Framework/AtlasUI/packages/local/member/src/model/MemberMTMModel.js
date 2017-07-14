/**
 * Created by j2487 on 11/1/2016.
 */
Ext.define('Atlas.member.model.MemberMTMModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'MTMId',type:'string',mapping:'MTMId'},
        {name: 'description',type:'string',mapping:'description'},
        {name: 'MTMStatus',type:'string',mapping:'MTMStatus'},
        {name: 'DaysOpen',type:'string',mapping:'DaysOpen'},
        {name: 'caseManager',type:'string',mapping:'caseManager'},
        {name: 'MTMStatus',type:'string',mapping:'MTMStatus'},
        {name: 'EnrollDate',mapping:'EnrollDate',type: 'date',mapping: function (data) {
         return Ext.Date.format(new Date(data.EnrollDate), 'm/d/Y');}},
        {name: 'followupDate',type:'date',mapping:'followupDate',dateFormat: 'Y-m-d' },
        {name: 'lastContactDate',type:'date',mapping:'lastContactDate',dateFormat: 'Y-m-d'},
        {name: 'goalForNextContact',type:'string',mapping:'goalForNextContact'},
        {name: 'RecipientId',type:'string',mapping:'RecipientId'},
        {name: 'memberFullName',type:'string',mapping:'memberFullName'},
        {name: 'CarrierName',type:'string',mapping:'CarrierName'},
        {name: 'AccountName',type:'string',mapping:'AccountName'},
        {name: 'LOBName',type:'string',mapping:'LOBName'},
        {name: 'effDate',type:'date',mapping:'effDate',dateFormat: 'Y-m-d'},
        {name: 'termDate',type:'string',mapping:'termDate',dateFormat: 'Y-m-d'},
        {name: 'ReferralSource',type:'string',mapping:'ReferralSource'},
        {name: 'EnrollSource',type:'string',mapping:'EnrollSource'},
        {name: 'EnrollReason',type:'string',mapping:'EnrollReason'},
        {name:'memberFirstName',type:'string',mapping:'memberFirstName'},
        {name:'memberMiddleName',type:'string',mapping:'memberMiddleName'},
        {name:'memberLastName',type:'string',mapping:'memberLastName'},
        { name: 'MemberName', calculate: function(obj){
            var memberFirstName = "",
                memberMiddleName = "",
                memberLastName = "";

            if(obj.memberFirstName != null && obj.memberFirstName != 'undefined') {
                memberFirstName = obj.memberFirstName;
            }

            if(obj.memberMiddleName != null && obj.memberMiddleName != 'undefined') {
                memberMiddleName = obj.memberMiddleName;
            }
            if(obj.memberLastName != null && obj.memberLastName != 'undefined'){
                memberLastName = obj.memberLastName;
            }

            return memberFirstName + " " + memberMiddleName + " " + memberLastName
        }}
    ],
    proxy: {
        url: 'member/{0}/mtmcases',
        timeout:120000,
        extraParams:{
            pagination:true
        }
    }
})
