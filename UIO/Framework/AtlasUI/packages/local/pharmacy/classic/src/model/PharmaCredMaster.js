/**
 * Created by l6630 on 11/16/2016.
 */

Ext.define('Atlas.pharmacy.model.PharmaCredMaster', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'CredResult', type: 'number'},
        {name: 'systemID', type: 'number'},
        {name: 'Action', type: 'string'},
        {name: 'ReCredfailLtrId', type: 'number'},
        {name: 'reqHoldReqCorpDocId', type: 'number'},
        {name: 'reqHoldReqDocId', type: 'number'},
        {name: 'reqHoldReqCorpLtrId', type: 'number'},
        {name: 'ReCredfailDocId', type: 'number'},
        {name: 'WelcomeDocId', type: 'number'},
        {name: 'expectedReCredDate', type: 'date',dateFormat: 'Y-m-d'},
        {name: 'ApplicationSource', type: 'number'},
        {name: 'MissInfoLtrId', type: 'number'},
        {name: 'RelationshipID', type: 'number'},
        {name: 'reqHoldReqLtrId', type: 'number'},
        {name: 'AddRelWelLtrId', type: 'number'},
        {name: 'recredWelcomeDocId', type: 'number'},
        {name: 'ExceedTimeDocId', type: 'number'},
        {name: 'CredLogID', type: 'number'},
        {name: 'ReCredFileReceivedDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'NCPDPID', type: 'string'},
        {name: 'CreatedBy', type: 'string'},
        {name: 'ReCredDocId', type: 'number'},
        {name: 'CredDescr', type: 'string'},
        {name: 'Comments', type: 'string'},
        {name: 'ReCredLtrId', type: 'number'},
        {name: 'CriNotMetDocId', type: 'number'},
        {name: 'CredCreateDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'CredCompleteDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'CriNotMetLtrId', type: 'number'},
        {name: 'MissInfoDocId', type: 'number'},
        {name: 'WelcomeLtrId', type: 'number'},
        {name: 'ExceedTimeLtrId', type: 'number'},
        {name: 'recredWelcomeLtrId', type: 'number'},
        {name: 'AddRelWelDocId', type: 'number'},
        {name: 'CredResultDescr', type: 'string'},
        {name: 'CredType', type: 'number'},
        {name: 'CredLevel', type: 'string'},
        {name: 'CredLevelDisp', type: 'string', convert: function (v, rec) {
                return rec.get('RelationshipID') ? "Relationship" : "Pharmacy"
            }
        }


    ],
    proxy: {
        extraParams: {
         //   pKeyValue: '{selCredValue}',
         //   pKeyType: '{selCredType}'
        },
        url: 'pharmacy/{0}/pharmcredmaster'
    }
});