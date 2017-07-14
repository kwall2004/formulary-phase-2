/**
 * Created by s6627 on 5/23/2017.
 */
Ext.define('Atlas.casemanagement.model.MTMCasesQueueAllCasesDueToday', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'MTMId', type: 'string'},
        {name: 'RecipientId', type: 'string'},
        {name: 'effDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'termDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'DescriptionCode', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'StatusCode', type: 'string'},
        {name: 'MTMStatus', type: 'string'},
        {name: 'CloseReasonCode', type: 'string'},
        {name: 'closedReason', type: 'string'},
        {name: 'closedDate', type: 'date', dateFormat: 'Y-m-d'},
        {
            name: 'DaysOpen', calculate: function (data) {
            var oneDay = 24 * 60 * 60 * 1000;
            var dt1 = new Date(data.EnrollDate);
            var dt2=null;
            if(data.closedDate)
            {
                dt2= new Date(data.closedDate);
            }
            else
            {
                dt2=new Date();
            }
            var diffDays = Math.round(Math.abs((dt2.getTime() - dt1.getTime()) / (oneDay)));
            return diffDays;
        }
        },
        {name: 'lastContactDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'followupDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'goalForNextContact', type: 'string'},
        {name: 'refType', type: 'string'},
        {name: 'alerts', type: 'string'},
        {name: 'caseManager', type: 'string'},
        {name: 'signedMTMWaiverDate', type: 'string'},
        {name: 'signedHIPAADate', type: 'string'},
        {name: 'patientProfileDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'medicationRecordDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'AnnualCMROfferedDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'annualCMRDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'targetedReviews', type: 'string'},
        {name: 'prescInterventions', type: 'string'},
        {name: 'MTMChanges', type: 'string'},
        {name: 'systemID', type: 'string'},
        {name: 'EnrollBy', type: 'string'},
        {name: 'EnrollDate', type: 'date'},
        {name: 'EnrollSource', type: 'string'},
        {name: 'EnrollReason', type: 'string'},
        {name: 'ReferralSource', type: 'string'},
        {name: 'memberFirstName', type: 'string'},
        {name: 'memberMiddleName', type: 'string'},
        {name: 'memberLastName', type: 'string'},
        {
            name: 'memberFullName', type: 'string',
            calculate: function (data) {
                return data.memberFirstName + ' ' + data.memberLastName;
            }
        },
        {name: 'optOutMethod', type: 'string'},
        {name: 'optOutMethodDesc', type: 'string'},
        {name: 'invitationLetterSendDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'callAttemptsCount', type: 'string'},
        {name: 'memberResponse', type: 'string'},
        {name: 'memberResponseDesc', type: 'string'},
        {name: 'numberOfMTMCases', type: 'string'},
        {name: 'numberOfNonMTMCases', type: 'string'},
        {name: 'totalCases', type: 'string'},
        {name: 'dbRowID', type: 'string'},
        {name: 'RowNum', type: 'string'},
        {name: 'planGroupId', type: 'string'},
        {name: 'CarrierName', type: 'string'},
        {name: 'AccountName', type: 'string'},
        {name: 'LOBName', type: 'string'},
        {name: 'cognitivelyImpaired', type: 'string'},
        {name: 'DateCogImpDetermined', type: 'string'},
        {name: 'returnedMail', type: 'string'},
        {name: 'Notes', type: 'string'}

    ],
    proxy: {
        url: 'member/{0}/mtmcases',
        extraParams: {
            pagination: true,
            ipiJumpStart: 0,
            ipcBckRecPointer: '',
            ipcFwdRecPointer: '',
            timeout: 500000000
        }

    }


});
