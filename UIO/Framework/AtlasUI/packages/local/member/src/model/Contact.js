/**
 * Created by T4317 on 8/25/2016.
 */
Ext.define('Atlas.member.model.Contact', {
    extend: 'Atlas.common.model.Base',
    alias:'model.membercontactlog',
    fields: [{
        name: 'callerFirstname'
    },{
        name: 'callerLastName'
    },{
        name: 'callerPhone'
    },{
        name: 'subject'
    },{
        name: 'description'
    },{
        name: 'callStatus'
    },{
        name: 'contactType'
    },{
        name: 'oldContactUser'
    },{
        name: 'contactUser'
    },{
        name: 'updatedBy'
    },{
        name: 'callDateTime'
    },{
        name: 'npi'
    },{
        name: 'ncpdpid'
    },{
        name: 'recipientID'
    },{
        name: 'authID'
    },{
        name: 'transactionID'
    },{
        name: 'MTMId'
    },{
        name: 'LastModifiedUser'
    },{
        name: 'resolvedFirstCall'
    },{
        name: 'updatedDatetime'
    }],
    proxy: {
        url: 'common/rx/contactlogdata'
    }
});
