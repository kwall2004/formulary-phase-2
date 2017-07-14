/**
 * Created by b6636 on 11/9/2016.
 */
Ext.define('Atlas.common.hra.model.MemberAssessmentDataWebResponse', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'recipientID',
        'assessmentID',
        'assessmentSeq',
        'seqNum',
        'creationDate',
        'completeDate',
        'createDateTime',
        'createTime',
        'createUser',
        'systemId',
        'createDate',
        'calculatedStratScore',
        'strat',
        'refusalDate',
        'refusalUser',
        'partialDate',
        'partialUser',
        'archiveDate',
        'archiveUser',
        'completeUser',
        'refusalTime',
        'partialTime',
        'completeTime',
        'archiveTime',
        'ediTransmissionDateTime',
        'refusalDateTime',
        'partialDateTime',
        'completeDateTime',
        'archiveDateTime',
        'ediTransmissionDate',
        'ediTransmissionTime',
        'assessmentSource',
        'dueDate',
        'incentiveDate',
        'incentiveType',
        'degFileSeq',
        'reopenedUser',
        'reopenedDate',
        'reopenedTime',
        'reopenedDateTime',
        'stratOverrideReason',
        'stratOverrideUser',
        'stratOverrideDateTime',
        'assessmentStatus',
        'stratMaximum',
        'rowNum',
        'dbRowID'
    ],

    proxy: {
        url: 'member/hp/memberasssessmentdataweb',
        // extraParams: {
        //     pListName: 'MedicarePANames'
        // },
        extraParams: {
            // "pSessionID" : "817b7ad4-bfec-b1bc-1a14-c9b0684b8065",
            // "viRecipientID" : "200000426319",
            // "viAssessmentID" : "1",
            // "viAction" : "get",
            // "vioSeqNum": "0",
            // "userState" : "MI",
            ttAssessmentAnswerIO: {
                ttAssessmentAnswerIO: []
            }
        }
    }
});