/**
 * Created by j2487 on 11/4/2016.
 */
Ext.define('Atlas.member.model.COBCMemberModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'systemId'},
        {name: 'SSN'},
        {name: 'RecipientId'},
        {name: 'MemberName'},
        {name: 'MemberDOB'},
        {name: 'MemberGender'},
        {name: 'HICNRRB'},
        {name: 'memberStatus'},
        {name: 'LetterType'},
        {name: 'LetterTypeDescr'},
        {name: 'CobStatus'},
        {name: 'CobStatusDesc'},
        {name: 'LetterSentDate'},
        {name: 'LetterSentElapsedDays'},
        {name: 'ECRSSentElapsedDays'},
        {name: 'ECRSSentDate'},
        {name: 'Contract'},
        {name: 'PBP'},
        {name: 'dbRowID'},
        {name: 'RowNum'}

    ],
    proxy: {
        url: 'member/{0}/cobcmember',
        timeout: 70000,
        extraParams: {
            pagination: true
        }
    }

});