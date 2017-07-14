/** ... **/

Ext.define('Atlas.letter.model.ClaimInfoModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.claiminfomdl',
    fields: [
        {name: '@UCFRejectDetails', type: 'string'},
        {name: '@drugLN', type: 'string'},
        {name: 'TransactionDate', type: 'string'},
        {name: 'TransitionFill', type: 'string'},
        {name: 'assocRxRefNum', type: 'int'},
        {name: 'gcnseq', type: 'string' },
        {name: 'ncpdpID', type: 'string' },
        {name: 'ndc', type: 'string'},
        {name: 'pcpProvId', type: 'string'},
        {name: 'planGroupId', type: 'string'},
        {name: 'prescriberID', type: 'string'},
        {name: 'prescriberNPI', type: 'string'},
        {name: 'recipientID', type: 'string'},
        {name: 'respStatus', type: 'string'},
        {name: 'rxNum', type: 'string'},
        {name: 'serviceDate', type: 'string'},
        {name: 'ClaimID', type: 'string'},
        {name: 'TransFillText', type: 'string'}
    ],
    proxy: {
        url: 'claims/{0}/claimmasterdata'
    }
});