/**
 * Created by mkorivi on 11/19/2016.
 */
Ext.define('Atlas.casemanagement.model.PlanCarehistoryAPI', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'recipientID', type: 'string'},
        {name: 'seqNum', type: 'string'},
        {name: 'systemID', type: 'string'},
        {name: 'problemID', type: 'string'},
        {name: 'caseType', type: 'string'},
        {name: 'priority', type: 'string'},
        {name: 'problemStartDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'STGoalID', type: 'string'},
        {name: 'strengths',type: 'string'},
        {name: 'timeframe', type: 'string'},
        {name: 'excludeGoalFromLetter', type: 'string'},
        {name: 'includeNoteOnPOC', type: 'string'},
        {name: 'readinessToChange', type: 'string'},
        {name: 'goalProgress', type: 'string'},
        {name: 'memberAgrees',type: 'string'},
        {name: 'memberAgreesYesNO',type: 'string',
        calculate: function (data) {
            return (data.memberAgrees == 'true' ? 'yes' : (data.memberAgrees == 'false' ? 'no' : data.memberAgrees));
        }
        },
        {name: 'disagreeReason',type: 'string'},
        {name: 'barriers',type: 'string'},
        {name: 'LTGoalID',type: 'string'},
        {name: 'LTGoalShortDescription',type: 'string'},
        {name: 'followupDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'lastContact',type: 'string'},
        {name: 'closedReason',type: 'string'},
        {name: 'createUser',type: 'string'},
        {name: 'problemEndDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'problemShortDescription',type: 'string'},
        {name: 'STGoalShortDescription',type: 'string'},
        {name: 'chartReason',type: 'string'},
        {name: 'disagreeDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'problemSeqNum',type: 'string'},
        {name: 'STGoalLongDescription',type: 'string'},
        {name: 'LTGoalLongDescription',type: 'string'},
        {name: 'problemCloseUser',type: 'string'},
        {name: 'goalPriority',type: 'string'},
        {name: 'goalStartDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'goalEndDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'goalCloseUser',type: 'string'},
        {name: 'goalCloseDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'goalSeqNum',type: 'string'},
        {name: 'timeFrameDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'problemLongDescription',type: 'string'},
        {name: 'note',type: 'string'},
        {name: 'strengths',type: 'string'}
    ],
    proxy: {
        url: 'vendor/hp/plancarehistoryapi'

    }

})
