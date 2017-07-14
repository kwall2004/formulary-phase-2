/**
 * Created by T4317 on 7/26/2016.
 */
Ext.define('Atlas.member.model.MemberMaster', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'CoCMember', mapping: '@CoCMember' },
        { name: 'alerts', mapping: '@alerts' },
        { name: 'HICN', mapping: '@HICN' },
        { name: 'countyDescription', mapping: '@countyDescription' },
        { name: 'enrollmentStatus', mapping: '@enrollmentStatus' },
        { name: 'languageDescription', mapping: '@languageDescription' },
        { name: 'mcsProgGroupCode', mapping: '@mcsProgGroupCode' },
        { name: 'age', mapping: '@Age'},
        'AccountName',
        'CarrierName',
        { name: 'Home_Address1', mapping: 'Home.Address1' },
        { name: 'Home_Address2', mapping: 'Home.Address2' },
        { name: 'Home_City', mapping: 'Home.City' },
        { name: 'Home_State', mapping: 'Home.State' },
        {
                name:'birthDate',type: 'string',convert: function (val) {
            if(val) {
                var dateparts = val.split('/');
                var getyear = new Date(val).getFullYear();
                return dateparts[0] + '/' + dateparts[1] + '/' + getyear;
            }
            }
        },
        { name: 'cell_ContactInfo', mapping: 'cell.ContactInfo' },
        {
            name:'cellPhone',calculate: function(obj)
        {
            var cellphone = "";
            if (obj.cell_ContactInfo != null && obj.cell_ContactInfo != 'undefined')
            {
                cellphone = obj.cell_ContactInfo;
                if (cellphone.length == 10)
                {
                    cellphone = "(" + cellphone.substr(0, 3) + ") " + cellphone.substr(3, 3) + "-" + cellphone.substr(6);
                }
            }
            return cellphone;
        }
        },
        {name:'complianceAlert',mapping:'complianceAlert'},
        'deathDate',
        { name: 'email_ContactInfo', mapping: 'email.ContactInfo' },
        {name:'firstname',mapping:'firstname'},
        'gender',
        'hedisMessage',
        { name: 'fosterCare', mapping: '@FosterCareInd' },
        { name: 'home_zipCode', mapping: 'home.zipCode' },
        {name:'homeZip',calculate:function(obj)
        {
            var homezip = "";
            if (obj.home_zipCode != null && obj.home_zipCode != 'undefined' && obj.home_zipCode != '')
            {
                homezip = obj.home_zipCode;
                if (homezip.length == 9)
                {
                    homezip = homezip.substring(0,5) + "-" + homezip.substring(5);
                }
            }
            return homezip;
        }
        },
        { name: 'homephone_ContactInfo', mapping: 'homephone.ContactInfo' },
        {
            name:'homePhone',calculate: function(obj)
        {
            var homephone = "";
            if (obj.homephone_ContactInfo != null && obj.homephone_ContactInfo != 'undefined')
            {
                homephone = obj.homephone_ContactInfo;
                if (homephone.length == 10)
                {
                    homephone = "(" + homephone.substr(0, 3) + ") " + homephone.substr(3, 3) + "-" + homephone.substr(6);
                }
            }
            return homephone;
        }
        },
        {name:'lastname',mapping:'lastname'},
        {name:'middlename',mapping:'middlename'},
        'primRecipientId',
        'race',
        'recipientID','memberId','CardType','planGroupId','langDesc','langCode',

        { name: 'resp_ZipCode', mapping: 'resp.ZipCode' },
        {name:'respZip',calculate:function(obj)
        {
            var respzip = "";
            if (obj.resp_ZipCode!= null && obj.resp_ZipCode != 'undefined')
            {
                respzip = obj.resp_ZipCode;
                if (respzip.length == 9)
                {
                    respzip = respzip.substring(0,5) + "-" + respzip.substring(5);
                }
            }
            return respzip;
        }
        },
        { name: 'resp_address1', mapping: 'resp.address1' },
        { name: 'resp_address2', mapping: 'resp.address2' },
        { name: 'resp_city', mapping: 'resp.city' },
        { name: 'resp_state', mapping: 'resp.state' },
        'respFirstName',
        { name: 'respHomePhone_ContactInfo', mapping: 'respHomePhone.ContactInfo' },
        {
            name:'respHomePhone',calculate: function(obj)
        {
            var resphomephone = "";
            if (obj.respHomePhone_ContactInfo != null && obj.respHomePhone_ContactInfo != 'undefined')
            {
                resphomephone = obj.respHomePhone_ContactInfo;
                if (resphomephone.length == 10)
                {
                    resphomephone = "(" + resphomephone.substr(0, 3) + ") " + resphomephone.substr(3, 3) + "-" + resphomephone.substr(6);
                }
            }
            return resphomephone;
        }
        },
        'respLastName',
        'respMiddleName',
        { name: 'respWorkPhone_ContactInfo', mapping: 'respWorkPhone.ContactInfo' },
        {
            name:'respWorkPhone',calculate: function(obj)
        {
            var respworkphone = "";
            if (obj.respWorkPhone_ContactInfo != null && obj.respWorkPhone_ContactInfo != 'undefined')
            {
                respworkphone = obj.respWorkPhone_ContactInfo;
                if (respworkphone.length == 10)
                {
                    respworkphone = "(" + respworkphone.substr(0, 3) + ") " + respworkphone.substr(3, 3) + "-" + respworkphone.substr(6);
                }
            }
            return respworkphone;
        }
        },
        {name:'socSecNum',mapping:'socSecNum'},
        {name:'ssn',calculate:function (obj) {
            var ssn = "";
            if (obj.socSecNum != null && obj.socSecNum != 'undefined' && obj.socSecNum != '' )
            {
                ssn = obj.socSecNum;
                ssn = "XXX-XX-" + ssn.substring(5);
            }
            return ssn;
        }},
        'suffix',
        {name:'hospice',mapping:'spareField03'},
        { name: 'MemberName', calculate: function(obj){
            var firstname = "",
                middlename = "",
                lastname = "";

            if(obj.firstname != null && obj.firstname != 'undefined') {
                firstname = obj.firstname;
            }

            if(obj.middlename != null && obj.middlename != 'undefined') {
                middlename = obj.middlename;
            }

            if(obj.lastname != null && obj.lastname != 'undefined'){
                lastname = obj.lastname;
            }

            return firstname + " " + middlename + " " + lastname
        }},
        { name: 'workphone_ContactInfo', mapping: 'workphone.ContactInfo' },
        {
            name:'workPhone',calculate: function(obj)
        {
            var workphone = "";
            if (obj.workphone_ContactInfo != null && obj.workphone_ContactInfo != 'undefined')
            {
                workphone = obj.workphone_ContactInfo;
                if (workphone.length == 10)
                {
                    workphone = "(" + workphone.substr(0, 3) + ") " + workphone.substr(3, 3) + "-" + workphone.substr(6);
                }
            }
            return workphone;
        }
        },
        {
            name: 'primarySubscriber',
                calculate: function(obj){
                    if(obj.primRecipientId === null ||  obj.primRecipientId === 'undefined' || obj.recipientID === null || obj.recipientID === 'undefined'){
                        return "No"
                    }
                    else if(obj.primRecipientId == obj.recipientID){
                        return "Yes"
                    }else{
                        return "No"
                    }
                }
        }
    ],

    proxy: {
        extraParams: {
            pKeyType: 'recipientID',
            pFieldList: 'recipientID,firstname,middlename,lastname,suffix,gender,@enrollmentStatus,birthDate,socSecNum,@languageDescription,langCode,race,deathDate,Home.Address1,Home.Address2,Home.City,home.zipCode,Home.State,@countyDescription,homephone.ContactInfo,workphone.ContactInfo,cell.ContactInfo,email.ContactInfo,@alerts,hedisMessage,@enrollmentStatus,respFirstName,respMiddleName,respLastName,resp.address1,resp.address2,resp.state,resp.city,resp.ZipCode,respHomePhone.ContactInfo,respWorkPhone.ContactInfo,complianceAlert,CarrierName,AccountName,@CoCMember,primRecipientId,@mcsProgGroupCode,@medicarePlanGroupId,@spareField03,@HICN,@FosterCareInd,@Age'
        },
        url: 'member/{0}/membermasterdata'
    }
});