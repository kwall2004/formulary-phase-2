/**
 * Created by m4542 on 10/3/2016.
 */
Ext.define('Atlas.portals.prescriber.model.MyMembers', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'ContactPhone',type: 'string'},
        {name: 'SSN', type: 'string' },
        {name: 'firstName',type: 'string'},
        {name: 'lastName',type: 'string'},
        {name: 'Account',type: 'string'},
        {name: 'RecipientId',type: 'int'},
        {name: 'LASTFill',type: 'string'},
        {name: 'Gender',type: 'string'},
        {name: 'DateofBirth',type: 'string'},
        {name: 'Plan',type: 'string'},
        {name: 'Filldate',type: 'string'},
        {name: 'LOB',type: 'string'},
        {name: 'memberId',type: 'string'},
        {name: 'fullName', calculate: function(obj){
            return obj.firstName + " " + obj.lastName;
        }}
    ],

    proxy: {
        url: 'authentication/{0}/portalmemberaccessp',
        extraParams: {
            pagination:true
        }
    }
});