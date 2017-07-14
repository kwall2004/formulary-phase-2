/** ... **/

Ext.define('Atlas.letter.model.LetterInfoModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.letterinfomdl',
    fields: [
        {name: 'AssignTo', mapping: 'AssignTo'},
        {name: 'DocID', mapping: ''},
        {name: 'LetterNameID', mapping: 'LetterNameID'},
        {name: 'planGroupId', mapping: 'planGroupId'},
        {name: 'recipientId', mapping: 'recipientId'},
        {name: 'ClaimID', mapping: 'ClaimID'},
        {name: 'RecipientID', mapping: 'RecipientID'},
        {name: 'MTMID', mapping: 'MTMID'},
        {name: 'assocRxRefNum', mapping: '@assocRxRefNum'},
        {name: 'prescriberID', mapping: 'prescriberID'}
    ],
    proxy: {
        url: 'member/{0}/letterdetail'
    }
});