/**
 * Created by agupta on 10/6/2016.
 */

Ext.define('Atlas.authorization.model.cdag.RedeterminationModel',{
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'SeqNum', type: 'string'},

        {name: 'AppealTypeDesc', type: 'string'},
        {name: 'AppealType', type: 'string'},
        {name: 'AppealStatusDesc', type: 'string'},
        {name: 'AppealStatus', type: 'string'},
        {name: 'UrgentAppeal', type: 'string'},
        {name: 'UrgencyType', type: 'string'},

        {name: 'UrgencyTypeDesc', type: 'string'},
        {name: 'UserStartDate', type: 'string'},
        {name: 'DueDate', type: 'string'},
        {name: 'AppealDecisionDate', type: 'string'},
        {name: 'HoursRemaining', type: 'string'},
        {name: 'AssignFrom', type: 'string'},

        {name: 'AssignTo', type: 'string'},
        {name: 'AppealCanceled', type: 'string'},
        {name: 'AppealCanceledYesNo', type: 'string',
            calculate: function (data) {
                return (data.AppealCanceled == true || data.AppealCanceled == 'true' ? 'Yes' : 'No');
            }
        },
        {name: 'SystemID', type: 'string'},
        {name: 'AuthOirign', type: 'string'},
        {name: 'AuthOirignDesc', type: 'string'},
        {name: 'AuthRecvdFrom', type: 'string'},

        {name: 'AuthRecvdFromDesc', type: 'string'},
        {name: 'RequestorName', type: 'string'},
        {name: 'RequestorRelationship', type: 'string'},
        {name: 'Address', type: 'string'},
        {name: 'City', type: 'string'},
        {name: 'State', type: 'string'},

        {name: 'ZipCode', type: 'string'},
        {name: 'Phone', type: 'string'},
        {name: 'Email', type: 'string'},
        {name: 'Fax', type: 'string'},
        {name: 'AORDateTime', type: 'string'},
        {name: 'recordAction', type: 'string'},

        {name: 'Notes', type: 'string'},
        {name: 'ReasonCode', type: 'string'},
        {name: 'ResolvedInFirstCall', type: 'string'},
        {name: 'lastModified', type: 'string'},
        {name: 'EffectiveDate', type: 'string'},
        {name: 'TermDate', type: 'string'},

        {name: 'lOverrideDecision', type: 'string'},
        {name: 'SupportingDocDateTime', type: 'string'},
        {name: 'SupportingDocIntake', type: 'string'},
        {name: 'UpdateEffectuationdate', type: 'string'},
        {name: 'PendDischrgNotify', type: 'string'},
        {name: 'PendDischrgHospital', type: 'string'},

        {name: 'UrgencyUpdateDateTime', type: 'string'}
    ],

    proxy: {
        extraParams: {
            //pSessionID: 'f537b9ad-eba1-fbaa-1614-52df981cfd0b',
            /* pcWhere: ' and recipientId = 5085650 ',
             pcSort: ' by authid ',
             piBatch: '10'*/
            pAuthID: ''
        },
        url: 'claims/{0}/coverageredetermination'
    }
});
