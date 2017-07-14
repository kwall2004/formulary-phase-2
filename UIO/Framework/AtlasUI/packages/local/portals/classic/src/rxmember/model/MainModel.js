Ext.define('Atlas.portals.rxmember.model.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.portalsRxmemberMainModel',

    stores:{
        prescriptionExpenses: {
            model: 'Atlas.portals.rxmember.model.MemberPrescriptionExpense'
        },
        memberCoverages: {
            model: 'Atlas.portals.rxmember.model.MemberCoverage'
        },
        activeMemberCoverages: {
            model: 'Atlas.portals.rxmember.model.MemberCoverage',
            filters: [
                function(item) {
                    return item.get('TermDate') == '' || new Date(item.get('TermDate')).getTime() >= new Date().getTime();
                }
            ]
        },
        overduePrescriptions: {
            model: 'Atlas.portals.rxmember.model.ClaimHistory'
        }
    },

    data: {
        userModel: {},
        totalAmount: 0,
        spentAmount: '',
        hasOverduePrescriptions: false,
        hasDeductible: false
    }
});