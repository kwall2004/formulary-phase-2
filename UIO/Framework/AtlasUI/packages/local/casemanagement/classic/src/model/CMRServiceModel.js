/**
 * Created by s6627 on 11/18/2016.
 */
Ext.define('Atlas.casemanagement.model.CMRServiceModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'MTMId', type: 'int'},
        {name: 'systemID', type: 'string'},
        {name: 'recordType', type: 'string'},
        {name: 'CMROfferDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'CMRDate',type: 'date', dateFormat: 'Y-m-d'},
        {name: 'TMRDate',type: 'date', dateFormat: 'Y-m-d'},
        {name: 'CMRDateYear', type: 'int',calculate:function(data){
            if(data.CMRDate!=null)
            {
                return data.CMRDate.getFullYear();
            }
            else {
                return 0;
            }
        }},
        {name: 'TMRDateYear', type: 'int',
            calculate:function(data){
                if(data.TMRDate!=null)
                {
                    return data.TMRDate.getFullYear();
                }
                else {
                    return 0;
                }
            }},
        {name: 'CMRNonConfReason', type: 'string'},
        {name: 'CMRTMRType',  type: 'string',
            calculate:function(data){
                if(data.TMRDate!=null)
                {
                    return 'TMR';
                }
                else {
                    return 'CMR';
                }
            }
        },
        {name: 'LTCEnrolledNew',type: 'int'},
        {name: 'LTCEntrollStartDate',type: 'date', dateFormat: 'Y-m-d'},
        {name: 'LTCEntrollEndDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'targetedReviews', type: 'string'},
        {name: 'prescInterventions', type: 'string'},
        {name: 'NPI',type: 'string'},
        {name: 'prescriberName', type: 'string'},
        {name: 'therapyChangeType', type: 'string'},
        {name: 'TherapyChangeDesc', type: 'string'},
        {name: 'therapyChangeDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'interventionDate',type: 'date', dateFormat: 'Y-m-d'},
        {name: 'cmrOfferMethod',type: 'string'},
        {name: 'cmrOfferMethodDesc', type: 'string'},
        {name: 'LicProfType',  type: 'string'},
        {name: 'LicProfTypeDesc', type: 'string'},
        {name: 'cmrRecipient',type: 'string'},
        {name: 'cmrRecipientDesc', type: 'string'},
        {name: 'invitationLetterDocId',type: 'int'},
        {name: 'followupLetterDocId', type: 'int'}
    ],
    proxy: {
        url: 'member/{0}/mtmcasedetails',
        extraParams: {
            pMTMId: '',
            pSystemId:0,
            pRecordType:"SERVICE"
        },
        reader: {
            type    : 'json',
            rootProperty    :'data'
        }
    }
})