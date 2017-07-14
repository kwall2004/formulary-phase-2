/**
 * Created by d4662 on 1/11/2017.
 */

Ext.define('Atlas.common.model.MemberInfo', {
    extend: 'Atlas.common.model.Base',
    fields: [
        //recipientID,firstname,lastname,gender,birthDate,@enrollmentStatus,Home.Address1,Home.Address2,Home.City,home.zipCode,Home.State
        { name: "recipientID"},
        { name: "firstname"},
        { name: "lastname"},
        { name: "gender"},
        { name: "birthdate"},
        { name: "@enrollmentStatus"},
        { name: "Home.Address1"},
        { name: "Home.Address2"},
        { name: "Home.City"},
        { name: "mappedZip", mapping: "Home.zipCode"},
        { name: "Home.State"},
        { name: "locPhoneExt"},
        { name: "locState"},
        { name: "locZip"},
        { name: "zip", calculate: function(obj){
            var zip = "";
            if(obj.mappedZip != null && obj.mappedZip != 'undefined' && obj.mappedZip != "") {
                zip = obj.mappedZip.substring(0, 5) + (obj.mappedZip.length > 5 ? ('-' + obj.mappedZip.substring(5, 9)) : '');
            }
            return zip;
        }}
    ],

    proxy:{
        url:'member/rx/membermasterdata'
    }
});
