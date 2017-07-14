/**
 * Created by T4317 on 7/28/2016.
 * Model page for Member-->Menu-->Letters
 */
Ext.define('Atlas.member.model.MemberLettersModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'viewLetter', type: 'string', mapping: 'ViewLetter' },
        { name: 'letterName', type: 'string', mapping: 'letterName' },
        { name: 'createDate', type: 'date', mapping: function (data) {
            return Ext.Date.format(new Date(data.createDate), 'm/d/Y H:i:s');} },
        { name: 'createdBy', type: 'string', mapping: 'createUser' },
        { name: 'carrier', type: 'string', mapping: 'Carrier' },
        { name: 'account', type: 'string', mapping: 'Account' },
        { name: 'lob', type: 'string', mapping: 'LOB' },
        { name: 'approvedDate', type: 'date',mapping: function (data) {
         return Ext.Date.format(new Date(data.approvedDate), 'm/d/Y H:i:s');}},
        { name: 'approvedBy', type: 'string', mapping: 'approvedUser' },


        { name: 'SentDate', type: 'date', mapping: function (data) {
            return Ext.Date.format(new Date(data.sentDate), 'm/d/Y H:i:s');
        }
        },
        { name: 'POBoxDropDate', type: 'date',mapping: function (data) {
            return Ext.Date.format(new Date(data.POBoxDropDate), 'm/d/Y H:i:s');}},
        { name: 'POBoxDropDate02', type: 'date',mapping: function (data) {
            return Ext.Date.format(new Date(data.POBoxDropDate02), 'm/d/Y H:i:s');}},
        { name: 'sentBy', type: 'string', mapping: 'sentUser' },
        {name:'LetterID',type:'int',mapping:'LetterID'},
        {name:'authID',type:'int',mapping:'authID'},
        {name:'DocumentID',type:'int',mapping:'DocumentID'},
        {name:'systemID',type:'string',mapping:'systemID'},
        {name:'LetterCategory',type:'string',mapping:'LetterCategory'},
        {name:'letterType',type:'string',mapping:'letterType'}

    ]
    // ,
    // proxy: {
    //     extraParams: {
    //         pKeyType: 'recipientID',
    //         pagination:true
    //     },
    //     url: 'member/{0}/memberletterdetail'
    // }
});