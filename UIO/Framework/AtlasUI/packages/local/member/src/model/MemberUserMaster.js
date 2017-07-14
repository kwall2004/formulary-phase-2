/*
 Developer: Paul
 Description: master member model
 Origin: Merlin
 8/15/16

 */
Ext.define('Atlas.member.model.MemberUserMaster', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'recipientID', mapping: 'RecipientID'},
        { name: 'memberID', mapping: 'MemberID'},
        { name: 'carrierID', mapping: 'CarrierID'},
        { name: 'userName', mapping: 'UserName'},
        { name: 'userType', mapping: 'UserType'},
        { name: 'email', mapping: 'Email'},
        { name: 'active', mapping: 'Active'},
        { name: 'adminAcceptTerms', mapping: 'AdminAcceptTerms'},
        { name: 'answer1', mapping: 'Answer1'},
        { name: 'answer2', mapping: 'Answer2'},
        { name: 'createDateTime', mapping: 'CreateDateTime'},
        { name: 'groupID', mapping: 'GroupID'},
        { name: 'password', mapping: 'Password'},
        { name: 'passwordChangeDate', mapping: 'PasswordChangeDate'},
        { name: 'questionID1', mapping: 'QuestionID1'},
        { name: 'questionID2', mapping: 'QuestionID2'},
        { name: 'theme', mapping: 'Theme'},
        { name: 'lastlogin', mapping: 'Lastlogin'},
        { name: 'loginDevice', mapping: 'LoginDevice'},
        { name: 'mobileAccess', mapping: 'mobileAccess'},
        { name: 'systemID', mapping: 'systemID'},
        { name: 'recordVersion', mapping: 'recordVersion'},
        { name: 'lastModified', mapping: 'lastModified'},
        { name: 'acctLocked', mapping: 'acctLocked'},
        { name: 'failedLoginAttempts', mapping: 'failedLoginAttempts'},
        { name: 'rxReminderSentDate', mapping: 'RxReminderSentDate'},
        { name: 'isV5', mapping: 'isV5'},

        { name: 'firstName', mapping: 'FirstName'},
        { name: 'lastName', mapping: 'LastName'},
        { name: 'ssn', mapping: 'socSecNum'},
        { name: 'dob', mapping: 'birthDate'},



        { name: 'MemberName', calculate: function(obj){
           // debugger;
            var firstName = "",
                lastName = "";

            if(obj.firstName != null && obj.firstName != 'undefined') {
                firstName = obj.firstName;
            }

            if(obj.lastName != null && obj.lastName != 'undefined'){
                lastName = obj.lastName;
            }

            return firstName + " " + lastName
        }}
    ],
    proxy: {
        url: 'system/{0}/memberusermaster',
        //TODO: should be set in controller
        extraParams: {
            //pSessionId: 'ffff540e-6612-4c82-f413-aa60403bdf1a',
            //ipiRecipientId: ''
        },
        reader: {
            /*
            This shouldn't be needed anymore.
            rootProperty: function(payload){
                return payload.data[0].ttmemberUserMasterRow;
            }
            */
        }

    }

});
