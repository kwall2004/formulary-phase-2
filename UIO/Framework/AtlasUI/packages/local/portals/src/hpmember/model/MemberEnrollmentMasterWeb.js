/**
 * Created by b6636 on 11/7/2016.
 */
Ext.define('Atlas.portals.hpmember.model.MemberEnrollmentMasterWeb', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'systemid',
        'programCode',
        'levelOfCare',
        'termreason',
        'otherInsuranceCode',
        'countyCode',
        'countyName',
        'sDate',
        'dbRowID',
        'scope',
        'rowNUm',
        'mssInd',
        'recipientID',
        'benefitPlanCode',
        'eDate',
        'coverageCode',
        'notifyDate',
        'reasonDesc'
    ],

    proxy: {
        url : 'portal/hp/memberenrollmentmasterwebrest'
    }
});