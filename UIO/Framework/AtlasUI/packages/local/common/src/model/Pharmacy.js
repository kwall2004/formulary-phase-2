/**
 * Created by T4317 on 10/20/2016.
 */
Ext.define('Atlas.common.model.Pharmacy', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: "@Excluded"},
        { name: "ContactEmail"},
        { name: "contactExt"},
        { name: "contactFax"},
        { name: "contactFirstname"},
        { name: "contactLastname"},
        { name: "contactPhone"},
        { name: "contactTitle"},
        { name: "dispClassCode"},
        { name: "fedTaxId"},
        { name: "legalBusinessName"},
        { name: "locAddress1"},
        { name: "locAddress2"},
        { name: "locCity"},
        { name: "locCrossStreet"},
        { name: "locEmail"},
        { name: "locFax"},
        { name: "fax", calculate: function(obj){
            var phone = "";
            if(obj.locFax != null && obj.locFax != 'undefined' && obj.locFax != "") {
                phone = obj.locFax.substring(0, 3) + '-' + obj.locFax.substring(3, 6) + '-' + obj.locFax.substring(6, 10);
            }
            return phone;
        }},
        { name: "locPhone"},
        { name: "phone", calculate: function(obj){
            var phone = "";
            if(obj.locPhone != null && obj.locPhone != 'undefined' && obj.locPhone != "") {
                phone = '(' + obj.locPhone.substring(0, 3) + ')-' + obj.locPhone.substring(3, 6) + '-' + obj.locPhone.substring(6, 10);
            }
            return phone;
        }},
        { name: "locPhoneExt"},
        { name: "locState"},
        { name: "locZip"},
        { name: "zip", calculate: function(obj){
            var zip = "";
            if(obj.locZip != null && obj.locZip != 'undefined' && obj.locZip != "") {
                zip = obj.locZip.substring(0, 5) + (obj.locZip.length > 5 ? ('-' + obj.locZip.substring(5, 9)) : '');
            }
            return zip;
        }},
        { name: "mailAddress1"},
        { name: "mailCity"},
        { name: "mailState"},
        { name: "mailZip"},
        { name: "name"},
        { name: "ncpdpid"},
        { name: "primDispTypeCode"},
        { name: "secDispTypeCode"},
        { name: "tertDispTypeCode"}
    ],

    proxy:{
        url:'pharmacy/rx/pharmacymasterdata'
    }
});
