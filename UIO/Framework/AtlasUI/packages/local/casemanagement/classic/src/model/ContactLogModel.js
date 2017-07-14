/**
 * Created by s6627 on 11/10/2016.
 */
Ext.define('Atlas.casemanagement.model.ContactLogModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'Reason1', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'CallStatusInfo', type: 'string'},
        {name: 'contactUser', type: 'string'},
        {name: 'callDateTime', type: 'string'},
        {name: 'CaseNum', type: 'string'},
        {name: 'subject', type: 'string'},
        {name: 'ContactTypeInfo', type: 'string'},
        {name: 'CloseReasonCode', type: 'string'},
        {name: 'LastModifiedBy', type: 'string'},
        {name: 'LastModified', type: 'string'},
        {name: 'planGroupId', type: 'string'},
        {name: 'updatedDatetime', type: 'string'}
    ],
    proxy: {
        url: 'shared/{0}/contactlogtable',
        extraParams: {
            pagination: true,
            "pKeyValue": "507591",
            "pKeyType":"MTMID",
            "pStartDate": "",
            "pEndDate": "",
            "pBatchSize": 10,
            "pDBRowID": "0"
        },
        reader: {
            type    : 'json',
            rootProperty: function(payload) {
                for (var i = 0; i < payload.metadata.ttContactLog.ttContactLog.length; i++) {
                    var ContactReasonCodeList=[];
                    var ContactReasonCode={};
                    for (var j = 0; j < payload.metadata.ttContactReasonCode.ttContactReasonCode.length; j++) {
                        if (payload.metadata.ttContactReasonCode.ttContactReasonCode[j].caseNum == payload.metadata.ttContactLog.ttContactLog[i].CaseNum) {
                            ContactReasonCode=payload.metadata.ttContactReasonCode.ttContactReasonCode[j];
                            ContactReasonCodeList.push(ContactReasonCode);

                        }
                    }
                    for(var k=0;k<ContactReasonCodeList.length;k++)
                    {
                        if (ContactReasonCodeList[k].CodeType == "Reason1") {
                            payload.metadata.ttContactLog.ttContactLog[i].Reason1=ContactReasonCodeList[k].CodeDescr;
                        }
                    }

                }
                return payload.metadata.ttContactLog.ttContactLog;
            }
        }
    }

})
