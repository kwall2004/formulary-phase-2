/**
 * Created by S4505 on 4/10/2017.
 */
Ext.define('Atlas.casemanagement.store.casedetails.ContactLog',{
    alias: 'store.casemanagement-contactlog',
    extend: 'Ext.data.Store',
    model: 'Atlas.casemanagement.model.ContactLogModel',
    autoLoad: false,
    proxy: {
        type:'layer7',
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
});