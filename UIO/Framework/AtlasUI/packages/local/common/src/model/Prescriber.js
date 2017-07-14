Ext.define('Atlas.common.model.Prescriber',{
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: "npi" , type: "string"},
        { name: "firstname" , type: "string"},
        { name: "lastname" , type: "string"},
        { name: "degree" , type: "string"},
        { name: "deaNum" , type: "string"},
        { name: "licstate" , type: "string"},
        { name: "locaddr1" , type: "string"},
        { name: "locaddr2" , type: "string"},
        { name: "loccity" , type: "string"},
        { name: "locfax" , type: "string"},
        { name: "locname" , type: "string"},
        { name: "locphone" , type: "string"},
        { name: "locstate" , type: "string"},
        { name: "loczip" , type: "string"},
        { name: "AuthFax" , mapping: "AuthFax.ContactInfo"},
        { name: "FWAPrescriberLockFlag" , type: "string"},
        { name: "prescriberLockNote" , type: "string"},
        { name: "PECOEnrollmentOptedOut" , mapping:" @PECOEnrollmentOptedOut"},
        { name: "PECOEnrollmentEffDate", mapping:"@PECOEnrollmentEffDate"},
        { name: "PECOEnrollmentTermDate", mapping:"@PECOEnrollmentTermDate"},
        { name: 'FwaFlag' , calculate: function(obj) {
            if(obj.FWAPrescriberLockFlag === 'yes'){
                return true;
            } else {
                return false;
            }
        }},
        { name: "citystatezip", calculate: function(obj){
            var city = "",
                state= "",
                zip="";
            if(obj.loccity != null && obj.loccity!= '') {
                city = obj.loccity + ',';
            }
            if(obj.locstate != null && obj.locstate!= ''){
                state = obj.locstate;
            }
            if(obj.loczip != null && obj.loczip!= ''){
                zip = obj.loczip.replace(/-\s*$/, '');
            }

            return city + ' ' + state + ' ' + zip;
        }},
         { name: "fax", calculate: function(obj){
             var fax = "";
             if(obj.locfax != null && obj.locfax != 'undefined' && obj.locfax != "") {
                 fax = '(' + obj.locfax.substring(0, 3) + ')-' + obj.locfax.substring(4, 7) + '-' + obj.locfax.substring(8, 12);
             }
             return fax;
         }},
        { name: "authFax", calculate: function(obj){
            var fax = "";
            if(obj.AuthFax != null && obj.AuthFax != 'undefined' && obj.AuthFax != "") {
                fax = obj.AuthFax.substring(0, 3) + '-' + obj.AuthFax.substring(3, 6) + '-' + obj.AuthFax.substring(6, 10);
            }
            return fax;
        }},
        { name: "phone", calculate: function(obj){
            // var fax = "";
            // if(obj.locphone != null && obj.locphone != 'undefined' && obj.locphone != "") {
            //     fax = '(' + obj.locphone.substring(0, 3) + ')-' + obj.locphone.substring(4, 7) + '-' + obj.locphone.substring(8, 12);
            // }
            // return fax;
            return obj.locphone;
        }},
         { name: "zip", calculate: function(obj){
             var zip = "";
             if(obj.loczip != null && obj.loczip != 'undefined' && obj.loczip != "") {
                 var rawZip = obj.loczip.replace(/-/g,'');
                 if(rawZip.length > 5) {
                     zip = rawZip.substring(0, 5) + '-' + rawZip.substring(5, 9);
                 } else {
                     zip = rawZip;
                 }
             }
             return zip;
         }},
        { name: "fullname", calculate: function(obj){
            var firstName = "",
                lastname = "";
            if(obj.firstname != null && obj.firstname != 'undefined' && obj.firstname != "") {
                firstName = obj.firstname;
            }
            if(obj.lastname != null && obj.lastname != 'undefined' && obj.lastname != ""){
                lastname = obj.lastname;
            }

            return firstName +  " " + lastname;
        }},
        { name: "fullnamestartwithlast", calculate: function(obj){
            var firstName = "",
                lastname = "";
            if(obj.firstname != null && obj.firstname != 'undefined' && obj.firstname != "") {
                firstName = obj.firstname;
            }
            if(obj.lastname != null && obj.lastname != 'undefined' && obj.lastname != ""){
                lastname = obj.lastname;
            }

            return lastname +  ", " +firstName ;
        }}
    ],
    validators: {
        npi: {
            type: 'length',
            min: 10,
            max: 10
        },

        firstName: {
            type: 'length',
            min: 2
        },
        // loczip: {
        //     type: 'length',
        //     min: 11
        // },
        lastName: 'presence'
    },
    proxy: {
        extraParams: {
            pKeyType: 'npi',
            pFieldList: 'npi,firstname,lastname,degree,deaNum,licstate,locaddr1,locaddr2,loccity,locfax,locname,locphone,locstate,loczip,Specialty,AuthFax.ContactInfo,FWAPrescriberLockFlag,prescriberLockNote,FWAPrescriberLockLOB, @PECOEnrollmentOptedOut,@PECOEnrollmentEffDate,@PECOEnrollmentTermDate'
        },

        url: 'prescriber/{0}/prescribermasterdata',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            rootProperty: function(payload) {

                payload.data.forEach(function(val,ind){

                    if(val.locphone)
                        val.locphone = '(' + val.locphone.substring(0, 3) + ')-' + val.locphone.substring(3, 6) + '-' + val.locphone.substring(6, 10);

                    if(val.locfax)
                        val.locfax = val.locfax.substring(0, 3) + '-' + val.locfax.substring(3, 6) + '-' + val.locfax.substring(6, 10);

                    // if(val.loczip) //zip is already coming with - seperated
                    //     val.loczip = val.loczip.substring(0, 5) + '-' + val.loczip.substring(5, 9) ;


                    val.locauthfax  = JSON.parse(JSON.stringify(val).replace("AuthFax.ContactInfo","AuthFaxContactInfo")).AuthFaxContactInfo;
                    if(val.locauthfax)
                        val.locauthfax = val.locauthfax.substring(0, 3) + '-' + val.locauthfax.substring(3, 6) + '-' + val.locauthfax.substring(6, 10);

                });

                return payload.data;
            }
        }
    }
});