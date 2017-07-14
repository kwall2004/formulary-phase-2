/**

 **/

Ext.define('Atlas.letter.model.LetterDetailsModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'letterdetailsmodel',
    fields: [
        {name: 'batchSelect', type: 'boolean', mapping: 'batchSelect' },
        {name: 'LetterID', type: 'string', mapping: 'LetterID' },
        {name: 'LetterNameID', type: 'string', mapping: 'LetterNameID' },
        {name: 'LetterName', type: 'string', mapping: 'LetterName' },
        {name: 'CreateBy', type: 'string', mapping: 'CreateBy' },
        {name: 'CreateDate', type: 'string', mapping: 'CreateDate', dateFormat: 'm/d/Y' },
        {name: 'SentBy', type: 'string', mapping: 'SentBy' },
        {name: 'SentDate', type: 'string', mapping: 'SentDate', dateFormat: 'm/d/Y' },
        {name: 'ApproveDate', type: 'string', mapping: 'ApproveDate', dateFormat: 'm/d/Y' },
        {name: 'AssignTo', type: 'string', mapping: 'AssignTo' },
        {name: 'DocID', type: 'string', mapping: 'DocID' },
        {name: 'RecipientID', type: 'string', mapping: 'RecipientID' },
        {name: 'MemberName', type: 'string', mapping: 'MemberName' },
        {name: 'ClaimID', type: 'string', mapping: 'ClaimID' },
        {name: 'PrescriberID', type: 'string', mapping: 'PrescriberID' },
        {name: 'NCPDPID', type: 'string', mapping: 'NCPDPID' },
        {name: 'MTMID', type: 'string', mapping: 'MTMID' },
        {name: 'PCPID', type: 'string', mapping: 'PCPID' },
        {name: 'SystemID', type: 'string', mapping: 'SystemID' },
        {name: 'auditID', type: 'string', mapping: 'auditID' },
        {name: 'PlanGroupID', type: 'string', mapping: 'PlanGroupID' },
        {name: 'PlanGroupName', type: 'string', mapping: 'PlanGroupName' },
        {name: 'CarrierName', type: 'string', mapping: 'CarrierName' },
        {name: 'AccountName', type: 'string', mapping: 'AccountName' },
        {name: 'LOBName', type: 'string', mapping: 'LOBName' }
    ],
    pageSize: 50,
    proxy: {
        //url: 'shared/{0}/letterslist' ----> Display Letter Type combobox list
        url: 'member/{0}/letterdetailext',
        extraParams: {
            pagination: true
        }
        //url: 'member/{0}/lettermaster'
        //url: 'system/{0}/queuelist'
    }
});
