/**
 * Created by j2487 on 11/4/2016.
 */
Ext.define('Atlas.member.model.MemberCOBCLetterDetail', {
    extend: 'Atlas.common.model.Base',
    idProperty: 'cobcrecordid',
    fields: [
        { name: 'SystemId'},
        { name: 'cobcrecordid',type: 'int' },
        { name: 'recipientid' },
        { name: 'memberid' },
        { name: 'LetterType' },
        { name: 'LetterTypeDesc' },
        { name: 'COBCStatus' },
        { name: 'COBCStatusDesc' },
        { name: 'LetterGeneratedDate' },
        { name: 'LetterSentDate' },
        { name: 'LetterSentElapsedDays' },
        { name: 'LetterID' },
        { name: 'DocID' },
        { name: 'ecrssentdate'},
        { name: 'ECRSSentElapsedDays' },
        { name: 'ecrscompletedate' }
        ],
    proxy: {
        url: 'member/{0}/cobcletterdetail'
    }

});